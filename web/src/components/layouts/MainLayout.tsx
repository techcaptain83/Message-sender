/* eslint-disable react-hooks/exhaustive-deps */
import { showDeleteFileState, showDeleteLogState, showScanCodeState, showUpgradeToPremiumState, showUploadFileState, showUploadMediaState } from '@/atoms';
import useAuth from '@/hooks/useAuth';
import { showAddCredentialsModalAtom, showAnswerTicketModalAtom, showConnectPhoneModalAtom, showCreateTicketModalAtom, showNewDepositModalAtom, showNoApiModalAtom, showNoReservationModalAtom, showPurchaseMinutesModalAtom, showTicketDetailsModalAtom } from '@/store/atoms';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import PrePageLoader from '../LargeLoader';
import AddApiCredentials from '../modals/AddApiCredentails';
import AnswerTicket from '../modals/AnswerTicket';
import ConnectPhone from '../modals/ConnectPhone';
import CreateDeposit from '../modals/CreateDeposit';
import CreateTicket from '../modals/CreateTicket';
import DeleteFile from '../modals/DeleteFile';
import DeleteLog from '../modals/DeleteLog';
import NoApi from '../modals/NoApi';
import NoReservation from '../modals/NoReservation';
import PurchaseMinutes from '../modals/PurchaseMinutes';
import ScanCode from '../modals/ScanCode';
import TicketDetails from '../modals/TicketDetails';
import UpgradeAccount from '../modals/UpgradeAccount';
import UploadFile from '../modals/UploadFile';
import UploadMedia from '../modals/uploadMedia';

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
    const showAddCredentials = useRecoilValue(showAddCredentialsModalAtom);
    const showConnectPhone = useRecoilValue(showConnectPhoneModalAtom);
    const showNoReservation = useRecoilValue(showNoReservationModalAtom);
    const showNoApi = useRecoilValue(showNoApiModalAtom);
    const showPurchaseMinutes = useRecoilValue(showPurchaseMinutesModalAtom);
    // const showCreateCard = useRecoilValue(showCreateCardModalAtom);

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
                            {showUpgrade && <UpgradeAccount />}
                            {showUploadMedia && <UploadMedia />}
                            {showScanCode && <ScanCode />}
                            {showCreateTicket && <CreateTicket />}
                            {showConnectPhone && <ConnectPhone />}
                            {showTicketDetails && <TicketDetails />}
                            {showAnswerTicket?.show && <AnswerTicket />}
                            {showDeleteLog && <DeleteLog />}
                            {showCreateDeposit && <CreateDeposit />}
                            {showAddCredentials.show && <AddApiCredentials />}
                            {children}
                            {showNoReservation && <NoReservation />}
                            {showNoApi && <NoApi />}
                            {showPurchaseMinutes && <PurchaseMinutes />}
                            {/* {showCreateCard && <CreateCard />} */}
                        </>
                    }
                </main>
            }
        </div >
    )
}
