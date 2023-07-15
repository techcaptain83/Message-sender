import LogsList from '@/components/logs/LogsList'
import React from 'react'

export default function Logs() {
  const downloadReport = () => {

  }

  return (
    <div className='w-full h-[91vh px-8 py-4'>
      <div className='w-full flex items-center justify-between'>
        <h1 className="text-base font-medium leading-6 text-gray-900">Recent activities</h1>
        <button
          onClick={downloadReport}
          type="button"
          className="block rounded-md  bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 capitalize"
        >
          Download Report
        </button>
      </div>
      <p className='pt-3 text-gray-600 max-w-4xl'>
        Here, you will find history of the messages you've sent to lists,with all the stats of messages that were sent, the ones which were successful or the ones that failed.
      </p>
      <div className='p-6 rounded-md bg-gray-50 mt-8'>
        <LogsList />
      </div>
    </div >
  )
}
