/* eslint-disable react-hooks/exhaustive-deps */
import PrePageLoader from '@/components/LargeLoader';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from '@/axios.config';
import toast from 'react-hot-toast';
import { decryptText } from '@/utils';
import useAuth from '@/hooks/useAuth';
import { IDeposit } from '@/types';

export default function Payment() {
    const router = useRouter();
    const [processing, setProcessing] = useState(true);
    const [upgradeSuccessful, setUpgradeSuccessful] = useState(false);
    const [depositSuccessful, setDepositSuccessful] = useState(false);
    const [pln, setPlan] = useState("");
    const [deposit, setDeposit] = useState<IDeposit | null>(null);

    const { updateUser, reloadProfile } = useAuth();

    useEffect(() => {
        const { success, uid, reason, plan, dep_id } = router.query;
        const validateDeposit = async () => {
            try {
                const { data } = await axios.post(`/deposits/validate/${dep_id}`);
                if (data.success) {
                    setDeposit(data.deposit);
                    setDepositSuccessful(true);
                    setProcessing(false);
                    updateUser(data.user);
                    toast.success("Payment successful.");
                    setTimeout(() => {
                        router.push("/dashboard/deposits")
                    }, 1000);
                }
                else {
                    console.log(data);
                    toast.error("payment has already been validated, or invalid url!")
                    router.push("/dashboard");
                }
            } catch ({ reponse }: any) {
                console.log(reponse);
            }
        }
        const validateUpgrade = async (userId: string) => {
            try {
                const { data } = await axios.post(`/users/validate-upgrade/${userId}`, {
                    plan
                });
                if (data.success) {
                    setPlan(plan as string);
                    setUpgradeSuccessful(true);
                    setProcessing(false);
                    toast.success("Payment successful.");
                    updateUser(data.user);
                    setTimeout(() => {
                        router.push("/dashboard");
                    }, 1000);
                } else {
                    toast.error("payment has already been validated, or invalid url!")
                    router.push("/dashboard");
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (!success || !uid || (!reason && !plan) || (!dep_id && reason === 'deposit')) {
            return;
        }
        const userId = decryptText(uid as string);
        setProcessing(true);
        if (success === "false") {
            toast.error("Payment failed or have been cancelled. Please try again later.");
            reloadProfile(userId, true);
            return;
        }

        if (reason === 'deposit') {
            validateDeposit();
        } else {
            validateUpgrade(userId);
        }
    }, [router.query]);


    return (
        <>
            <Head>
                <title>Chatmaid - Payment</title>
            </Head>
            <main className='w-full h-screen flex items-center justify-center px-2'>
                <div className='w-full sm:w-3/4 lg:w-1/2 h-1/2 border rounded-md shadow-md'>
                    {
                        processing && <div className='w-full h-full flex items-center flex-col gap-4 justify-end'>
                            <PrePageLoader />
                        </div>
                    }
                    {
                        upgradeSuccessful && <div className='w-full h-full flex items-center flex-col gap-4 justify-end'>
                            <h1 className='text-2xl font-semibold text-center'>Payment Successful!</h1>
                            <p className='text-center'>You have successfully upgraded to {pln} plan.</p>
                        </div>
                    }
                    {
                        depositSuccessful && <div className='w-full h-full flex items-center flex-col gap-4 justify-end'>
                            <h1 className='text-2xl font-semibold text-center'>Payment Successful!</h1>
                            <p className='text-center'>You have successfully deposited (${deposit?.amount}) funds to your account.</p>
                        </div>
                    }
                </div>
            </main>
        </>
    )
}
