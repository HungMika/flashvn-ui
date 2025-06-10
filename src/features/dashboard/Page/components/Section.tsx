interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  hasBorders?: boolean;
}

export default function Section({ 
  title, 
  children, 
  className = '',
  titleClassName = '',
  hasBorders = false
}: SectionProps) {
  return (
    <section className={className}>
      {hasBorders && <div className="w-full border-t-2 border-gray-900" />}
      <div className="container mx-auto px-4">
        <div className={`${hasBorders ? 'py-4 mb-8' : ''}`}>
          <h2 className={`text-3xl font-bold text-gray-900 ${titleClassName}`}>
            {title}
          </h2>
        </div>
        <div className={`${hasBorders ? 'mb-16' : ''}`}>
          {children}
        </div>
      </div>
      {hasBorders && <div className="w-full border-t-2 border-gray-900" />}
    </section>
  );
}
