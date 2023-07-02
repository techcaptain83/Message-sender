import { IUser } from '@/types'
import React from 'react'

const UserCard = ({ id, displayName, firstName, lastName, phoneNumber, countryCode }: IUser) => {
    return (
        <tr className="even:bg-gray-50">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 flex items-center gap-4 ">
                <div className="flex items-center ">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <span>
                    #{id}
                </span>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{firstName}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{lastName}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{displayName}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-medium pl-6">+{countryCode}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{phoneNumber}</td>
        </tr>
    )
}

export default UserCard