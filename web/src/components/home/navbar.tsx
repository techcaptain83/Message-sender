import { showUpgradeToPremiumState } from '@/atoms';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaCrown } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { Button } from '../Button';
import { Logo } from '../Logo';

const links: {
    label: string, href: string
}[] = [
        { label: "Dashboard", href: '/dashboard' },
        { label: "History", href: '/dashboard/history' },
    ]

export default function Navbar() {
    const { user, logout, loading } = useAuth();
    const [showUpgradeModal, setShowUpgradeModal] = useRecoilState(showUpgradeToPremiumState);
    const router = useRouter();

    return (
        <div className='w-full fixed top-0  left-0  py-4 bg-gray-50/75 flex justify-between items-center  shadow px-8 h-[9vh]'>
            <div className='flex items-center gap-3'>
                <Link href={'/dashboard'}>
                    <Logo className="h-10" />
                </Link>

                {/* {links.map(link => (
                    <Link key={link.href} href={link.href}>
                        <button className={`rounded-md text-gray-700 font-medium hover:text-blue-500  p-2 text-sm ${router.pathname === link.href && "bg-blue-500 text-white hover:text-white"}`} >{link.label}</button>
                    </Link>
                ))} */}
            </div>
            {/* <div className='relative'>
                <Bars4Icon width={20} className='hover:text-blue-500' />
            </div> */}
            <div className='flex items-center gap-6'>
                <div className='flex gap-3 items-center '>
                    <div className='w-10 h-10 rounded-full flex items-center bg-blue-500 justify-center font-medium text-white text-sm '>
                        {/* @ts-ignore */}
                        {user?.firstName[0] + user?.lastName[0]}
                    </div>
                    {/* <div className='text-sm'>
                        <p>{user?.email}</p>
                    </div> */}
                </div>
                {
                    user?.plan === "free" ?
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
               
            </div>
        </div>
    )
}
