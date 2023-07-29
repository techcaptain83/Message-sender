import useUsers from '@/hooks/useUsers';
import { IAuthUser } from '@/types'
import { PREMIUM_PRICE } from '@/utils/constants'
import React from 'react'
import Loader from '../Loader';

export default function AdminUserCard({ country, firstName, lastName, email, isPro, referredBy, createdAt, datePaid, updatedAt, _id, manual }: IAuthUser) {
    const { isUpgrading, accountBeingUpgraded, releasePremiumVersion } = useUsers();
    return (
        <tr>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                {country}
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{firstName}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{lastName}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{email}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{new Date(createdAt).toLocaleString()}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{referredBy ? referredBy : "No One"}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{isPro ? manual ? "Cash" : "Paypal" : "None"}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{isPro ? manual ? <span className='bg-gray-50 text-sm text-gray-500 rounded-lg p-2'>
                Manual
            </span> : `$${PREMIUM_PRICE}` : "$0"}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{isPro ? datePaid ? new Date(datePaid).toLocaleString() : new Date(updatedAt).toLocaleString() : "Not Paid"}</td>
            {!isPro && <td>
                <button
                    disabled={isUpgrading && accountBeingUpgraded !== _id}
                    onClick={() => releasePremiumVersion(_id)}
                    type="button"
                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                    {(isUpgrading && accountBeingUpgraded === _id) ? <Loader /> : "Manual Release PV"}
                </button>
            </td>}
        </tr>
    )
}
