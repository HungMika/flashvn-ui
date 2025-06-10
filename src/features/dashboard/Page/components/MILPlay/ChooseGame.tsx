'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const games = [
  {
    image: '/images/games/mil-race.png',
    link: '/gameplay/mil-race',
  },
  {
    image: '/images/games/future-teller.png',
    link: '/gameplay/future-teller',
  },
  {
    image: '/images/games/mil-bingo.png',
    link: '/gameplay/mil-bingo',
  },
  {
    image: '/images/games/mil-trolley.png',
    link: '/gameplay/mil-card',
  },
  {
    image: '/images/games/mil-cyber.png',
    link: '/gameplay/cyber',
  },
  {
    image: '/images/games/trust-or-self.png',
    link: '/gameplay/trust-or-self',
  },
];

export default function ChooseGame() {
  const router = useRouter();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleGameClick = (index: number, link: string) => {
    setLoadingIndex(index);
    setTimeout(() => {
      router.push(link);
    }, 300); // Cho hiệu ứng loader một chút
  };

  return (
    <section
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/mil-play-banner.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex justify-between items-center w-full px-4 py-4 text-white text-sm sm:text-base md:text-lg lg:text-xl">
        <p className="font-normal">
          A project by <span className="font-bold">FLASH VN</span>
        </p>
        <p className="font-bold">#WiseByPlay</p>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:mb-8">Choose your game</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {games.map((game, index) => (
            <button
              key={index}
              onClick={() => handleGameClick(index, game.link)}
              className="relative flex flex-col items-center justify-center bg-white text-black rounded-lg p-2 w-[160px] h-[160px] sm:w-[140px] sm:h-[160px] md:w-[180px] md:h-[200px] transform transition-all hover:scale-105 hover:shadow-xl overflow-hidden"
            >
              {/* Image luôn hiển thị */}
              <img
                src={game.image}
                alt={`Game ${index}`}
                className={`w-full h-full object-contain transition-opacity duration-300 ${
                  loadingIndex === index ? 'opacity-40' : 'opacity-100'
                }`}
              />

              {/* Loader2 overlay khi loading */}
              {loadingIndex === index && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="animate-spin w-12 h-12 text-black" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
