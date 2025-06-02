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
  showQuestionBox: boolean;
  cardsPosition: 'initial' | 'down';
}

const ShowScreen: React.FC<ShowScreenProps> = ({
  cards,
  dealtCards,
  flippedCards,
  question,
  onReset,
  onSuggest,
  showQuestionBox,
  cardsPosition,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 font-sans"
      style={{ backgroundImage: `url('/Background.jpg')` }}
    >
      <div className="relative w-full max-w-screen-2xl h-[calc(100vw*9/16)] max-h-[80vh] aspect-video flex flex-col items-center justify-center p-4">
        {showQuestionBox && (
          <div className="bg-white p-2 rounded-2xl shadow-xl mb-1 max-w-2xl w-full text-center border-2 border-black animate-fade-in-down">
            <p className="text-lg sm:text-xl text-center">
              {question}
            </p>
          </div>
        )}
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
                <div className="absolute w-full h-full rounded-xl border-2 border-black border-dashed flex items-center justify-center bg-white/30 backdrop-blur-sm">
                  <span className="text-black text-4xl sm:text-5xl font-bold">?</span>
                </div>
              ) : (
                card.image && (
                  <img
                    src={typeof card.image === 'string' ? card.image : URL.createObjectURL(card.image)}
                    alt={card.title}
                    className="absolute w-full h-full rounded-xl border-2 border-black object-cover"
                    style={{ left: 0, top: 0 }}
                  />
                )
              )}
            </div>
          ))}
        </div>
        {showQuestionBox && (
          <div className="flex flex-col items-center gap-4 mt-4">
            <button
              onClick={onReset}
              className="px-6 py-3 bg-blue-900 text-white rounded-3xl hover:bg-yellow-400 transition-colors duration-200 font-bold border-2 border-black cursor-pointer text-base"
            >
              Tạo câu hỏi mới
            </button>
            <button
              onClick={onSuggest}
              className="px-6 py-3 bg-white text-blue-900 rounded-3xl hover:bg-yellow-400 transition-colors duration-200 font-bold border-2 border-black cursor-pointer text-base"
            >
              Gợi ý thảo luận
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowScreen;
