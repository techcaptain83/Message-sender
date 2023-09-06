/* eslint-disable react-hooks/exhaustive-deps */

import StatsCard from '@/components/StatsCard'
import AdminDashboardLayout from '@/components/layouts/AdminDashboardLayout'
import useAuth from '@/hooks/useAuth'
import useUsers from '@/hooks/useUsers'
import { IAuthUser } from '@/types'
import { ENTERPRISE_PRICE, PREMIUM_PRICE } from '@/utils/constants'
import {
    CheckBadgeIcon,
    ScaleIcon, UserGroupIcon
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'


export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const { users, isLoading } = useUsers();

    const calculateAccountBalance = (users: IAuthUser[]) => {
        let balance = 0;
        users.forEach(user => {
            if (user.plan === "pro") {
                balance += PREMIUM_PRICE;
            } else if (user.plan === "enterprise") {
                balance += ENTERPRISE_PRICE;
            }
        });
        return balance.toFixed(2);
    }

    if (!user?.isAdmin) return <div>403 - Forbidden</div>
    return (
        <AdminDashboardLayout>
            <div className="mx-auto  px-4 sm:px-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">Overview</h2>
                <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                    <StatsCard name='Account Balance' value={`$${users ? calculateAccountBalance(users) : undefined}`} Icon={ScaleIcon} />
                    <StatsCard name='Total Users' value={users?.length} Icon={UserGroupIcon} />
                    <StatsCard name='Premium Users' value={users?.filter(user => user.plan === "pro").length} Icon={CheckBadgeIcon} />
                    <StatsCard name='Enterprise Users' value={users?.filter(user => user.plan === "enterprise").length} Icon={CheckBadgeIcon} />
                    <StatsCard name='Free Trial Users' value={users?.filter(user => user.plan === "free").length} Icon={CheckBadgeIcon} />
                </div>
            </div>
            <div className='min-h-[50vh]  m-6 bg-gray-100 flex items-center justify-center'>
                <p>Stats Graphs (coming soon...)</p>
            </div>
        </AdminDashboardLayout>
    )
}
