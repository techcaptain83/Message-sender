/* eslint-disable react-hooks/exhaustive-deps */
import { showDeleteFileState, showDeleteLogState, showScanCodeState, showUpgradeToPremiumState, showUploadFileState, showUploadMediaState } from '@/atoms';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import PrePageLoader from '../LargeLoader';
import Navbar from '../home/navbar';
import DeleteFile from '../modals/DeleteFile';
import DeleteLog from '../modals/DeleteLog';
import ScanCode from '../modals/ScanCode';
import UpgradeToPremium from '../modals/UpgradeToPremium';
import UploadFile from '../modals/UploadFile';
import UploadMedia from '../modals/uploadMedia';
import { showAnswerTicketModalAtom, showCreateTicketModalAtom, showTicketDetailsModalAtom } from '@/store/atoms';
import CreateTicket from '../modals/CreateTicket';
import TicketDetails from '../modals/TicketDetails';
import AnswerTicket from '../modals/AnswerTicket';

interface Props {
    children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
    const { initialLoading, user } = useAuth();
    const router = useRouter();
    const showDeleteFile = useRecoilValue(showDeleteFileState);
    const showUploadFile = useRecoilValue(showUploadFileState);
    const showUpgrade = useRecoilValue(showUpgradeToPremiumState);
    const showUploadMedia = useRecoilValue(showUploadMediaState);
    const showScanCode = useRecoilValue(showScanCodeState);
    const showDeleteLog = useRecoilValue(showDeleteLogState);
    const showCreateTicket = useRecoilValue(showCreateTicketModalAtom);
    const showTicketDetails = useRecoilValue(showTicketDetailsModalAtom);
    const showAnswerTicket = useRecoilValue(showAnswerTicketModalAtom);

    useEffect(() => {
        (user && user.isAdmin && router.pathname.includes("/dashboard")) && router.push("/admin");
    }, [user, router.pathname])

    return (
        <div className='min-w-full min-h-screen'>
            {(initialLoading && !['/register', '/login', '/'].includes(router.pathname)) ?
                <div className='w-full h-full flex items-center justify-center'>
                    <PrePageLoader />
                </div> :
                <main className='min-h-screen'>
                    {(user && user.isAdmin && router.pathname.includes("/dashboard")) ?
                        <p>403- forbidden</p>
                        :
                        <>
                            {showDeleteFile && <DeleteFile />}
                            {showUploadFile && <UploadFile />}
                            {showUpgrade && <UpgradeToPremium />}
                            {showUploadMedia && <UploadMedia />}
                            {showScanCode && <ScanCode />}
                            {showCreateTicket && <CreateTicket />}
                            {showTicketDetails && <TicketDetails />}
                            {showAnswerTicket?.show && <AnswerTicket />}
                            {showDeleteLog && <DeleteLog />}
                            {(router.pathname === "/dashboard" || router.pathname === "/dashboard/history" || router.pathname === "dashboard/history/[id]") && <Navbar />}
                            {children}
                        </>
                    }
                </main>
            }
        </div >
    )
}
