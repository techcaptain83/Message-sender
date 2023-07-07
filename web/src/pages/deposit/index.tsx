import { CreditCardIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);

const Deposit = () => {
    const router = useRouter();
    const [userId, setUserId] = useState<string>();
    useEffect(() => {
        if (router.query.uid) {
            setUserId(router.query.uid as string);
        }
    }, [router.query]);

    const createStripePayment = async () => {
        try {
            const stripe = await stripePromise;
            const { data } = await axios.post('/api/create-stripe-checkout-session', {
                amount: 7999,
                currency: 'usd',
                userId
            });
            const { sessionId, url } = data;
            const result = await stripe?.redirectToCheckout({
                sessionId,
            });
        } catch (error) {
            // console.log(error);
        }
    }

    return (
        <>
            <Head>
                <title>Chatmaid - One time purchase</title>
            </Head>
            <div className="fixed inset-0 z-10 overflow-y-auto">

                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div
                    >
                        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                            <div>
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                    <CreditCardIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                                </div>

                                <div className="mt-3 text-center sm:mt-5">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">

                                        Proceed to payment

                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            You will be redirected to the payment page.Then you can continue to the app after the payment of $79.99 is successful.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 flex flex-col gap-3">
                                <button
                                    onClick={createStripePayment}
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"

                                >
                                    Proceed to payment
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Deposit