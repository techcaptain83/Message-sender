import { selectedFileState, showDeleteFileState, showUploadFileState } from '@/atoms';
import useFiles from '@/hooks/useFiles';
import { Dialog } from '@headlessui/react';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRecoilState } from 'recoil';
import ModalLayout from '../layouts/ModalLayout';
import { ArrowUpOnSquareIcon } from '@heroicons/react/20/solid';

export default function UploadFile() {
    const [showUploadFile, setShowUploadFile] = useRecoilState(showUploadFileState);
    const [selectedFile, setSelectedFile] = useRecoilState(selectedFileState);
    const { uploadingFile, uploadFile } = useFiles();


    return (
        <ModalLayout open={showUploadFile} setOpen={() => setShowUploadFile(false)}>
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => setShowUploadFile(false)}
                >
                    <span className="sr-only">Cancel</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ArrowUpOnSquareIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Upload File
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Select a file containing a list of users you want to contact and upload it here.The file must have a .csv extension.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                    type="button"
                    disabled={uploadingFile}
                    className="inline-flex relative w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                    {uploadingFile ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-50" />) :
                        <span>select file</span>
                    }
                    {!uploadingFile && <input
                        type="file"
                        accept='.csv'
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                            if (e.target.files) {
                                const file = e.target.files[0];
                                if (file) {
                                    uploadFile(e);
                                }
                            }
                        }}
                    />}
                </button>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setShowUploadFile(false)}
                >
                    Cancel
                </button>
            </div>
        </ModalLayout>
    )
}
