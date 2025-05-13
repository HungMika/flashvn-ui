// app/dashboard/layout.tsx
import { Toaster } from 'react-hot-toast';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>
        <DashboardHeader />
        {children}
      </main>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
