/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/Button'
import Loader from '@/components/Loader'
import UserDashboardLayout from '@/components/layouts/UserDashboardLayout'
import EmptyState from '@/components/states/EmptyState'
import LoadingState from '@/components/states/LoadingState'
import useCards from '@/hooks/useCards'
import { showCreateCardModalAtom } from '@/store/atoms'
import { ICard } from '@/types'
import { PlusIcon } from '@heroicons/react/20/solid'
import Head from 'next/head'
import React from 'react'
import { FiDelete } from 'react-icons/fi'
import { useRecoilState } from 'recoil'

export default function Cards() {
    const [_show, setShowModal] = useRecoilState(showCreateCardModalAtom);
    const { fetchingCards, cards, deletingCard, deleteCard } = useCards();

    return (
        <UserDashboardLayout>
            <Head>
                <title>Chatmaid | your cards</title>
            </Head>
            <main className='space-y-4 px-6'>
                <header>
                    {/* Heading */}
                    <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-white sm:flex-row sm:items-center">
                        <div className='space-y-3'>
                            <h1 className="text-xl font-semibold leading-6 text-gray-700">
                                Your Cards
                            </h1>
                            <p className="text-sm leading-6 text-gray-600 max-w-2xl">
                                Here, you will find all the cards you&apos;ve added to your account.
                            </p>
                        </div>
                        <Button
                            onClick={() => setShowModal(true)}
                            variant='solid' color='blue' className='rounded-md'>
                            <span>Add Card</span>
                            <PlusIcon className='w-6 h-6' />
                        </Button>
                    </div>
                </header>
                {(cards && cards.length > 0) && (<div
                    className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                >
                    {
                        cards.map((card, index) => (
                            <Card key={index} {...card} loading={deletingCard?.cardId === card._id} deleteCard={deleteCard} />
                        ))
                    }
                </div>)}
                {(cards?.length === 0 && !fetchingCards) && <EmptyState message="There are no cards associated with your accout!" />}
                {fetchingCards && <LoadingState message="Fetching your cards ..." />}
            </main>
        </UserDashboardLayout>
    )
}


interface ICardProps extends ICard {
    loading: boolean,
    deleteCard: (cardId: string) => void
}

const Card = ({ _id, cvv, cardNumber, cardType, expMonth, expYear, loading, deleteCard }: ICardProps) => {
    return (
        <div className='bg-white shadow  flex relative'>
            <div className='rounded-md p-4 flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                    <img src={`/${cardType.toLowerCase()}.svg`} alt="" className='w-16 h-16' />
                    <span className='text-gray-500 text-sm'>{cardType}</span>
                </div>
                <div className='text-gray-500 text-sm'>
                    <span>Card Number : </span>
                    <span>{cardNumber}</span>
                </div>
                <div className='text-gray-500 text-sm'>
                    <span>Expiration Date : </span>
                    <span>{expMonth}/{expYear}</span>
                </div>
                <div className='text-gray-500 text-sm'>
                    <span>CVV : </span>
                    <span>{cvv}</span>
                </div>
            </div>
            <button
                disabled={loading}
                onClick={() => deleteCard(_id)}
                className='p-2 h-max absolute top-2 right-2'
            >
                {loading ? <Loader /> :
                    <FiDelete  className='h-7 w-7'/>
                }
            </button>
        </div>
    )
}