import { Button } from '@/components/Button';
import UserDashboardLayout from '@/components/layouts/UserDashboardLayout';
import EmptyState from '@/components/states/EmptyState';
import LoadingState from '@/components/states/LoadingState';
import useAuth from '@/hooks/useAuth';
import useReservations from '@/hooks/useReservations';
import { showPurchaseMinutesModalAtom } from '@/store/atoms';
import { IReservation } from '@/types';
import { PlusIcon } from '@heroicons/react/20/solid';
import Head from 'next/head';
import { useRecoilState } from 'recoil';

export default function Reservations() {
    const { user } = useAuth();
    const [_, setShowModal] = useRecoilState(showPurchaseMinutesModalAtom);
    const { reservations, fetchingReservations } = useReservations();


    return (
        <UserDashboardLayout>
            <Head>
                <title>Chatmaid - Reservations</title>
            </Head>
            <main className='space-y-4 px-6'>
                <header>
                    {/* Heading */}
                    <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-white sm:flex-row sm:items-center">
                        <div className='space-y-3'>
                            <h1 className="text-xl font-semibold leading-6 text-gray-700">
                                System Usage Reservations
                            </h1>
                            <p className="text-sm leading-6 text-gray-600 max-w-2xl">
                                Here, you can reserve system usage for specific time slots, view your reservations and cancel them.
                            </p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p>Available minutes : <span className='bg-green-100 text-green-500 p-1 rounded-md text-sm font-medium'>
                                { user?.plan === "enterprise" ? "Unlimited minutes" : user?.availableTime}
                            </span></p>
                            {user?.plan !== "enterprise" && <Button
                                onClick={() => setShowModal(true)}
                                variant='solid' color='blue' className='rounded-md'>
                                <span>Get more minutes</span>
                                <PlusIcon className='w-6 h-6' />
                            </Button>}
                        </div>
                    </div>
                </header>
                {
                    user?.plan === "enterprise" ?
                        <div className='min-h-[60vh] bg-gray-100 rounded-lg mt-6 py-6 flex flex-col items-center justify-center gap-6'>
                            <h1 className='text-xl font-semibold text-gray-700'>You are on an enterprise plan, you can use the system without any restrictions.</h1>
                        </div>
                        :
                        <div className='space-y-3'>
                            <div className='space-y-2'>
                                <h2 className='text-lg font-semibold leading-6 text-gray-700'>Your Active Reservations (reservations that haven&apos;t expired)</h2>
                                {fetchingReservations && <LoadingState message='loading reservations ...' minHeight='min-h-[20vh]' />}
                                {(!fetchingReservations && reservations?.length === 0) && <EmptyState message="you don't have any upcoming reservations!" minHeight='min-h-[20vh]' />}
                                {(!fetchingReservations && reservations && reservations.length > 0) && reservations?.map(reservation => <Reservation key={reservation._id} {...reservation} />)}
                            </div>

                            <Button
                                variant='solid' color='blue' className='rounded-md'
                                href='/dashboard/reservations/new'
                            >
                                <span>Reserve a new slot</span>
                                <PlusIcon className='w-6 h-6' />
                            </Button>
                        </div>
                }
            </main>
        </UserDashboardLayout>
    )
}


const Reservation = ({ startsAt, endsAt }: IReservation) => {
    return (
        <div className='flex items-center justify-between bg-white rounded-md px-4 py-2 shadow-md'>
            <div className='flex flex-col'>
                <p className='text-gray-600'>Starts at : {startsAt}</p>
                <p className='text-gray-600'>Ends at : {endsAt}</p>
            </div>
            <div className='flex flex-col'>
                <p className='text-gray-600'>Minutes : 15</p>
                {/* <p className='text-gray-600'>Price : $1</p> */}
            </div>
        </div>
    )
}