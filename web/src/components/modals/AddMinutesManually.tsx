import { showAddMinutesManuallyAtom } from '@/store/atoms'
import { PhoneIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Button } from '../Button'
import { TextField } from '../Fields'
import ModalLayout from '../layouts/ModalLayout'
import useUsers from '@/hooks/useUsers'

export default function AddMinutesManually() {
    const [showModal, setShowModal] = useRecoilState(showAddMinutesManuallyAtom);
    const [minutes, setMinutes] = useState(1);
    const { addMinutesManually, addingMinutesManually } = useUsers();
    const showAddMinutes = useRecoilValue(showAddMinutesManuallyAtom);

    return (
        <ModalLayout open={showModal?.show ? true : false} setOpen={() => setShowModal(null)} >
            <div className='w-full flex flex-col items-center gap-2'>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <PhoneIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h2 className='font-medium text-xl text-gray-600'>Add Minutes to {showAddMinutes?.email} </h2>

            </div>
            <div
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"
            >
                <TextField
                    className="col-span-full"
                    label="Enter Number of minutes"
                    id="minutes"
                    value={minutes}
                    name="minutes"
                    type="number"
                    min={1}
                    onChange={(e) => setMinutes(parseInt(e.target.value))}
                    required
                />
                <div className="col-span-full flex items-center space-x-2">
                    <Button
                        disabled={addingMinutesManually}
                        type="button"
                        variant="solid"
                        color="blue"
                        className="w-full"
                        onClick={() => addMinutesManually(showAddMinutes!.userId, minutes)}

                    >
                        {addingMinutesManually ?
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-50" /> :
                            <span>
                                Add Minutes
                            </span>}
                    </Button>
                </div>
            </div>
        </ModalLayout >
    )
}
