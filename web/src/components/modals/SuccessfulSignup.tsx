import { serialNumberAtom, showSuccessfulSignupAtom } from '@/store/atoms';
import { Dialog } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import ModalLayout from '../layouts/ModalLayout';

export default function SuccessfulSignup() {
    const [showSuccessfulSignup, setShowSuccessfulSignup] = useRecoilState(showSuccessfulSignupAtom);

    const serialNumber = useRecoilValue(serialNumberAtom);
    const [loading, setLoading] = useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(serialNumber);
        toast.success('Serial Number copied to clipboard');
    }

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
                            your serial Number is: <span className="font-semibold">{serialNumber}</span>
                             enjoy your 7 Days free trial.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    disabled={loading}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={copyToClipboard}
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-50" />) :
                        <span>copy serial number</span>
                    }
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
