import { accountToSuspendAtom, showSuspendAccountAtom } from '@/store/atoms';
import { Dialog } from '@headlessui/react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import ModalLayout from '../layouts/ModalLayout';

export default function SuspendAccount() {
  const [showSuspendAccount, setShowSuspendAccount] = useRecoilState(showSuspendAccountAtom);

  const [accountToSuspend, setAccountToSuspend] = useRecoilState(accountToSuspendAtom);
  const [loading, setLoading] = useState(false);

  const handleSuspendAccount = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuspendAccount(false);
    }, 2000);

    setTimeout(() => {
      toast.success('Account Suspended successfully');
    }, 1200);
  }

  return (
    <ModalLayout open={showSuspendAccount} setOpen={() => setShowSuspendAccount(false)}>
      <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
        <button
          type="button"
          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setShowSuspendAccount(false)}
        >
          <span className="sr-only">Close</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon className="h-6 w-6 text-orange-500" aria-hidden="true" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
            Suspend account
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to suspend account of  {accountToSuspend}? This user will be locked out of his account. To reverse this, you will have to activate his/her account again.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          disabled={loading}
          className="inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 sm:ml-3 sm:w-auto"
          onClick={handleSuspendAccount}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-50" />) :
            <span>Suspend</span>
          }
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setShowSuspendAccount(false)}
        >
          Cancel
        </button>
      </div>
    </ModalLayout>
  )
}
