'use client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FaRegQuestionCircle, FaWrench } from 'react-icons/fa';
import GamePopup from '@/features/dashboard/Teller/components/GamePopup';
import StartScreen from '@/features/dashboard/Teller/components/StartScreen';
import WaitScreen from '@/features/dashboard/Teller/components/WaitScreen';
import DealScreen from '@/features/dashboard/Teller/components/DealScreen';
import ShowScreen from '@/features/dashboard/Teller/components/ShowScreen';
import { ICardData, ISuggestData } from '@/features/dashboard/Teller/components/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/future-teller';
const ftCardApi = {
  getAllByGroup: async (group: string): Promise<ICardData[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/cards/group?query=${group}`);
      if (!response.ok) {
        if (response.status === 404) {
          console.warn(`No cards found for group: ${group}. Using fallback.`);
          return [];
        }
        throw new Error(`Failed to fetch cards for group ${group}: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching cards for group ${group}:`, error);
      return [];
    }
  },
};

const ftSuggestApi = {
  getAll: async (): Promise<ISuggestData[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/suggests`);
      if (!response.ok) {
        if (response.status === 404) {
          console.warn('No suggests found. Using fallback.');
          return [];
        }
        throw new Error(`Failed to fetch suggests: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching suggests:', error);
      return [];
    }
  },
};

type GameState = 'initial' | 'emptySlots' | 'dealing' | 'dealt' | 'flipping' | 'flipped';

const Page: React.FC = () => {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>('initial');
  const [cards, setCards] = useState<ICardData[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [outlines, setOutlines] = useState<ISuggestData[]>([]);
  const [currentOutlineIndex, setCurrentOutlineIndex] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState<boolean>(false);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false, false]);
  const [showStartScreen, setShowStartScreen] = useState<boolean>(true);
  const [dealtCards, setDealtCards] = useState<ICardData[]>([]);
  const [showQuestionBox, setShowQuestionBox] = useState<boolean>(false);
  const [fontScale, setFontScale] = useState<number>(1);

  const [cardPool, setCardPool] = useState<{
    times: ICardData[];
    majors: ICardData[];
    technologies: ICardData[];
    impacts: ICardData[];
  }>({ times: [], majors: [], technologies: [], impacts: [] });

  const fetchCardPool = useCallback(async () => {
    try {
      const [times, majors, technologies, impacts] = await Promise.all([
        ftCardApi.getAllByGroup('times'),
        ftCardApi.getAllByGroup('majors'),
        ftCardApi.getAllByGroup('technologies'),
        ftCardApi.getAllByGroup('impacts'),
      ]);
      setCardPool({ times, majors, technologies, impacts });
    } catch (error) {
      console.error('Error fetching card pool:', error);
      toast.error('Không thể tải dữ liệu');
    }
  }, []);

  const fetchOutlines = useCallback(async () => {
    try {
      const result = await ftSuggestApi.getAll();
      setOutlines(result);
    } catch (error) {
      console.error('Error fetching outlines:', error);
      toast.error('Không thể tải gợi ý thảo luận.');
    }
  }, []);

  useEffect(() => {
    fetchCardPool();
    fetchOutlines();
  }, [fetchCardPool, fetchOutlines]);

  const generateRandomCard = (group: keyof typeof cardPool): ICardData => {
    const availableCards = cardPool[group];
    if (availableCards.length === 0) {
      console.warn(`No cards available for group: ${group}`);
      return {
        title: 'Chưa có dữ liệu',
        group,
        image: `/cards/placeholder-${group}.png`,
      };
    }
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    return availableCards[randomIndex];
  };

  const startGame = () => {
    setShowStartScreen(false);
    setGameState('emptySlots');
    setFlippedCards([false, false, false, false]);
    setQuestion('');
    setDealtCards([]);
    setCards([]);
    setShowQuestionBox(false);
  };

  const dealCards = () => {
    if (
      cardPool.times.length === 0 ||
      cardPool.majors.length === 0 ||
      cardPool.technologies.length === 0 ||
      cardPool.impacts.length === 0
    ) {
      toast.warn('Dữ liệu bài chưa sẵn sàng.');
      return;
    }

    setGameState('dealing');
    setCards([]);
    setDealtCards([]);
    setFlippedCards([false, false, false, false]);
    setShowQuestionBox(false);
    setQuestion('');

    const newCards: ICardData[] = [
      generateRandomCard('times'),
      generateRandomCard('majors'),
      generateRandomCard('technologies'),
      generateRandomCard('impacts'),
    ];

    setCards(newCards);

    newCards.forEach((card, index) => {
      setTimeout(() => {
        setDealtCards((prev) => [...prev, card]);

        if (index === newCards.length - 1) {
          setGameState('dealt');
          toast.success('Bài đã được chia! Chuẩn bị lật bài...');

          setTimeout(() => {
            setGameState('flipping');
            newCards.forEach((_, flipIndex) => {
              setTimeout(() => {
                setFlippedCards((prev) => {
                  const newFlipped = [...prev];
                  newFlipped[flipIndex] = true;
                  return newFlipped;
                });

                if (flipIndex === newCards.length - 1) {
                  const timeTitle = newCards[0]?.title || 'một thời điểm nào đó';
                  const majorTitle = newCards[1]?.title || 'một ngành nào đó';
                  const technologyTitle = newCards[2]?.title || 'một công nghệ nào đó';
                  const impactTitle = newCards[3]?.title || 'một tác động nào đó';

                  let generatedQuestion: string;
                  if (timeTitle === 'Con người có thể sống trên Mặt trăng') {
                    generatedQuestion = `${timeTitle}, khi ${majorTitle} có sự hỗ trợ của công nghệ ${technologyTitle} sẽ ${impactTitle} như thế nào?`;
                  } else if (timeTitle === 'Sau Thế chiến thứ 3') {
                    generatedQuestion = `${timeTitle}, ${majorTitle} có sự hỗ trợ của công nghệ ${technologyTitle} sẽ ${impactTitle} ra sao?`;
                  } else if (impactTitle === 'mâu thuẫn xã hội') {
                    generatedQuestion = `${timeTitle}, ${majorTitle} có sự hỗ trợ của công nghệ ${technologyTitle} sẽ ${impactTitle} như thế nào?`;
                  } else if (impactTitle === 'khủng hoảng kinh tế') {
                    generatedQuestion = `${timeTitle}, ${majorTitle} có sự hỗ trợ của công nghệ ${technologyTitle} sẽ ${impactTitle} ra sao?`;
                  } else {
                    generatedQuestion = `${timeTitle}, ${majorTitle} có sự hỗ trợ của công nghệ ${technologyTitle} sẽ ${impactTitle} gì?`;
                  }

                  setQuestion(generatedQuestion);
                  setShowQuestionBox(true);
                  setGameState('flipped');
                  toast.info('Tất cả bài đã lật! Hãy thảo luận về câu hỏi tiên tri!');
                }
              }, flipIndex * 500);
            });
          }, 2000);
        }
      }, index * 500);
    });
  };

  const resetGame = () => {
    setGameState('initial');
    setShowStartScreen(true);
    setCards([]);
    setQuestion('');
    setFlippedCards([false, false, false, false]);
    setDealtCards([]);
    setShowQuestionBox(false);
  };

  const openSuggestion = () => {
    if (outlines.length > 0) {
      setCurrentOutlineIndex(0);
      setIsPopupOpen(true);
    } else {
      toast.warn('Không có gợi ý thảo luận nào.');
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const nextSuggestion = () => {
    if (currentOutlineIndex < outlines.length - 1) {
      setCurrentOutlineIndex((prev) => prev + 1);
    } else {
      toast.info('Đây là gợi ý cuối cùng.');
    }
  };

  const prevSuggestion = () => {
    if (currentOutlineIndex > 0) {
      setCurrentOutlineIndex((prev) => prev - 1);
    }
  };

  const openHowToPlay = () => {
    setIsHowToPlayOpen(true);
  };

  const closeHowToPlay = () => {
    setIsHowToPlayOpen(false);
  };

  const increaseFontSize = () => {
    setFontScale((prev) => Math.min(prev + 0.1, 1.5));
  };

  const decreaseFontSize = () => {
    setFontScale((prev) => Math.max(prev - 0.1, 0.7));
  };

  const goToLogin = () => {
    router.push('/');
  };

  const suggestionContent = outlines[currentOutlineIndex] ? (
    <div className="flex flex-col items-center p-4">
      <p className="text-blue-600 font-semibold mb-2">
        {outlines[currentOutlineIndex].step} - {outlines[currentOutlineIndex].time}
      </p>
      <p className="font-bold text-xl mb-2 text-center">{outlines[currentOutlineIndex].title}</p>
      <p className="text-center mb-4">{outlines[currentOutlineIndex].content}</p>
      <p className="text-gray-600 italic text-sm">Gợi ý: {outlines[currentOutlineIndex].suggest}</p>
      {outlines[currentOutlineIndex].emoji && (
        <span className="text-5xl mt-4">{outlines[currentOutlineIndex].emoji}</span>
      )}
    </div>
  ) : (
    <p>Đang tải gợi ý...</p>
  );

  const howToPlayContent = (
    <div className="text-left p-4">
      <p className="mb-2">
        Future Teller là một trò chơi kích thích tư duy, thảo luận nhóm để đưa ra các dự đoán về tương lai theo các câu hỏi
        tương ứng với 4 yếu tố gồm: Thời điểm, Ngành, Công nghệ, và Tác động.
      </p>
      <p className="mb-2">
        Khi chọn ‘Bắt đầu’, mỗi nhóm sẽ được phát 4 thẻ bài tương ứng với 4 yếu tố khác nhau được ghép thành câu hỏi hoàn
        chỉnh. Sau khi (các) nhóm có đủ câu hỏi, giáo viên/ quản trò có thể chọn nút ‘Gợi ý thảo luận’ để dẫn dắt cuộc
        thảo luận.
      </p>
    </div>
  );

  return (
    <>
      <button
        className="fixed bottom-8 right-8 cursor-pointer bg-blue-900 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl shadow-lg hover:bg-yellow-400 transition-colors duration-200 z-50"
        onClick={goToLogin}
      >
        <FaWrench />
      </button>
      <button
        className="fixed top-8 right-8 cursor-pointer bg-blue-900 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl shadow-lg hover:bg-yellow-400 transition-colors duration-200 z-50"
        onClick={openHowToPlay}
      >
        <FaRegQuestionCircle />
      </button>

      {showStartScreen && <StartScreen onStart={startGame} onHowToPlay={openHowToPlay} />}

      {!showStartScreen && gameState === 'emptySlots' && <WaitScreen onDeal={dealCards} />}

      {!showStartScreen &&
        (gameState === 'dealing' || gameState === 'dealt' || gameState === 'flipping') && (
          <DealScreen
            gameState={gameState}
            cards={cards}
            dealtCards={dealtCards}
            flippedCards={flippedCards}
            showQuestionBox={showQuestionBox}
          />
        )}

      {!showStartScreen && gameState === 'flipped' && showQuestionBox && (
        <ShowScreen
          cards={cards}
          dealtCards={dealtCards}
          flippedCards={flippedCards}
          question={question}
          onReset={resetGame}
          onSuggest={openSuggestion}
          fontScale={fontScale}
        />
      )}

      <GamePopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        title="Quy trình thảo luận"
        content={suggestionContent}
        showNavigation={true}
        onNext={nextSuggestion}
        onPrev={prevSuggestion}
        step={currentOutlineIndex + 1}
        fontScale={fontScale}
        onIncreaseSize={increaseFontSize}
        onDecreaseSize={decreaseFontSize}
      />

      <GamePopup
        isOpen={isHowToPlayOpen}
        onClose={closeHowToPlay}
        title="Cách chơi"
        content={howToPlayContent}
        fontScale={fontScale}
        onIncreaseSize={increaseFontSize}
        onDecreaseSize={decreaseFontSize}
      />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Page;