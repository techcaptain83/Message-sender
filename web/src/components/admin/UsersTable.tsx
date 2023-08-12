/* eslint-disable react-hooks/exhaustive-deps */
import { IAuthUser } from "@/types"
import AdminUserCard from "./UserCard"
import { useEffect, useState } from "react";
import Pagination from "../pagination";
import { BiDownload } from "react-icons/bi";

export default function AdminUsersTable({ users }: { users: IAuthUser[] }) {
    const [pageUsers, setPageUsers] = useState<IAuthUser[]>([]);
    const [allUsers, setAllUsers] = useState<IAuthUser[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(8);
    const [pageStart, setPageStart] = useState(0);
    const [pageEnd, setPageEnd] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const handlePageChange = ({ selected }: { selected: number }) => {
        if (selected < 0 || selected > totalPages - 1) return;
        if (selected === page) return;
        setPage(selected);
        setPageUsers(users.slice(pageStart, pageEnd));
    }

    useEffect(() => {
        setPageUsers(allUsers.slice(pageStart, pageEnd));
        setTotalPages(Math.ceil(allUsers.length / perPage));
    }, [page, perPage, allUsers]);


    useEffect(() => {
        setAllUsers(users);
    }, [users]);

    useEffect(() => {
        setPageStart(page * perPage);
        setPageEnd(page * perPage + perPage);
    }, [page, perPage]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const filteredUsers = users.filter((user) => {
            return user.firstName.toLowerCase().includes(e.target.value.toLowerCase()) || user.lastName.toLowerCase().includes(e.target.value.toLowerCase()) || user.email.toLowerCase().includes(e.target.value.toLowerCase()) || user.country.toLowerCase().includes(e.target.value.toLowerCase()) || user.referredBy.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setAllUsers(filteredUsers);
    }

    const exportUsers = () => {
        const header = "First Name,Last Name,Email,Country,Referred By,Plan,Date Paid,Date Joined\n";
        const csv = users.map((user) => {
            return `${user.firstName},${user.lastName},${user.email},${user.country},${user.referredBy},${user.isPro ? "Premium" : "Free"},${user.datePaid ? user.datePaid : "Not Paid yet!"},${new Date(user.createdAt).toLocaleString()}\n`;
        }).join('');
        const blob = new Blob([header, csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'users.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }


    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-6">
            <div className="sm:flex sm:items-center j">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                    {/* <p className="mt-2 text-sm text-gray-700">
                        A list of all the users using chatmaid including their name, location, email and other properties.
                    </p> */}
                </div>


                <div className="mt-4 sm:ml-16 sm:mt-0 flex sm:flex-row flex-col gap-8  w-full sm:justify-end">
                    <div className="flex gap-2 rounded-md shadow-sm md:w-2/3 w-full">
                        <input
                            type="text"
                            name="search"
                            value={search}
                            onChange={(e) => handleSearch(e)}
                            id="search"
                            className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Search by firstname,lastname, country or email..."
                        />
                        {/* <button
                            type="button"
                            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Search
                        </button> */}
                    </div>
                    <button
                        onClick={exportUsers}
                        type="button"
                        className="flex gap-2  rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        <span>Export Users</span>
                        <BiDownload className="w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Country
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            First Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Last Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Email
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Joined At
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Referred By
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Form of Payment
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Amount Paid
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Date of Payment
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {pageUsers.map((user) => (<AdminUserCard key={user._id} {...user} />))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Pagination handlePageChange={handlePageChange} currentPage={page} totalPages={totalPages} rowsPerPage={perPage} setRowsPerPage={setPerPage}
                options={[8, 16, 32, 64]}
            />
        </div>
    )
}
