import useAuth from '@/hooks/useAuth'
import { ITicket } from '@/types'
import TicketCard from './TicketCard'

interface Props {
    tickets: ITicket[]
}
export default function TicketsTable({ tickets }: Props) {
    const { user } = useAuth();
    return (
        <div className="mt-4 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                    Title
                                </th>

                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    body
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Response
                                </th>
                                {user?.isAdmin && <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Opened By
                                </th>}
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    created at
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {tickets.map((ticket, index) => (
                                <TicketCard key={index} {...ticket} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}