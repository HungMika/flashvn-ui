// src/services/test.ts
import axios from 'axios';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const fetchTodo = async (): Promise<Todo> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  return response.data;
};
