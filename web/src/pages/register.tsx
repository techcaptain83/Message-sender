/* eslint-disable react-hooks/exhaustive-deps */
import axiosInstance from '@/axios.config'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import Loader from '@/components/Loader'
import { Logo } from '@/components/Logo'
import SelectPlan from '@/components/auth/SelectPlan'
import UpgradeToPremium from '@/components/modals/UpgradeToPremium'
import useAuth from '@/hooks/useAuth'
import { selectedPlanAtom, serialNumberEmailAtom, showPayAtom, showSelectPlanAtom, showSuccessfulSignupAtom } from '@/store/atoms'
import { countries } from '@/store/countries'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRecoilState } from 'recoil'


export default function Register() {
  // const [os, setOs] = useRecoilState(selectedOSAtom);
  const [plan, setPlan] = useRecoilState(selectedPlanAtom);
  const { updateUser } = useAuth();
  const [showPay, setShowPay] = useRecoilState(showPayAtom);
  // const [showSelectOs, setShowSelectOs] = useRecoilState(showSelectOsAtom);
  const [showSelectPlan, setShowSelectPlan] = useRecoilState(showSelectPlanAtom);


  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [_, setShowSuccess] = useRecoilState(showSuccessfulSignupAtom);
  const [_sn, setSerialNumberEmail] = useRecoilState(serialNumberEmailAtom);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: 'United Kingdom',
    phone: '',
    referredBy: ''
  })


  useEffect(() => {
    const { os, plan } = router.query;
    // if (os && (os === "win" || os === "mac")) {
    //   setOs(os);
    // }
    if (plan && (plan === "free" || plan === "premium")) {
      setPlan(plan);
    } else {
      setPlan(null);
    }
  }, [router.query]);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.email === formData.referredBy) {
        toast.error("You cannot refer yourself");
        return;
      }
      if (formData.firstName.length < 3) {
        toast.error("First name must be atleast 3 characters");
        return;
      }
      if (formData.lastName.length < 3) {
        toast.error("Last name must be atleast 3 characters");
        return;
      }
      // console.log(formData);

      const { data } = await axiosInstance.post('/auth/signup', formData);
      if (data.message === "success") {
        toast.success("successfully registered");
        updateUser(data.user);
        router.push("/dashboard");
        // if (!plan) {
        //   setShowSelectPlan(true);
        // } else if (plan === "free") {
        //   router.push("/dashboard");
        // } else {
        //   setShowPay(true);
        // }
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up - Chatmaid</title>
      </Head>
      <div className="flex flex-col">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
        <p className="mt-4 text-sm text-gray-700">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      {(!showSelectPlan && !showPay) && <form
        onSubmit={handleSubmit}
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <TextField
          label="First name"
          id="first_name"
          name="first_name"
          type="text"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          autoComplete="given-name"
          required
        />
        <TextField
          label="Last name"
          id="last_name"
          name="last_name"
          type="text"
          value={formData.lastName}
          autoComplete="family-name"
          required
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        />
        <TextField
          className="col-span-full"
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
          className="col-span-full"
          label="Phone number"
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          autoComplete="tel"
          required
        />
        <TextField
          className="col-span-full"
          label="Password"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          autoComplete="email"
          required
        />
        <SelectField
          className="col-span-full"
          label="Country"
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          id="country"
          value={formData.country}
          name="country"
          required
        >
          {
            countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))
          }
        </SelectField>
        <TextField
          className="col-span-full"
          label="Referred by (email)"
          id="referred_by"
          name="referred_by"
          type="email"
          value={formData.referredBy}
          onChange={(e) => setFormData({ ...formData, referredBy: e.target.value })}
        // autoComplete="email"
        // required
        />
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
                continue <span aria-hidden="true">&rarr;</span>
              </span>}
          </Button>
        </div>
      </form>}
      {/* {showSelectOs && <SelectOs />} */}
      {showSelectPlan && <SelectPlan />}
      {showPay && <UpgradeToPremium />}
    </>
  )
}