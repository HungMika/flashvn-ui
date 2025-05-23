'use client';

import Link from 'next/link';
import { FC } from 'react';

interface ScreenLobbyProps {
  onNext: () => void;
  onPopupHowtoplay: () => void;
}

const ScreenLobby: FC<ScreenLobbyProps> = ({ onNext, onPopupHowtoplay }) => {
  return (
    <div id="lobby-screen" className="min-h-screen min-w-screen flex flex-col items-center justify-center">
      <Link href="/admin/milrace" className="fixed top-3 right-4 bg-amber-300 px-4 py-2 rounded-full font-bold">
        Admin
      </Link>
      <div className="flex flex-col items-center justify-between">
        <img className="w-36 mb-5 md:w-44" src="/milrace/img/logo/flashvn.png" alt="FLASHVN LOGO" />
        <img className="img_milrace w-3xs md:w-md" src="/milrace/img/logo/milrace.png" alt="MILRACE LOGO" />
        <div className="flex flex-col items-center w-40 gap-2 mb-5 md:gap-3 md:mb-8 md:text-2xl">
          <button
            className="bg-[#1c1b62] text-white font-bold p-2 rounded-full border-black border-2
            w-36 md:w-2xs md:p-3 md:border-[3px]"
            type="button"
            onClick={onNext}
          >
            Bắt đầu
          </button>
          <button
            className="bg-[#fbeed4] text-black font-bold p-2 rounded-full border-black border-2
            w-36 md:w-2xs md:p-3 md:border-[3px]"
            type="button"
            onClick={onPopupHowtoplay}
          >
            Cách chơi
          </button>
        </div>
        <p className="text-xs text-center md:text-base">
          Bản quyền thuộc về FLASH VN & được chia sẻ miễn phí cho cộng đồng.
        </p>
      </div>
    </div>
  );
};

export default ScreenLobby;
