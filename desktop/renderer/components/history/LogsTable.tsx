import { ILog, ILogContact } from '@/types';
import React from 'react'
import LogCard from './LogCard';

export default function LogsTable({contacts}) {
    return (
        <div className='rounded-md h-[75vh] overflow-y-scroll mt-8'>
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>

                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            First Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Last Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Phone Number
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white">
                    {contacts.length > 0 && contacts.map((contact: ILogContact) => (
                        <LogCard key={contact.phoneNumber} {...contact} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
