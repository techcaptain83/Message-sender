import Head from 'next/head'
import Link from 'next/link'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import Loader from '@/components/Loader'
import { AuthLayout } from '@/components/layouts/AuthLayout'
import Logo from '@/components/logo'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

export default function Login() {
    const { loading, signIn } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        serialNumber: 0
    });
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signIn(formData.email, formData.serialNumber)
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
                            Don’t have an account?{' '}
                            <Link
                                rel='noreferrer'
                                target='_blank'
                                href="https://watsapp-messenger.vercel.app/register"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                Sign up
                            </Link>{' '}
                            for a free trial.
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
                    <TextField
                        label="Serial number"
                        id="serialNumber"
                        name="serialNumber"
                        type="number"
                        value={formData.serialNumber}
                        onChange={(e) => setFormData({ ...formData, serialNumber: parseInt(e.target.value) })}
                        required
                    />
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
