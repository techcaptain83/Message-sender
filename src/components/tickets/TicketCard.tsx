import useAuth from '@/hooks/useAuth';
import useTickets from '@/hooks/useTickets';
import { showAnswerTicketModalAtom, showTicketDetailsModalAtom, ticketDetailsAtom } from '@/store/atoms';
import { ITicket } from '@/types';
import { constructName } from '@/utils';
import { useRecoilState } from 'recoil';
import Loader from '../Loader';


export default function TicketCard({ _id, title, body, response, createdAt, createdBy, status }: ITicket) {
    const { user } = useAuth();
    const { closeTicket, closingTicket } = useTickets();
    const [_show, setShowTicketDetails] = useRecoilState(showTicketDetailsModalAtom);
    const [_, setTicketDetails] = useRecoilState(ticketDetailsAtom);
    const [_s, setShowAnswerTicket] = useRecoilState(showAnswerTicketModalAtom);
    return (
        <tr className="even:bg-gray-50">
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">{title}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800 max-w-sm truncate">{body}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800 max-w-sm truncate">{response ? response : "Not Provided yet!"}</td>
            {user?.isAdmin && <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-800 sm:pl-3">
                {constructName(createdBy.firstName, createdBy.lastName)}
            </td>}
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">{new Date(createdAt).toLocaleString()}</td>

            <td className="relative whitespace-nowrap py-4 pr-4 text-right text-sm font-medium sm:pr-3 space-x-3">
                <button
                    onClick={() => {
                        setTicketDetails({ title, body, response })
                        setShowTicketDetails(true)
                    }}
                    className="text-blue-600 bg-blue-100 px-4 py-1 rounded-md hover:text-white hover:bg-blue-500">
                    View
                </button>
                {user?.isAdmin && <button
                    onClick={() => {
                        setShowAnswerTicket({
                            ticket: { id: _id, body: body, response: response },
                            show: true
                        });
                    }}
                    className="text-blue-600 bg-blue-100 px-4 py-1 rounded-md hover:text-white hover:bg-blue-500">
                    {response ? "Edit Answer" : "Answer"}
                </button>}
                {<button
                    disabled={closingTicket.closing && closingTicket.ticketId === _id}
                    onClick={() => closeTicket(_id, status === "closed" ? "reopen" : "close")}
                    className="text-red-600 bg-red-100 px-4 py-1 rounded-md hover:text-white hover:bg-red-500">
                    {(closingTicket.closing && closingTicket.ticketId === _id) ? <Loader /> : status === "closed" ? "Reopen" : "Close"}
                </button>}
            </td>
        </tr >
    )
}