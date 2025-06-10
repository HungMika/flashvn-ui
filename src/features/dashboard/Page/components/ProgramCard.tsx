import Image from 'next/image';

interface ProgramCardProps {
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
}

export default function ProgramCard({ title, description, icon, imageUrl }: ProgramCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        {icon && (
          <div className="w-12 h-12 mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-2xl">{icon}</span>
          </div>
        )}
        <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
