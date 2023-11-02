import { showScanCodeState, showUploadFileState } from '@/atoms';
import useContacts from '@/hooks/useContacts';
import { showNoApiModalAtom, showNoReservationModalAtom } from '@/store/atoms';
import React from 'react'
import { useRecoilState } from 'recoil';
import Loader from '../Loader';
import useAuth from '@/hooks/useAuth';
import useWhatsappAPI from '@/hooks/useWhatsappApi';

export default function ContactsTableHeader() {
    const { filter, setFilter, phoneConnected, activeReservation, searchingActiveReservation, logout, loggingOut, setActiveReservation, searchForActiveReservation } = useContacts();
    const [_showUploadFile, setShowUploadFile] = useRecoilState(showUploadFileState);
    const [_, setShowScanCode] = useRecoilState(showScanCodeState);
    const [_ss, setShowNoReservation] = useRecoilState(showNoReservationModalAtom);
    const [__, setShowNoApi] = useRecoilState(showNoApiModalAtom);
    const { user } = useAuth();
    const { clearQueue } = useWhatsappAPI();


    return (
        <div className="sm:flex sm:items-center justify-between">
            <div className="">
                <h1 className="text-sm font-semibold leading-6 text-gray-900">Users</h1>
            </div>
            <input
                id="filterInput"
                value={filter}
                onChange={(e) => { setFilter(e.target.value) }}
                placeholder="Filter by name, phone number,country code..."
                className="border-2 placeholder:text-sm py-1 px-5 w-2/4 focus:ring-1 ring-blue-600 focus:outline-none"
            />
            {
                (user?.plan !== "enterprise" && phoneConnected && activeReservation) && (
                    // countdown showing when the phone will be disconnected
                    <div>
                        <p className="text-sm text-gray-600">Your phone will be disconnected in <span className="text-red-600 font-semibold"> {new Date(activeReservation!.endsAt).getMinutes() - new Date().getMinutes()} minutes</span></p>
                    </div>
                )
            }

            <div className=" sm:ml-16 sm:mt-0 flex gap-2">
                {
                    !phoneConnected ? (
                        <button
                            onClick={async () => {
                                if (user?.plan === "enterprise") {
                                    user?.api ? setShowScanCode(true) : setShowNoApi(true);
                                } else {
                                    const reservation = await searchForActiveReservation();
                                    if (reservation) {
                                        const data = await clearQueue();
                                        if (data.success === "done") {
                                            setShowScanCode(true);
                                            setActiveReservation(reservation);
                                        } else {
                                            await clearQueue();
                                            setShowScanCode(true);
                                            setActiveReservation(reservation);
                                        }
                                    } else {
                                        setShowNoReservation(true);
                                    }
                                }
                            }}
                            type="button"
                            className="block rounded-md  bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 capitalize"
                        >
                            {searchingActiveReservation ? <Loader /> : "Connect Your Phone"}
                        </button>
                    ) :
                        <button
                            onClick={() => logout()}
                            type="button"
                            className="block rounded-md  bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 capitalize"
                        >
                            {loggingOut ? <Loader /> : "Disconnect Phone"}
                        </button>
                }
                <button
                    onClick={() => setShowUploadFile(true)}
                    type="button"
                    className="block rounded-md  bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 capitalize"
                >
                    upload a new list
                </button>
            </div>
        </div>
    )
}
