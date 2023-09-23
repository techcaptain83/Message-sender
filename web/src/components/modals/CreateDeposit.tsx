import { showNewDepositModalAtom } from '@/store/atoms'
import { FormEvent, useState } from 'react'
import { BiMoney } from 'react-icons/bi'
import { useRecoilState } from 'recoil'
import { Button } from '../Button'
import { SelectField, TextField } from '../Fields'
import ModalLayout from '../layouts/ModalLayout'
import useDeposits from '@/hooks/useDeposits'
import toast from 'react-hot-toast'
import useCards from '@/hooks/useCards'

export default function CreateDeposit() {
    const [showModal, setShowModal] = useRecoilState(showNewDepositModalAtom);
    const { createDeposit, creatingDeposit } = useDeposits();
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const { cards } = useCards();
    const [amount, setAmount] = useState(1);


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (amount < 1) {
            toast.error("Amount must be greater than $1");
            return;
        }
        if (!selectedCard) {
            toast.error("Please select a card");
            return;
        }
        createDeposit(amount, selectedCard);
    }
    return (
        <ModalLayout open={showModal} setOpen={() => setShowModal(false)} >
            <div className='w-full flex flex-col items-center gap-2'>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <BiMoney className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h2 className='font-medium text-xl text-gray-600'>Add balance to your account </h2>
            </div>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
            >
                <TextField
                    className="col-span-full"
                    label="Enter Amount"
                    id="amount"
                    value={amount}
                    name="amount"
                    type="number"
                    min={1}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />

                <SelectField
                    className="col-span-full"
                    label="Select Card"
                    id="card"
                    name="card"
                    value={selectedCard}
                    onChange={(e) => setSelectedCard(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Card</option>
                    {cards?.map((card, index) => (
                        <option key={index} value={card._id}>{card.cardNumber} ({card.cardType})</option>
                    ))}
                </SelectField>

                <div className="col-span-full">
                    <Button
                        disabled={creatingDeposit}
                        type="submit"
                        variant="solid"
                        color="blue"
                        className="w-full"
                    >
                        {creatingDeposit ?
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-50" /> :
                            <span>
                                Proceed <span aria-hidden="true">&rarr;</span>
                            </span>}
                    </Button>
                </div>
            </form>
        </ModalLayout>
    )
}
