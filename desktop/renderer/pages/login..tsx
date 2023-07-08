import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import Loader from '@/components/Loader'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import Logo from '@/components/logo'
import useAuth from '@/hooks/useAuth'
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Login() {
    const { loading, signIn } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        serialNumber: ""
    });
    const [filename, setFilename] = useState<string | null>(null);
    const [hasUploadedSerialNumber, setHasUploadedSerialNumber] = useState(false);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signIn(formData.email, formData.serialNumber)
    }

    const getSerialNumberFromFile = async (file: File) => {
        const reader = new FileReader();
        reader.onload = async (e) => {

            const text = (e.target.result as string).trim();

            setFormData({ ...formData, serialNumber: text });
            toast.success("Serial number added successfully");
            setHasUploadedSerialNumber(true);
            setFilename(file.name);
        }
        reader.readAsText(file);
    }

    return (
        <>
            <Head>
                <title>Sign In - Chatmaid</title>
            </Head>
            <AuthLayout>
                <div className="flex flex-col">
                    <Link href="/" aria-label="Home">
                        <Logo className="h-10 w-auto" />
                    </Link>
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-700">
                            you can sign up on the website
                        </p>
                    </div>
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className="mt-10 grid grid-cols-1 gap-y-8">
                    <TextField
                        label="Email address"
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        autoComplete="email"
                        required
                    />
                    <div className="w-full flex flex-col gap-2">
                        <p className='text-sm'>Serial Number</p>
                        <button
                            type="button"
                            // disabled={uploadingFile}
                            className="inline-flex relative w-full justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 sm:w-auto"
                        >
                            {/* {uploadingFile ? ( */}
                            {/* <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-50" />) : */}
                            <div className='flex gap-2 items-center  '>
                                <ArrowUpTrayIcon width={25} />
                                {hasUploadedSerialNumber ? <span>{filename}</span> : <span>select file</span>}
                            </div>
                            {/* } */}
                            {!filename && <input
                                type="file"
                                accept='.txt'
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    file && getSerialNumberFromFile(file);
                                }}
                            />}
                        </button>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            variant="solid"
                            color="blue"
                            className="w-full"
                        >{loading ? <Loader /> :
                            <span>
                                Sign in <span aria-hidden="true">&rarr;</span>
                            </span>
                            }
                        </Button>
                    </div>
                </form>
            </AuthLayout>
        </>
    )
}
