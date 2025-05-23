'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Question } from '@/features/dashboard/TrustOrSelf/components/types';
import { FaRegClock } from 'react-icons/fa';
import RulesPopup from '@/features/dashboard/TrustOrSelf/components/Rules';
import LoadingScreen from '@/features/dashboard/TrustOrSelf/components/LoadingScreen';
import StartScreen from '@/features/dashboard/TrustOrSelf/components/StartScreen';
import ResultScreen from '@/features/dashboard/TrustOrSelf/components/ResultScreen';
import QuestionScreen from '@/features/dashboard/TrustOrSelf/components/QuestionScreen';
import FinishScreen from '@/features/dashboard/TrustOrSelf/components/FinishScreen';
import { fetchAllQuestions, incrementTrustCount, incrementSelfCount } from '@/features/dashboard/TrustOrSelf/api/api';

export default function TrustGamePage() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<{
    showRulesPopup: boolean;
    gameStarted: boolean;
    questionsLoaded: boolean;
    questions: Question[];
    remainingQuestions: Question[];
    currentQuestion: Question | null;
    result: { percentage: number; choice: 'trust' | 'self' } | null;
    showChoices: boolean;
    showTimerMenu: boolean;
    timerSeconds: number | null;
    timeLeft: number;
    isLastThreeSeconds: boolean;
    errorMessage: string | null;
  }>({
    showRulesPopup: false,
    gameStarted: false,
    questionsLoaded: false,
    questions: [],
    remainingQuestions: [],
    currentQuestion: null,
    result: null,
    showChoices: false,
    showTimerMenu: false,
    timerSeconds: null,
    timeLeft: 0,
    isLastThreeSeconds: false,
    errorMessage: null,
  });

  const updateState = (updates: Partial<typeof state>) => setState((prev) => ({ ...prev, ...updates }));

  const handleSettings = useCallback(() => router.push('/login'), [router]);

  const fetchGameData = useCallback(async () => {
    try {
      const questionsData = await fetchAllQuestions();
      if (!questionsData || questionsData.length === 0) {
        updateState({ remainingQuestions: [], currentQuestion: null, questionsLoaded: true, errorMessage: 'Không có câu hỏi nào' });
        return;
      }

      const initialQuestion = questionsData[Math.floor(Math.random() * questionsData.length)];
      updateState({
        questions: questionsData,
        remainingQuestions: questionsData,
        currentQuestion: initialQuestion,
        questionsLoaded: true,
        errorMessage: null,
      });
    } catch (error) {
      console.error('Lỗi lấy dữ liệu:', error);
      updateState({ questionsLoaded: true, remainingQuestions: [], currentQuestion: null, errorMessage: 'Lỗi tải câu hỏi' });
    }
  }, []);

  useEffect(() => {
    if (state.gameStarted && !state.questionsLoaded) {
      updateState({ showRulesPopup: true });
    }
  }, [state.gameStarted, state.questionsLoaded]);

  useEffect(() => {
    if (state.gameStarted && state.questionsLoaded && !state.currentQuestion && state.remainingQuestions.length > 0) {
      const nextQuestion = state.remainingQuestions[Math.floor(Math.random() * state.remainingQuestions.length)];
      updateState({ currentQuestion: nextQuestion });
    }

    if (state.currentQuestion && !state.result) {
      const timer = setTimeout(() => updateState({ showChoices: true }), 1000);
      return () => clearTimeout(timer);
    } else {
      updateState({ showChoices: false });
    }
  }, [state.currentQuestion, state.questionsLoaded, state.gameStarted, state.result, state.remainingQuestions]);

  useEffect(() => {
    if (state.timerSeconds === null) return;
    updateState({ timeLeft: state.timerSeconds, isLastThreeSeconds: false });

    const interval = setInterval(() => {
      setState((prev) => {
        const newTimeLeft = prev.timeLeft - 1;
        if (newTimeLeft <= 0) {
          clearInterval(interval);
          setTimeout(() => updateState({ timerSeconds: null }), 3000);
          return { ...prev, timeLeft: 0 };
        }
        return {
          ...prev,
          timeLeft: newTimeLeft,
          isLastThreeSeconds: newTimeLeft <= 3 && newTimeLeft > 0,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.timerSeconds]);

  useEffect(() => {
    if (state.isLastThreeSeconds && state.timerSeconds !== null && state.timeLeft > 0) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
    }
  }, [state.isLastThreeSeconds, state.timerSeconds, state.timeLeft]);

  const handleChoice = async (choice: 'trust' | 'self') => {
    if (!state.currentQuestion) return;

    updateState({ showChoices: false, timerSeconds: null });

    try {
      const updatedQuestion = await (choice === 'trust'
        ? incrementTrustCount(state.currentQuestion._id)
        : incrementSelfCount(state.currentQuestion._id));

      const total = updatedQuestion.trustCount + updatedQuestion.selfCount;
      const percentage = total === 0 ? 0 : Math.round((choice === 'trust' ? updatedQuestion.trustCount : updatedQuestion.selfCount) / total * 100);

      updateState({ result: { percentage, choice }, errorMessage: null });
    } catch (error) {
      console.error('Lỗi cập nhật lựa chọn:', error);
      updateState({ errorMessage: 'Lỗi cập nhật lựa chọn' });
    }
  };

  const handleNextQuestion = async () => {
    const newRemaining = state.remainingQuestions.filter((q) => q._id !== state.currentQuestion?._id);
    updateState({ remainingQuestions: newRemaining, result: null, showChoices: false });

    if (newRemaining.length > 0) {
      const nextQuestion = newRemaining[Math.floor(Math.random() * newRemaining.length)];
      updateState({ currentQuestion: nextQuestion });
    } else {
      updateState({ currentQuestion: null });
    }
  };

  if (!state.gameStarted) {
    return (
      <StartScreen
        onStartGame={() => {
          updateState({ gameStarted: true });
          fetchGameData();
        }}
        onShowRulesPopup={() => updateState({ showRulesPopup: true })}
        onSettings={handleSettings}
        showRulesPopup={state.showRulesPopup}
        onCloseRulesPopup={() => updateState({ showRulesPopup: false })}
      />
    );
  }

  if (state.gameStarted && state.showRulesPopup) {
    return <RulesPopup onClose={() => updateState({ showRulesPopup: false })} />;
  }

  if (state.gameStarted && !state.questionsLoaded) {
    return <LoadingScreen text="Đang tải câu hỏi..." onSettings={handleSettings} onShowRules={() => updateState({ showRulesPopup: true })} />;
  }

  if (state.questionsLoaded && !state.currentQuestion && state.remainingQuestions.length === 0) {
    return (
      <FinishScreen
        onReplay={() => window.location.reload()}
        onSettings={handleSettings}
        onShowRules={() => updateState({ showRulesPopup: true })}
      />
    );
  }

  if (state.result) {
    return (
      <ResultScreen
        result={state.result}
        onNextQuestion={handleNextQuestion}
        onSettings={handleSettings}
        onShowRules={() => updateState({ showRulesPopup: true })}
      />
    );
  }

  return (
    <div className="relative w-full h-screen bg-[#686868]">
      <audio ref={audioRef} src="/beep.mp3" preload="auto" />
      {state.errorMessage && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded z-50">
          {state.errorMessage}
        </div>
      )}
      {state.currentQuestion && !state.result && state.timerSeconds !== null && (
        <div
          className={`absolute top-70 left-1/2 -translate-x-1/2 px-10 py-4 rounded-xl bg-blue-700 text-white text-6xl font-bold select-none shadow-lg z-50 border-4 border-blue-900 ${
            state.isLastThreeSeconds ? 'animate-pulse text-red-500 bg-red-700 border-red-900' : ''
          }`}
        >
          {`${String(Math.floor(state.timeLeft / 60)).padStart(2, '0')}:${String(state.timeLeft % 60).padStart(2, '0')}`}
        </div>
      )}

      <div className="absolute bottom-5 right-5 flex flex-col items-end gap-4 z-40">
        <div className="relative">
          <button
            className="w-10 h-10 bg-[#1b1b62] rounded-full flex items-center justify-center text-white text-xl hover:bg-[#feb622] transition-colors duration-300 cursor-pointer"
            onClick={() => updateState({ showTimerMenu: !state.showTimerMenu })}
          >
            <FaRegClock />
          </button>
          {state.showTimerMenu && (
            <div className="absolute bottom-12 right-0 bg-white rounded-lg shadow-lg flex flex-col z-50">
              {[0.1, 2, 5, 10, 15, 30, 60].map((min) => (
                <button
                  key={min}
                  className="px-6 py-2 text-[#1b1b62] hover:bg-[#feb622] hover:text-white font-bold text-lg"
                  onClick={() => {
                    const seconds = min * 60;
                    updateState({ timerSeconds: seconds, timeLeft: seconds, showTimerMenu: false });
                  }}
                >
                  {min === 0.1 ? '6s' : `${min}p`}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <QuestionScreen
        currentQuestion={state.currentQuestion}
        showChoices={state.showChoices}
        onChoice={handleChoice}
        onShowRules={() => updateState({ showRulesPopup: true })}
      />
    </div>
  );
}