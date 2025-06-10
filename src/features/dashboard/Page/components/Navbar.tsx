'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/about-us', label: 'ABOUT US' },
  { href: '/what-we-do', label: 'WHAT WE DO' },
  { href: '/contact-us', label: 'CONTACT US' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hiddenPaths = ["/admin"];
  if (hiddenPaths.includes(pathname)) return null;

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
                prefetch={false}
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
            <Link
              href="/en"
              prefetch={false}
              className={`text-sm ${
                pathname.startsWith('/en')
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              EN
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/vi"
              prefetch={false}
              className={`text-sm ${
                pathname.startsWith('/vi')
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              VI
            </Link>
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
              <Link
                href="/en"
                className={`text-sm ${
                  pathname.startsWith('/en')
                    ? 'text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                EN
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/vi"
                className={`text-sm ${
                  pathname.startsWith('/vi')
                    ? 'text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                VI
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
