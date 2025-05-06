// app/dashboard/layout.tsx
import { Toaster } from 'react-hot-toast';
import { ReactQueryProvider } from '@/lib/react-query-provider';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <main>
        <DashboardHeader />
        {children}
      </main>

      <Toaster position="top-center" reverseOrder={false} />
    </ReactQueryProvider>
  );
}
