import Head from 'next/head'
import Link from 'next/link'
import { loadStripe } from "@stripe/stripe-js"
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { FormEvent, useState } from 'react'
import axios from "axios";
import Loader from '@/components/Loader'
import { useRouter } from 'next/router'

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
  }

  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;


      const { data } = await axios.post('/api/create-stripe-checkout-session', {
        amount: 12,
        currency: 'usd',
      });
      const { sessionId, url } = data;
      const result = await stripe?.redirectToCheckout({
        sessionId,
      });
    } catch (error) {
      // console.log(error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - Chatmaid</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>

        </div>
        <form
          action="#"
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
        >
          <TextField
            label="First name"
            id="first_name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
          />
          <TextField
            label="Last name"
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
          <SelectField
            className="col-span-full"
            label="How did you hear about us?"
            id="referral_source"
            name="referral_source"
          >
            <option>Discord</option>
            <option>Our online commercials</option>
            <option>From a friend</option>
            <option>Other</option>
          </SelectField>
          <div className="col-span-full">
            <Button
              disabled={loading}
              type="submit"
              variant="solid"
              color="blue"
              className="w-full"
            >
              {loading ? <Loader /> :
                <span>
                  Get Serial number <span aria-hidden="true">&rarr;</span>
                </span>}
            </Button>
          </div>
        </form>
      </AuthLayout>
    </>
  )
}