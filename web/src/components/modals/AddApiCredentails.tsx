import useDeposits from '@/hooks/useDeposits'
import { showAddCredentialsModalAtom } from '@/store/atoms'
import { CodeBracketIcon } from '@heroicons/react/20/solid'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useRecoilState } from 'recoil'
import { Button } from '../Button'
import { TextField } from '../Fields'
import ModalLayout from '../layouts/ModalLayout'
import useUsers from '@/hooks/useUsers'
import useAuth from '@/hooks/useAuth'

export default function AddApiCredentials() {
    const [showModal, setShowModal] = useRecoilState(showAddCredentialsModalAtom);
    const { user } = useAuth();
    const { addingCredentials, addApiCredentials } = useUsers();
    const [instanceId, setInstanceId] = useState('');
    const [token, setToken] = useState('');


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (token.length < 5 || instanceId.length < 5) {
            toast.error("Instance Id and Token must be greater than 5 characters");
            return;
        }
        addApiCredentials(showModal.user?._id!, instanceId, token);
    }
    return (
        <ModalLayout open={showModal.show} setOpen={() => setShowModal({
            user: null,
            show: false
        })} >
            <div className='w-full  flex flex-col items-center gap-2'>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <CodeBracketIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <p className='font-medium text-lg text-gray-600 w-full'>Add Api credentials to <span>{showModal.user?.email} </span></p>
                <p>you can obtain those credentials from ultramsg.com by creating an instance.</p>
            </div>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
            >
                <TextField
                    className="col-span-full"
                    label="Insance Id"
                    id="instanceId"
                    placeholder="ex : instance2345"
                    value={instanceId}
                    name="insanceId"
                    type="text"
                    onChange={(e) => setInstanceId(e.target.value)}
                    required
                />
                <TextField
                    className="col-span-full"
                    label="Token"
                    id="token"
                    placeholder="ex : pwj223o51dntp1z8"
                    value={token}
                    name="token"
                    type="text"
                    onChange={(e) => setToken(e.target.value)}
                    required
                />

                <div className="col-span-full">
                    <Button
                        disabled={addingCredentials}
                        type="submit"
                        variant="solid"
                        color="blue"
                        className="w-full"
                    >
                        {addingCredentials ?
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-50" /> :
                            <span>
                                Save
                            </span>}
                    </Button>
                </div>
            </form>
        </ModalLayout>
    )
}
