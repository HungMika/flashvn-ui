'use client';

// React & hooks
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// UI components
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { fetchTodo } from '@/services/test';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function DashboardPage() {
  const [enabled, setEnabled] = useState(false);

  const {
    data: todo,
    isLoading,
    error,
  } = useQuery<Todo>({
    queryKey: ['sample-todo'],
    queryFn: fetchTodo,
    enabled,
  });

  const onCheck = () => {
    setEnabled(true);
    toast('Fetching...');
  };

  let errorMessage: string | null = null;
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (error) {
    errorMessage = 'Unknown.';
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-2">Dashboard</h1>
      <p className="mb-4">Welcome to the dashboard!</p>

      <Button variant="default" onClick={onCheck}>
        fetch sample data
      </Button>

      {isLoading && <p className="mt-4">loading...</p>}
      {errorMessage && (
        <p className="mt-4 text-red-500">
          Error: {error instanceof Error ? error.message : 'Unknown.'}
        </p>
      )}

      {todo && (
        <div className="mt-4 border p-4 rounded shadow-sm">
          <p>
            <strong>Title:</strong> {todo.title}
          </p>
          <p>
            <strong>State:</strong>{' '}
            {todo.completed ? 'completed' : 'uncompleted'}
          </p>
        </div>
      )}
    </div>
  );
}
