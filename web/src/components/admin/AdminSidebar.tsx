import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'

const links: { label: string, href: string }[] = [
    { label: "Dashboard", href: "/admin" },
    { label: "All Users", href: "/admin/users" },
    { label: "Enterprise Users", href: "/admin/enterprise-users" },
    { label: "Tickets", href: "/admin/tickets" },
    { label: "Settings", href: "/admin/settings" },
]

export default function AdminSidebar() {

    const router = useRouter();

    return (
        <div className='w-[15vw] h-[90vh] fixed  shadow top-[10vh] left-0 p-2 pt-4 border-b border-gray-200'>
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
        </div>
    )
}
