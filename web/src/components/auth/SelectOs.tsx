import { selectedOSAtom, selectedPlanAtom, showPayAtom, showSelectOsAtom, showSelectPlanAtom, showSuccessfulSignupAtom } from '@/store/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '../Button';
import { SelectField } from '../Fields';

export default function SelectOs() {
    const [os, setOs] = useRecoilState(selectedOSAtom);
    const [_, setShowSelectOs] = useRecoilState(showSelectOsAtom);
    const selectedPlan = useRecoilValue(selectedPlanAtom);
    const [_s, setShowSelectPlan] = useRecoilState(showSelectPlanAtom);
    const [_p, setShowPay] = useRecoilState(showPayAtom);
    const [_ss, setShowSuccess] = useRecoilState(showSuccessfulSignupAtom);

    return (
        <div className="mt-6 rounded-md min-h-[30vh] px-4 py-6 shadow border space-y-5 flex flex-col justify-between">
            <p className='text-gray-700'>Which os are you going to use?</p>
            <SelectField
                onChange={(e) => {
                    if (e.target.value === '') return
                    setOs(e.target.value);
                }}
                value={os}
                label={'select os'} id={"os"}>
                <option value={''}>select</option>
                <option value={'win'}>Windows</option>
                <option value={'mac'}>Mac OS</option>
            </SelectField>
            <Button
                onClick={() => {
                    if (!os) return;
                    setShowSelectOs(false);
                    if (!selectedPlan) {
                        setShowSelectPlan(true);
                    } else if (selectedPlan === "premium") {
                        setShowPay(true);
                    } else {
                        setShowSuccess(true);
                    }
                }}
                disabled={!os}
                type="submit"
                variant="solid"
                color="blue"
                className={`w-full ${!os && "cursor-not-allowed"}`}
            >
                <span>
                    continue <span aria-hidden="true">&rarr;</span>
                </span>
            </Button>
        </div>
    )
}