import { selectedPlanAtom, showPayAtom, showSelectPlanAtom, showSuccessfulSignupAtom } from '@/store/atoms';
import { useRecoilState } from 'recoil';
import { Button } from '../Button';
import { SelectField } from '../Fields';

export default function SelectPlan() {
    const [plan, setPlan] = useRecoilState(selectedPlanAtom);
    const [_, setShowSelectPlan] = useRecoilState(showSelectPlanAtom);
    const [_p, setShowPay] = useRecoilState(showPayAtom);
    const [_ss, setShowSuccess] = useRecoilState(showSuccessfulSignupAtom);

    return (
        <div className="mt-6 rounded-md min-h-[30vh] px-4 py-6 shadow border space-y-5 flex flex-col justify-between">
            <p className='text-gray-700'>What plan do you prefer?</p>
            <SelectField
                onChange={(e) => {
                    if (e.target.value === '') return
                    setPlan(e.target.value);
                }}
                value={plan}
                label={'select plan'} id={"plan"}>
                <option value={''}>select</option>
                <option value={'free'}>Free</option>
                <option value={'mac'}>Premium ($79.99)</option>
            </SelectField>
            <Button
                onClick={() => {
                    if (!plan) return;
                    setShowSelectPlan(false);
                    if (plan === "free") {
                        setShowSuccess(true);
                    } else {
                        setShowPay(true);
                    }
                }}
                disabled={!plan}
                type="submit"
                variant="solid"
                color="blue"
                className={`w-full ${!plan && "cursor-not-allowed"}`}
            >
                <span>
                    continue <span aria-hidden="true">&rarr;</span>
                </span>
            </Button>
        </div>
    )
}
