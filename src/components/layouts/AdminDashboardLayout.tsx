import React from 'react'
import Topbar from '../admin/Topbar'
import AdminSidebar from '../admin/AdminSidebar'
import Head from 'next/head'

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Chatmaid - Admin Dashboard</title>
            </Head>
            <div className="min-h-full">
                <div className="flex flex-1 flex-col">
                    <main className="flex-1 pb-8">
                        <Topbar />
                        <div className=" flex w-full ">
                            <AdminSidebar />
                            <div className='w-[85vw]  mt-[12vh] ml-[15vw]'>
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
