'use client';
import { deleteMilraceQuestionSet, getAllMilraceQuestionSets } from '@/features/milrace/api/milraceQuestionSet';
import { useEffect, useState } from 'react';

export default function QuestionSetList({ onEdit }) {
  const [sets, setSets] = useState([]);

  const fetchSets = async () => {
    const res = await getAllMilraceQuestionSets();
    if (res.success) {
      setSets(res.data);
    } else {
      alert(res.message || res.error);
    }
  };

  useEffect(() => {
    fetchSets();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc muốn xoá bộ câu hỏi này?')) return;

    const res = await deleteMilraceQuestionSet(id);
    if (res.success) {
      fetchSets(); // reload danh sách
      alert(res.message || res.error);
    } else {
      alert(res.message || res.error);
    }
  };

  return (
    <div className="mx-auto p-4 min-h-[500px]">
      <h1 className="text-2xl font-bold mb-4 text-center">Danh sách bộ câu hỏi</h1>
      <div className="relative overflow-x-auto">
        <table className="border border-gray-300 w-full text-sm text-left rtl:text-right max-w-3xl mx-auto">
          <thead className="text-xs text-black uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-4 border">
                Tên bộ câu hỏi
              </th>
              <th scope="col" className="px-6 py-4 border">
                Tùy chọn
              </th>
            </tr>
          </thead>
          <tbody>
            {sets.length == 0 ? (
              <tr>
                <td colSpan={2} className="py-12 font-bold text-center mt-32">
                  Chưa có bộ câu hỏi nào.
                </td>
              </tr>
            ) : (
              sets.map((set, i) => (
                <tr key={i} className="bg-white border-gray-200">
                  <td scope="row" className="border px-6 py-3 font-medium text-gray-900 whitespace-nowrap">
                    {set.title}
                  </td>
                  <td className="px-6 py-3 border">
                    <div className="flex gap-2">
                      <button className="text-blue-600  text-sm" onClick={() => onEdit(set._id)}>
                        Chỉnh sửa
                      </button>
                      <button onClick={() => handleDelete(set._id)} className="text-red-500 text-sm">
                        Xoá
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
