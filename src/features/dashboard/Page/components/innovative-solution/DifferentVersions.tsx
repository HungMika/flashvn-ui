import Link from "next/link";

export default function DifferentVersions() {
  const versions = [
    {
      title: "Printed set",
      price: "Free",
      internet: "No\nIt can be played offline",
      physicalSet: "Yes\nYou must own a set",
      editable: "No, but you can make it by your way",
      buttonText: "Go to store",
      buttonLink: "#",
    },
    {
      title: "Google Sheets",
      price: "Free",
      internet: "Yes\nIt requires internet",
      physicalSet: "No\nJust play it online",
      editable: "Everyone can edit game questions",
      buttonText: "Try it",
      buttonLink: "#",
    },
    {
      title: "Web version",
      price: "Free",
      internet: "Yes\nIt requires internet",
      physicalSet: "No\nJust play it online",
      editable: "Only admin",
      buttonText: "Try it",
      buttonLink: "/what-we-do/mil-play",
    },
  ];

  return (
    <section className="py-12 bg-[#EBFAFF]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-black text-center mb-8 pb-10">
          Different versions to best fit your needs!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:flex flex-col space-y-18 pt-[60px] pr-2 items-center">
            <p className="font-bold text-gray-700 text-right">Price:</p>
            <p className="font-bold text-gray-700 text-right">Internet:</p>
            <p className="font-bold text-gray-700 text-right">Physical set:</p>
            <p className="font-bold text-gray-700 text-right">Editable:</p>
          </div>
          {versions.map((version, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-md pt-10 pb-10 p-6 flex flex-col items-center text-center mb-10"
            >
              <h3 className="absolute -top-6 bg-[#1D205F] text-[#EBFAFF] font-bold text-sl px-4 py-2 rounded-full shadow-md">
                {version.title}
              </h3>

              <ul className="text-gray-700 space-y-6 w-full">
                <li className="text-center">
                  <p className="md:hidden font-bold text-gray-700">Price:</p>
                  <p>✅<br />{version.price}</p>
                </li>
                <hr className="border-gray-300" />
                <li className="text-center whitespace-pre-line">
                  <p className="md:hidden font-bold text-gray-700">Internet:</p>
                  <p>{version.internet}</p>
                </li>
                <hr className="border-gray-300" />
                <li className="text-center whitespace-pre-line">
                  <p className="md:hidden font-bold text-gray-700">Physical set:</p>
                  <p>{version.physicalSet}</p>
                </li>
                <hr className="border-gray-300" />
                <li className="text-center whitespace-pre-line">
                  <p className="md:hidden font-bold text-gray-700">Editable:</p>
                  <p>{version.editable}</p>
                </li>
              </ul>
              <Link
                href={version.buttonLink}
                className="absolute -bottom-5 bg-yellow-400 text-[#1D205F] font-bold py-2 px-6 rounded-full hover:bg-yellow-500 transition-colors shadow-md"
              >
                {version.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
