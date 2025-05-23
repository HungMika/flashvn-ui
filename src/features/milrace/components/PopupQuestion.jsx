'use client';

import { useEffect, useRef, useState } from 'react';

export default function PopupQuestion({ questionsArr, playerName, onFinish }) {
  const btnAnswerRef = useRef(null);
  const btnCloseAnswerRef = useRef(null);
  const [remainingQuestions, setRemainingQuestions] = useState([...questionsArr]);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [answerResult, setAnswerResult] = useState('');
  const [disableAnswerBtn, setDisableAnswerBtn] = useState(true);

  useEffect(() => {
    init();
  }, []);
  function init() {
    const randomQ = questionsArr[Math.floor(Math.random() * questionsArr.length)];
    setCurrentQuestion(randomQ);
    setSelectedChoice(null);
    setAnswered(false);
    setAnswerResult('');
    setDisableAnswerBtn(true);
    getRandomQuestion();
    btnCloseAnswerRef.current.style.display = 'none';
  }
  const getRandomQuestion = () => {
    let newRemaining = [...remainingQuestions];

    // Nếu hết câu hỏi, khởi tạo lại
    if (newRemaining.length === 0) {
      newRemaining = [...questionsArr];
    }

    // Lấy ngẫu nhiên một câu hỏi
    const randomIndex = Math.floor(Math.random() * newRemaining.length);
    const question = newRemaining[randomIndex];

    // Cập nhật danh sách còn lại (sau khi xoá câu đã chọn)
    newRemaining.splice(randomIndex, 1);
    setRemainingQuestions(newRemaining);
    setCurrentQuestion(question);
  };

  const handleSelectChoice = (key) => {
    if (answered) return;
    setSelectedChoice(key);
    setDisableAnswerBtn(false);
  };

  const handleSubmit = () => {
    btnAnswerRef.current.style.display = 'none';
    btnCloseAnswerRef.current.style.display = 'unset';

    if (!selectedChoice || !currentQuestion) return;

    const correct = selectedChoice === currentQuestion.ans;
    setAnswered(true);

    const resultText = correct
      ? `Trả lời đúng! Đáp án là: ${currentQuestion.ans}`
      : `Trả lời sai! Đáp án đúng là: ${currentQuestion.ans}`;
    setAnswerResult(resultText);
  };

  const handleClose = () => {
    if (!answered) return;
    btnAnswerRef.current.style.display = 'unset';
    btnCloseAnswerRef.current.style.display = 'none';
    if (onFinish) {
      const isCorrect = selectedChoice === currentQuestion.ans;
      onFinish(isCorrect); // Gửi kết quả đúng/sai cho cha
    }
  };

  return (
    <div className=" fixed top-0 left-0 h-screen w-screen">
      <div className="fixed w-screen h-screen z-40 bg-black opacity-90"></div>
      <div
        className="relative z-50 bg-sky-50 max-w-[90%] rounded-md
       top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:max-w-3xl"
      >
        <div className="flex items-center justify-between popup-header text-center relative">
          <span className="font-bold text-blue-900 text-lg py-1 mx-auto md:text-xl lg:text-2xl">
            Câu hỏi thử thách cho
            <span className="text-amber-600">{playerName ? ` ${playerName}` : ''}</span>
          </span>
        </div>
        <hr />
        <div className="py-2 px-3  md:px-4 md:py-3">
          <h2 className="text-xl font-bold tracking-tight text-center  md:text-2xl">{currentQuestion?.question}</h2>
          <div className="md:text-xl">
            {Object.entries(currentQuestion?.choices || {}).map(([key, value]) => {
              const isSelected = selectedChoice === key;
              const isCorrect = answered && key === currentQuestion.ans;
              const isWrong = answered && key !== currentQuestion.ans && key === selectedChoice;

              const baseClasses =
                'border-2  border-amber-400 px-1 py-2 rounded cursor-pointer text-left my-2 relative pl-6 -indent-4 transition-all md:pr-2 md:py-3 md:pl-10 md:-indent-5';
              const hoverClass = 'hover:border-yellow-400';

              const selectedClass = isSelected ? 'border-blue-600 bg-blue-200/40' : '';
              const correctClass = isCorrect ? 'border-green-700 bg-green-100 text-green-800 font-bold' : '';
              const wrongClass = isWrong ? 'border-red-600 bg-red-100 text-red-700 font-bold' : '';

              const classes = `${baseClasses} ${hoverClass} ${selectedClass} ${correctClass} ${wrongClass}`;

              return (
                <div key={key} className={classes} onClick={() => handleSelectChoice(key)}>
                  {key}. {value}
                </div>
              );
            })}
          </div>

          <p className="flex flex-col bg-sky-200 px-3 py-2 mt-4 font-bold text-center md:text-xl">{answerResult}</p>

          <div className="flex justify-center">
            <button
              className="bg-[#1c1b62] text-white font-bold p-1 mt-2 mb-1 rounded-full border-black border-2 w-32
              md:text-xl md:p-1.5 md:mt-3.5 md:mb-2"
              type="button"
              disabled={disableAnswerBtn || answered}
              onClick={handleSubmit}
              ref={btnAnswerRef}
            >
              Trả lời
            </button>
            <button
              className="bg-red-600 text-white font-bold p-1 mt-2 mb-1 rounded-full border-black border-2 w-32
              md:text-xl md:p-1.5 md:mt-3.5 md:mb-2"
              type="button"
              onClick={handleClose}
              disabled={!answered}
              ref={btnCloseAnswerRef}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
