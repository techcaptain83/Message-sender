import { Button } from '@/components/Button';
import UserDashboardLayout from '@/components/layouts/UserDashboardLayout';
import useAuth from '@/hooks/useAuth';
import { showPurchaseMinutesModalAtom } from '@/store/atoms';
import { PlusIcon } from '@heroicons/react/20/solid';
import Head from 'next/head';
import { useRecoilState } from 'recoil';

export default function Reservations() {
  const { user } = useAuth();
  const [_, setShowModal] = useRecoilState(showPurchaseMinutesModalAtom);
  return (
    <UserDashboardLayout>
      <Head>
        <title>Chatmaid - Reservations</title>
      </Head>
      <main className='space-y-4 px-6'>
        <header>
          {/* Heading */}
          <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-white sm:flex-row sm:items-center">
            <div className='space-y-3'>
              <h1 className="text-xl font-semibold leading-6 text-gray-700">
                System Usage Reservations
              </h1>
              <p className="text-sm leading-6 text-gray-600 max-w-2xl">
                Here, you can reserve system usage for specific time slots, view your reservations and cancel them.
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <p>Available minutes : <span className='bg-green-100 text-green-500 p-1 rounded-md text-sm font-medium'>
                {user?.plan === "free" ? '15 minutes' : user?.plan === "enterprise" ? "Unlimited minutes" : user?.availableTime}
              </span></p>
              {user?.plan !== "enterprise" && <Button
                onClick={() => setShowModal(true)}
                variant='solid' color='blue' className='rounded-md'>
                <span>Get more minutes</span>
                <PlusIcon className='w-6 h-6' />
              </Button>}
            </div>
          </div>
        </header>
        {
          user?.plan === "enterprise" ?
            <div className='min-h-[60vh] bg-gray-100 rounded-lg mt-6 py-6 flex flex-col items-center justify-center gap-6'>
              <h1 className='text-xl font-semibold text-gray-700'>You are on an enterprise plan, you can use the system without any restrictions.</h1>
            </div>
            :
            <div className='min-h-[60vh] bg-gray-100 rounded-lg mt-6 py-6 flex flex-col items-center justify-center gap-6'>
              <h1 className='text-xl font-semibold text-gray-700'>The other parts are still in development. not yet in production!</h1>
            </div>
        }
      </main>
    </UserDashboardLayout>
  )
}
