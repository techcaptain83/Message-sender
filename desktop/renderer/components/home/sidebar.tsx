import { IFile } from '@/types'
import { DocumentTextIcon } from '@heroicons/react/20/solid'
import React from 'react'

const files: IFile[] = [
  { fileName: 'My Employees', id: '324423', updloadedAt: new Date(1688053273136), usersCount: 13 },
]

export const Sidebar = () => {
  return (
    <div className='h-full shadow w-[28vw] pt-4 px-4 '>
      <div className='p-2 space-y-4'>
        <h2 className='text-lg text-gray-600'>
          Recently uploaded files
        </h2>
        <div className='flex flex-col gap-5'>
          {
            new Array(9).fill(files[0]).map((file, index) => (
              <div key={index} className='flex gap-2 hover:bg-gray-100 cursor-pointer'>
                <DocumentTextIcon width={40} className='text-gray-500' />
                <div>
                  <p className='text-base'>{file.fileName}</p>
                  <p className='text-gray-500 text-sm'><span>{file.updloadedAt.toLocaleDateString()}</span><span className='px-1'>.</span> <span>{file.usersCount} people</span></p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
