import axios from '@/axios.config';
import useAuth from '@/hooks/useAuth';
import { IAuthUser, IDeposit } from '@/types';
import { constructName } from '@/utils';
import { UIDHASH } from '@/utils/constants';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Loader from '../Loader';


const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);
export default function DepositCard({ _id, amount, depositedBy, createdAt, status }: IDeposit) {
    const [paying, setPaying] = useState(false);

    const { user } = useAuth();
    const localStorageUser = JSON.parse(localStorage.getItem(UIDHASH) || '{}') as IAuthUser;


    const continuePayment = async () => {
        setPaying(true);
        try {
            const { data } = await axios.post('/payment/create-session', {
                reason: "deposit",
                amount: amount * 100, // convert to cents
                user_id: user?._id ? user._id : localStorageUser._id,
                deposit_id: _id
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
        } finally {
            setPaying(false);
        }
    }

    return (
        <tr className="even:bg-gray-50">
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">{_id}</td>
            <td className="whitespace-nowrap px-3 py-4 font-medium text-gray-800 ">${amount}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">{new Date(createdAt).toLocaleString()}</td>
            {user?.isAdmin && <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-800 sm:pl-3">
                {constructName(depositedBy.firstName, depositedBy.lastName)}
            </td>}
            <td >
                <p className={`whitespace-nowrap px-3 py-2 text-sm ${status === 'pending' ? 'text-yellow-600 bg-yellow-100' : status === 'completed' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                    {status}
                </p>
            </td>
            {
                (status === "pending" && !user?.isAdmin) &&
                <td className='whitespace-nowrap pl-3'>
                    <button onClick={continuePayment} className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded">
                        {paying ? <Loader /> : "Continue Payment"}
                    </button>
                </td>
            }
        </tr >
    )
}