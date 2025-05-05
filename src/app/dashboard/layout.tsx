// app/dashboard/layout.tsx
import { Toaster } from 'react-hot-toast';
import { ReactQueryProvider } from '@/lib/react-query-provider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </ReactQueryProvider>
  );
}
