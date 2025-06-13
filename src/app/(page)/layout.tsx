'use client';

import type { ReactNode } from 'react';
import { I18nProvider } from '@/contexts/i18nContext';

import Navbar from '@/features/dashboard/Page/components/Navbar';
import Breadcrumb from '@/features/dashboard/Page/components/Breadcrumb';
import Footer from '@/features/dashboard/Page/components/Footer';
import FixedLoginButton from '@/features/dashboard/Page/components/FixedLoginButton';
import '@/app/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <div className="min-h-screen flex flex-col bg-gray-50 text-black">
            <Navbar />
            <Breadcrumb />
            <main className="flex-grow">{children}</main>
            <Footer />
            <FixedLoginButton />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
