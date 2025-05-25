'use client';

import { useEffect, useState } from 'react';
import { getAllMilraceQuestionSets, getMilraceQuestionSetById } from '../api/milraceQuestionSet';
import { PlayerHistoryData, MilraceQuestionSet } from '@/types/milrace';
import { useModal } from '@/lib/ModalContext';

interface ScreenAddPlayerProps {
  onNext: () => void;
  playersArr: PlayerHistoryData[];
  setPlayersArr: React.Dispatch<React.SetStateAction<PlayerHistoryData[]>>;
  setQuestionSet: React.Dispatch<React.SetStateAction<MilraceQuestionSet | null>>;
}

const ScreenAddPlayer: React.FC<ScreenAddPlayerProps> = ({ onNext, playersArr, setPlayersArr, setQuestionSet }) => {
  const { notify } = useModal();
  const [namePlayer, setNamePlayer] = useState<string>('');
  const [questionSets, setQuestionSets] = useState<MilraceQuestionSet[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<string>('');

  useEffect(() => {
    async function loadQuestionSets() {
      try {
        const res = await getAllMilraceQuestionSets();
        if (res.success) {
          setQuestionSets(res.data);
        } else {
          notify(res.message);
        }
      } catch (err) {
        console.error('Lỗi tải bộ câu hỏi:', err);
        notify('Không tải được bộ câu hỏi');
      }
    }
    loadQuestionSets();
  }, []);

  const handleAddPlayer = () => {
    const name = namePlayer.trim();
    if (name === '') return notify('Tên không được để trống!');
    if (name.length > 10) return notify('Tên tối đa 10 ký tự!');
    if (playersArr.length >= 5) return notify('Tối đa 5 người chơi!');
    if (playersArr.some((p) => p.name === name)) return notify(`Tên ${name} đã tồn tại!`);

    const newPlayer: PlayerHistoryData = {
      index: playersArr.length + 1,
      name,
      position: 1,
      answered: 0,
      correctAnswers: 0,
    };

    setPlayersArr([...playersArr, newPlayer]);
    setNamePlayer('');
  };

  const handleDeletePlayer = (indexPlayer: number) => {
    const filtered = playersArr.filter((player) => player.index !== indexPlayer);
    const updated = filtered.map((player, idx) => ({
      ...player,
      index: idx + 1,
    }));
    setPlayersArr(updated);
  };

  const shuffleArray = () => {
    for (let i = playersArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [playersArr[i], playersArr[j]] = [playersArr[j], playersArr[i]];
    }
    playersArr.forEach((p, i) => (p.index = i + 1));
  };

  const startGame = async () => {
    if (playersArr.length < 2) return notify('Cần ít nhất 2 người chơi!');
    if (!selectedSetId) return notify('Vui lòng chọn một bộ câu hỏi!');

    try {
      const res = await getMilraceQuestionSetById(selectedSetId);
      if (res.success) {
        if (!res.data.questions || res.data.questions.length === 0) {
          notify('Bộ câu hỏi không có dữ liệu!');
          return;
        }
        setQuestionSet(res.data);
        shuffleArray();
        onNext();
      } else {
        notify(res.message);
      }
    } catch (err) {
      console.error(err);
      notify('Không thể tải bộ câu hỏi. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-[#fcefd4]">
      <div className="flex flex-col items-center justify-center gap-3 p-2 md:p-3 md:gap-4">
        <h3 className="font-bold text-center text-[#1b1b62] text-2xl md:text-5xl md:mb-2">Thêm người chơi</h3>
        <div className="flex gap-1 justify-center">
          <input
            type="text"
            placeholder="Nhập tên người chơi (tối đa 10 ký tự)"
            value={namePlayer}
            onChange={(e) => setNamePlayer(e.target.value)}
            className="bg-white text-xl placeholder:text-xs placeholder:tracking-tight py-2 px-3 rounded-full border-2 border-black max-w-[60%] md:w-sm md:text-4xl md:placeholder:text-base"
          />
          <button
            type="button"
            onClick={handleAddPlayer}
            className="bg-green-700 px-4 rounded-full font-bold text-white border-2 border-black md:text-2xl md:px-6"
          >
            Thêm
          </button>
        </div>

        <ul id="playerList" className="min-h-52 md:min-h-64">
          {playersArr.length > 0 ? (
            playersArr.map((player) => (
              <li
                key={player.index}
                className="bg-[#bbdff6] flex justify-between items-center w-3xs mb-2 px-4 py-2 rounded-full border-2 border-[#1b1b62] font-bold md:w-xs md:py-3"
              >
                <div className="flex items-center gap-2 md:text-2xl">
                  <div id={`token${player.index}`} className="token w-8 h-8 bg-gray-300 md:w-9 md:h-9"></div>
                  <span>{player.name}</span>
                </div>
                <button
                  className="bg-red-500 button-big h-8 text-white px-3 rounded-full flex items-center justify-center"
                  onClick={() => handleDeletePlayer(player.index)}
                >
                  Xóa
                </button>
              </li>
            ))
          ) : (
            <div className="mt-5 md:text-2xl">Chưa thêm người chơi nào!</div>
          )}
        </ul>

        <div className="flex justify-center font-bold ">
          <div className="bg-amber-400  max-w-[55%] rounded-l-full md:max-w-xs">
            <select
              value={selectedSetId}
              onChange={(e) => setSelectedSetId(e.target.value)}
              className="tracking-tighter py-2 px-4 w-full h-full text-gray-800 md:py-3 md:px-5 md:text-xl"
            >
              <option value="">Chọn bộ câu hỏi</option>
              {questionSets.map((set) => (
                <option key={set._id} value={set._id}>
                  {set.title}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="bg-[#1c1b62] text-white font-bold py-2 px-4 rounded-r-full border-black border-2 md:py-3 md:px-6 md:text-2xl"
            onClick={startGame}
          >
            Bắt đầu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScreenAddPlayer;
