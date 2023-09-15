import axios from "@/axios.config";
import { IAuthUser, IReservation } from "@/types";
import { UIDHASH } from "@/utils/constants";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import useAuth from "./useAuth";
import { useRecoilState } from "recoil";
import { showCreateReservationModalAtom } from "@/store/atoms";


export default function useReservations() {
    const { user } = useAuth();
    const [searchingActiveReservation, setSearchingActiveReservation] = useState(false);
    const [gettingReservationsForHour, setGettingReservationsForHour] = useState(false);
    const [creatingReservation, setCreatingReservation] = useState(false)
    const [_, setShowCreateReservation] = useRecoilState(showCreateReservationModalAtom);

    const localstorageUser = typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem(UIDHASH) || "{}") as IAuthUser : {} as IAuthUser;

    const { data: reservations, error, mutate } = useSWR(`/reservations/user/${user ? user._id : localstorageUser._id}?active=true`, async (url: string) => {
        try {
            const { data } = await axios.get(url);
            return data.reservations as IReservation[];
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! try again later.");
            return [];
        }
    });

    const searchForActiveReservation = async () => {
        setSearchingActiveReservation(true);
        try {
            const { data } = await axios.get(`/reservations/active/${user ? user._id : localstorageUser._id}`);
            if (data.notFound) {
                return null;
            }
            return data.reservation as IReservation;

        } catch (error) {
            console.log(error);
            return null;
        }
        finally {
            setSearchingActiveReservation(false);
        }
    }


    const getReservationsForHour = async (date: string, hour: string): Promise<IReservation[] | null> => {
        try {
            setGettingReservationsForHour(true);
            const { data } = await axios.get(`/reservations/hour/${date}/${hour}`);
            return data.reservations as IReservation[];
        } catch (error) {
            console.log(error);
            toast.error("something went wrong!");
            return null;
        } finally {
            setGettingReservationsForHour(false);
        }
    }

    const createReservation = async (startsAt: Date, endsAt: Date) => {
        setCreatingReservation(true);
        try {
            const { data } = await axios.post('/reservations', {
                startsAt, endsAt, userId: user ? user._id : localstorageUser._id
            });
            if (data.success) {
                mutate();
                toast.success("reservation created successfully!");
                setShowCreateReservation(false);
            } else {
                console.log(data);
                toast.error("something went wrong while creating reservation!");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong while creating reservation!");
        } finally {
            setCreatingReservation(false);
        }
    }

    return {
        reservations,
        fetchingReservations: !reservations && !error,
        searchingActiveReservation,
        searchForActiveReservation,
        gettingReservationsForHour,
        getReservationsForHour,
        createReservation,
        creatingReservation
    }

}