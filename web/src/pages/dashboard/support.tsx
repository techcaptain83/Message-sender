import { Button } from '@/components/Button'
import UserDashboardLayout from '@/components/layouts/UserDashboardLayout'
import EmptyState from '@/components/states/EmptyState'
import LoadingState from '@/components/states/LoadingState'
import TicketsTable from '@/components/tickets/ticketsTable'
import useTickets from '@/hooks/useTickets'
import { showCreateTicketModalAtom } from '@/store/atoms'
import { PlusIcon } from '@heroicons/react/20/solid'
import Head from 'next/head'
import React from 'react'
import { useRecoilState } from 'recoil'

export default function Suport() {
    const [_, setShowModal] = useRecoilState(showCreateTicketModalAtom);
    const { userTickets, userTicketsLoading } = useTickets();
    return (
        <UserDashboardLayout>
            <Head>
                <title>Chatmaid | Support</title>
            </Head>
            <main className='space-y-4'>
                <header>
                    {/* Heading */}
                    <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-white sm:flex-row sm:items-center px-6">
                        <div className='space-y-3'>
                            <h1 className="text-xl font-semibold leading-6 text-gray-700">
                                Support
                            </h1>
                            <p className="text-sm leading-6 text-gray-600 max-w-2xl">
                                We are here to help you. If you have any questions or issues, please feel free to contact us.We will get back to you as soon as possible.
                            </p>
                        </div>
                        <Button
                            onClick={() => setShowModal(true)}
                            variant='solid' color='blue' className='rounded-md'>
                            <span>Create a Ticket</span>
                            <PlusIcon className='w-6 h-6' />
                        </Button>
                    </div>
                </header>
                {(userTickets && userTickets.length > 0) && (<TicketsTable tickets={userTickets} />)}
                {userTickets?.length === 0 && <EmptyState message="You haven't submitted any tickets yet!" />}
                {userTicketsLoading && <LoadingState message="Loading your tickets ..." />}
            </main>
        </UserDashboardLayout>
    )
}