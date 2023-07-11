import axiosInstance from '@/axios.config'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import Loader from '@/components/Loader'
import { Logo } from '@/components/Logo'
import { serialNumberEmailAtom, showSuccessfulSignupAtom } from '@/store/atoms'
import { countries } from '@/store/countries'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRecoilState } from 'recoil'


export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [_, setShowSuccess] = useRecoilState(showSuccessfulSignupAtom);
  const [_sn, setSerialNumberEmail] = useRecoilState(serialNumberEmailAtom);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'United Kingdom',
    referredBy: ''
  })



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
        toast.success("successfully registered")
        setSerialNumberEmail({
          serialNumber: data.user.serialNumber,
          email: data.user.email
        });
        setShowSuccess(true);
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
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <Logo className="h-10 w-auto" />
          </Link>

        </div>
        <form
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
        </form>
      </AuthLayout>
    </>
  )
}