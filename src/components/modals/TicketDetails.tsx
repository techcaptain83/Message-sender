import { showTicketDetailsModalAtom, ticketDetailsAtom } from '@/store/atoms'
import { BiSupport } from 'react-icons/bi'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Button } from '../Button'
import ModalLayout from '../layouts/ModalLayout'

export default function TicketDetails() {
    const [showModal, setShowModal] = useRecoilState(showTicketDetailsModalAtom);
    const ticketDetails = useRecoilValue(ticketDetailsAtom);

    return (
        <ModalLayout open={showModal} setOpen={() => setShowModal(false)} >
            <div className='w-full flex flex-col items-center gap-2'>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <BiSupport className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h2 className='font-medium text-xl text-gray-600'>View Ticket </h2>
            </div>
            <div
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 "
            >
                <div>
                    <p className="mb-3 block text-sm font-medium text-gray-700">Title</p>
                    <p className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900  sm:text-sm">{ticketDetails?.title}</p>
                </div>
                <div>
                    <p className="mb-3 block text-sm font-medium text-gray-700">Body</p>
                    <p className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900  sm:text-sm min-h-[10vh]">{ticketDetails?.body}</p>
                </div>
                <div>
                    <p className="mb-3 block text-sm font-medium text-gray-700">Response</p>
                    <p className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900  sm:text-sm min-h-[10vh]">{ticketDetails?.response ? ticketDetails.response : "Not Yet Provided!"}</p>
                </div>

                <div className="col-span-full">
                    <Button
                        onClick={() => setShowModal(false)}
                        type="submit"
                        variant="solid"
                        color="blue"
                        className="w-full"
                    >
                        Close Modal
                    </Button>
                </div>
            </div>
        </ModalLayout>
    )
}