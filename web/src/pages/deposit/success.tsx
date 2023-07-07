import axios from '@/axios.config';
import Loader from '@/components/Loader';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SuccessfulPayment = () => {
    const router = useRouter();
    useEffect(() => {
        if(router.query.uid){

        }
    }, [router.query]);

    const openDesktopApp = () => {

    }

    return (
        <>
            <Head>
                <title>Chatmaid - your payment was successful.</title>
            </Head>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                 <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div
                        >
                            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                                            Payment successful
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                you have successfully purchased chatmaid pro. now you can continue to the app
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 flex flex-col gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                        onClick={() => openDesktopApp()}
                                    >
                                        Open desktop app
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default SuccessfulPayment;