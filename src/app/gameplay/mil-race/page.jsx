'use client';
import { useState } from 'react';
import ScreenLobby from '@/features/milrace/components/ScreenLobby';
import ScreenAddPlayer from '@/features/milrace/components/ScreenAddPlayer';
import ScreenMillRace from '@/features/milrace/components/ScreenMillRace';
import ScreenMilRaceResult from '@/features/milrace/components/ScreenMilRaceResult';
import PopupHowtoplay from '@/features/milrace/components/PopupHowtoplay';
import './milrace.css';

export default function Home() {
  const [screen, setScreen] = useState(1);
  const [popupHowtoplay, setPopupHowtoplay] = useState(false);
  const [playersArr, setPlayersArr] = useState([]);
  const [questionSet, setQuestionSet] = useState({});

  const nextScreen = () => {
    if (screen < 4) {
      setScreen(screen + 1);
    }
  };
  return (
    <div className="h-full w-full">
      {screen === 1 && <ScreenLobby onNext={nextScreen} onPopupHowtoplay={() => setPopupHowtoplay(true)} />}
      {screen === 2 && (
        <ScreenAddPlayer
          onNext={nextScreen}
          playersArr={playersArr}
          setPlayersArr={setPlayersArr}
          setQuestionSet={setQuestionSet}
        />
      )}
      {screen === 3 && (
        <ScreenMillRace
          screen={screen}
          onNext={nextScreen}
          playersArr={playersArr}
          setPlayersArr={setPlayersArr}
          onPopupHowtoplay={() => setPopupHowtoplay(true)}
          questionSet={questionSet}
        />
      )}
      {screen === 4 && <ScreenMilRaceResult playersArr={playersArr} />}
      {popupHowtoplay && <PopupHowtoplay onClose={() => setPopupHowtoplay(false)} />}
    </div>
  );
}
