import HeroSection from '@/features/dashboard/Page/components/HeroSection';
import ImpactSection from '@/features/dashboard/Page/components/ImpactSection';
import SponsorsAndPartners from '@/features/dashboard/Page/components/SponsorsAndPartners';
import UpdateSection from '@/features/dashboard/Page/components/UpdateSection';
import SolutionsSection from '@/features/dashboard/Page/components/SolutionsSection';

export const metadata = {
  title: 'FLASH VN - Building Future-Ready Communities',
  description:
    'Empowering individuals and organizations with cutting-edge solutions and sustainable development programs.',
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
