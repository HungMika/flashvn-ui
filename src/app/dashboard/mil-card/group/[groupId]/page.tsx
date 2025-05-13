'use client';

import { useRouter } from 'next/navigation';

const ageGroups = ['1-2', '3-5', '6-8', '9-12'];

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Select group</h1>
      <div className="grid grid-cols-2 gap-4">
        {ageGroups.map((age) => (
          <div
            key={age}
            onClick={() => router.push(`/dashboard//mil-card/group/${age}`)}
            className="p-4 border rounded-xl text-center hover:shadow-md"
          >
            Group {age}
          </div>
        ))}
      </div>
    </div>
  );
}
