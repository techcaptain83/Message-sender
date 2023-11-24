/* eslint-disable react-hooks/exhaustive-deps */
import { showDeleteFileState, showDeleteLogState, showScanCodeState, showUpgradeToPremiumState, showUploadFileState, showUploadMediaState } from '@/atoms';
import useAuth from '@/hooks/useAuth';
import { registeringLogsState, sendingMessagesAtom, showAddCredentialsModalAtom, showAddMinutesManuallyAtom, showAnswerTicketModalAtom, showConnectPhoneModalAtom, showCreateTicketModalAtom, showNewDepositModalAtom, showNoApiModalAtom, showNoReservationModalAtom, showPurchaseMinutesModalAtom, showTicketDetailsModalAtom, showVerifyEmailModalAtom } from '@/store/atoms';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import PrePageLoader from '../LargeLoader';
import AddApiCredentials from '../modals/AddApiCredentails';
import AddMinutesManually from '../modals/AddMinutesManually';
import AnswerTicket from '../modals/AnswerTicket';
import ConnectPhone from '../modals/ConnectPhone';
import CreateDeposit from '../modals/CreateDeposit';
import CreateTicket from '../modals/CreateTicket';
import DeleteFile from '../modals/DeleteFile';
import DeleteLog from '../modals/DeleteLog';
import NoApi from '../modals/NoApi';
import NoReservation from '../modals/NoReservation';
import PurchaseMinutes from '../modals/PurchaseMinutes';
import RegisteringLogs from '../modals/RegisteringLogs';
import ScanCode from '../modals/ScanCode';
import SendingMessages from '../modals/SendingMessages';
import TicketDetails from '../modals/TicketDetails';
import UpgradeAccount from '../modals/UpgradeAccount';
import UploadFile from '../modals/UploadFile';
import UploadMedia from '../modals/uploadMedia';
import toast from 'react-hot-toast';
import VerifyEmail from '../modals/VerifyEmail';

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
    const showAddMinutesManually = useRecoilValue(showAddMinutesManuallyAtom);
    const [sendingMessages, setSendingMessages] = useRecoilState(sendingMessagesAtom);
    const registeringLogs = useRecoilValue(registeringLogsState);
    const showVerifyEmail = useRecoilState(showVerifyEmailModalAtom);

    useEffect(() => {
        (user && user.isAdmin && router.pathname.includes("/dashboard")) && router.push("/admin");
    }, [user, router.pathname]);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (sendingMessages) {
            timerId = setTimeout(() => {
                toast('Sending messages is taking too long and will continue in the background.');
                setSendingMessages(false);
            }, 40000); // 40 seconds
        }

        // Cleanup function to clear the timer when sendingMessages becomes false
        return () => clearTimeout(timerId);
    }, [sendingMessages, setSendingMessages]);



    return (
        <div className='min-w-full min-h-screen' suppressHydrationWarning>
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
                            {showAddMinutesManually?.show && <AddMinutesManually />}
                            {sendingMessages && <SendingMessages />}
                            {registeringLogs && <RegisteringLogs />}
                            {showVerifyEmail && <VerifyEmail />}
                        </>
                    }
                </main>
            }
        </div >
    )
}
