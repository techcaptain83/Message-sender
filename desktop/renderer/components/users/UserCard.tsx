import { accountToDeleteAtom, accountToSuspendAtom, showDeletAccountAtom, showSuspendAccountAtom } from '@/store/atoms';
import { IPerson } from '@/types';
import { constructName } from '@/utils';
import React from 'react'
import { useRecoilState } from 'recoil';


interface UserCardProps {
    name: string;
    email: string;
    joinedAt: string;
}

export default function UserCard({ firstName, lastName, email, joinedAt }: IPerson) {
    const [showDeleteAccount, setShowDeleteAccount] = useRecoilState(showDeletAccountAtom);
    const [showSuspendAccount, setShowSuspendAccount] = useRecoilState(showSuspendAccountAtom);
    const [accountToSuspend, setAccountToSuspend] = useRecoilState(accountToSuspendAtom);
    const [accountToDelete, setAccountToDelete] = useRecoilState(accountToDeleteAtom);



    return (
        <tr className="even:bg-gray-50">
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                {constructName(firstName, lastName)}
            </td>

            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{email}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{joinedAt}</td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                <button
                    onClick={() => {
                        setAccountToSuspend(constructName(firstName, lastName))
                        setShowSuspendAccount(true)
                    }}
                    className="text-orange-400 hover:text-orange-500">
                    Suspend Account<span className="sr-only">, {firstName + " " + lastName}</span>
                </button>
            </td>
            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                <button
                    onClick={() => {
                        setAccountToDelete(constructName(firstName, lastName))
                        setShowDeleteAccount(true)
                    }}
                    className="text-red-600 hover:text-red-700">
                    Delete Account<span className="sr-only">, {constructName(firstName, lastName)}</span>
                </button>
            </td>
        </tr>
    )
}
