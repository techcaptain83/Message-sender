/* eslint-disable react-hooks/exhaustive-deps */
import useDeposits from '@/hooks/useDeposits'
import { showNewDepositModalAtom } from '@/store/atoms'
import { loadStripe } from '@stripe/stripe-js'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { BiMoney } from 'react-icons/bi'
import { useRecoilState } from 'recoil'
import { Button } from '../Button'
import { TextField } from '../Fields'
import ModalLayout from '../layouts/ModalLayout'
import normalAxios from 'axios'
import useAuth from '@/hooks/useAuth'
import { UIDHASH } from '@/utils/constants';
import { IAuthUser } from '@/types'

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);

export default function CreateDeposit() {
    const [showModal, setShowModal] = useRecoilState(showNewDepositModalAtom);
    const { createDeposit, creatingDeposit } = useDeposits();
    const [amount, setAmount] = useState(1);
    const { user } = useAuth();
    const localStorageUser = JSON.parse(localStorage.getItem(UIDHASH) || '{}') as IAuthUser;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (amount < 1) {
            toast.error("Amount must be greater than $1");
            return;
        }

        const res = await createDeposit(amount);
        if (res.success) {
            try {
                const { data } = await normalAxios.post('/api/create-stripe-checkout-session', {
                    reason: "deposit",
                    amount: amount * 100, // convert to cents
                    user_id: user?._id ? user._id : localStorageUser._id,
                    deposit_id: res.deposit?._id
                });
                if (data.sessionId) {
                    const stripe = await stripePromise;
                    if (stripe) {
                        const { error } = await stripe.redirectToCheckout({
                            sessionId: data.sessionId,
                        });
                        if (error) {
                            toast.error(`Payment failed: ${error.message}`);
                        }
                    }
                } else {
                    toast.error('Unable to initiate payment. Please try again later.');
                }
            } catch (error) {
                console.log(error);
                toast.error('Unable to initiate payment. Please try again later.');
            }
        }

    }


    return (
        <ModalLayout open={showModal} setOpen={() => setShowModal(false)} >
            <div className='w-full flex flex-col items-center gap-2'>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <BiMoney className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h2 className='font-medium text-xl text-gray-600'>Add balance to your account </h2>
            </div>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
            >
                <TextField
                    className="col-span-full"
                    label="Enter Amount"
                    id="amount"
                    value={amount}
                    name="amount"
                    type="number"
                    min={1}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />

                <div className="col-span-full">
                    <Button
                        disabled={creatingDeposit}
                        type="submit"
                        variant="solid"
                        color="blue"
                        className="w-full"
                    >
                        {creatingDeposit ?
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-50" /> :
                            <span>
                                Proceed to payment <span aria-hidden="true">&rarr;</span>
                            </span>}
                    </Button>
                </div>
            </form>
        </ModalLayout>
    )
}
