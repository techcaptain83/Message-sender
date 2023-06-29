import Loader from '@/components/Loader';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Deposit = () => {
    const router = useRouter();
    const [success, setSuccess] = useState<boolean>();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (router.query.success === 'true') {
            setSuccess(true);
            setLoading(false);
        } else if (router.query.success === "false") {
            setSuccess(false);
            setLoading(false);
        }
        setLoading(false);
    }, [router.query])
    return (
        <>
            <Head>
                <title>Chatmaid - deposit</title>
            </Head>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                {loading ?
                    <Loader />
                    : <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div
                        >
                            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    {success ? <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div> :
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                    }
                                    <div className="mt-3 text-center sm:mt-5">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                                            {success ? 'Payment successful' :
                                                'Your payment was unsuccessful.'
                                            }
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {success ? 'you have successfully purchased chatmaid pro.' : ' your request to pay for chatmaid pro failed. please try again.'}
                                            </p>
                                            {success && <p className="text-sm text-gray-500">
                                                Your serial number : <span className='font-medium text-indigo-600'>
                                                    324234ksljksdfjcewe
                                                </span>
                                            </p>}

                                        </div>
                                    </div>
                                </div>
                                {success ? <div className="mt-5 sm:mt-6 flex flex-col gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    // onClick={() => setOpen(false)}
                                    >
                                        Copy Serial number
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    // onClick={() => setOpen(false)}
                                    >
                                        Download app
                                    </button>
                                </div> :
                                    <div className="mt-5 sm:mt-6 ">
                                        <Link href={'/'}>
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                            // onClick={() => setOpen(false)}
                                            >
                                                Go Home
                                            </button>
                                        </Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>}
            </div>
        </>
    )
}

export default Deposit