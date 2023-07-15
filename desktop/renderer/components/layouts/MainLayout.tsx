import useAuth from '@/hooks/useAuth'
import React from 'react'
import PrePageLoader from '../LargeLoader';
import { useRecoilValue } from 'recoil';
import { showDeleteFileState, showDeleteLogState, showScanCodeState, showUpgradeToPremiumState, showUploadFileState, showUploadMediaState } from '@/atoms';
import DeleteFile from '../modals/DeleteFile';
import UploadFile from '../modals/UploadFile';
import UpgradeToPremium from '../modals/UpgradeToPremium';
import UploadMedia from '../modals/uploadMedia';
import ScanCode from '../modals/ScanCode';
import Navbar from '../home/navbar';
import DeleteLog from '../modals/DeleteLog';

interface Props {
    children: React.ReactNode
}
function MainLayout({ children }: Props) {
    const { initialLoading } = useAuth();
    const showDeleteFile = useRecoilValue(showDeleteFileState);
    const showUploadFile = useRecoilValue(showUploadFileState);
    const showUpgrade = useRecoilValue(showUpgradeToPremiumState);
    const showUploadMedia = useRecoilValue(showUploadMediaState);
    const showScanCode = useRecoilValue(showScanCodeState);
    const showDeleteLog = useRecoilValue(showDeleteLogState);

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
                    <Navbar />
                    {children}
                </main>
            }
        </div>
    )
}

export default MainLayout
