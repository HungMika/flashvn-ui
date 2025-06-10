'use client';

import { Player } from '@/types/milrace';

interface ScoreBoardProps {
  rolling: boolean;
  playersArr: Player[];
  currentPlayerIndex: number;
  rollDice: () => void;
}

export default function ScoreBoard({ rolling, playersArr, currentPlayerIndex, rollDice }: ScoreBoardProps) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center overflow-auto pb-10">
      <div className="relative flex flex-col items-center px-4 md:min-w-54 md:mb-6 lg:min-w-62 lg:mb-10">
        <img className="absolute w-48 h-34 lg:w-50 lg:h-38" src="/milrace/img/logo/milrace.png" alt="MILRACE LOGO" />
        <div
          className="player-board_main bg-[#e5f3fb] min-h-[400px] w-full h-fit
       mt-24 px-4 pt-8 pb-12 border-2 border-[#1b1b62] rounded-2xl
       flex flex-col justify-between items-center md:mt-28"
        >
          <div className="players-list min-w-[180px] w-full font-bold">
            <h3 className="players-list_title text-center text-amber-400 font-bold mb-1 text-xl md:text-2xl lg:text-3xl">
              Người chơi
            </h3>
            {playersArr.map((player, i) => (
              <div
                key={i}
                className={`player-list flex flex-row items-center px-3 py-1 rounded-xs w-full box-border
                  md:text-2xl lg:text-3xl tracking-tight ${
                    player.index === currentPlayerIndex ? 'bg-blue-300 border-l-4 border-b-blue-800' : ''
                  }`}
              >
                <div
                  id={`token${i + 1}`}
                  className="players-list_token h-[24px] w-[24px] mr-[5px] bg-center bg-cover bg-no-repeat text-x"
                ></div>
                <p id={`player${i + 1}`}>{`${player.position} - ${player.name}`}</p>
              </div>
            ))}
          </div>

          <div className="w-32 h-32 mt-7 mb-3 text-8xl">
            <div className="dice" id="dice">
              <div className="face front" data-face="1">
                1
              </div>
              <div className="face back" data-face="6">
                6
              </div>
              <div className="face right" data-face="5">
                5
              </div>
              <div className="face left" data-face="2">
                2
              </div>
              <div className="face top" data-face="4">
                4
              </div>
              <div className="face bottom" data-face="3">
                3
              </div>
            </div>
          </div>
        </div>

        <button
          disabled={rolling}
          className="absolute text-xl -bottom-5 left-1/2 transform -translate-x-1/2 bg-amber-400 text-black font-bold
           p-3 rounded-full border-black border-2 w-[80%] md:text-xl lg:text-2xl"
          id="btn_rolldice"
          type="button"
          onClick={() => rollDice()}
        >
          Thảy xúc xắc
        </button>
      </div>
    </div>
  );
}
