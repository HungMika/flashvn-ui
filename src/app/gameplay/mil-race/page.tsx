'use client';

import { useState } from 'react';
import ScreenLobby from '@/features/dashboard/Race/components/ScreenLobby';
import ScreenAddPlayer from '@/features/dashboard/Race/components/ScreenAddPlayer';
import ScreenMillRace from '@/features/dashboard/Race/components/ScreenMillRace';
import ScreenMilRaceResult from '@/features/dashboard/Race/components/ScreenMilRaceResult';
import PopupHowtoplay from '@/features/dashboard/Race/components/PopupHowtoplay';
import { PlayerHistoryData, MilraceQuestionSet } from '@/types/milrace';
import './milrace.css';
import { ModalProvider } from '@/lib/ModalContext';

export default function Home() {
  const [screen, setScreen] = useState<number>(1);
  const [popupHowtoplay, setPopupHowtoplay] = useState<boolean>(false);
  const [playersArr, setPlayersArr] = useState<PlayerHistoryData[]>([]);
  const [questionSet, setQuestionSet] = useState<MilraceQuestionSet | null>(null);

  const nextScreen = (): void => {
    if (screen < 4) {
      setScreen(screen + 1);
    }
  };

  return (
    <div className="h-full w-full">
      <ModalProvider>
        {screen === 1 && <ScreenLobby onNext={nextScreen} onPopupHowtoplay={() => setPopupHowtoplay(true)} />}
        {screen === 2 && (
          <ScreenAddPlayer
            onNext={nextScreen}
            playersArr={playersArr}
            setPlayersArr={setPlayersArr}
            setQuestionSet={setQuestionSet}
          />
        )}
        {screen === 3 && questionSet && (
          <ScreenMillRace
            onNext={nextScreen}
            playersArr={playersArr}
            setPlayersArr={setPlayersArr}
            onPopupHowtoplay={() => setPopupHowtoplay(true)}
            questionSet={questionSet}
          />
        )}
        {screen === 4 && <ScreenMilRaceResult playersArr={playersArr} />}
        {popupHowtoplay && <PopupHowtoplay onClose={() => setPopupHowtoplay(false)} />}
      </ModalProvider>
    </div>
  );
}
