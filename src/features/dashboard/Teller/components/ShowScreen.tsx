'use client';
import React from 'react';
import { ICardData } from '@/features/dashboard/Teller/components/types';

interface ShowScreenProps {
  cards: ICardData[];
  dealtCards: ICardData[];
  flippedCards: boolean[];
  question: string;
  onReset: () => void;
  onSuggest: () => void;
  fontScale: number;
}

const ShowScreen: React.FC<ShowScreenProps> = ({
  cards,
  dealtCards,
  flippedCards,
  question,
  onReset,
  onSuggest,
  fontScale,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 font-sans"
      style={{ backgroundImage: `url('/Background.jpg')` }}
    >
      <div className="relative w-full max-w-screen-2xl h-[calc(100vw*9/16)] max-h-[80vh] aspect-video flex flex-col items-center justify-center p-4">
        <div className="flex justify-center gap-4 sm:gap-6 flex-wrap mb-10">
          {cards.map((card, index) => (
            <div
              key={card._id || card.id || index}
              className={`relative w-28 h-48 sm:w-32 sm:h-56 md:w-36 md:h-64 rounded-xl shadow-lg cursor-pointer transform transition-all duration-500 my-2
                ${dealtCards[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                ${flippedCards[index] ? 'rotate-y-180' : ''}`}
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
        <div className="bg-white p-4 rounded-2xl shadow-xl mt-4 max-w-2xl w-full text-center border-2 border-blue-400 animate-fade-in-up">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2 sm:mb-4">Câu hỏi tiên tri:</h3>
          <p className="text-lg sm:text-xl text-gray-800" style={{ fontSize: `${fontScale * 100}%` }}>
            {question}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4">
            <button
              onClick={onReset}
              className="px-4 py-2 cursor-pointer sm:px-6 sm:py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors duration-200 font-bold border-2 border-white text-sm sm:text-base"
            >
              Tạo câu hỏi mới
            </button>
            <button
              onClick={onSuggest}
              className="px-4 py-2 cursor-pointer sm:px-6 sm:py-3 bg-white text-blue-700 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-bold border-2 border-blue-700 text-sm sm:text-base"
            >
              Gợi ý thảo luận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowScreen;