'use client';
import toast from 'react-hot-toast';
import { MdLogout } from 'react-icons/md';
import { HiHome } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useConfirm } from '@/hooks/use-confirm';
import { logOut } from '@/features/auth/api/auth';
import { useAuthStore } from '@/features/auth/api/auth-store';

export const DashboardHeader = () => {
  const router = useRouter();
  const [ConfirmDialog, confirm] = useConfirm('Do you want to log out?', 'Please confirm, see you later');
  const [ReturnHomeDialog, confirmReturnHome] = useConfirm('Return to Home?', 'This will redirect you to Home Page.');
  const [ReturnDialog, confirmReturn] = useConfirm('Return to Dashboard?', 'This will redirect you to Dashboard Page.');

  const user = useAuthStore((state) => state.user);

  const handleLogOut = async () => {
    const confirmed = await confirm();
    if (!confirmed) return;
    try {
      await logOut();
      useAuthStore.getState().logout();
      router.replace('/auth');
    } catch (error) {
      toast.error('Something went wrong while logging out.');
    }
  };

  const handleReturnHome = async () => {
    const confirmed = await confirmReturnHome();
    if (!confirmed) return;
    router.push('/');
  };

  const handleReturnDashboard = async () => {
    const confirmed = await confirmReturn();
    if (!confirmed) return;
    router.push('/dashboard');
  };

  if (!user) return null;

  return (
    <>
      <ConfirmDialog />
      <ReturnDialog />
      <ReturnHomeDialog />

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-[#1b1b62] text-white sticky top-0 z-50">
        {/* Logo + Welcome */}
        <div className="flex items-center gap-4">
          <img
            src="/FLASH_logo-white_yellow.png"
            alt="Flash Bingo Logo"
            className="w-14 h-14 object-contain cursor-pointer"
            onClick={handleReturnHome}
          />

          <div className="flex flex-col leading-snug">
            <h1 className="text-lg font-semibold">
              Welcome, <span className="text-yellow-300">{user.username}</span>!
            </h1>
            <p className="text-sm text-white/70">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white cursor-pointer" onClick={handleReturnDashboard}>
            <HiHome className="w-10 h-10 mx-1" />
          </Button>
          <Button className="bg-[#e65a00] hover:bg-orange-700 text-white cursor-pointer" onClick={handleLogOut}>
            <MdLogout className="w-6 h-6 mx-1" />
          </Button>
        </div>
      </header>
    </>
  );
};
