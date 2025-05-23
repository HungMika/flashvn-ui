'use client';
import { useEffect, useRef, useState } from 'react';
import PopupQuestion from './PopupQuestion';
import GameMobile from './GameMobile';
import GamePC from './GamePC';
import { createMilraceGameHistory } from '../api/milraceGameHistory';

export default function ScreenMillRace({ onNext, playersArr, setPlayersArr, onPopupHowtoplay, questionSet }) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [questionCallback, setQuestionCallback] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [isMobileScreen, setIsMobileScreen] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  const soundsRef = useRef({
    move: null,
    win: null,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Gọi luôn khi mount
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
      const sound = soundsRef.current.move.cloneNode();
      sound.play();
    }
  };

  const playWinSound = () => {
    if (soundsRef.current.win) {
      const sound = soundsRef.current.win.cloneNode();
      sound.play();
    }
  };

  function displayPlayersOnBoard() {
    // 1. Xoá toàn bộ token-container cũ
    document.querySelectorAll('.token-container').forEach((el) => el.remove());

    // 2. Gom nhóm người chơi theo vị trí
    const byCell = new Map();
    playersArr.forEach((player) => {
      const cellId = `c${player.position}`;
      const cellEls = document.querySelectorAll(`#${cellId}`);
      cellEls.forEach((cellEl) => {
        if (!byCell.has(cellEl)) {
          byCell.set(cellEl, []);
        }
        byCell.get(cellEl).push(player);
      });
    });

    // 3. Tạo token-container cho cả PC và mobile
    byCell.forEach((playersInCell, cellEl) => {
      const container = document.createElement('div');
      container.classList.add('token-container');

      // Dựa vào class của cell để xác định là PC hay mobile
      if (cellEl.classList.contains('cell_pc')) {
        container.classList.add('token-container-pc');
      } else if (cellEl.classList.contains('cell_m')) {
        container.classList.add('token-container-m');
      }

      // Tạo token
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

        token.style.zIndex = i;
        token.style.setProperty('--i', i); // Dùng trong CSS để canh lệch trái
        container.appendChild(token);
      });

      // Đảm bảo cell có position: relative
      cellEl.style.position = 'relative';
      cellEl.appendChild(container);
    });
  }
  useEffect(() => {
    displayPlayersOnBoard();
    // displayPlayerList();
  }, []);
  useEffect(() => {
    // displayPlayerList();
  }, [currentPlayerIndex]);

  const askQuestion = () => {
    return new Promise((resolve) => {
      setShowPopup(true);
      setQuestionCallback(() => resolve); // Lưu lại callback để truyền sang component con
    });
  };
  async function rollDice() {
    setRolling(true);
    const currentPlayer = playersArr[currentPlayerIndex - 1];
    const startPosition = currentPlayer.position;
    const WIN_POSITION = 32;
    let moved = false;

    // --- 1. Tung xúc xắc và tính toán vị trí tiềm năng ---
    let diceRoll = getRandomInt(1, 6);
    console.log(`Rolling... Rolled a ${diceRoll}`);
    await sleep(200); // Chờ xúc xắc quay xong
    rollTheDice(diceRoll); // Chỉ là hiệu ứng hình ảnh
    await sleep(3200); // Chờ xúc xắc quay xong

    let potentialPosition = startPosition + diceRoll;
    let finalPosition = startPosition; // Mặc định là đứng yên

    // --- 2. Xác định vị trí cuối cùng và thực hiện di chuyển (nếu có) ---
    if (potentialPosition === WIN_POSITION) {
      // Đi đúng tới ô Win
      console.log(`Player ${currentPlayer.name} moves from ${startPosition} to WIN position (${WIN_POSITION})!`);
      if (isMobileScreen) {
        setActiveTab('tab1');
        await sleep(1500);
      }
      await animatePlayerMove(currentPlayer, startPosition, diceRoll); // Di chuyển đủ số bước
      finalPosition = WIN_POSITION;
      moved = true;
    } else if (potentialPosition < WIN_POSITION) {
      // Di chuyển bình thường, chưa tới ô Win
      console.log(`Player ${currentPlayer.name} moves from ${startPosition} to ${potentialPosition}.`);
      if (isMobileScreen) {
        setActiveTab('tab1');
        await sleep(1500);
      }
      await animatePlayerMove(currentPlayer, startPosition, diceRoll);
      finalPosition = potentialPosition;
      moved = true;
    } else {
      // potentialPosition > WIN_POSITION (Quá ô Win) -> Đứng yên
      console.log(`Player ${currentPlayer.name} rolled ${diceRoll}, overshoot! Stays at position ${startPosition}`);
      // finalPosition vẫn là startPosition, không cần làm gì thêm
      // currentPlayer.position cũng không thay đổi
      moved = false;
    }

    // --- 3. Cập nhật vị trí chính thức (nếu có di chuyển) và UI ---
    if (moved) {
      currentPlayer.position = finalPosition;
      displayPlayersOnBoard(playersArr); // Cập nhật token trên bàn cờ
      // displayPlayerList(); // Cập nhật danh sách người chơi
      await sleep(1000); // Chờ ngắn sau khi di chuyển xong
    }

    // --- 4. Kiểm tra chiến thắng NGAY SAU KHI di chuyển ---
    if (await checkEndGame()) {
      // Hàm checkEndGame đã xử lý hiển thị kết quả và âm thanh
      console.log('Game ended after move.');
      // Không kích hoạt lại nút, không chuyển lượt
      return;
    }

    // --- 5. Xử lý ô đặc biệt (chia hết cho 3) nếu người chơi đã di chuyển và chưa thắng ---
    if (moved && finalPosition > 0 && finalPosition < WIN_POSITION && finalPosition % 3 === 0) {
      await sleep(1500);
      console.log(`Player ${currentPlayer.name} landed on ${finalPosition} (multiple of 3). Asking a question...`);

      const answeredCorrectly = await askQuestion(); // Hàm này sẽ resolve khi popup đóng
      currentPlayer.answered += 1;
      if (!answeredCorrectly) {
        // Trả lời sai, xử lý lùi bước (hàm closeAnswerPopup nên xử lý việc này)
        // Logic lùi bước đã được chuyển vào hàm closeAnswerPopup và animatePlayerMoveBack
        console.log(
          `Player ${currentPlayer.name} answered wrong. Logic to move back is handled within question popup closure.`,
        );
        // Cần chờ một chút để đảm bảo popup đóng và di chuyển lùi hoàn tất
        await sleep(1000); // Điều chỉnh nếu cần
        await animatePlayerMoveBack(currentPlayer, 2);
        // Cập nhật lại UI sau khi có thể đã bị lùi
        displayPlayersOnBoard(playersArr);
        // displayPlayerList();
      } else {
        console.log(`Player ${currentPlayer.name} answered correctly.`);
        currentPlayer.correctAnswers += 1;
      }
    }
    // --- 6. Chuyển lượt chơi ---
    // Chỉ chuyển lượt nếu game chưa kết thúc
    setCurrentPlayerIndex((currentPlayerIndex % playersArr.length) + 1);
    console.log(`--- Next turn: Player ${playersArr[currentPlayerIndex - 1].name} ---`);
    // displayPlayerList(); // Cập nhật highlight người chơi hiện tại

    await sleep(1500);
    setRolling(false);
  }

  // --- Hàm MỚI để di chuyển token từng bước ---closePopup
  async function animatePlayerMove(player, startPosition, steps) {
    const STEP_DELAY = 400; // Thời gian delay giữa các bước (miliseconds), bạn có thể điều chỉnh
    const MAX_POSITION = 32; // Vị trí ô cuối cùng (ô win)

    let currentStepPosition = startPosition;

    for (let i = 1; i <= steps; i++) {
      currentStepPosition++; // Di chuyển đến ô tiếp theo
      playMoveSound();
      // Đảm bảo không vượt quá ô cuối cùng
      if (currentStepPosition > MAX_POSITION) {
        currentStepPosition = MAX_POSITION;
      }

      // *** Cập nhật tạm thời vị trí của player ĐỂ HIỂN THỊ ***
      player.position = currentStepPosition;
      // Vẽ lại toàn bộ bàn cờ với vị trí tạm thời của người chơi
      displayPlayersOnBoard(playersArr);

      // Nếu đã đến ô cuối cùng, dừng hoạt ảnh sớm
      if (currentStepPosition === MAX_POSITION) {
        break; // Thoát khỏi vòng lặp for
      }

      // Chờ một chút trước khi thực hiện bước tiếp theo
      await sleep(STEP_DELAY);
    }

    // Quan trọng: Sau khi vòng lặp kết thúc, player.position đang ở vị trí cuối cùng
    // của hoạt ảnh. Hàm rollDice sẽ cập nhật lại giá trị này một lần nữa
    // để đảm bảo tính chính xác cuối cùng (đặc biệt nếu có logic phức tạp hơn).
  }
  // --- Hàm MỚI để di chuyển token lùi từng bước ---
  async function animatePlayerMoveBack(player, steps) {
    const STEP_DELAY = 400; // Thời gian delay giữa các bước (miliseconds)
    const MIN_POSITION = 0; // Vị trí ô bắt đầu

    let currentStepPosition = player.position; // Bắt đầu từ vị trí hiện tại

    // Tính số bước thực tế có thể lùi (không thể lùi quá ô 0)
    const actualStepsToTake = Math.min(steps, currentStepPosition - MIN_POSITION);

    if (actualStepsToTake <= 0) {
      console.log(`Player ${player.name} is already at or near the start, cannot move back ${steps} steps.`);
      return; // Không cần di chuyển
    }

    console.log(`Moving player ${player.name} back ${actualStepsToTake} steps.`);

    for (let i = 1; i <= actualStepsToTake; i++) {
      currentStepPosition--; // Di chuyển lùi một ô
      playMoveSound();
      // *** Cập nhật tạm thời vị trí của player ĐỂ HIỂN THỊ ***
      player.position = currentStepPosition;
      // Vẽ lại toàn bộ bàn cờ với vị trí tạm thời của người chơi
      displayPlayersOnBoard(playersArr);

      // Chờ một chút trước khi thực hiện bước tiếp theo
      await sleep(STEP_DELAY);
    }

    // Sau vòng lặp, player.position đã ở vị trí cuối cùng sau khi lùi
    console.log(`Player ${player.name} moved back to position ${player.position}.`);
  }
  async function checkEndGame() {
    const winningPosition = 32; // Giả sử đây là vị trí chiến thắng
    let winners = playersArr.filter((player) => player.position === winningPosition);

    if (winners.length > 0) {
      createGameHistory(playersArr, questionSet.title);
      console.log('Winner found!');
      playWinSound();
      await sleep(1500);

      onNext(); // Hiển thị màn hình kết quả
      return true; // Trả về true nếu có người thắng
    }

    return false; // Trả về false nếu chưa có ai thắng
  }

  async function createGameHistory(players, questionSetTitle) {
    try {
      const res = await createMilraceGameHistory(questionSetTitle, players);
      if (res.success) {
        console.log('Lịch sử trò chơi đã được tạo thành công.');
      } else {
        alert(res.message || res.error);
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
          questionSetTitle={questionSet.title || ''}
          onPopupHowtoplay={onPopupHowtoplay}
          rollDice={rollDice}
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function getRotationForResult(result) {
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollTheDice(result) {
  const targetRotation = getRotationForResult(result);

  const randomSpinsX = Math.floor(Math.random() * 6 + 4); // Quay ít nhất 4 vòng X
  const randomSpinsY = Math.floor(Math.random() * 6 + 4); // Quay ít nhất 4 vòng Y

  const finalRotationX = targetRotation.x + randomSpinsX * 360;
  const finalRotationY = targetRotation.y + randomSpinsY * 360;
  const dice = document.querySelectorAll('.dice');
  dice.forEach((element) => {
    element.style.transform = `rotateX(${finalRotationX}deg) rotateY(${finalRotationY}deg)`;
  });
}
