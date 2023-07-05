import React, { useState } from 'react'
import Logo from '../logo'
import { Button } from '../Button';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';
import Loader from '../Loader';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

export default function Navbar() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useAuth();
    const logout = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/login');
        }, 2000);
    }
    return (
        <div className='w-full py-4 bg-gray-50/75 flex justify-between items-center  shadow px-8 h-[9vh]'>
            <Logo className="h-10" />
            <div className='flex items-center gap-6 '>
                <div className='flex gap-3 items-center '>
                    <div className='w-10 h-10 rounded-full flex items-center bg-blue-500 justify-center font-medium text-white text-sm '>
                        {user?.firstName[0] + user?.lastName[0]}
                    </div>
                    <div className='text-sm'>
                        <p>{user?.email}</p>
                        <p className='uppercae text-gray-600'>{user?.serialNumber}</p>
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
