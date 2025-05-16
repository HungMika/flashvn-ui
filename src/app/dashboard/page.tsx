'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FaArrowRight, FaSpinner } from 'react-icons/fa';
import { useState } from 'react';

const routes = [
  { name: 'Account management', path: 'account' },
  { name: 'Card Only', path: 'mil-card' },
  { name: 'Bingo', path: 'mil-bingo' },
  { name: 'Future Teller', path: 'future-teller' },
  { name: 'Mil Race', path: 'mil-race' },
  { name: 'Trust-or-Self', path: 'trust-or-self' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [loadingPath, setLoadingPath] = useState<string | null>(null);

  const handleNavigate = (path: string) => {
    setLoadingPath(path);
    router.push(`/dashboard/${path}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">FLASHVN Dashboard</h1>
      <p className="mb-6 text-muted-foreground">Select a game to manage.</p>

      <ul className="space-y-3">
        {routes.map((route) => (
          <li key={route.path}>
            <Button
              onClick={() => handleNavigate(route.path)}
              className="w-full justify-between text-left text-md py-5 font-medium"
              variant="outline"
              disabled={loadingPath !== null} // prevent multiple clicks
            >
              {route.name}
              {loadingPath === route.path ? (
                <FaSpinner className="ml-2 animate-spin" />
              ) : (
                <FaArrowRight className="ml-2" />
              )}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
