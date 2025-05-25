import Link from 'next/link';

interface SolutionCardProps {
  title: string;
  image: string;
  alt: string;
  link: string;
}

export default function SolutionCard({ title, image, alt, link }: SolutionCardProps) {
  return (
    <Link href={link}>
      <div className="w-70 h-70 relative rounded-2xl border-2 border-gray-900 p-4 bg-gray-50 transition-colors hover:bg-[#FFCF24] cursor-pointer">
        <h3 className="text-2xl font-bold text-gray-900">
          {title}
        </h3>
        <img
          src={image}
          alt={alt}
          className="w-50 h-50 object-contain absolute bottom-2 right-2"
        />
      </div>
    </Link>
  );
}
