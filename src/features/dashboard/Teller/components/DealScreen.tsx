'use client';
import React from 'react';
import { ICardData } from '@/features/dashboard/Teller/components/types';

interface DealScreenProps {
  gameState: 'dealing' | 'dealt' | 'flipping' | 'flipped';
  cards: ICardData[];
  dealtCards: ICardData[];
  flippedCards: boolean[];
  showQuestionBox: boolean;
  cardsPosition: 'initial' | 'down';
}

const DealScreen: React.FC<DealScreenProps> = ({ gameState, cards, dealtCards, flippedCards, cardsPosition }) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 font-sans"
      style={{ backgroundImage: `url('/Background.jpg')` }}
    >
      <div className="relative w-full max-w-screen-2xl h-[calc(100vw*9/16)] max-h-[80vh] aspect-video flex flex-col items-center justify-center p-4">
        <div
          className={`flex justify-center gap-4 sm:gap-6 flex-wrap mb-10 transition-all duration-500 ${
            cardsPosition === 'down' ? 'translate-y-5' : ''
          }`}
        >
          {cards.map((card, index) => (
            <div
              key={card._id || index}
              className={`relative w-28 h-48 sm:w-32 sm:h-56 md:w-36 md:h-64 rounded-xl shadow-lg cursor-pointer transition-all duration-500 my-2
                ${dealtCards[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
              style={{}}
            >
              {!flippedCards[index] ? (
                <div className="absolute w-full h-full rounded-xl bg-orange-500 border-2 border-black flex items-center justify-center" />
              ) : (
                card.image &&
                typeof card.image === 'string' && (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute w-full h-full rounded-xl border-2 border-black object-cover"
                    style={{ left: 0, top: 0 }}
                  />
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealScreen;
