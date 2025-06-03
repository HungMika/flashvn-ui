'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();

  // Danh sách các path muốn ẩn breadcrumb
  const hiddenPaths = ["home","/what-we-do/innovative-solution", "/what-we-do/mil-play", "/admin"];
  if (hiddenPaths.includes(pathname)) return null;

  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return { href, label };
  });

  return (
    <div className="bg-white border-t-2 border-gray-300 h-[40px] flex items-center">
      <div className="container mx-auto px-4">
        {pathname !== '/' && (
          <div className="text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            {breadcrumbItems.map((item, index) => (
              <span key={item.href}>
                <span className="mx-2 text-gray-400">|</span>
                {index === breadcrumbItems.length - 1 ? (
                  <span className="text-gray-900">{item.label}</span>
                ) : (
                  <Link href={item.href} className="hover:text-gray-900">
                    {item.label}
                  </Link>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
