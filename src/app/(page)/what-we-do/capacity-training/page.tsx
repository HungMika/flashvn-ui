import HeroSection from '@/features/dashboard/Page/components/capacity-training/HeroSection';
import ProgramsSection from '@/features/dashboard/Page/components/capacity-training/ProgramsSection';

export const metadata = {
  title: 'Capacity Training - FLASH VN',
  description: 'Explore our conducted training programs to enhance digital literacy and skills.',
};

export default function Page() {
  return (
    <main className="bg-white">
      <HeroSection />
      <ProgramsSection />
    </main>
  );
}
