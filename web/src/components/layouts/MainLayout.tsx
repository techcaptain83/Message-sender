/* eslint-disable react-hooks/exhaustive-deps */
import { showDeleteFileState, showDeleteLogState, showScanCodeState, showUpgradeToPremiumState, showUploadFileState, showUploadMediaState } from '@/atoms';
import useAuth from '@/hooks/useAuth';
import { showAddCredentialsModalAtom, showAnswerTicketModalAtom, showConnectPhoneModalAtom, showCreateReservationModalAtom, showCreateTicketModalAtom, showNewDepositModalAtom, showNoApiModalAtom, showNoReservationModalAtom, showTicketDetailsModalAtom } from '@/store/atoms';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import PrePageLoader from '../LargeLoader';
import AnswerTicket from '../modals/AnswerTicket';
import CreateDeposit from '../modals/CreateDeposit';
import CreateReservation from '../modals/CreateReservation';
import CreateTicket from '../modals/CreateTicket';
import DeleteFile from '../modals/DeleteFile';
import DeleteLog from '../modals/DeleteLog';
import ScanCode from '../modals/ScanCode';
import TicketDetails from '../modals/TicketDetails';
import UpgradeToPremium from '../modals/UpgradeToPremium';
import UploadFile from '../modals/UploadFile';
import UploadMedia from '../modals/uploadMedia';
import AddApiCredentials from '../modals/AddApiCredentails';
import ConnectPhone from '../modals/ConnectPhone';
import NoReservation from '../modals/NoReservation';
import NoApi from '../modals/NoApi';

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
    const showCreateDeposit = useRecoilValue(showNewDepositModalAtom);
    const showCreateReservation = useRecoilValue(showCreateReservationModalAtom);
    const showAddCredentials = useRecoilValue(showAddCredentialsModalAtom);
    const showConnectPhone = useRecoilValue(showConnectPhoneModalAtom);
    const showNoReservation = useRecoilValue(showNoReservationModalAtom);
    const showNoApi = useRecoilValue(showNoApiModalAtom);

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
                            {showConnectPhone && <ConnectPhone />}
                            {showTicketDetails && <TicketDetails />}
                            {showAnswerTicket?.show && <AnswerTicket />}
                            {showDeleteLog && <DeleteLog />}
                            {showCreateDeposit && <CreateDeposit />}
                            {showCreateReservation && <CreateReservation />}
                            {showAddCredentials.show && <AddApiCredentials />}
                            {children}
                            {showNoReservation && <NoReservation />}
                            {showNoApi && <NoApi />}
                        </>
                    }
                </main>
            }
        </div >
    )
}
