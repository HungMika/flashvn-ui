'use client';
import { getAllMilraceGameHistories } from '@/features/milrace/api/milraceGameHistory';
import { useModal } from '@/lib/ModalContext';
import { useEffect, useState } from 'react';

export default function GameHistoryList() {
  const { notify } = useModal();
  const [histories, setHistories] = useState([]);

  const fetchHistories = async () => {
    const res = await getAllMilraceGameHistories();
    if (res.success) {
      setHistories(res.data);
    } else {
      notify(res.message || res.error);
    }
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  return (
    <div className="mx-auto p-4 min-h-[500px]">
      <h1 className="text-2xl font-bold mb-4 text-center">Lịch sử trò chơi</h1>
      <div className="relative overflow-x-auto">
        <table className="border border-gray-300 w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-black uppercase bg-gray-200">
            <tr>
              <th className="px-4 py-4 border">Thời gian</th>
              <th className="px-4 py-4 border">Tên bộ câu hỏi</th>
              <th className="px-4 py-4 border">Người chơi 1</th>
              <th className="px-4 py-4 border">Người chơi 2</th>
              <th className="px-4 py-4 border">Người chơi 3</th>
              <th className="px-4 py-4 border">Người chơi 4</th>
              <th className="px-4 py-4 border">Người chơi 5</th>
            </tr>
          </thead>
          <tbody>
            {histories.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 font-bold text-center mt-32">
                  Chưa có lịch sử trò chơi nào.
                </td>
              </tr>
            ) : (
              histories.map((h, i) => (
                <tr key={i} className="bg-white border-b border-gray-200 font-medium text-gray-900">
                  <td className="border px-4 py-2">
                    {(() => {
                      const createdAt = new Date(h.createdAt);
                      const datePart = createdAt.toLocaleDateString('vi-VN');
                      const timePart = createdAt.toLocaleTimeString('vi-VN');
                      const [hour, minute, second] = timePart.split(':');
                      return `${second}:${minute}:${hour} ${datePart}`;
                    })()}
                  </td>
                  <td className="border px-4 py-2">{h.questionSetTitle}</td>
                  <td className="border px-4 py-2">{h.player1}</td>
                  <td className="border px-4 py-2">{h.player2}</td>
                  <td className="border px-4 py-2">{h.player3}</td>
                  <td className="border px-4 py-2">{h.player4}</td>
                  <td className="border px-4 py-2">{h.player5}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
