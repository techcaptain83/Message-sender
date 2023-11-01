import React from 'react'
import UserSidebar from '../UserSidebar'
import Navbar from '../home/navbar'

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-full">
            <div className="flex flex-1 flex-col">
                <main className="flex-1 pb-8">
                    <Navbar />
                    <div className=" flex w-full ">
                        <UserSidebar />
                        <div className='w-[88vw]  mt-[8vh] ml-[12vw]'>
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
