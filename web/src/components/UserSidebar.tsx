import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from './Button';
import Loader from './Loader';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';
import useAuth from '@/hooks/useAuth';

const links: { label: string, href: string }[] = [
    { label: "Messaging", href: "/dashboard" },
    { label: "History", href: "/dashboard/history" },
    { label: "Reservations", href: "/dashboard/reservations" },
    { label: "Deposit", href: "/dashboard/deposit" },
    { label: "Profile", href: "/dashboard/profile" },
    { label: "Support", href: "/dashboard/support" },
]

export default function UserSidebar() {

    const router = useRouter();
    const { logout, loading } = useAuth();

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
