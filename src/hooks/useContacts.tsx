/* eslint-disable react-hooks/exhaustive-deps */
/*
 this file contains all states and utils related to contacts table from dashboard page.
 I did this because the file was being too large to manage.
 */

import { activeUsersState, phoneConnectedState, selectedFileState, selectedUsersState } from '@/atoms';
import axios from '@/axios.config';
import { IReservation, IUser } from '@/types';
import { getDecodedFileData, getUsersFromFileContent, removeDuplicates } from '@/utils/files';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import useAuth from './useAuth';
import useReservations from './useReservations';
import useWhatsappAPI from './useWhatsappApi';
import { pageUsersState } from '@/store/contactsTableStates';

export default function useContacts() {
    const selectedFile = useRecoilValue(selectedFileState);
    const [gettingFileData, setGettingFileData] = useState(false);

    const [phoneConnected, setPhoneConnected] = useRecoilState(phoneConnectedState);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [allChecked, setAllChecked] = useState(false);
    const [selectedUsers, setSelectedUsers] = useRecoilState(selectedUsersState);
    const [_ac, setActiveUsers] = useRecoilState(activeUsersState);
    const [users, setUsers] = useState<IUser[]>([]);
    const { user } = useAuth();
    const [totalPages, setTotalPages] = useState(0);
    const [filter, setFilter] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([])
    const [checked, setChecked] = useState(false);
    const [pageUsers, setPageUsers] = useRecoilState(pageUsersState);
    const [currentPage, setCurrentPage] = useState(0);
    const pageStart = currentPage * rowsPerPage;
    const pageEnd = pageStart + rowsPerPage;
    const [loggingOut, setLoggingOut] = useState(false);
    const { logout: whatsappLogout } = useWhatsappAPI();
    const { searchingActiveReservation, searchForActiveReservation } = useReservations();
    const [activeReservation, setActiveReservation] = useState<IReservation | null>(null)

    const handlePageChange = ({ selected }) => {
        if (selected === currentPage) return;
        if (selected < 0 || selected >= totalPages) return;
        setCurrentPage(selected);
    };

    useEffect(() => {
        const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
        setTotalPages(totalPages);
        setPageUsers(filteredUsers.slice(pageStart, pageEnd));

    }, [filteredUsers, currentPage, rowsPerPage]);

    const getFileData = async (fileId: string) => {
        setGettingFileData(true);
        try {
            let fileContents: string = "";
            const { data } = await axios.get(`/files/${fileId}`);
            if (data.file) {
                const decodedData = getDecodedFileData(data.file.data);
                const fileReader = new FileReader();
                fileReader.onload = async (event) => {
                    fileContents = event.target?.result as string;
                    const users = await getUsersFromFileContent(fileContents);
                    const filteredUsers = removeDuplicates(users);
                    if (filteredUsers.length < users.length) {
                        toast.success("Some users were removed because they were duplicates");
                    }
                    setUsers(filteredUsers);
                    setFilteredUsers(filteredUsers)
                    setActiveUsers(filteredUsers);
                    setTimeout(() => {
                        setGettingFileData(false);
                    }, 500);
                };
                fileReader.readAsText(decodedData);
            } else {
                toast.error("An error occured while fetching file data from server");
                setGettingFileData(false);
            }
        } catch (error) {
            console.log("error occured while fetching from backend : ")
            console.log(error);
            setGettingFileData(false);
        }
    }

    useEffect(() => {
        if (!selectedFile) return;
        const getFileContent = async () => {
            await getFileData(selectedFile!._id);
        }
        getFileContent();
    }, [selectedFile]);

    useEffect(() => {
        if (filter === '') return setFilteredUsers(users);

        const filteredUsers = users.filter(user => {
            const { firstName, lastName, displayName, phoneNumber, id, countryCode } = user;
            const searchTerm = filter.toLowerCase();

            return (
                firstName.toLowerCase().includes(searchTerm) ||
                lastName.toLowerCase().includes(searchTerm) ||
                displayName.toLowerCase().includes(searchTerm) ||
                phoneNumber.includes(filter) ||
                id.toLowerCase().includes(searchTerm) ||
                ("+").concat(countryCode).toLowerCase().includes(searchTerm)
            );
        });
        // console.log("filtred users : ", filteredUsers);
        setFilteredUsers(filteredUsers)

    }, [filter]);

    const logout = async (forced?: boolean) => {
        setLoggingOut(true);
        const data = await whatsappLogout();
        if (data.success === "done") {
            toast.success("Logged out successfully");
            setPhoneConnected(false);
            setLoggingOut(false);
        } else {
            !forced && toast.error("An error occured while logging out! try again later");
            setLoggingOut(false);
        }
    }

    // check if the reservation has expired and then logout 
    useEffect(() => {
        if (user?.plan === "enterprise" || user?.plan === "yearlyEnterprise") return;
        if (activeReservation) {
            const interval = setInterval(async () => {
                const now = new Date();
                const endsAt = new Date(activeReservation.endsAt);
                if (now > endsAt) {
                    const reservation = await searchForActiveReservation();
                    if (reservation) {
                        toast.success("Your phone has been connected again since you have an active reservation");
                        setActiveReservation(reservation);

                    } else {
                        toast.error("Your Phone is going to be disconnected since you don't have any active reservations");
                        logout(true);
                        setActiveReservation(null);
                        clearInterval(interval);
                    }
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [activeReservation, user]);



    return {
        filter,
        setFilter,
        phoneConnected,
        activeReservation,
        searchingActiveReservation,
        logout,
        loggingOut,
        pageUsers,
        handlePageChange,
        currentPage,
        totalPages,
        rowsPerPage,
        setRowsPerPage,
        allChecked,
        checked,
        setChecked,
        setAllChecked,
        filteredUsers,
        setSelectedUsers,
        searchForActiveReservation,
        setActiveReservation,
        gettingFileData
    }
}
