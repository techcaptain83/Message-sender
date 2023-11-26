import { showVerifyEmailModalAtom } from '@/store/atoms'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import ModalLayout from '../layouts/ModalLayout';
import { Dialog } from '@headlessui/react';
import { MdMarkEmailRead } from "react-icons/md";
import { Button } from '../Button';
import useAuth from '@/hooks/useAuth';
import axios from '@/axios.config';
import toast from 'react-hot-toast';
import Loader from '../Loader';


export default function VerifyEmail() {
    const { user, updateUser } = useAuth();
    const [show, setShow] = useRecoilState(showVerifyEmailModalAtom);
    const [step, setStep] = useState<"send" | "verify">("send");
    const [sendingCode, setSendingCode] = useState(false);
    const [code, setCode] = useState("");
    const [verifying, setVerifying] = useState(false);

    const sendCode = async () => {
        setSendingCode(true);
        try {
            const { data } = await axios.post(`/users/send-verification-code/${user?._id}`);
            if (data.success) {
                setStep("verify");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! try again later.");
        } finally {
            setSendingCode(false);
        }
    }

    const verifyCode = async () => {
        setVerifying(true);
        try {
            const { data } = await axios.post(`/users/verify-code/${user?._id}`, {
                code
            });
            if (data.success) {
                updateUser(data.user);
                toast.success("Email verified successfully");
                setShow(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! try again later.");
        } finally {
            setVerifying(false);
        }
    }

    return (
        <ModalLayout open={show} setOpen={() => { }}>
            <div className='w-full flex flex-col items-center gap-2'>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <MdMarkEmailRead className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                {step === "send" ? <>
                    <div className="mt-3 text-center sm:mt-5 mb-4">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                            Verify your email
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                You need to verify your email to use Our app.
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <Button
                            onClick={sendCode}
                            disabled={sendingCode}
                            className="w-full flex justify-center"
                        >
                            {sendingCode ? <Loader /> : "Send Verification Code"}
                        </Button>
                    </div>
                </>
                    :
                    <>
                        <div className="mt-3 text-center sm:mt-5 mb-4">
                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                Verify your email
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Enter the code we sent to your email
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <input
                                min={6}
                                max={6}
                                type="text"
                                className="border border-gray-300 rounded-md w-full p-2"
                                placeholder="Enter Code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                        <div className="w-full flex justify-center">
                            <Button
                                onClick={verifyCode}
                                className="w-full flex justify-center"
                                loading={verifying}
                            >
                                {verifying ? <Loader /> : "Verify"}
                            </Button>
                        </div>
                    </>
                }
            </div>
        </ModalLayout>
    )
}
