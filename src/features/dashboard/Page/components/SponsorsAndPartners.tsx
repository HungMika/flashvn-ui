import Image from 'next/image';

export default function SponsorsAndPartners() {
  return (
    <section className="relative bg-white py-10 overflow-hidden">
      {/* Icon ở góc trên bên phải */}
      <Image
        src="/images/icons/icon1.png"
        alt="Decorative Icon"
        width={200}
        height={200}
        className="absolute -top-15 -right-15 z-10 animate-bounce-move"
      />

      <div className="container mx-auto px-4 space-y-16">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Our sponsors
          </h3>
          <div className="flex items-center justify-center">
            <img
              src="images/all-logos-image.png"
              alt="Our Sponsors"
              className="w-full max-w-[800px] object-contain"
            />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Our partner
          </h3>
          <div className="flex flex-col items-center text-center">
            <div className="relative w-full max-w-[600px] mb-4">
              <img
                src="images/all-partners-image.png"
                alt="Our Partners"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
