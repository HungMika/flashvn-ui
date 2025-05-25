import HeroSection from '@/features/dashboard/Pages/components/HeroSection';
import ImpactSection from '@/features/dashboard/Pages/components/ImpactSection';
import SponsorsAndPartners from '@/features/dashboard/Pages/components/SponsorsAndPartners';
import UpdateSection from '@/features/dashboard/Pages/components/UpdateSection';
import SolutionsSection from '@/features/dashboard/Pages/components/SolutionsSection';

export const metadata = {
  title: 'FLASH VN - Building Future-Ready Communities',
  description: 'Empowering individuals and organizations with cutting-edge solutions and sustainable development programs.',
};

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <SolutionsSection />
      <ImpactSection />
      <div className="h-0.5 bg-black my-6" />
      <SponsorsAndPartners />
      <div className="h-0.5 bg-black my-6" />
      <UpdateSection />
    </div>
  );
}
