'use client';

import { Dispatch, SetStateAction } from 'react';
import GameBoardMobile from './GameBoardMobile';
import ScoreBoard from './ScoreBoard';
import { Player } from '@/types/milrace';

interface GameMobileProps {
  playersArr: Player[];
  currentPlayerIndex: number;
  rolling: boolean;
  rollDice: () => void;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

export default function GameMobile({
  playersArr,
  currentPlayerIndex,
  rolling,
  rollDice,
  activeTab,
  setActiveTab,
}: GameMobileProps) {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Nội dung chính */}
      <div className="flex-1 overflow-auto bg-[#bbdff6]">
        <div className={`${activeTab === 'tab1' ? '' : 'hidden'} w-full h-full p-2 bg-[#bbdff6]`}>
          <GameBoardMobile />
        </div>
        <div className={`${activeTab === 'tab2' ? '' : 'hidden'} h-full w-full bg-green-100`}>
          <ScoreBoard
            rolling={rolling}
            playersArr={playersArr}
            currentPlayerIndex={currentPlayerIndex}
            rollDice={rollDice}
          />
        </div>
        <div className={`${activeTab === 'tab3' ? '' : 'hidden'} min-h-full w-full bg-yellow-100 p-2`}>
          <h3 className="font-bold text-[#1b1b62] text-xl pt-5 text-center">Cách Chơi - MilRace</h3>
          <div className="p-3">
            <p>
              <b>Số người chơi:</b> 2 đến 5 người.
            </p>
            <p>
              <b>Mục tiêu:</b> Là người đầu tiên về đến đích.
            </p>
            <br />
            <p>
              <b>Luật chơi:</b>
            </p>
            <p>
              <b>1.</b> Người chơi lần lượt thảy xúc xắc và di chuyển số ô tương ứng trên bàn cờ.
            </p>
            <p>
              <b>2.</b> Nếu di chuyển vào ô thử thách, người chơi phải trả lời một câu hỏi ngẫu nhiên.
            </p>
            <p className="pl-3">
              - Trả lời đúng: Tiếp tục đứng tại vị trí đó và chờ lượt kế tiếp.
              <br />- Trả lời sai: Bị lùi lại 2 ô ngay lập tức.
            </p>
            <p>
              <b>3.</b> Trò chơi tiếp tục theo vòng cho đến khi có người đầu tiên đến đích và chiến thắng.
            </p>
          </div>
        </div>
      </div>

      {/* Thanh tab */}
      <div className="flex h-16 border-t border-gray-300 font-bold">
        <button
          className={`flex-1 text-center ${activeTab === 'tab1' ? 'bg-blue-200' : 'bg-white'}`}
          onClick={() => setActiveTab('tab1')}
        >
          Bàn cờ
        </button>
        <button
          className={`flex-1 text-center ${activeTab === 'tab2' ? 'bg-green-200' : 'bg-white'}`}
          onClick={() => setActiveTab('tab2')}
        >
          Điều khiển
        </button>
        <button
          className={`flex-1 text-center ${activeTab === 'tab3' ? 'bg-yellow-200' : 'bg-white'}`}
          onClick={() => setActiveTab('tab3')}
        >
          Hướng dẫn
        </button>
      </div>
    </div>
  );
}
