'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const games = [
  { name: 'Card Only', path: 'mil-card' },
  { name: 'Bingo', path: 'mil-bingo' },
  { name: 'Future Teller', path: 'future-teller' },
  { name: 'Mil Race', path: 'mil-race' },
  { name: 'Trust-or-self', path: 'trust-or-self' },
];

export default function DashboardPage() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(`/dashboard/${path}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">FLASHVN Dashboard</h1>
      <p className="mb-6 text-muted-foreground">
        Select page to manage your game.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <Button
            key={game.path}
            className="text-lg py-6"
            onClick={() => handleNavigate(game.path)}
            variant="secondary"
          >
            {game.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
