import React from 'react';
import { FaQuestion } from 'react-icons/fa';
import { Result } from '@/features/dashboard/TrustOrSelf/components/types';
import Image from 'next/image';

interface ResultScreenProps {
  result: Result;
  onNextQuestion: () => void;
  onSettings: () => void;
  onShowRules: () => void;
}

export default function ResultScreen({ result, onNextQuestion, onSettings, onShowRules }: ResultScreenProps) {
  return (
    <div className="min-h-screen bg-[#686868] flex flex-col items-center justify-center text-white">
      <Image src="/trust-or-self-logo.png" alt="Logo" width={220} height={96} className="w-55 mb-2" />
      <h1 className="text-9xl font-bold mb-2">{result.percentage}%</h1>
      <p className="text-4xl font-bold mb-2">người cùng suy nghĩ với bạn</p>
      <Image
        src={result.choice === 'trust' ? '/trust-button.png' : '/self-button.png'}
        alt={result.choice}
        width={160}
        height={160}
        className="w-40 h-40 mb-1"
      />
      <button
        className="px-8 py-4 border-none rounded-[30px] bg-[#1b1b62] text-white text-[20px] font-bold cursor-pointer transition-colors duration-300 w-[250px] hover:bg-[#feb622]"
        onClick={onNextQuestion}
      >
        Câu kế tiếp
      </button>
      {/* <button className="absolute bottom-5 right-5 w-12 h-12 bg-[#1b1b62] rounded-full flex items-center justify-center text-white text-2xl hover:bg-[#feb622] transition-colors duration-300 cursor-pointer" onClick={onSettings}><FaCog /></button> */}
      <button
        className="absolute top-5 right-5 w-10 h-10 bg-[#1b1b62] rounded-full flex items-center justify-center text-white text-xl hover:bg-[#feb622] transition-colors duration-300 cursor-pointer"
        onClick={onShowRules}
      >
        <FaQuestion />
      </button>
    </div>
  );
}
