import { PlusIcon } from '@heroicons/react/20/solid'
import { Button } from '../Button'
import { TextField } from '../Fields'
import ModalLayout from '../layouts/ModalLayout'
import { FormEvent, useState } from 'react'
import { useRecoilState } from 'recoil'
import { showAddUserModalAtom } from '@/store/atoms'
import { toast } from 'react-hot-toast'

export default function AddUser() {
    const [showModal, setShowModal] = useRecoilState(showAddUserModalAtom);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowModal(false);
        }
            , 2000);
        setTimeout(() => {
            toast.success('User added successfully');
        }, 1200);
    }
    return (
        <ModalLayout open={showModal} setOpen={() => setShowModal(false)} >
            <div className='w-full flex flex-col items-center gap-2'>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <PlusIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h2 className='font-medium text-xl text-gray-600'>Add A new User </h2>
            </div>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
            >
                <TextField
                    label="First name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    id="first_name"
                    name="first_name"
                    type="text"
                    autoComplete="given-name"
                    required
                />
                <TextField
                    label="Last name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    id="last_name"
                    name="last_name"
                    type="text"
                    autoComplete="family-name"
                    required
                />
                <TextField
                    className="col-span-full"
                    label="Email address"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                />
                <TextField
                    className="col-span-full"
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                />

                <div className="col-span-full">
                    <Button
                        disabled={loading}
                        type="submit"
                        variant="solid"
                        color="blue"
                        className="w-full"
                    >
                        {loading ?
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-50" /> :
                            <span>
                                Sign up <span aria-hidden="true">&rarr;</span>
                            </span>}
                    </Button>
                </div>
            </form>
        </ModalLayout>
    )
}
