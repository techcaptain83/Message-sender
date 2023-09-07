import AdminDashboardLayout from '@/components/layouts/AdminDashboardLayout'
import React from 'react'

export default function Settings() {
    return (
        <AdminDashboardLayout>
            <div className="sm:flex-auto px-5">
                <h1 className="text-base font-semibold leading-6 text-gray-900">Settings</h1>
                <p className="mt-2 text-sm text-gray-700">
                    Your admin  account settings.
                </p>
            </div>
            <div className='h-[50vh] bg-gray-50  
             mx-8 mt-12 flex items-center justify-center'>
                comming soon ...
            </div>
        </AdminDashboardLayout>
    )
}
