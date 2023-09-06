import { showAnswerTicketModalAtom } from '@/store/atoms'
import { BiSupport } from 'react-icons/bi'
import { useRecoilState } from 'recoil'
import { Button } from '../Button'
import { TextAreaField } from '../Fields'
import ModalLayout from '../layouts/ModalLayout'
import { useState } from 'react'
import useTickets from '@/hooks/useTickets'
import Loader from '../Loader'

export default function AnswerTicket() {
    const [showModal, setShowModal] = useRecoilState(showAnswerTicketModalAtom);
    const [response, setResponse] = useState(showModal?.ticket.response || '');
    const { submitResponse, submittingResponse } = useTickets();

    return (
        <ModalLayout open={showModal!.show} setOpen={() => setShowModal(null)} >
            <div className='w-full flex flex-col items-center gap-2'>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <BiSupport className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h2 className='font-medium text-xl text-gray-600'>Answer Ticket </h2>
            </div>
            <div
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 "
            >
                <div>
                    <p className="mb-3 block text-sm font-medium text-gray-700">Ticket Description</p>
                    <p className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900  sm:text-sm min-h-[10vh]">{showModal?.ticket.body}</p>
                </div>
                <TextAreaField
                    id="response"
                    label="Response"
                    name="response"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Enter your response here..."
                />
                <div className="col-span-full">
                    <Button
                        onClick={() => submitResponse(showModal!.ticket.id, response)}
                        type="submit"
                        variant="solid"
                        color="blue"
                        className="w-full"
                    >
                        {submittingResponse ? <Loader /> : "Submit Answer"}
                    </Button>
                </div>
            </div>
        </ModalLayout>
    )
}