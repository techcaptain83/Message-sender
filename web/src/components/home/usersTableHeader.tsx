import React from 'react'

export default function UsersTableHeader() {
    return (
        <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3 flex gap-2">

                <span>ID</span>
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                First Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Last Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Display Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Country Code
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Phone Number
            </th>
        </tr>
    )
}
