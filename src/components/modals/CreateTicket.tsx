import useTickets from '@/hooks/useTickets'
import { showCreateTicketModalAtom } from '@/store/atoms'
import { PlusIcon } from '@heroicons/react/20/solid'
import { FormEvent, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Button } from '../Button'
import { TextAreaField, TextField } from '../Fields'
import Loader from '../Loader'
import ModalLayout from '../layouts/ModalLayout'

export default function CreateTicket() {
    const [showModal, setShowModal] = useRecoilState(showCreateTicketModalAtom);
    const { creatingTicket, createTicket } = useTickets();

    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createTicket(formData.title, formData.body);
    }
    return (
        <ModalLayout open={showModal} setOpen={() => setShowModal(false)} >
            <div className='w-full flex flex-col items-center gap-2'>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <PlusIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h2 className='font-medium text-xl text-gray-600'>Create a ticket </h2>
            </div>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 "
            >
                <TextField
                    label="Ticket Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    id="title"
                    name="title"
                    type="text"
                    required
                />
                <TextAreaField
                    label="Ticket Description"
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    id="last_name"
                    name="last_name"
                    required
                />

                <div className="col-span-full">
                    <Button
                        disabled={creatingTicket}
                        type="submit"
                        variant="solid"
                        color="blue"
                        className="w-full"
                    >
                        {creatingTicket ?
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-50" /> :
                            <span>
                                {creatingTicket ? <Loader /> : "Submit Ticket "}
                            </span>}
                    </Button>
                </div>
            </form>
        </ModalLayout>
    )
}