import { showSuccessfulSignupAtom } from '@/store/atoms';
import React from 'react';
import { useRecoilValue } from 'recoil';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const showSuccessfulSignup = useRecoilValue(showSuccessfulSignupAtom);
    return (
        <>
            {/* {showSuccessfulSignup && (
                <SuccessfulSignup />)} */}
            {children}
        </>
    )
}
