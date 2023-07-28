import axios from '@/axios.config'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import Loader from '@/components/Loader'
import { Logo } from '@/components/Logo'
import useAuth from '@/hooks/useAuth'
import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'


export default function Login() {

  const { signIn, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(formData.email, formData.password);
  }
  return (
    <>
      <Head>
        <title>Sign In - Chatmaid</title>
      </Head>
      <div className="flex flex-col">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
        <div className="mt-20">
          <h2 className="text-lg font-semibold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Don’t have an account?{' '}
            <Link
              href="/register"
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
          label="Password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          type="password"
          autoComplete="current-password"
          required
        />
        <div>
          <Button
            type="submit"
            variant="solid"
            color="blue"
            className="w-full"
          >
            <span>
              {loading ? <Loader /> : "Sign in"}
            </span>
          </Button>
        </div>
      </form>
    </>
  )
}
