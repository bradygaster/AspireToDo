import axios from 'axios';
import { Todo } from '../models/Todo';

const API_URL = 'https://localhost:7005/api/todos';

export const TodoService = {
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await axios.get<Todo[]>(API_URL);
    return response.data;
  },

  getTodoById: async (id: number): Promise<Todo> => {
    const response = await axios.get<Todo>(`${API_URL}/${id}`);
    return response.data;
  },

  createTodo: async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const response = await axios.post<Todo>(API_URL, todo);
    return response.data;
  },

  updateTodo: async (todo: Todo): Promise<void> => {
    await axios.put(`${API_URL}/${todo.id}`, todo);
  },

  deleteTodo: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },

  toggleComplete: async (todo: Todo): Promise<void> => {
    const updatedTodo = { ...todo, isComplete: !todo.isComplete };
    await TodoService.updateTodo(updatedTodo);
  }
};