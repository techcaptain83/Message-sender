import axios from '@/axios.config'
import useAuth from '@/hooks/useAuth'
import { showPurchaseMinutesModalAtom } from '@/store/atoms'
import { IAuthUser } from '@/types'
import { MINUTES_IN_SLOT, SLOT_PRICE, UIDHASH } from '@/utils/constants'
import { PhoneIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRecoilState } from 'recoil'
import { Button } from '../Button'
import { TextField } from '../Fields'
import ModalLayout from '../layouts/ModalLayout'

export default function PurchaseMinutes() {
    const [showModal, setShowModal] = useRecoilState(showPurchaseMinutesModalAtom);
    const [slots, setSlots] = useState(1);
    const [purchasingWithBalance, setPurchasingWithBalance] = useState(false);
    const [purchasingWithBank, setPurchasingWithBank] = useState(false);

    const { user, setUser } = useAuth();

    const localStorageUser = typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem(UIDHASH) || "{}") as IAuthUser : {} as IAuthUser;


    const purchase = async ({ withBalance }: { withBalance: boolean }) => {
        if (user!.balance < slots * SLOT_PRICE && withBalance) {
            toast.error("You don't have enough balance to purchase these slots");
            return;
        }
        withBalance ? setPurchasingWithBalance(true) : setPurchasingWithBank(true);
        try {
            const { data } = await axios.post(`/users/purchase-minutes/${user ? user._id : localStorageUser._id}`, {
                slots,
                paidWithBalance: withBalance
            });
            setUser(data.user);
            localStorage.setItem(UIDHASH, JSON.stringify(data.user));
            toast.success("Minutes Purchased successfully");
            setShowModal(false);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! try again later.");
        }
        finally {
            withBalance ? setPurchasingWithBalance(false) : setPurchasingWithBank(false);
        }
    }


    return (
        <ModalLayout open={showModal} setOpen={() => setShowModal(false)} >
            <div className='w-full flex flex-col items-center gap-2'>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <PhoneIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h2 className='font-medium text-xl text-gray-600'>Purchase Minutes</h2>
                <p className='text-gray-600'>each 15-minutes slot costs ${SLOT_PRICE}</p>
            </div>
            <div
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"
            >
                <TextField
                    className="col-span-full"
                    label="Enter Number of 15-minutes slots"
                    id="slots"
                    value={slots}
                    name="slots"
                    type="number"
                    min={1}
                    onChange={(e) => setSlots(e.target.value)}
                    required
                />
                <p className='text-center py-2 bg-gray-100 col-span-full rounded-sm'>Minutes : {slots * MINUTES_IN_SLOT}, Price : ${slots * SLOT_PRICE}</p>

                <div className="col-span-full flex items-center space-x-2">
                    <Button
                        disabled={purchasingWithBalance || purchasingWithBank}
                        type="button"
                        variant="solid"
                        color="blue"
                        className="w-full"
                        onClick={() => purchase({ withBalance: true })}

                    >
                        {purchasingWithBalance ?
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-50" /> :
                            <span>
                                Pay with balance
                            </span>}
                    </Button>
                    <Button
                        disabled={purchasingWithBalance || purchasingWithBank}
                        type="button"
                        variant="solid"
                        color="blue"
                        className="w-full"
                        onClick={() => purchase({ withBalance: false })}
                    >
                        {purchasingWithBank ?
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-50" /> :
                            <span>
                                Pay with bank <span aria-hidden="true">&rarr;</span>
                            </span>}
                    </Button>
                </div>
            </div>
        </ModalLayout>
    )
}
