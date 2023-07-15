import LogsTable from '@/components/history/LogsTable'
import { ILog } from '@/types'
import React from 'react'

const log: ILog =
{
    _id: '1',
    filename: 'Employees.csv',
    sentCount: 20,
    failedCount: 43,
    createdAt: "2023-07-15T15:52:00.506Z",
    contacts: [
        {
            firstName: "Mutesa",
            lastName: "Cedric",
            phoneNumber: "(+250)781892231",
            sent: true
        }
    ]
}


export default function LogView() {


    const downloadLogs = () => {

    }
    return (
        <div className='w-full h-[91vh px-8 py-4'>
            <div className='w-full flex items-center justify-between'>
                <h1 className="text-base font-medium leading-6 text-gray-900">Logs</h1>
                <button
                    onClick={downloadLogs}
                    type="button"
                    className="block rounded-md  bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 capitalize"
                >
                    Download Logs
                </button>
            </div>
            <p className='pt-3 text-gray-600 max-w-4xl'>
                Logs for Messages sent to list <span className='text-gray-800 font-semibold'>{log.filename} </span>
                sent on <span className='text-gray-800 font-semibold'>{new Date(log.createdAt).toLocaleString()}</span>
            </p>
            <LogsTable {...log} />
        </div>
    )
}
