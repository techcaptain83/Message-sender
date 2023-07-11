import { serialNumberEmailAtom, showSuccessfulSignupAtom } from '@/store/atoms';
import { Dialog } from '@headlessui/react';
import { ArrowDownTrayIcon, CheckIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { saveAs } from 'file-saver';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import ModalLayout from '../layouts/ModalLayout';

export default function SuccessfulSignup() {
    const [showSuccessfulSignup, setShowSuccessfulSignup] = useRecoilState(showSuccessfulSignupAtom);

    const serialNumberEmail = useRecoilValue(serialNumberEmailAtom);
    const [loading, setLoading] = useState(false);

    const downloadSerialNumber = () => {
        try {
            setLoading(true);
            const textBlob = new Blob([`${serialNumberEmail.email}
${serialNumberEmail.serialNumber}
            `], { type: 'text/plain' });
            saveAs(textBlob, 'emailaddress_serialnumber.txt');
            toast.success("Please download application and login there", {
                duration: 15000
            })
        } catch (error) {
            console.error(error);
            toast.error('Failed to download Serial Number');
        } finally {
            setLoading(false);
        }
    };
    return (
        <ModalLayout open={showSuccessfulSignup} setOpen={() => setShowSuccessfulSignup(false)}>
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => setShowSuccessfulSignup(false)}
                >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Signup Successful
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            please donwload your serial number and store it somewhere safe. you will need it to login to your desktop app and
                            enjoy your<span className='text-gray-800 font-semibold'> 7 Days free trial.</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    disabled={loading}
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  text-center  gap-2 hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={downloadSerialNumber}
                >
                    <ArrowDownTrayIcon width={20} />
                    <span>download serial number</span>
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setShowSuccessfulSignup(false)}
                >
                    close
                </button>
            </div>
        </ModalLayout>
    )
}
