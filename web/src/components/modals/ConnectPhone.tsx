import { Dialog } from '@headlessui/react';
import ModalLayout from '../layouts/ModalLayout';
import { useRecoilState } from 'recoil';
import { showConnectPhoneModalAtom } from '@/store/atoms';
import useAuth from '@/hooks/useAuth';

export default function ConnectPhone() {
    const [show, setShow] = useRecoilState(showConnectPhoneModalAtom);
    const { user } = useAuth();

    /* 
        1.check user plan
        2.if enterprise, show qr code
        3.if premium, check if he has active reservation, if no, tell him to check reservations.
        4. if free, check if he has used his 15 minutes for testing. if yes, tell him to upgrade to premium. if no, show qr code and tell him that he will get 15 minutes of connnection.
    */

    return (
        <ModalLayout open={show} large setOpen={() => setShow(false)}>
            <div className='w-full flex  justify-between flex-col md:flex-row'>
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Connect your phone
                        </Dialog.Title>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex space-y-3 sm:space-y-0 sm:flex-row-reverse">
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setShow(false)}
                >
                    Cancel
                </button>
            </div>

        </ModalLayout>
    )
}
