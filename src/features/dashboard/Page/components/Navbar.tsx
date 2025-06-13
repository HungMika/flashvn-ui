'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useI18n } from '@/contexts/i18nContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, t, setLocale } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/about-us', label: t('navbar.about') },
    { href: '/what-we-do', label: t('navbar.whatWeDo') },
    { href: '/contact-us', label: t('navbar.contact') },
  ];

  const hiddenPaths = ['/admin'];
  if (hiddenPaths.includes(pathname)) return null;

  const changeLocale = (newLocale: 'en' | 'vi') => {
    setLocale(newLocale);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black font-bold">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="text-xl text-gray-900">
            FLASHVN
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm ${
                  pathname === href
                    ? 'text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => changeLocale('en')}
              className={`text-sm ${locale === 'en' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              EN
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => changeLocale('vi')}
              className={`text-sm ${locale === 'vi' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
            >
              VI
            </button>
          </div>
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-black">
            <nav className="flex flex-col space-y-4 p-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm ${
                    pathname === href
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-2 p-4 border-t border-black">
              <button
                onClick={() => {
                  changeLocale('en');
                  setIsMenuOpen(false);
                }}
                className={`text-sm ${locale === 'en' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                EN
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => {
                  changeLocale('vi');
                  setIsMenuOpen(false);
                }}
                className={`text-sm ${locale === 'vi' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                VI
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
