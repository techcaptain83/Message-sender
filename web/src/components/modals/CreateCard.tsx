import useCards from '@/hooks/useCards'
import { showCreateCardModalAtom } from '@/store/atoms'
import { ICard } from '@/types'
import { CreditCardIcon } from '@heroicons/react/20/solid'
import { FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRecoilState } from 'recoil'
import { Button } from '../Button'
import { TextField } from '../Fields'
import ModalLayout from '../layouts/ModalLayout'

export default function CreateCard() {
    const [showModal, setShowModal] = useRecoilState(showCreateCardModalAtom);
    const { creatingCard, createCard } = useCards();
    const [formData, setFormData] = useState<ICard>({
        cvv: '',
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cardType: "VISA"
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.cvv.length !== 3) {
            toast.error("CVV must be 3 digits");
            return;
        }
        if (formData.cardNumber.length !== 16) {
            toast.error("Card Number must be 16 digits");
            return;
        }
        if (formData.expMonth.length !== 2) {
            toast.error("Expiration Month must be 2 digits");
            return;
        }
        if (formData.expYear.length !== 2) {
            toast.error("Expiration Year must be 2 digits");
            return;
        }
        createCard(formData, true);
    }

    return (
        <ModalLayout open={showModal} setOpen={() => setShowModal(false)} >
            <div className='w-full flex flex-col items-center gap-2'>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <CreditCardIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h2 className='font-medium text-xl text-gray-600'>Add A new Card </h2>
            </div>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
            >
                <TextField
                    label="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    required
                />

                <TextField
                    label="CVV"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    id="cvv"
                    name="cvv"
                    type="text"
                    required
                />

                <TextField
                    label="Expiration Month"
                    value={formData.expMonth}
                    onChange={(e) => setFormData({ ...formData, expMonth: e.target.value })}
                    id="expMonth"
                    name="expMonth"
                    type="text"
                    required

                />

                <TextField
                    label="Expiration Year"
                    value={formData.expYear}
                    onChange={(e) => setFormData({ ...formData, expYear: e.target.value })}
                    id="expYear"
                    name="expYear"
                    type="text"
                    required
                />


                <div className="col-span-full">
                    <Button
                        disabled={creatingCard}
                        type="submit"
                        variant="solid"
                        color="blue"
                        className="w-full"
                    >
                        {creatingCard ?
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-50" /> :
                            <span>
                                Create Card <span aria-hidden="true">&rarr;</span>
                            </span>}
                    </Button>
                </div>
            </form>
        </ModalLayout>
    )
}
