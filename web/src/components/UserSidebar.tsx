import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from './Button';
import Loader from './Loader';
import { ArrowRightOnRectangleIcon, PlusIcon } from '@heroicons/react/20/solid';
import useAuth from '@/hooks/useAuth';
import { useRecoilState } from 'recoil';
import { showCreateReservationModalAtom } from '@/store/atoms';

export default function UserSidebar() {

    const links: { label: string, href: string }[] = [
        { label: "Messaging", href: "/dashboard" },
        { label: "Messaging History", href: "/dashboard/history" },
        { label: "Reservations", href: "/dashboard/reservations" },
        { label: "Deposits", href: "/dashboard/deposits" },
        // { label: "Profile", href: "/dashboard/profile" },
        { label: "Support", href: "/dashboard/support" },
    ]

    const router = useRouter();
    const { logout, loading, user } = useAuth();
    const [__, setShowCreateReservation] = useRecoilState(showCreateReservationModalAtom);

    return (
        <div className='w-[15vw] h-[91vh] fixed  shadow top-[9vh] left-0 p-2 pt-4 border-r border-gray-200 flex flex-col justify-between'>
            <ul>
                {links.map((link, index) => (
                    <li key={index}>
                        <Link
                            href={link.href}
                            className={`block py-2.5 px-4 rounded transition duration-200 ${router.pathname == link.href ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-200'}`}>
                            {link.label}
                        </Link>
                    </li>
                ))}
                {
                    user?.plan !== "enterprise" && <Button variant='solid' className='rounded-md opacity-80 mt-6'
                        onClick={() => setShowCreateReservation(true)}
                    >
                        <span>Reserve a slot</span>
                        <PlusIcon className='w-6 h-6' />
                    </Button>
                }
            </ul>
            <Button variant='solid'
                onClick={logout}
                className='rounded-md space-x-2 mb-12 opacity-75 lg:text-base text-xs'>
                {loading ? <Loader /> : <>
                    <span>Logout</span>
                    <ArrowRightOnRectangleIcon width={20} />
                </>
                }
            </Button>
        </div>
    )
}
