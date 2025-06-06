import Link from "next/link";

export default function ChooseGame() {
  const games = [
    {
      image: '/images/games/mil-race.png',
      link: '/gameplay/mil-race',
    },
    {
      image: '/images/games/future-teller.png',
      link: '/gameplay/future-teller',
    },
    {
      image: '/images/games/mil-bingo.png',
      link: '/gameplay/mil-bingo',
    },
    {
      image: '/images/games/mil-trolley.png',
      link: '/gameplay/mil-card',
    },
  ];

  return (
    <section
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/mil-play-banner.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <p className="absolute top-0 left-0 p-4 text-xl text-white font-normal">A project by <span className='font-bold'>FLASH VN</span> </p>
      <p className="absolute top-0 right-0 p-4 text-xl text-white font-bold">#WiseByPlay</p>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-3xl font-bold mb-8">Choose your game</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-20">
          {games.map((game, index) => (
            <Link
              key={index}
              href={game.link}
              className="flex flex-col items-center bg-white text-black rounded-lg p-1 transform transition-all hover:scale-110 hover:shadow-xl"
            >
              <img
                src={game.image}
                alt={`Game ${index}`}
                className="w-[200px] h-[200px] object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
