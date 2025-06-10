'use client';
//Icons
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

interface Module {
  _id: string;
  title: string;
  keywords: string[];
}

export default function ModuleDashboardPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  //Dashboard: GET all modules
  const {
    data: modules = [],
    isLoading,
    refetch,
  } = useQuery<Module[]>({
    queryKey: ['modules'],
    queryFn: getAllModules,
  });

  const handleModuleAdded = () => {
    refetch();
    //console.log(modules);
  };

  const handleModuleDeleted = (moduleId: string) => {
    queryClient.setQueryData<Module[]>(['modules'], (oldModules = []) => oldModules.filter((m) => m._id !== moduleId));
  };

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-6 flex-1">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard')}
            className="border border-muted p-2 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="ml-[15px] text-xl font-semibold">Your Modules</h2>
        </div>

        <div className="relative border rounded-lg p-4 flex flex-col max-h-[450px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
              <p className="ml-2">Loading...</p>
            </div>
          ) : (
            <>
              <div className="overflow-y-auto flex-1 mb-4">
                {modules.length === 0 ? (
                  <p className="text-center text-muted-foreground">No modules found.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {modules.map((module) => (
                      <ModuleCard
                        key={module._id}
                        module={module}
                        onDeleted={() => handleModuleDeleted(module._id)}
                        onUpdated={refetch} // Re-fetch modules after update
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-auto flex justify-center">
                <AddModuleModal onModuleAdded={handleModuleAdded} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
