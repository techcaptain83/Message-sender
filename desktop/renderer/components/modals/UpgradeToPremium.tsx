import { selectedFileState, showUpgradeToPremiumState } from '@/atoms';
import useFiles from '@/hooks/useFiles';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FaCrown } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import ModalLayout from '../layouts/ModalLayout';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';


export default function UpgradeToPremium() {
    const [showUpgrade, setShowUpgrade] = useRecoilState(showUpgradeToPremiumState);
    const { user } = useAuth();


    return (
        <ModalLayout open={showUpgrade} setOpen={() => setShowUpgrade(false)}>
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => setShowUpgrade(false)}
                >
                    <span className="sr-only">Cancel</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FaCrown className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Upgrade your account
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            your are going to be redirected to the payment portal where you can pay <span className='font-semibold text-gray-800'> $79 </span> and get a lifetime access.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <a href={`https://watsapp-messenger.vercel.app/deposit?uid=${user._id}`} rel='noreferrer' target='_blank'>
                    <button
                        type="button"
                        
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"

                    >
                        <span>Proceed</span>
                    </button>
                </a>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setShowUpgrade(false)}
                >
                    Cancel
                </button>
            </div>
        </ModalLayout>
    )
}
