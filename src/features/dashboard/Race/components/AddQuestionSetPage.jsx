'use client';
import { createMilraceQuestionSet } from '@/features/milrace/api/milraceQuestionSet';
import { useModal } from '@/lib/ModalContext';
import { useState } from 'react';

export default function AddQuestionSetPage({ onBack }) {
  const { notify } = useModal();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    {
      index: 1,
      question: '',
      choices: { A: '', B: '' },
      ans: 'A',
    },
  ]);
  
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

  const removeQuestion = (i) => {
    const newQuestions = [...questions];
    newQuestions.splice(i, 1);
    setQuestions(newQuestions.map((q, idx) => ({ ...q, index: idx + 1 })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (questions.length < 1) {
      notify('Bạn cần tạo ít nhất 1 câu hỏi');
      return;
    }

    const res = await createMilraceQuestionSet({ title, questions });
    if (res.success) {
      notify(res.message || res.error);
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
    const choices = newQuestions[i].choices;
    const keys = Object.keys(choices);
    if (keys.length < 4) {
      const nextKey = String.fromCharCode(65 + keys.length); // A, B, C, D
      choices[nextKey] = '';
      newQuestions[i].ans = keys[0]; // default ans to first option
      setQuestions(newQuestions);
    }
  };

  const removeChoice = (i, key) => {
    const newQuestions = [...questions];
    delete newQuestions[i].choices[key];

    // Nếu đáp án đúng bị xoá, gán lại đáp án đúng là đáp án đầu tiên
    const keys = Object.keys(newQuestions[i].choices);
    newQuestions[i].ans = keys[0] || '';
    setQuestions(newQuestions);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Tạo bộ câu hỏi</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tên bộ câu hỏi"
          className="p-2 w-full border-2"
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
            Lưu bộ câu hỏi
          </button>
        </div>
      </form>
    </div>
  );
}
