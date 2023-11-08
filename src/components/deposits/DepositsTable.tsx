import useAuth from '@/hooks/useAuth';
import { IDeposit } from '@/types';
import DepositCard from './DepositCard';

interface Props {
    deposits: IDeposit[]
}
export default function DepositsTable({ deposits }: Props) {
    const { user } = useAuth();
    return (
        <div className="mt-4 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                    ID
                                </th>

                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Amount
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Initialized At
                                </th>
                                {user?.isAdmin && <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Deposited By
                                </th>}
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Status
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {deposits.map((deposit, index) => (
                                <DepositCard key={index} {...deposit} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}