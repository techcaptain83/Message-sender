import { ILogContact } from '@/types'

export default function LogCard({ sent, firstName, lastName, phoneNumber }: ILogContact) {

    return (
        <tr className="even:bg-gray-100">
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{firstName}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{lastName}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{phoneNumber}</td>
            <td className={`whitespace-nowrap px-3 py-4 text-sm  font-medium 
                `}>
                <p className={`py-1 border px-4 w-fit rounded-lg ${sent ? "border-green-500 text-green-400" : "border-red-400 text-red-400"}`}>
                    {sent ? 'Sent' : 'Failed'}
                </p>
            </td>
        </tr>
    )
}
