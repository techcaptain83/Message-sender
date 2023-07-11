import { phoneConnectedState, showScanCodeState } from '@/atoms';
import useAuth from '@/hooks/useAuth';
import { Dialog } from '@headlessui/react';
import QRCode from "react-qr-code";
import { useRecoilState } from 'recoil';
import ModalLayout from '../layouts/ModalLayout';
import { useEffect, useState } from 'react';
import { getQRCode } from '@/utils/qrCode';
import { whatsappLogout } from '@/utils/logout';
import { checkPhoneConnection } from '@/utils/checkPhoneConnection';
import Loader from '../Loader';
import { toast } from 'react-hot-toast';

export default function ScanCode() {
    const [showScanCode, setShowScanCode] = useRecoilState(showScanCodeState);
    const { user } = useAuth();
    const [qrCode, setQrcode] = useState<string>(null);
    const [loadingCode, setLoadingCode] = useState(true);
    const [loading, setLoading] = useState(false);
    const [phoneConnected,setPhoneConnected]=useRecoilState(phoneConnectedState);

    const getQr = async () => {
        setLoadingCode(true);
        const data = await getQRCode();
        if (data.qrCode) {
            setQrcode(data.qrCode);
            setLoadingCode(false);
        } else {
            const logoutData = await whatsappLogout();
            if (logoutData.success === "done") {
                const qrData = await getQRCode();
                if (qrData.qrCode) {
                    setQrcode(qrData.qrCode);
                }
            }
        }
    }

    useEffect(() => {
        getQr();
    }, []);


    const submitCode = async () => {
        setLoading(true);
        const data = await checkPhoneConnection();
        if (data.error) {
            toast.error("Your phone hasn't been connected yet!");
            setLoading(false);
        } else {
            toast.success("your phone has been connected! you can now send messages");
            setLoading(false);
            setShowScanCode(false);
            setPhoneConnected(true);
        }
    }


    return (
        <ModalLayout open={showScanCode} large setOpen={() => setShowScanCode(false)}>
            <div className='w-full flex  justify-between flex-col md:flex-row'>
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            To send the message, you have to authorize our app on your whatsapp account.
                        </Dialog.Title>
                        <div className="mt-2 py-3 pl-4 text-gray-800">
                            <ul className='list-decimal list-inside flex flex-col items-start'>
                                <li>Open whatsapp on your phone</li>
                                <li>
                                    Tap Menu or settings and select <span className='font-medium'>Linked Devices</span>
                                </li>
                                <li>Point your phone to this screen to capture the code.</li>
                            </ul>
                        </div>
                        <div className='text-start pb-3'>
                            A QR code is valid only for 45 seconds.You can click <span className='font-semibold'>send</span> after the process has been completed
                        </div>
                    </div>
                </div>
                <div className='w-full h-full flex items-center justify-center'>
                    {loadingCode ?
                        <div className='h-full w-full flex items-center justify-center pt-12'>
                            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                        : <QRCode value={qrCode} />}

                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex space-y-3 sm:space-y-0 sm:flex-row-reverse">
                <button
                    onClick={() => submitCode()}
                    disabled={loadingCode || loading}
                    type="button"
                    className="inline-flex w-full  justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                    <span>{loading ? <Loader /> : "Done"}</span>
                </button>
                {
                    qrCode && <button
                        onClick={() => getQr()}
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                    >
                        <span>Reload code</span>
                    </button>
                }
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setShowScanCode(false)}
                >
                    Cancel
                </button>
            </div>

        </ModalLayout>
    )
}