'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { findAll, resetPassword } from '@/features/auth/api/user';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}

export default function AccountPage() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const [ConfirmDialog, confirm] = useConfirm('Reset Password for this user?', 'Default password will be "#Flash2023"');

  const { data: users = [], refetch } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: findAll,
  });

  const { mutate: resetPass } = useMutation(
    ({ userId, newPassword }: { userId: string; newPassword: string }) => resetPassword(userId, newPassword),
    {
      onSuccess: () => {
        refetch();
        queryClient.invalidateQueries(['users']);
      },
      onError: (error) => {
        console.error('Error resetting user password:', error);
      },
    },
  );

  const handleResetPassword = async (userId: string) => {
    const confirmed = await confirm();
    if (!confirmed) return;
    resetPass({ userId, newPassword: '#Flash2023' });
  };

  return (
    <>
      <ConfirmDialog />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Account Management</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">
                <Button onClick={() => router.push('/dashboard/account/register')} className="cursor-pointer">
                  Add User Account
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant={'outline'}
                    className="cursor-pointer"
                    onClick={() => {
                      handleResetPassword(user._id);
                    }}
                  >
                    Reset Password
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
