'use client';

interface PopupHowtoplayProps {
  onClose: () => void;
}

export default function PopupHowtoplay({ onClose }: PopupHowtoplayProps) {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen">
      <div className="fixed w-screen h-screen z-40 bg-black opacity-90"></div>
      <div
        className="relative z-50 bg-[#fcefd4] max-w-[90%] rounded-md
       top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:max-w-3xl"
      >
        <div className="flex items-center justify-between popup-header text-center relative">
          <h3 className="font-bold text-[#1b1b62] text-lg py-1 mx-auto md:text-2xl md:py-2">Cách Chơi - MilRace</h3>
          <button
            className="absolute right-0 bg-red-600 text-white rounded-md h-8 w-8 flex
            font-bold items-center justify-center md:h-10 md:w-10 md:text-2xl"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <hr />
        <div className="p-3 md:text-2xl md:px-5">
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
  );
}
