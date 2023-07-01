import React, { useState } from 'react'
import Logo from '../logo'
import { Button } from '../Button';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';
import Loader from '../Loader';
import { useRouter } from 'next/router';

export default function Navbar() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const logout = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/login');
        }, 2000);
    }
    return (
        <div className='w-full py-4 bg-gray-50/75 flex justify-between items-center  shadow px-8'>
            <Logo className="h-10" />
            <div className='flex items-center gap-6 '>
                <div className='flex gap-3 items-center '>
                    <div className='w-10 h-10 rounded-full flex items-center bg-blue-500 justify-center font-medium text-white text-sm '>
                        MC
                    </div>
                    <div className='text-sm'>
                        <p>mutesacedric@gmail.com</p>
                        <p className='uppercae text-gray-600'>ldfls33213Kew23</p>
                    </div>
                </div>
                {<Button variant='solid' color='blue' className='rounded-md space-x-2'>
                    {loading ? <Loader /> : <>
                        <span>Logout</span>
                        <ArrowRightOnRectangleIcon width={20} />
                    </>
                    }
                </Button>}
            </div>
        </div>
    )
}