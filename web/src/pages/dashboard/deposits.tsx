import UserDashboardLayout from '@/components/layouts/UserDashboardLayout'
import useDeposits from '@/hooks/useDeposits';
import React from 'react'

export default function Deposits() {
    const { userDeposits, userDepositsError, fetchingUserDeposits } = useDeposits();

    return (
        <UserDashboardLayout>


        </UserDashboardLayout>
    )
}
