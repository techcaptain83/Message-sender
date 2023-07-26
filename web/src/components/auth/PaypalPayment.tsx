import axios from '@/axios.config';
import { serialNumberEmailAtom, showSuccessfulSignupAtom } from '@/store/atoms';
import { PayPalButtons } from '@paypal/react-paypal-js';
import toast from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function PaypalPayment() {

    const user = useRecoilValue(serialNumberEmailAtom);
    const [_, setShowSuccess] = useRecoilState(showSuccessfulSignupAtom);

    const upgradeUserAccount = async () => {
        const { data } = await axios.put(`/users/upgrade-to-pro/${user._id}`);
        if (data.message === "success") {
            toast.success("You account have been upgraded successfuly!");
            setShowSuccess(true);
        } else {
            toast.error(" Your payment has been received but there was an error upgrading your account! please contact support!");
        }
    }

    return (
        <div className="mt-6 rounded-md  px-4 py-6 shadow border space-y-5 flex flex-col justify-between">
            <p className='text-gray-700'>You are about to pay $79.99</p>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: "0.50",
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    // @ts-ignore
                    return actions.order.capture().then((details) => {
                        upgradeUserAccount()
                    });
                }}
            />
        </div>
    )
}
