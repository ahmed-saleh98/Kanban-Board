/**
 * Global State Management using Zustand
 * Zustand is a lightweight state management library that provides reactive state
 * without the complexity of Redux or Context API
 *
 * This store manages:
 * - Task data and operations
 * - Search/filter state
 * - Modal visibility and form state
 */

import { create } from 'zustand';
import { Task } from '../types';

/**
 * KanbanState: Type definition for the global store
 * Includes all state variables and their setter functions
 */
interface KanbanState {
  // Search/Filter state
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Task management
  localTasks: Task[];
  setLocalTasks: (tasks: Task[]) => void;
  moveTaskLocally: (taskId: string, newColumn: Task['column']) => void;

  // Add task modal state
  isAddModalOpen: boolean;
  activeColumn: Task['column'] | null;
  openAddModal: (column: Task['column']) => void;
  closeAddModal: () => void;

  // Edit task modal state
  isEditModalOpen: boolean;
  taskToEdit: Task | null;
  openEditModal: (task: Task) => void;
  closeEditModal: () => void;
}

export const useStore = create<KanbanState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  localTasks: [],
  setLocalTasks: (tasks) => set({ localTasks: tasks }),

  moveTaskLocally: (taskId, newColumn) =>
    set((state) => ({
      localTasks: state.localTasks.map((task) =>
        task.id === taskId ? { ...task, column: newColumn } : task,
      ),
    })),

  isAddModalOpen: false,
  activeColumn: null,
  openAddModal: (column) => set({ isAddModalOpen: true, activeColumn: column }),
  closeAddModal: () => set({ isAddModalOpen: false, activeColumn: null }),

  isEditModalOpen: false,
  taskToEdit: null,
  openEditModal: (task) => set({ isEditModalOpen: true, taskToEdit: task }),
  closeEditModal: () => set({ isEditModalOpen: false, taskToEdit: null }),
}));
