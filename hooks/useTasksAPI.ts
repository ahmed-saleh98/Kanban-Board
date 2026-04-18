/**
 * Custom Hook: useTasksAPI
 * Handles all server communication for task operations
 * Integrates React Query for caching, synchronization, and API management
 *
 * Features:
 * - Automatically fetches tasks from backend on mount
 * - Syncs backend data with Zustand store for global state
 * - Provides mutations for CRUD operations (Create, Read, Update, Delete)
 * - Handles loading and error states
 * - Implements optimistic updates for instant UI feedback
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Task } from '../types';
import { useStore } from '../store/useStore';
import { useEffect } from 'react';

/**
 * Backend API endpoint
 * Points to json-server running on localhost:4000
 */
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/tasks';

export const useTasksAPI = () => {
  const { setLocalTasks } = useStore();
  const queryClient = useQueryClient();

  /**
   * Fetch all tasks from backend
   * @returns Array of tasks from the server
   * Runs once on component mount, then caches the data
   */
  const { data, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await axios.get<Task[]>(API_URL);
      return data;
    },
  });

  /**
   * Sync Effect: Keep Zustand store in sync with React Query cache
   * When server data arrives, automatically update the global store
   * This allows components to read from either store or React Query
   */
  useEffect(() => {
    if (data) setLocalTasks(data);
  }, [data, setLocalTasks]);

  /**
   * Update Task Mutation
   * Used when dragging tasks between columns or editing task properties
   * @param updatedTask - Partial task object with id and properties to update
   *
   * Workflow:
   * 1. Send PATCH request to backend
   * 2. On success, invalidate cache to trigger refetch
   * 3. This keeps local state in sync with server
   */
  const updateTaskMutation = useMutation({
    mutationFn: async (
      updatedTask: Partial<Omit<Task, 'id'>> & { id: string },
    ) => {
      const { id, ...rest } = updatedTask;
      await axios.patch(`${API_URL}/${id}`, rest);
    },
    onSuccess: () => {
      // Refetch tasks to ensure data consistency
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  /**
   * Create Task Mutation
   * Called when user submits the "Add Task" form
   * @param newTask - Task object WITHOUT id (backend auto-generates it)
   *
   * Workflow:
   * 1. Send POST request to create task
   * 2. On success, refetch task list
   * 3. Clear modal form
   */
  const createTaskMutation = useMutation({
    mutationFn: async (newTask: Omit<Task, 'id'>) => {
      const { data } = await axios.post(API_URL, newTask);
      return data;
    },
    onSuccess: () => {
      // Refresh the list after successful creation
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // 4. Delete Task (NEW)
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Update return statement to include createTask
  return {
    isLoading,
    updateTask: updateTaskMutation.mutate,
    createTask: createTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    deleteTask: deleteTaskMutation.mutate,
    isDeleting: deleteTaskMutation.isPending,
  };
};
