'use client';

import { useRouter } from 'next/navigation';

export default function FixedLoginButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/auth');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-[#f8d04d] hover:bg-[#ffc300] text-white   font-black py-2 px-4 rounded-full shadow-lg transition-all z-50"
    >
      +
    </button>
  );
}
