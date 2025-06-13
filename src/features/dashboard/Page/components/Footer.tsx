'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useI18n } from '@/contexts/i18nContext'; // Đảm bảo đúng đường dẫn

const hiddenPaths = ['/admin'];

type Social = {
  _id: string;
  title: string;
  imageUrl: string;
  link: string;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export default function Footer() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [socialLinks, setSocialLinks] = useState<Social[]>([]);

  useEffect(() => {
    async function fetchSocials() {
      try {
        const res = await fetch(`${BACKEND_URL}/socials`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Fetch error: ${res.status} - ${text}`);
        }
        const data = await res.json();
        setSocialLinks(data);
      } catch (error) {
        console.error('Failed to fetch social links:', error);
      }
    }

    fetchSocials();
  }, []);

  if (hiddenPaths.includes(pathname)) return null;

  return (
    <footer className="bg-white border-t-2 border-black">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/images/logo.png"
              alt="FLASH VN Logo"
              width={120}
              height={120}
              loading="lazy"
              className="w-32 h-auto md:w-48"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center items-start space-y-6 text-base md:text-lg text-gray-700 text-left">
            {/* Email & Phone */}
            <div className="flex flex-col md:flex-row items-start md:space-x-12 space-y-4 md:space-y-0 w-full">
              <div className="flex items-center space-x-2">
                <span className="font-bold">{t('footer.email')}:</span>
                <a
                  href="mailto:contact@flashasean.org"
                  className="hover:text-blue-600 transition-colors"
                >
                  contact@flashasean.org
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold">{t('footer.phone')}:</span>
                <a
                  href="tel:+84 939 249 127"
                  className="hover:text-blue-600 transition-colors"
                >
                  +84 939 249 127
                </a>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col md:flex-row items-start md:space-x-4 space-y-2 md:space-y-0 w-full">
              <span className="font-bold">{t('footer.followUs')}:</span>
              <div className="flex items-center space-x-4">
                {socialLinks.map((item) => (
                  <a
                    key={item._id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
