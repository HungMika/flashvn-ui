import StaticHeroSection from '@/features/dashboard/Page/components/StaticHeroSection';
import JourneySection from '@/features/dashboard/Page/components/JourneySection';
import TeamSection from '@/features/dashboard/Page/components/TeamSection';

export const metadata = {
  title: 'About Us - FLASH VN',
  description: 'Learn about our journey in empowering Vietnamese youth through digital literacy.',
};

export default function AboutUs() {
  return (
    <main className='bg-white'>
      <StaticHeroSection />
      <div className="h-0.5 bg-black my-6" />
      <JourneySection />
      <div className="h-0.5 bg-black my-6" />
      <TeamSection />
    </main>
  );
}