/* eslint-disable react-hooks/exhaustive-deps */

import StatsCard from '@/components/StatsCard'
import AdminUsersTable from '@/components/admin/UsersTable'
import EmptyState from '@/components/states/EmptyState'
import LoadingState from '@/components/states/LoadingState'
import useAuth from '@/hooks/useAuth'
import useUsers from '@/hooks/useUsers'
import { IAuthUser } from '@/types'
import { ENTERPRISE_PRICE, PREMIUM_PRICE } from '@/utils/constants'
import {
    BuildingOfficeIcon,
    CheckCircleIcon
} from '@heroicons/react/20/solid'
import {
    CheckBadgeIcon,
    ScaleIcon, UserGroupIcon
} from '@heroicons/react/24/outline'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { CgProfile } from "react-icons/cg"
import { FiLogOut } from "react-icons/fi"



export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const { users, isLoading } = useUsers();

    const calculateAccountBalance = (users: IAuthUser[]) => {
        let balance = 0;
        users.forEach(user => {
            if (user.plan === "pro") {
                balance += PREMIUM_PRICE;
            } else if (user.plan === "enterprise") {
                balance += ENTERPRISE_PRICE;
            }
        });
        return balance.toFixed(2);
    }



    if (!user?.isAdmin) return <div>403 - Forbidden</div>
    return (
        <>
            <Head>
                <title>Chatmaid - Admin Dashboard</title>
            </Head>
            <div className="min-h-full">
                <div className="flex flex-1 flex-col">
                    <main className="flex-1 pb-8">
                        {/* Page header */}
                        <div className="bg-white shadow">
                            <div className="px-4 sm:px-6 lg:mx-auto lg:px-8">
                                <div className="py-4 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                                    <div className="min-w-0 flex-1">
                                        {/* Profile */}
                                        <div className="flex items-center">
                                            <div className='rounded-full p-2  bg-blue-500 hidden sm:block'>
                                                <CgProfile className='text-gray-100 w-8 h-8' />
                                            </div>
                                            <div>
                                                <div className="flex items-center">
                                                    <div className='rounded-full p-2  bg-blue-500 sm:hidden block'>
                                                        <CgProfile className='text-gray-100 w-7 h-7' />
                                                    </div>
                                                    <h1 className="ml-3 text-lg font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                                                        Hello, {user.firstName + " " + user.lastName}
                                                    </h1>
                                                </div>
                                                <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                                    <dt className="sr-only">Company</dt>
                                                    <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                                                        <BuildingOfficeIcon
                                                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                                            aria-hidden="true"
                                                        />
                                                        Chatmaid, Inc.
                                                    </dd>
                                                    <dt className="sr-only">Account status</dt>
                                                    <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                                                        <CheckCircleIcon
                                                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                                                            aria-hidden="true"
                                                        />
                                                        Site Admin
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex space-x-3 md:ml-4 md:mt-0">
                                        <button
                                            onClick={logout}
                                            type="button"
                                            className="inline-flex gap-2 items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                        >
                                            <span>Logout</span>
                                            <FiLogOut />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                                <h2 className="text-lg font-medium leading-6 text-gray-900">Overview</h2>
                                <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                                    <StatsCard name='Account Balance' value={`$${users ? calculateAccountBalance(users) : undefined}`} Icon={ScaleIcon} />
                                    <StatsCard name='Total Users' value={users?.length} Icon={UserGroupIcon} />
                                    <StatsCard name='Premium Users' value={users?.filter(user => user.plan === "pro").length} Icon={CheckBadgeIcon} />
                                    <StatsCard name='Enterprise Users' value={users?.filter(user => user.plan === "enterprise").length} Icon={CheckBadgeIcon} />
                                    <StatsCard name='Free Trial Users' value={users?.filter(user => user.plan === "free").length} Icon={CheckBadgeIcon} />
                                </div>
                            </div>
                            {isLoading && <LoadingState message='Loading Users...' />}
                            {users?.length === 0 && !isLoading && <EmptyState message="we don't have any users yet!" />}
                            {(users && users.length > 0) && <AdminUsersTable users={users} />}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
