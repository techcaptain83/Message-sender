import { showNoApiModalAtom } from '@/store/atoms';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { useRecoilState } from 'recoil';
import { Button } from '../Button';
import ModalLayout from '../layouts/ModalLayout';
import { useRouter } from 'next/router';

export default function NoApi() {
    const [show, setShow] = useRecoilState(showNoApiModalAtom);
    const router = useRouter();

    return (
        <ModalLayout open={show} large setOpen={() => setShow(false)}>
            <div className='w-full flex flex-col items-center gap-2'>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <ExclamationCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <h2 className='font-medium text-xl text-gray-600'>We haven&apos;t assigned api credentials to your account! </h2>
            </div>
            <div className='w-full min-h-[10vh] bg-gray-50 rounded-lg mt-6 py-6 flex flex-col items-center justify-center gap-6'>
                <h1 className='text-xl font-semibold text-gray-700'>
                    Please wait or contact support
                </h1>
                <Button variant='solid' color='blue'
                    onClick={() => {
                        router.push("/dashboard/support")
                        setShow(false);
                    }}
                    className='rounded-md'>
                    Contact Support
                </Button>
            </div>
        </ModalLayout>
    )
}
