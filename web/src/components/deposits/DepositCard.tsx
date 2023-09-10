import useAuth from '@/hooks/useAuth';
import { IDeposit } from '@/types';
import { constructName } from '@/utils';


export default function DepositCard({ _id, amount, depositedBy, createdAt, status }: IDeposit) {
    const { user } = useAuth();

    return (
        <tr className="even:bg-gray-50">
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">{_id}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">{amount}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">{new Date(createdAt).toLocaleString()}</td>
            {user?.isAdmin && <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-800 sm:pl-3">
                {constructName(depositedBy.firstName, depositedBy.lastName)}
            </td>}
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800">{status}</td>
            
        </tr >
    )
}