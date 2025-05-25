import ChooseGame from '@/features/dashboard/Pages/components/MILPlay/ChooseGame';

export const metadata = {
  title: 'MIL Play - Choose Your Game',
  description: 'Select a game to start your journey with MIL Play.',
};

export default function Page() {
  return (
    <div>
      <ChooseGame />
    </div>
  );
}