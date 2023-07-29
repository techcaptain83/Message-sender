import Image from 'next/image'
import React from 'react'

export default function EmptyState({ message }: { message: string }) {
    return (
        <div className='w-full px-6'>
            <div className='min-h-[60vh] bg-gray-100 rounded-lg mt-6 py-6 flex flex-col items-center justify-center gap-6'>
                <Image src={'/empty.svg'} width={300} height={300} alt='empty' />
                <h1 className='text-xl font-semibold text-gray-700'>{message}</h1>
            </div>
        </div>
    )
}