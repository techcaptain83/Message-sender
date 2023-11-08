import PrePageLoader from '@/components/LargeLoader';
import ActivitiesList from '@/components/history/ActivitiesList'
import UserDashboardLayout from '@/components/layouts/UserDashboardLayout';
import useLogs from '@/hooks/useLogs'
import Head from 'next/head';
import React from 'react'

export default function History() {
  const { logs, isFetching } = useLogs();


  return (
    <UserDashboardLayout>
      <Head>
        <title>Chatmaid - Messaging History</title>
      </Head>
      <div className='w-full h-[91vh px-8 py-4'>
        <div className='w-full flex items-center justify-between'>
          <h1 className="text-base font-medium leading-6 text-gray-900">Messaging History</h1>
        </div>
        <p className='pt-3 text-gray-600 max-w-4xl'>
          Here, you will find history of the messages you&apos;ve sent to lists,with all the stats of messages that were sent, the ones which were successful or the ones that failed.
        </p>
        <div className='p-6 rounded-md bg-gray-50 mt-8'>
          {isFetching ? <PrePageLoader /> : <ActivitiesList logs={logs || []} />}
        </div>
      </div >
    </UserDashboardLayout>
  )
}
