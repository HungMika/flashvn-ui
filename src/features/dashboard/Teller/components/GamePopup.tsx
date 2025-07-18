import React, { useState } from 'react';

interface GamePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | React.ReactNode;
  showNavigation?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  step?: number;
}

const GamePopup: React.FC<GamePopupProps> = ({
  isOpen,
  onClose,
  title,
  content,
  showNavigation = false,
  onNext,
  onPrev,
  step,
}) => {
  const [fontScale, setFontScale] = useState<number>(1);

  const increaseFontSize = () => {
    setFontScale((prev) => Math.min(prev + 0.1, 1.5));
  };

  const decreaseFontSize = () => {
    setFontScale((prev) => Math.max(prev - 0.1, 0.7));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-[600px] h-[500px] flex flex-col items-center p-6 text-center">
        <div className="text-blue-900 font-bold mb-4 text-3xl" style={{ fontSize: `${48 * fontScale}px` }}>
          {title}
          {showNavigation && <div className="h-0.5 bg-blue-400 w-full my-2"></div>}
        </div>
        <div
          className="text-gray-800 text-lg overflow-y-auto max-h-[380px] whitespace-pre-wrap scrollbar-hidden"
          style={{ fontSize: `${20 * fontScale}px`, textAlign: 'left' }}
        >
          {content}
        </div>
        {showNavigation && (
          <div className="flex justify-center gap-4 w-full mt-6">
            {step && step > 1 && (
              <button
                onClick={onPrev}
                className="px-4 py-2 cursor-pointer bg-blue-400 text-gray-800 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Bước trước
              </button>
            )}
            <button
              onClick={onNext}
              className="px-4 py-2 cursor-pointer bg-blue-900 text-white rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Bước kế tiếp
            </button>
          </div>
        )}
        <div className="flex gap-2 mt-4 self-end">
          <button
            onClick={increaseFontSize}
            className="bg-blue-900 cursor-pointer text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            +
          </button>
          <button
            onClick={decreaseFontSize}
            className="bg-blue-900 cursor-pointer text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            -
          </button>
        </div>
        <button
          className="absolute top-2 right-2 cursor-pointer text-blue-900 hover:text-yellow-400 text-3xl font-bold bg-white rounded-full w-8 h-8 flex items-center justify-center leading-none"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default GamePopup;
