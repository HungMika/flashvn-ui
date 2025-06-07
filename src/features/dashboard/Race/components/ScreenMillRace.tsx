'use client';

import { useEffect, useRef, useState } from 'react';
import PopupQuestion from './PopupQuestion';
import GameMobile from './GameMobile';
import GamePC from './GamePC';
import { createMilraceGameHistory } from '../api/milraceGameHistory';
import { MilraceQuestionSet, Player } from '@/types/milrace';
import { useModal } from '@/lib/ModalContext';

interface ScreenMillRaceProps {
  onNext: () => void;
  playersArr: Player[];
  setPlayersArr: React.Dispatch<React.SetStateAction<Player[]>>;
  onPopupHowtoplay: () => void;
  questionSet: MilraceQuestionSet;
}

type QuestionCallback = (isCorrect: boolean) => void;

export default function ScreenMillRace({
  onNext,
  playersArr,
  setPlayersArr,
  onPopupHowtoplay,
  questionSet,
}: ScreenMillRaceProps) {
  const { notify } = useModal();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(1);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [questionCallback, setQuestionCallback] = useState<QuestionCallback | null>(null);
  const [rolling, setRolling] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('tab1');
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  );

  const soundsRef = useRef<{ move: HTMLAudioElement | null; win: HTMLAudioElement | null }>({
    move: null,
    win: null,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Call immediately on mount
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const moveSound = new Audio('/milrace/sound/sound_move.mp3');
    const winSound = new Audio('/milrace/sound/sound_winner.mp3');

    moveSound.preload = 'auto';
    winSound.preload = 'auto';

    moveSound.load();
    winSound.load();

    soundsRef.current.move = moveSound;
    soundsRef.current.win = winSound;
  }, []);

  const playMoveSound = () => {
    if (soundsRef.current.move) {
      const sound = soundsRef.current.move.cloneNode() as HTMLAudioElement;
      sound.play();
    }
  };

  const playWinSound = () => {
    if (soundsRef.current.win) {
      const sound = soundsRef.current.win.cloneNode() as HTMLAudioElement;
      sound.play();
    }
  };

  function displayPlayersOnBoard(players = playersArr) {
    document.querySelectorAll('.token-container').forEach((el) => el.remove());

    // Group players by cell element
    const byCell = new Map<Element, Player[]>();
    players.forEach((player) => {
      const cellId = `c${player.position}`;
      const cellEls = document.querySelectorAll(`#${cellId}`);
      cellEls.forEach((cellEl) => {
        if (!byCell.has(cellEl)) {
          byCell.set(cellEl, []);
        }
        byCell.get(cellEl)!.push(player);
      });
    });

    // Create token containers and tokens
    byCell.forEach((playersInCell, cellEl) => {
      const container = document.createElement('div');
      container.classList.add('token-container');

      if (cellEl.classList.contains('cell_pc')) {
        container.classList.add('token-container-pc');
      } else if (cellEl.classList.contains('cell_m')) {
        container.classList.add('token-container-m');
      }

      playersInCell.forEach((player, i) => {
        const token = document.createElement('div');
        token.id = `token${player.index}`;
        token.classList.add('token');

        if (cellEl.classList.contains('cell_pc')) {
          token.style.left = `${-(70 + (playersInCell.length - 1) * 17) / 2 + i * 17}px`;
          token.classList.add('token-pc');
        } else if (cellEl.classList.contains('cell_m')) {
          token.style.left = `${-(35 + (playersInCell.length - 1) * 8) / 2 + i * 8}px`;
          token.classList.add('token-m');
        }

        token.style.zIndex = i.toString();
        token.style.setProperty('--i', i.toString());
        container.appendChild(token);
      });

      (cellEl as HTMLElement).style.position = 'relative';
      cellEl.appendChild(container);
    });
  }

  useEffect(() => {
    displayPlayersOnBoard();
  }, []);

  useEffect(() => {
    // Optional: some effect on currentPlayerIndex change
  }, [currentPlayerIndex]);

  const askQuestion = (): Promise<boolean> => {
    return new Promise((resolve) => {
      setShowPopup(true);
      setQuestionCallback(() => resolve);
    });
  };

  async function rollDice() {
    setRolling(true);
    const currentPlayer = playersArr[currentPlayerIndex - 1];
    const startPosition = currentPlayer.position;
    const WIN_POSITION = 32;
    let moved = false;

    let diceRoll = getRandomInt(1, 6);
    console.log(`Rolling... Rolled a ${diceRoll}`);
    await sleep(200);
    rollTheDice(diceRoll);
    await sleep(3200);

    let potentialPosition = startPosition + diceRoll;
    let finalPosition = startPosition;

    if (potentialPosition === WIN_POSITION) {
      console.log(`Player ${currentPlayer.name} moves from ${startPosition} to WIN position (${WIN_POSITION})!`);
      if (isMobileScreen) {
        setActiveTab('tab1');
        await sleep(1500);
      }
      await animatePlayerMove(currentPlayer, startPosition, diceRoll);
      finalPosition = WIN_POSITION;
      moved = true;
    } else if (potentialPosition < WIN_POSITION) {
      console.log(`Player ${currentPlayer.name} moves from ${startPosition} to ${potentialPosition}.`);
      if (isMobileScreen) {
        setActiveTab('tab1');
        await sleep(1500);
      }
      await animatePlayerMove(currentPlayer, startPosition, diceRoll);
      finalPosition = potentialPosition;
      moved = true;
    } else {
      console.log(`Player ${currentPlayer.name} rolled ${diceRoll}, overshoot! Stays at position ${startPosition}`);
      moved = false;
    }

    if (moved) {
      currentPlayer.position = finalPosition;
      displayPlayersOnBoard(playersArr);
      await sleep(1000);
    }

    if (await checkEndGame()) {
      console.log('Game ended after move.');
      return;
    }

    if (moved && finalPosition > 0 && finalPosition < WIN_POSITION && finalPosition % 3 === 0) {
      await sleep(1500);
      console.log(`Player ${currentPlayer.name} landed on ${finalPosition} (multiple of 3). Asking a question...`);

      const answeredCorrectly = await askQuestion();
      currentPlayer.answered += 1;
      if (!answeredCorrectly) {
        console.log(
          `Player ${currentPlayer.name} answered wrong. Logic to move back is handled within question popup closure.`,
        );
        await sleep(1000);
        await animatePlayerMoveBack(currentPlayer, 2);
        displayPlayersOnBoard(playersArr);
      } else {
        console.log(`Player ${currentPlayer.name} answered correctly.`);
        currentPlayer.correctAnswers += 1;
      }
    }

    setCurrentPlayerIndex((currentPlayerIndex % playersArr.length) + 1);
    console.log(`--- Next turn: Player ${playersArr[currentPlayerIndex - 1].name} ---`);

    await sleep(1500);
    setRolling(false);
  }

  async function animatePlayerMove(player: Player, startPosition: number, steps: number) {
    const STEP_DELAY = 400;
    const MAX_POSITION = 32;

    let currentStepPosition = startPosition;

    for (let i = 1; i <= steps; i++) {
      currentStepPosition++;
      playMoveSound();
      if (currentStepPosition > MAX_POSITION) {
        currentStepPosition = MAX_POSITION;
      }

      player.position = currentStepPosition;
      displayPlayersOnBoard(playersArr);

      if (currentStepPosition === MAX_POSITION) {
        break;
      }

      await sleep(STEP_DELAY);
    }
  }

  async function animatePlayerMoveBack(player: Player, steps: number) {
    const STEP_DELAY = 400;
    const MIN_POSITION = 0;

    let currentStepPosition = player.position;
    const actualStepsToTake = Math.min(steps, currentStepPosition - MIN_POSITION);

    if (actualStepsToTake <= 0) {
      console.log(`Player ${player.name} is already at or near the start, cannot move back ${steps} steps.`);
      return;
    }

    console.log(`Moving player ${player.name} back ${actualStepsToTake} steps.`);

    for (let i = 1; i <= actualStepsToTake; i++) {
      currentStepPosition--;
      playMoveSound();
      player.position = currentStepPosition;
      displayPlayersOnBoard(playersArr);
      await sleep(STEP_DELAY);
    }

    console.log(`Player ${player.name} moved back to position ${player.position}.`);
  }

  async function checkEndGame(): Promise<boolean> {
    const winningPosition = 32;
    const winners = playersArr.filter((player) => player.position === winningPosition);

    if (winners.length > 0) {
      await createGameHistory(playersArr, questionSet.title);
      console.log('Winner found!');
      playWinSound();
      await sleep(1500);

      onNext();
      return true;
    }

    return false;
  }

  async function createGameHistory(players: Player[], questionSetTitle: string) {
    try {
      const res = await createMilraceGameHistory(questionSetTitle, players);
      if (res.success) {
        console.log('Lịch sử trò chơi đã được tạo thành công.');
      } else {
        notify(res.message || (res as any).error);
      }
    } catch (error) {
      console.error('Lỗi khi tạo lịch sử trò chơi:', error);
    }
  }

  console.log(playersArr);

  return (
    <div className="min-h-screen min-w-screen">
      {/* Mobile View */}
      <div className="block md:hidden min-h-screen min-w-screen">
        <GameMobile
          playersArr={playersArr}
          currentPlayerIndex={currentPlayerIndex}
          rolling={rolling}
          rollDice={rollDice}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block min-h-screen min-w-screen">
        <GamePC
          playersArr={playersArr}
          currentPlayerIndex={currentPlayerIndex}
          rolling={rolling}
          rollDice={rollDice}
          onPopupHowtoplay={onPopupHowtoplay}
          questionSetTitle={questionSet.title || ''}
        />
      </div>

      {showPopup && (
        <PopupQuestion
          questionsArr={questionSet.questions}
          playerName={playersArr[currentPlayerIndex - 1].name}
          onFinish={(isCorrect) => {
            setShowPopup(false); // Ẩn popup
            questionCallback && questionCallback(isCorrect); //Resolve Promise
          }}
        />
      )}
    </div>
  );
}

// Helper function
function getRandomInt(min: number, max: number): number {
  // Inclusive min, max
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getRotationForResult(result: number) {
  switch (result) {
    case 1:
      return { x: 0, y: 0 }; // Mặt Front
    case 6:
      return { x: 0, y: 180 }; // Mặt Back
    case 5:
      return { x: 0, y: -90 }; // Mặt Right (quay từ front sang phải) -> đổi lại thành 5
    case 2:
      return { x: 0, y: 90 }; // Mặt Left (quay từ front sang trái) -> đổi lại thành 2
    case 4:
      return { x: -90, y: 0 }; // Mặt Top
    case 3:
      return { x: 90, y: 0 }; // Mặt Bottom
    default:
      return { x: 0, y: 0 }; // Mặc định là mặt 1
  }
}
function rollTheDice(result: number): void {
  const targetRotation = getRotationForResult(result);

  const randomSpinsX = Math.floor(Math.random() * 6 + 4); // Quay ít nhất 4 vòng X
  const randomSpinsY = Math.floor(Math.random() * 6 + 4); // Quay ít nhất 4 vòng Y

  const finalRotationX = targetRotation.x + randomSpinsX * 360;
  const finalRotationY = targetRotation.y + randomSpinsY * 360;

  const diceElements = document.querySelectorAll<HTMLElement>('.dice');
  diceElements.forEach((element) => {
    element.style.transform = `rotateX(${finalRotationX}deg) rotateY(${finalRotationY}deg)`;
  });
}
