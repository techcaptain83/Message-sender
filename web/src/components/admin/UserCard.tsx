import useUsers from '@/hooks/useUsers';
import { IAuthUser } from '@/types'
import { PREMIUM_PRICE } from '@/utils/constants'
import React from 'react'
import Loader from '../Loader';
import { useRecoilState } from 'recoil';
import { showAddCredentialsModalAtom } from '@/store/atoms';

export default function AdminUserCard({ country, firstName, lastName, email, referredBy, createdAt, datePaid, updatedAt, _id, manual, verified, plan, api, ...user }: IAuthUser) {
    const { isUpgrading, accountBeingUpgraded, manualUpgrade, deleteAccount, deletingUser } = useUsers();
    const [_, setShowAddCredentials] = useRecoilState(showAddCredentialsModalAtom)
    return (
        <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {country}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{firstName}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{lastName}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{email}
                {verified ? <span className='p-1 rounded-xl ml-2 bg-green-200'>Verified</span> : <span className='p-1 rounded-xl ml-2 bg-red-200'>Not Verified</span>}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(createdAt).toLocaleString()}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{referredBy ? referredBy : "No One"}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{["pro", "enterprise"].includes(plan) ? manual ? "Cash" : "Stripe" : "None"}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{["pro", "enterprise"].includes(plan) ? manual ? <span className='bg-gray-50 text-sm text-gray-500 rounded-lg p-2'>
                Manual
            </span> : `$${PREMIUM_PRICE}` : "$0"}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{["pro", "enterprise"].includes(plan) ? datePaid ? new Date(datePaid).toLocaleString() : new Date(updatedAt).toLocaleString() : "Not Paid"}</td>
            {/* delete */}
            <td>
                <button
                    disabled={deletingUser?.deleting && deletingUser.userId === _id}
                    onClick={() => deleteAccount(_id)}
                    type="button"
                    className="inline-flex  items-center rounded-md bg-red-600 px-3 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                    {(deletingUser && deletingUser.userId === _id) ? <Loader /> : "Delete"}
                </button>
            </td>
            {plan === "free" && <td className='pl-4'>
                <div className='flex gap-2'>
                    <button
                        disabled={isUpgrading && (accountBeingUpgraded?._id !== _id && accountBeingUpgraded?.plan === "pro")}
                        onClick={() => manualUpgrade(_id, "pro")}
                        type="button"
                        className="inline-flex shrink-0  h-max items-center rounded-md bg-blue-600 px-3 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        {(isUpgrading && (accountBeingUpgraded?._id === _id && accountBeingUpgraded.plan === "pro")) ? <Loader /> : "Manual Release PV"}
                    </button>
                    <button
                        disabled={isUpgrading && (accountBeingUpgraded?._id !== _id && accountBeingUpgraded?.plan === "enterprise")}
                        onClick={() => manualUpgrade(_id, "enterprise")}
                        type="button"
                        className="inline-flex shrink-0  items-center rounded-md bg-blue-600 px-3 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        {(isUpgrading && (accountBeingUpgraded?._id === _id && accountBeingUpgraded.plan === "enterprise")) ? <Loader /> : "Manual Release EV"}
                    </button>
                </div>
            </td>}
            {
                plan === "enterprise" && <td className='pl-4'>
                    <button
                        onClick={() => setShowAddCredentials({
                            show: true,
                            user: {
                                email, _id
                            }
                        })}
                        type="button"
                        className="inline-flex shrink-0  items-center rounded-md bg-blue-600 px-3 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        {(isUpgrading && accountBeingUpgraded?._id === _id) ? <Loader /> : api ? "Edit Api credentials " : "Add Api credentials"}
                    </button>
                </td>
            }
        </tr >
    )
}
