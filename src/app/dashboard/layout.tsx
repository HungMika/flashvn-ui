'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { getCurrentUser } from '@/features/auth/api/auth';
import { useAuthStore } from '@/features/auth/api/auth-store';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // const router = useRouter();
  // const logout = useAuthStore((state) => state.logout);

  // const { isLoading, isError, data } = useQuery({
  //   queryKey: ['auth', 'me'],
  //   queryFn: getCurrentUser,
  //   retry: false,
  //   refetchOnWindowFocus: false,
  // });

  // useEffect(() => {
  //   if (!isLoading && (isError || !data?.isAuthenticated)) {
  //     toast.error('Session expired.');
  //     logout();
  //     router.replace('/auth');
  //     toast.error('Redirecting to login page...');
  //   }
  // }, [isLoading, isError, data, logout, router]);

  // if (isLoading || isError || !data?.isAuthenticated) {
  //   return null;
  // }

  return (
    <>
      <main>
        <DashboardHeader />
        {children}
      </main>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
    </>
  );
}
