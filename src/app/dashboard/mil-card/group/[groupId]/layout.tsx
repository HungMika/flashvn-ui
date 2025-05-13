import { QuestionHeader } from '@/features/dashboard/Card/components/QuestionHeader';
import React from 'react';

export default function AgeGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 space-y-4">
      <QuestionHeader />
      {children}
    </div>
  );
}
