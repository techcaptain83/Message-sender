import useAuth from '@/hooks/useAuth'
import React from 'react'
import PrePageLoader from '../LargeLoader';

interface Props {
    children: React.ReactNode
}
function MainLayout({ children }: Props) {
    const { initialLoading } = useAuth();
    return (
        <div className='min-w-full min-h-screen'>
            {initialLoading ?
                <div className='w-full h-full flex items-center justify-center'>
                    <PrePageLoader />
                </div> : children}
        </div>
    )
}

export default MainLayout
