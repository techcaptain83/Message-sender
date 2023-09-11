import useDeposits from '@/hooks/useDeposits'
import { showCreateReservationModalAtom } from '@/store/atoms'
import { FormEvent, useState } from 'react'
import { BiMoney } from 'react-icons/bi'
import { useRecoilState } from 'recoil'
import { Button } from '../Button'
import { SelectField } from '../Fields'
import ModalLayout from '../layouts/ModalLayout'

export default function CreateReservation() {
    const [showModal, setShowModal] = useRecoilState(showCreateReservationModalAtom);
    const { createDeposit, creatingDeposit } = useDeposits();
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [timeRange, setTimeRange] = useState('0:00 AM - 1:00 AM');


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if (amount < 1) {
        //     toast.error("Amount must be greater than $1");
        //     return;
        // }
        // createDeposit(amount);
    }
    return (
        <ModalLayout open={showModal} setOpen={() => setShowModal(false)} >
            <div className='w-full flex flex-col items-center gap-2'>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <BiMoney className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h2 className='font-medium text-xl text-gray-600'> Reserve one or more time slots </h2>
            </div>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="mt-10 grid grid-cols-1  gap-x-6 gap-y-8 sm:grid-cols-2"
            >
                <SelectField
                    className="col-span-full"
                    label="Select Date"
                    id="date"
                    name="date"
                    value={date}
                    required
                    onChange={(e) => setDate(e.target.value)}
                >
                    {[...Array(30)].map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() + i);
                        return <option key={i} value={date.toISOString().split('T')[0]}>{date.toISOString().split('T')[0]}</option>
                    })}
                </SelectField>

                <SelectField
                    className="col-span-full"
                    label="Select Time Range"
                    id="timeRange"
                    name="timeRange"
                    value={timeRange}
                    required
                >
                    {[...Array(24)].map((_, i) => {
                        const range = i < 12 ? `${i}:00 AM - ${i + 1}:00 AM` : `${i - 12}:00 PM - ${(i + 1) - 12}:00 PM`;
                        return <option key={i} value={range}>{range}</option>
                    })}
                    onChange={(e) => setTimeRange(e.target.value)}
                </SelectField>

                <div className='col-span-full '>
                    <p className="mb-3 block text-sm font-medium text-gray-700"> Available Time Slots</p>
                    <div className="grid grid-cols-4 gap-4 w-full ">
                        {[...Array(4)].map((_, i) => {
                            const timeSlot = `${i * 15} - ${(i + 1) * 15} minutes`;
                            return (
                                <div key={i} className="flex justify-between items-center border border-gray-200 p-2 text-sm rounded">
                                    <span>{timeSlot}</span>
                                    <button className="bg-blue-500 text-white rounded-full p-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    
                </div>



                <div className="col-span-full">
                    <Button
                        disabled={creatingDeposit}
                        type="submit"
                        variant="solid"
                        color="blue"
                        className="w-full"
                    >
                        {creatingDeposit ?
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-50" /> :
                            <span>
                                Proceed <span aria-hidden="true">&rarr;</span>
                            </span>}
                    </Button>
                </div>
            </form>
        </ModalLayout>
    )
}
