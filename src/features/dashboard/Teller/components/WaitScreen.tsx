'use client';
import React from 'react';
interface WaitScreenProps {
  onDeal: () => void;
}

const WaitScreen: React.FC<WaitScreenProps> = ({ onDeal }) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 font-sans"
      style={{ backgroundImage: `url('/Background.jpg')` }}
    >
      <div className="relative w-full max-w-screen-2xl h-[calc(100vw*9/16)] max-h-[80vh] aspect-video flex flex-col items-center justify-center p-4">
        <div className="p-4 bg-white rounded-2xl shadow-xl border-2 border-black mb-1 max-w-xl w-full text-center animate-fade-in-up">
          <p className="text-xl font-bold text-black">Bạn đã sẵn sàng cho câu hỏi chưa nào?</p>
        </div>
        <div className="flex justify-center gap-4 sm:gap-6 flex-wrap mb-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="w-28 h-48 sm:w-32 sm:h-56 md:w-36 md:h-64 rounded-xl shadow-lg border-2 border-black border-dashed flex items-center justify-center bg-white/30 backdrop-blur-sm mt-8"
            >
              <span className="text-black text-4xl sm:text-5xl font-bold">?</span>
            </div>
          ))}
        </div>
        <button
          onClick={onDeal}
          className="bg-blue-900 cursor-pointer text-white text-xl sm:text-2xl font-bold px-8 py-3 sm:px-12 sm:py-4 rounded-[50px] shadow-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 border-2 border-black animate-bounce-slow"
        >
          Chia bài
        </button>
      </div>
    </div>
  );
};

export default WaitScreen;
