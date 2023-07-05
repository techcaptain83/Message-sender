import { showSuccessfulSignupAtom } from '@/store/atoms';
import React from 'react'
import { useRecoilValue } from 'recoil';
import SuccessfulSignup from '../modals/SuccessfulSignup';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const showSuccessfulSignup = useRecoilValue(showSuccessfulSignupAtom);
    return (
        <>
            {showSuccessfulSignup && (
                <SuccessfulSignup />)}
            {children}
        </>
    )
}
