'use client';
import React from 'react';
import { ICardData } from '@/features/dashboard/Teller/components/types';

interface DealScreenProps {
  gameState: 'dealing' | 'dealt' | 'flipping' | 'flipped';
  cards: ICardData[];
  dealtCards: ICardData[];
  flippedCards: boolean[];
  showQuestionBox: boolean;
}

const DealScreen: React.FC<DealScreenProps> = ({ gameState, cards, dealtCards, flippedCards, showQuestionBox }) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 font-sans"
      style={{ backgroundImage: `url('/Background.jpg')` }}
    >
      <div className="relative w-full max-w-screen-2xl h-[calc(100vw*9/16)] max-h-[80vh] aspect-video flex flex-col items-center justify-center p-4">
        {(gameState === 'dealt' && !showQuestionBox) || gameState === 'dealing' ? (
          <div className="p-4 rounded-2xl shadow-xl border-2 border-black mb-1 max-w-xl w-full text-center animate-fade-in-up">
            <p className="text-xl font-bold text-black">Hãy lật bài để xem câu hỏi tiên tri!</p>
          </div>
        ) : null}
        <div className="flex justify-center gap-4 sm:gap-6 flex-wrap mb-10">
          {cards.map((card, index) => (
            <div
              key={card._id || card.id || index}
              className={`relative w-28 h-48 sm:w-32 sm:h-56 md:w-36 md:h-64 rounded-xl shadow-lg cursor-pointer transform transition-all duration-500 my-2
                ${dealtCards[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                ${flippedCards[index] ? 'rotate-y-180' : ''}
                ${gameState === 'dealing' ? `animate-card-deal-${index}` : ''}`}
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s' }}
            >
              <div
                className={`absolute w-full h-full rounded-xl bg-orange-500 border-4 border-orange-600 flex items-center justify-center backface-hidden ${
                  flippedCards[index] ? 'rotate-y-180' : ''
                }`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <span className="text-white text-4xl sm:text-5xl font-bold">?</span>
              </div>
              <div
                className={`absolute w-full h-full rounded-xl bg-white border-4 border-orange-500 flex flex-col items-center justify-center p-2 sm:p-4 backface-hidden ${
                  flippedCards[index] ? '' : 'rotate-y-180'
                }`}
                style={{ backfaceVisibility: 'hidden' }}
              >
                {flippedCards[index] && card.image && (
                  <img
                    src={typeof card.image === 'string' ? card.image : URL.createObjectURL(card.image)}
                    alt={card.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-1 sm:mb-2"
                  />
                )}
                {flippedCards[index] && (
                  <h3 className="text-center font-bold text-sm sm:text-lg text-blue-700">{card.title}</h3>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealScreen;