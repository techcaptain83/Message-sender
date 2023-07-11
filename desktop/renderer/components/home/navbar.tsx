import useAuth from '@/hooks/useAuth';
import { ArrowRightOnRectangleIcon, Bars4Icon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { Button } from '../Button';
import Loader from '../Loader';
import Logo from '../logo';
import { FaCrown } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { showUpgradeToPremiumState } from '@/atoms';

export default function Navbar() {
    const { user, logout, loading } = useAuth();
    const [showUpgradeModal, setShowUpgradeModal] = useRecoilState(showUpgradeToPremiumState);

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
            {/* <div className='relative'>
                <Bars4Icon width={20} className='hover:text-blue-500' />
            </div> */}
            <div className='flex items-center gap-6'>
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
                    !user?.isPro ?
                        <Button onClick={() => setShowUpgradeModal(true)} variant='solid' color='green'
                            className='rounded-md space-x-2 lg:text-base text-xs'>
                            {<>
                                <span>Upgrade to premium</span>
                                <FaCrown width={20} />
                            </>
                            }
                        </Button> :
                        <div className='bg-blue-500 text-white p-2 rounded-md flex items-center gap-2 lg:text-base text-xs' >
                            <span>Pro</span>
                            <FaCrown width={20} />
                        </div>
                }
                <Button variant='solid' color='blue'
                    onClick={logout}
                    className='rounded-md space-x-2 lg:text-base text-xs'>
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
