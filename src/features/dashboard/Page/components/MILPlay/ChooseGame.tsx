'use client';

import Image from 'next/image';
import { useI18n } from '@/contexts/i18nContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const games = [
  { image: '/images/games/mil-race.png', link: '/gameplay/mil-race' },
  { image: '/images/games/future-teller.png', link: '/gameplay/future-teller' },
  { image: '/images/games/mil-bingo.png', link: '/gameplay/mil-bingo' },
  { image: '/images/games/mil-trolley.png', link: '/gameplay/mil-card' },
  { image: '/images/games/mil-cyber.png', link: '/gameplay/cyber' },
  { image: '/images/games/trust-or-self.png', link: '/gameplay/trust-or-self' },
];

export default function ChooseGame() {
  const { t } = useI18n();
  const router = useRouter();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleGameClick = (index: number, link: string) => {
    setLoadingIndex(index);
    setTimeout(() => router.push(link), 300);
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/mil-play-banner.png')" }}
    >
      <div className="absolute inset-0 bg-black/60" />

      {/* Top Banner Text */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 px-4 py-4 text-white text-sm sm:text-base md:text-lg">
        <p className="font-normal text-center sm:text-left">
          {t('milplay.chooseGame.projectBy')}{' '}
          <span className="font-bold">FLASH VN</span>
        </p>
        <p className="font-bold text-center sm:text-right">
          {t('milplay.chooseGame.hashtag')}
        </p>
      </div>

      {/* Game Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 text-white text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-10">
          {t('milplay.chooseGame.title')}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {games.map((game, index) => (
            <button
              key={index}
              onClick={() => handleGameClick(index, game.link)}
              className="relative flex items-center justify-center bg-white text-black rounded-xl w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 p-2 shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none overflow-hidden"
            >
              {loadingIndex === index ? (
                <Loader2 className="animate-spin w-10 h-10 text-black z-10" />
              ) : (
                <Image
                  src={game.image}
                  alt={`Game ${index}`}
                  fill
                  className="object-contain transition-opacity duration-300"
                  sizes="(max-width: 768px) 40vw, 20vw"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
