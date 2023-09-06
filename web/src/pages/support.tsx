import { Button } from '@/components/Button'
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
        <>
            <Head>
                <title>Santsuono | Support</title>
            </Head>
            <main className='space-y-4'>
                <header>
                    {/* Heading */}
                    <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-white sm:flex-row sm:items-center">
                        <div>
                            <div className="flex items-center gap-x-3">
                                <div className="flex-none rounded-full bg-blue-600/10 p-1 text-blue-600">
                                    <div className="h-2 w-2 rounded-full bg-current" />
                                </div>
                                <h1 className="flex gap-x-3 text-base leading-7">
                                    <span className="font-semibold text-gray-800">Santsuono</span>
                                    <span className="text-gray-600">/</span>
                                    <span className="font-semibold text-gray-800">Your Dashboard</span>
                                    <span className="text-gray-600">/</span>
                                    <span className="font-semibold text-gray-800">Support</span>
                                </h1>
                            </div>
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
        </>
    )
}