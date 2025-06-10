import type { Metadata } from 'next';
import '@/app/globals.css';
import Navbar from '@/features/dashboard/Page/components/Navbar';
import Breadcrumb from '@/features/dashboard/Page/components/Breadcrumb';
import Footer from '@/features/dashboard/Page/components/Footer';
import FixedLoginButton from '@/features/dashboard/Page/components/FixedLoginButton';

export const metadata: Metadata = {
  title: 'FLASH VN',
  description: 'Lum',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="en">
      <div>
        <div className="min-h-screen flex flex-col bg-gray-50 text-black">
          <Navbar />
          <Breadcrumb />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FixedLoginButton />
        </div>
      </div>
    </div>
  );
}
