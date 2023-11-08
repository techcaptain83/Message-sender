import AdminUsersTable from '@/components/admin/UsersTable';
import AdminDashboardLayout from '@/components/layouts/AdminDashboardLayout';
import EmptyState from '@/components/states/EmptyState';
import LoadingState from '@/components/states/LoadingState';
import useUsers from '@/hooks/useUsers';

export default function AllUsers() {
    const { users, isLoading } = useUsers();


    return (
        <AdminDashboardLayout>
            {isLoading && <LoadingState message='Loading Users...' />}
            {users?.length === 0 && !isLoading && <EmptyState message="we don't have any users yet!" />}
            {(users && users.length > 0) && <AdminUsersTable users={users} />}
        </AdminDashboardLayout>
    )
}
