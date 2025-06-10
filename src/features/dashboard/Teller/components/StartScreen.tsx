'use client';

import React from 'react';

interface StartScreenProps {
  onStart: () => void;
  onHowToPlay: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, onHowToPlay }) => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 font-sans"
      style={{ backgroundImage: `url('/bgr.png')` }}
    >
      <div className="mb-8 animate-fade-in flex flex-col items-center justify-center flex-grow">
        <div className="flex flex-col gap-4 mt-90">
          <button
            onClick={onStart}
            className="bg-blue-900 cursor-pointer text-white text-2xl font-bold px-20 py-4 rounded-[50px] shadow-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 border-2 border-black"
          >
            Bắt đầu
          </button>
          <button
            onClick={onHowToPlay}
            className="bg-white cursor-pointer text-blue-900 text-2xl font-bold px-10 py-4 rounded-[50px] shadow-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 border-2 border-black"
          >
            Cách chơi
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;