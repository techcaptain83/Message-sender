import { Button } from '@/components/Button';
import EmptyState from '@/components/states/EmptyState';
import UserDashboardLayout from '@/components/layouts/UserDashboardLayout'
import LoadingState from '@/components/states/LoadingState';
import useDeposits from '@/hooks/useDeposits';
import { showNewDepositModalAtom } from '@/store/atoms';
import { PlusIcon } from '@heroicons/react/20/solid';
import Head from 'next/head';
import React from 'react'
import { useRecoilState } from 'recoil';
import DepositsTable from '@/components/deposits/DepositsTable';
import Loader from '@/components/Loader';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);
export default function Deposits() {
    const { userDeposits, fetchingUserDeposits } = useDeposits();
    const [_, setShowModal] = useRecoilState(showNewDepositModalAtom);

    return (
        <UserDashboardLayout>
            <Head>
                <title>Chatmaid - Your  Deposits</title>
            </Head>
            <main className='space-y-4 px-6'>
                <header>
                    {/* Heading */}
                    <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-white sm:flex-row sm:items-center">
                        <div className='space-y-3'>
                            <h1 className="text-xl font-semibold leading-6 text-gray-700">
                                Deposit History
                            </h1>
                            <p className="text-sm leading-6 text-gray-600 max-w-2xl">
                                Here, you will find history of the deposits you&apos;ve made to your account.
                            </p>
                        </div>
                        <Button
                            onClick={() => setShowModal(true)}
                            variant='solid' color='blue'
                            className='rounded-md w-max flex items-center gap-2'
                        >
                            <PlusIcon className='shrink-0 h-6 w-6' />
                            <span className='shrink-0'>New Deposit</span>
                        </Button>
                    </div>
                </header>
                {(userDeposits && userDeposits.length > 0) && (<DepositsTable deposits={userDeposits} />)}
                {userDeposits?.length === 0 && <EmptyState message="You haven't deposited any money to your account yet!" />}
                {fetchingUserDeposits && <LoadingState message="Loading your deposits ..." />}
            </main>

        </UserDashboardLayout>
    )
}
