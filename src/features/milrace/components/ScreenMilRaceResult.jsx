'use client';

export default function ScreenMilRaceResult({ playersArr, questionSetName }) {
  const winner = playersArr.find((p) => p.position === 32);
  const others = playersArr.filter((p) => p.position !== 32).sort((a, b) => b.position - a.position);

  return (
    <div className="h-full w-full flex items-center justify-center bg-[#bbdff6]">
      <div className="flex flex-col items-center justify-center text-center">
        <img className="w-3xs" src="/milrace/img/logo/milrace.png" alt="w LOGO" />
        <h2 className="text-5xl font-bold text-blue-950 mb-4">Chúc mừng</h2>
        <div className="w-2xs max-w-screen mb-7">
          {winner && (
            <div className="flex flex-row font-bold justify-center items-center bg-sky-100 rounded-full py-2 gap-2">
              <img src="/milrace/img/token/w.png" alt="" className="w-12" />
              <p className="text-2xl md:text-3xl">{winner.name}</p>
            </div>
          )}

          <div className="mt-3 px-3 text-xl md:text-2xl">
            {others.map((player) => (
              <div key={player.index} className="flex flex-row items-center font-bold justify-between py-1.5">
                <div className="flex flex-row justify-center items-center gap-2">
                  <img src={`/milrace/img/token/${player.index}.png`} alt="" className="w-8" />
                  <p>{player.name}</p>
                </div>
                <p>{player.position} điểm</p>
              </div>
            ))}
          </div>
        </div>
        <a href="/gameplay/mil-race">
          <button
            type="button"
            className="bg-amber-300 text-black font-bold p-2 rounded-full border-black border-2 w-38 md:w-48 md:text-2xl"
          >
            Chơi lại
          </button>
        </a>
      </div>
    </div>
  );
}
