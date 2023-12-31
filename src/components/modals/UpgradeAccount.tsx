import { showUpgradeToPremiumState } from '@/atoms';
import axios from '@/axios.config';
import useAuth from '@/hooks/useAuth';
import { selectedPlanAtom } from '@/store/atoms';
import { IAuthUser } from '@/types';
import { ENTERPRISE_PRICE, PREMIUM_PRICE, UIDHASH, YEARLY_ENTERPRISE_PRICE } from '@/utils/constants';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCrown } from 'react-icons/fa';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '../Button';
import Loader from '../Loader';
import ModalLayout from '../layouts/ModalLayout';

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);


export default function UpgradeAccount() {
    const [showUpgrade, setShowUpgrade] = useRecoilState(showUpgradeToPremiumState);
    const { user } = useAuth();
    const [proLoading, setProLoading] = useState(false);
    const [enterpriseLoading, setEnterpriseLoading] = useState(false);
    const [yearlyEnterpriseLoading, setYearlyEnterpriseLoading] = useState(false);
    const localstorageUser = JSON.parse(localStorage.getItem(UIDHASH) || '{}') as IAuthUser;
    const selectedPlan = useRecoilValue(selectedPlanAtom);


    const handlePayment = async (plan: "pro" | "enterprise" | "yearlyEnterprise") => {
        if (plan === "pro") {
            setProLoading(true);
        } else if (plan === "enterprise") {
            setEnterpriseLoading(true);
        } else {
            setYearlyEnterpriseLoading(true);
        }
        try {
            const { data } = await axios.post('/payment/create-session', {
                reason: "upgrade",
                plan: plan,
                user_id: user?._id ? user._id : localstorageUser._id
            });

            if (data.sessionId) {
                const stripe = await stripePromise;
                if (stripe) {
                    const { error } = await stripe.redirectToCheckout({
                        sessionId: data.sessionId
                    });
                    if (error) toast.error(`Payment failed : ${error.message}`);
                }
            } else {
                toast.error("Something went wrong! try again later.")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! try again later.");
        } finally {
            if (plan === "pro") {
                setProLoading(false);
            } else if (plan === "enterprise") {
                setEnterpriseLoading(false);
            } else {
                setYearlyEnterpriseLoading(false);
            }
        }
    }


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
                </div>
            </div>
            <div className="mt-2">
                <p className="py-4 text-gray-500">
                    your are going to be redirected to the payment portal where you can finish your payment.
                </p>
            </div>
            {!selectedPlan ? <div className="mt-4 flex w-full items-center justify-between gap-3">
                {user?.plan !== "pro" && <Button
                    onClick={() => handlePayment("pro")}
                    color='blue'
                    className='rounded-md w-full'
                >
                    {proLoading ? <Loader /> : <span>Buy Shared premium (${PREMIUM_PRICE})</span>}
                </Button>}
                <Button
                    onClick={() => handlePayment("enterprise")}
                    color='blue'
                    className='rounded-md w-full'
                >
                    {enterpriseLoading ? <Loader /> : <span>Buy Monthly enterprise (${ENTERPRISE_PRICE}/month)</span>}
                </Button>
                <Button
                    onClick={() => handlePayment("yearlyEnterprise")}
                    color='blue'
                    className='rounded-md w-full'
                >
                    {yearlyEnterpriseLoading ? <Loader /> : <span>Buy Yearly enterprise ($999.9/year)</span>}
                </Button>
            </div> :
                <Button
                    color='blue'
                    className='rounded-md w-full'
                    onClick={() => handlePayment(selectedPlan === "premium" ? "pro" : selectedPlan)}
                >
                    {
                        (yearlyEnterpriseLoading || proLoading || enterpriseLoading) ? <Loader /> :
                            <>
                                {selectedPlan === "premium" ?
                                    <span>Buy Shared premium (${PREMIUM_PRICE})</span> : selectedPlan === "enterprise" ?
                                        <span>Buy enterprise (${ENTERPRISE_PRICE})</span> :
                                        <span>
                                            Pay ${YEARLY_ENTERPRISE_PRICE / 100} for yearly enterprise
                                        </span>
                                }
                            </>

                    }
                </Button>
            }

        </ModalLayout>
    )
}
