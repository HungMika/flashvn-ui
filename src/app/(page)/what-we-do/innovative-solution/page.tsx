import HeroSection from '@/features/dashboard/Page/components/innovative-solution/HeroSection';
import WhyOurGame from '@/features/dashboard/Page/components/innovative-solution/WhyOurGame';
import DifferentVersions from '@/features/dashboard/Page/components/innovative-solution/DifferentVersions';
import EducationalScience from '@/features/dashboard/Page/components/innovative-solution/EducationalScience';

export const metadata = {
  title: 'FLASH VN - Building Future-Ready Communities',
  description: 'Empowering individuals and organizations with cutting-edge solutions and sustainable development programs.',
};

export default function Page() {
  return (
    <div className="bg-white">
      <HeroSection />
      <WhyOurGame />
      <DifferentVersions />
      <EducationalScience />
    </div>
  );
}
