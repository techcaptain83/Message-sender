/* eslint-disable react-hooks/exhaustive-deps */
import useAuth from '@/hooks/useAuth';
import useReservations from '@/hooks/useReservations';
import { showConnectPhoneModalAtom } from '@/store/atoms';
import { PhoneIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import ModalLayout from '../layouts/ModalLayout';
import { IReservation } from '@/types';

export default function ConnectPhone() {
    const [show, setShow] = useRecoilState(showConnectPhoneModalAtom);
    const { user } = useAuth();
    const { searchingActiveReservation, searchForActiveReservation } = useReservations();
    const [reservation, setReservation] = useState<IReservation | null>(null);
    /* 
        1.check user plan
        2.if enterprise, show qr code
        3.if premium, check if he has active reservation, if no, tell him to check reservations.
        4. if free, check if he has used his 15 minutes for testing. if yes, tell him to upgrade to premium. if no,  show qr code and tell him that he will get 15 minutes of connnection.
    */

    useEffect(() => {
        const getReservation = async () => {
            const reservation = await searchForActiveReservation();
            setReservation(reservation);
        }
        getReservation();
    }, []);

    return (
        <ModalLayout open={show} large setOpen={() => setShow(false)}>
            <div className='w-full flex flex-col items-center gap-2'>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <PhoneIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h2 className='font-medium text-xl text-gray-600'>Connect Your Phone </h2>
            </div>
            {searchingActiveReservation && <div className='w-full min-h-[10vh] bg-gray-50 rounded-lg mt-6 py-6 flex flex-col items-center justify-center gap-6'>
                {/* loading spinner */}
                <div
                    className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"
                />
                <h1 className='text-xl font-semibold text-gray-700'>
                    Checking if you have an active reservation...
                </h1>
            </div>}

        </ModalLayout>
    )
}
