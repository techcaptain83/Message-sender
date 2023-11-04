import EmptyState from '@/components/states/EmptyState';
import AdminUsersTable from '@/components/admin/UsersTable';
import AdminDashboardLayout from '@/components/layouts/AdminDashboardLayout'
import LoadingState from '@/components/states/LoadingState';
import useUsers from '@/hooks/useUsers';
import React from 'react'

export default function EnterpriseUsers() {
    const { users, isLoading } = useUsers();

    return (
        <AdminDashboardLayout>
            {isLoading && <LoadingState message='Loading Users...' />}
            {(users && users.filter(user => ["enterprise", "yearlyEnterprise"].includes(user.plan)).length === 0) && <EmptyState message="we don't have any enterprise users yet!" />}
            {(users && users.filter(user => ["enterprise", "yearlyEnterprise"].includes(user.plan)).length > 0) && <AdminUsersTable users={users.filter(user => ["enterprise", "yearlyEnterprise"].includes(user.plan))} title='Enterprise users' />}
        </AdminDashboardLayout>
    )
}
