import { IAuthUser } from '@/types'
import { PREMIUM_PRICE } from '@/utils/constants'
import React from 'react'

export default function AdminUserCard({ country, firstName, lastName, email, isPro, referredBy, createdAt, datePaid, updatedAt }: IAuthUser) {
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
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{isPro ? "Paypal" : "None"}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{isPro ? `$${PREMIUM_PRICE}` : "$0"}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{isPro ? datePaid ? new Date(datePaid).toLocaleString() : new Date(updatedAt).toLocaleString() : "Not Paid"}</td>
        </tr>
    )
}
