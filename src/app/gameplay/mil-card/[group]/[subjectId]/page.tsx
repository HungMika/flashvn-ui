'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getQuestionsBySubject } from '@/features/dashboard/Card/api/question';
import Dice from '@/components/dice/dice';
import { CircleArrowLeft, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Question {
  _id: string;
  title: string;
  correctAnswer: string;
  wrongAnswers: string[];
}

export default function GameplayPage() {
  const { subjectId } = useParams() as { subjectId: string };
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const shuffleArray = (array: Question[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const {
    data: questions = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['questions', subjectId],
    queryFn: async () => {
      if (!subjectId) throw new Error('Subject ID is undefined');
      const data = await getQuestionsBySubject(subjectId);
      return shuffleArray(data);
    },
    onError: () => {
      toast.error('Không thể tải câu hỏi!');
    },
    enabled: !!subjectId, // chỉ gọi khi có subjectId
  });

  const nextQuestion = () => {
    setShowResult(false);
    setSelectedAnswer(null);

    const remainingQuestions = questions.filter((q) => !answeredQuestions.has(q._id));

    if (remainingQuestions.length === 0) {
      toast.success('Hoàn thành tất cả câu hỏi!');
      setTimeout(() => router.back(), 3000);
      return;
    }

    const next = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
    setCurrentQuestion(next);

    const allAnswers = [...next.wrongAnswers, next.correctAnswer];
    setShuffledAnswers(allAnswers.sort(() => Math.random() - 0.5));
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    setShowResult(true);
    setAnsweredQuestions((prev) => new Set(prev).add(currentQuestion?._id || ''));
  };

  const handleSelectAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  useEffect(() => {
    if (questions.length > 0) nextQuestion();
  }, [questions]);

  const getAnswerLabel = (index: number) => {
    return String.fromCharCode(65 + index);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {isLoading ? (
        <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
          <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : isError || questions.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <div className="text-center text-lg font-semibold text-red-600">
            {isError ? 'Lỗi tải dữ liệu' : 'Chủ đề này chưa có câu hỏi.'}
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            <CircleArrowLeft size={20} />
            Quay lại
          </button>
        </div>
      ) : (
        <>
          <Dice />

          {currentQuestion && (
            <div className="w-full max-w-lg mt-8 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">{currentQuestion.title}</h2>
              <div className="space-y-3">
                {shuffledAnswers.map((answer, index) => {
                  let borderColor = 'border-gray-400';

                  if (showResult) {
                    if (answer === currentQuestion.correctAnswer) {
                      borderColor = 'border-green-600';
                    } else if (selectedAnswer === answer) {
                      borderColor = 'border-red-600';
                    }
                  } else {
                    if (selectedAnswer === answer) {
                      borderColor = 'border-yellow-500';
                    }
                  }

                  return (
                    <div
                      key={index}
                      className={`border-[2px] rounded-md p-3 cursor-pointer transition-all duration-200 ${borderColor}`}
                      onClick={() => handleSelectAnswer(answer)}
                    >
                      {getAnswerLabel(index)}. {answer}
                    </div>
                  );
                })}
              </div>

              {showResult && (
                <div className="mt-4 text-lg font-semibold text-blue-600">
                  Đáp án là: {getAnswerLabel(shuffledAnswers.findIndex((ans) => ans === currentQuestion.correctAnswer))}
                </div>
              )}

              <div className="mt-6 flex justify-between bg-white p-2 rounded-lg">
                <button
                  onClick={checkAnswer}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
                  disabled={showResult || !selectedAnswer}
                >
                  Đáp án
                </button>
                <button
                  onClick={nextQuestion}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:bg-gray-300"
                  disabled={!showResult}
                >
                  Câu tiếp theo
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
