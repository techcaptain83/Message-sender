import { showUpgradeToPremiumState } from '@/atoms';
import axios from '@/axios.config';
import useAuth from '@/hooks/useAuth';
import { IAuthUser } from '@/types';
import { PREMIUM_PRICE, UIDHASH } from '@/utils/constants';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PayPalButtons } from '@paypal/react-paypal-js';
import toast from 'react-hot-toast';
import { FaCrown } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import ModalLayout from '../layouts/ModalLayout';


export default function UpgradeToPremium() {
    const [showUpgrade, setShowUpgrade] = useRecoilState(showUpgradeToPremiumState);
    const { user, reloadProfile } = useAuth();
    const localstorageUser = JSON.parse(localStorage.getItem(UIDHASH) || '{}') as IAuthUser;

    const upgradeUserAccount = async () => {
        const { data } = await axios.put(`/users/upgrade-to-pro/${user?._id ? user._id : localstorageUser._id}`);
        if (data.message === "success") {
            toast.success("thank you for your payment, please log out and re-log in to activate your premium account.");
            reloadProfile();
        } else {
            toast.error(" Your payment has been received but there was an error upgrading your account! please contact support!");
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
                    your are going to be redirected to the payment portal where you can pay <span className='font-semibold text-gray-800'> $79.99 </span> and get a lifetime access.
                </p>
            </div>
            <PayPalButtons

                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: PREMIUM_PRICE.toString()
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    // @ts-ignore
                    return actions.order.capture().then((details) => {
                        // @ts-ignore
                        const name = details.payer.name.given_name;
                        upgradeUserAccount()
                    });
                }}
                onCancel={(data) => {
                    toast.error("Payment canceled!");
                }}
            />
        </ModalLayout>
    )
}
