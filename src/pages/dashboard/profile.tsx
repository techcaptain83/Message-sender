import UserDashboardLayout from '@/components/layouts/UserDashboardLayout'
import Head from 'next/head'
import React from 'react'

export default function Profile() {
    return (
        <UserDashboardLayout>
            <Head>
                <title>chatmaid - your profile</title>
            </Head>
            <main className='space-y-4 px-6'>
                <header>
                    {/* Heading */}
                    <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-white sm:flex-row sm:items-center">
                        <div className='space-y-3'>
                            <h1 className="text-xl font-semibold leading-6 text-gray-700">
                                Your account information.
                            </h1>
                            <p className="text-sm leading-6 text-gray-600 max-w-2xl">
                                We are here to help you. If you have any questions or issues, please feel free to contact us.We will get back to you as soon as possible.
                            </p>
                        </div>
                        {/* <Button
                            onClick={() => setShowModal(true)}
                            variant='solid' color='blue' className='rounded-md'>
                            <span>Edit a</span>
                            <PlusIcon className='w-6 h-6' />
                        </Button> */}
                    </div>
                </header>
            </main>
        </UserDashboardLayout>
    )
}
