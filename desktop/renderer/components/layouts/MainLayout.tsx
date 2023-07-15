import { showDeleteFileState, showDeleteLogState, showScanCodeState, showUpgradeToPremiumState, showUploadFileState, showUploadMediaState } from '@/atoms';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';
import PrePageLoader from '../LargeLoader';
import Navbar from '../home/navbar';
import DeleteFile from '../modals/DeleteFile';
import DeleteLog from '../modals/DeleteLog';
import ScanCode from '../modals/ScanCode';
import UpgradeToPremium from '../modals/UpgradeToPremium';
import UploadFile from '../modals/UploadFile';
import UploadMedia from '../modals/uploadMedia';

interface Props {
    children: React.ReactNode
}

function MainLayout({ children }: Props) {
    const { initialLoading } = useAuth();
    const router = useRouter();
    const showDeleteFile = useRecoilValue(showDeleteFileState);
    const showUploadFile = useRecoilValue(showUploadFileState);
    const showUpgrade = useRecoilValue(showUpgradeToPremiumState);
    const showUploadMedia = useRecoilValue(showUploadMediaState);
    const showScanCode = useRecoilValue(showScanCodeState);
    const showDeleteLog = useRecoilValue(showDeleteLogState);
    console.log(router.pathname);

    return (
        <div className='min-w-full min-h-screen'>
            {initialLoading ?
                <div className='w-full h-full flex items-center justify-center'>
                    <PrePageLoader />
                </div> :
                <main className='w-full h-screen overflow-y-hidden '>
                    {showDeleteFile && <DeleteFile />}
                    {showUploadFile && <UploadFile />}
                    {showUpgrade && <UpgradeToPremium />}
                    {showUploadMedia && <UploadMedia />}
                    {showScanCode && <ScanCode />}
                    {showDeleteLog && <DeleteLog />}
                    {(router.pathname === "/" || router.pathname === "/history" || router.pathname === "/history/[id]") && <Navbar />}
                    {children}
                </main>
            }
        </div>
    )
}

export default MainLayout
