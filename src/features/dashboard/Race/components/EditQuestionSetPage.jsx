'use client';
import {
  createMilraceQuestionSet,
  getMilraceQuestionSetById,
  updateMilraceQuestionSet,
} from '@/features/milrace/api/milraceQuestionSet';
import { useModal } from '@/lib/ModalContext';
import { useEffect, useState } from 'react';

export default function EditQuestionSetPage({ id, onBack }) {
  const { notify } = useModal();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      const res = await getMilraceQuestionSetById(id);
      if (res.success) {
        setTitle(res.data.title);
        setQuestions(res.data.questions);
      } else {
        notify(res.message || res.error);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (questions.length < 1) {
      notify('Bạn cần có ít nhất 1 câu hỏi');
      return;
    }

    const res = await updateMilraceQuestionSet(id, { title, questions });
    if (res.success) {
      notify(res.message);
      onBack();
    } else {
      notify(res.message || res.error);
    }
  };

  const updateQuestion = (i, field, value) => {
    const newQuestions = [...questions];
    newQuestions[i][field] = value;
    setQuestions(newQuestions);
  };

  const updateChoice = (i, key, value) => {
    const newQuestions = [...questions];
    newQuestions[i].choices[key] = value;
    setQuestions(newQuestions);
  };

  const addChoice = (i) => {
    const newQuestions = [...questions];
    const keys = Object.keys(newQuestions[i].choices);
    if (keys.length < 4) {
      const nextKey = String.fromCharCode(65 + keys.length);
      newQuestions[i].choices[nextKey] = '';
      setQuestions(newQuestions);
    }
  };

  const removeChoice = (i, key) => {
    const newQuestions = [...questions];
    delete newQuestions[i].choices[key];
    const keys = Object.keys(newQuestions[i].choices);
    newQuestions[i].ans = keys[0] || '';
    setQuestions(newQuestions);
  };

  const removeQuestion = (i) => {
    const newQuestions = [...questions];
    newQuestions.splice(i, 1);
    setQuestions(newQuestions.map((q, idx) => ({ ...q, index: idx + 1 })));
  };

  const addQuestion = () => {
    const nextIndex = questions.length + 1;
    setQuestions([
      ...questions,
      {
        index: nextIndex,
        question: '',
        choices: { A: '', B: '' },
        ans: 'A',
      },
    ]);
  };

  if (loading) return <p className="p-4">Đang tải dữ liệu...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Chỉnh sửa bộ câu hỏi</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tên bộ câu hỏi"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {questions.map((q, i) => (
          <div key={i} className="border p-4 pt-2 rounded space-y-2 relative">
            <h3 className="font-bold">Câu hỏi {i + 1}</h3>
            <input
              type="text"
              placeholder={`Câu hỏi ${i + 1}`}
              className="border p-2 w-full"
              value={q.question}
              onChange={(e) => updateQuestion(i, 'question', e.target.value)}
              required
            />

            {Object.entries(q.choices).map(([key, val]) => (
              <div key={key} className="flex gap-2 items-center">
                <span>{key}:</span>
                <input
                  type="text"
                  placeholder={`Đáp án ${key}`}
                  className="border p-2 flex-1"
                  value={val}
                  onChange={(e) => updateChoice(i, key, e.target.value)}
                  required
                />
                {Object.keys(q.choices).length > 2 && (
                  <button type="button" onClick={() => removeChoice(i, key)} className="text-sm text-red-500">
                    Xoá
                  </button>
                )}
              </div>
            ))}

            {Object.keys(q.choices).length < 4 && (
              <button type="button" className="text-blue-500 text-sm underline" onClick={() => addChoice(i)}>
                + Thêm đáp án
              </button>
            )}
            <div className="flex-wrap flex gap-2 justify-between items-center">
              <div>
                <label className="mr-2">Đáp án đúng:</label>
                <select className="border p-1" value={q.ans} onChange={(e) => updateQuestion(i, 'ans', e.target.value)}>
                  {Object.keys(q.choices).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => removeQuestion(i)}
                className="whitespace-nowrap text-white bg-red-500 px-3 py-1"
              >
                {`Xóa câu hỏi ${i + 1}`}
              </button>
            </div>
          </div>
        ))}
        <div className="w-full flex place-content-between">
          <button type="button" onClick={addQuestion} className="bg-green-500 text-white px-4 py-2">
            + Thêm câu hỏi
          </button>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2">
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
}
