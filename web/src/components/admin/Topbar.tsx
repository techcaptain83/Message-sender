import useAuth from '@/hooks/useAuth'
import { BuildingOfficeIcon, CheckCircleIcon } from '@heroicons/react/20/solid';
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi';

export default function Topbar() {
    const { user, logout } = useAuth();
    return (
        <div className="bg-white shadow h-[10vh] fixed top-0 left-0 w-full">
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
                                        Hello, {user?.firstName + " " + user?.lastName}
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
    )
}
