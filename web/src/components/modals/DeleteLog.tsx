import { logToDeleteState, showDeleteLogState } from '@/atoms';
import useLogs from '@/hooks/useLogs';
import { Dialog } from '@headlessui/react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRecoilState } from 'recoil';
import ModalLayout from '../layouts/ModalLayout';

export default function DeleteLog() {
    const [showDeleteLog, setShowDeleteLog] = useRecoilState(showDeleteLogState);
    const [logToDelete, setLogToDelete] = useRecoilState(logToDeleteState);
    const { deletingLog,deleteLog } = useLogs();


    return (
        <ModalLayout open={showDeleteLog} setOpen={() => setShowDeleteLog(false)}>
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => setShowDeleteLog(false)}
                >
                    <span className="sr-only">Cancel</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Delete Logs
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Are you sure you want to delete logs for  <span className='font-semibold text-gray-900'>
                                {logToDelete?.filename}
                            </span> created on <span className='font-semibold text-gray-900'>{new Date(logToDelete! .createdAt).toLocaleString()}</span>? All of its data will be permanently removed
                            from our servers forever. This action cannot be undone.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    disabled={deletingLog}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => deleteLog(logToDelete?._id)}
                >
                    {deletingLog ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-50" />) :
                        <span>Delete</span>
                    }
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setShowDeleteLog(false)}
                >
                    Cancel
                </button>
            </div>
        </ModalLayout>
    )
}
