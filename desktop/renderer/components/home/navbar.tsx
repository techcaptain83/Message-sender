import useAuth from '@/hooks/useAuth';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { Button } from '../Button';
import Loader from '../Loader';
import Logo from '../logo';
import { FaCrown } from 'react-icons/fa';

export default function Navbar() {
    const { user, logout, loading } = useAuth();

    return (
        <div className='w-full py-4 bg-gray-50/75 flex justify-between items-center  shadow px-8 h-[9vh]'>
            <div className='flex items-center gap-3'>
                <Link href={'/'}>
                    <Logo className="h-10" />
                </Link>
                {/* <Link href={'/history'}>
                    <button className='rounded-md text-gray-700 font-medium hover:text-blue-500  p-2 text-sm' >Message History</button>
                </Link> */}
            </div>
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
                {
                    !user.isPro &&
                    <Button variant='solid' color='green'
                        className='rounded-md space-x-2'>
                        {loading ? <Loader /> : <>
                            <span>Upgrade to pro</span>
                            <FaCrown width={20} />
                        </>
                        }
                    </Button>
                }
                <Button variant='solid' color='blue'
                    onClick={logout}
                    className='rounded-md space-x-2'>
                    {loading ? <Loader /> : <>
                        <span>Logout</span>
                        <ArrowRightOnRectangleIcon width={20} />
                    </>
                    }
                </Button>
            </div>
        </div>
    )
}
