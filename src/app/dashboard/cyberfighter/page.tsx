import { ArrowLeft } from 'lucide-react';
//hooks
import { useQuery, useQueryClient } from '@tanstack/react-query';
//API services
import { useAuthStore } from '@/features/auth/api/auth-store';
import { getAllModules } from '@/features/dashboard/Bingo/api/module';
//Components
import { ModuleCard } from '@/features/dashboard/Bingo/components/ModuleCard';
import { AddModuleModal } from '@/features/dashboard/Bingo/components/add-module-modal';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


export default function CyberDashboardPage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="bg-blue-500 min-h-10 min-w-full mt-15 font-bold text-5xl text-center" style={{color: "#5202ba"}}>
        Cyberfighter Quizes
      </div>
      <div className="bg-yellow-500 min-h-100 min-w-9/10 overflow-y-scroll">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-row min-h-25 min-w-1/2 rounded-xl">
            <div className="flex bg-red-500 min-h-full min-w-3/4 items-center">
              <label className="ml-5 text-xl text-wrap">
                Question 1. What is haha haha haha haha haha haha haha haha haha haha haha
              </label>
            </div>
            <div className="bg-green-500 min-h-full min-w-1/4">
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
