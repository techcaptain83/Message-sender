import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function SendingMessages() {
    return (
        <Transition.Root show={true} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                onClose={() => { }}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className={`relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5  shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 flex items-center justify-center flex-col gap-y-4 min-h-[25vh]`}>
                                <div
                                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"
                                />
                                <h2 className='text-2xl font-medium text-gray-600'>Sending messages .....</h2>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
