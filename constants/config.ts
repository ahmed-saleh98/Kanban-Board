import { Task } from '../types';

/**
 * Configuration file for centralized constants
 * This single source of truth makes it easier to update styling and behavior
 */

/**
 * COLUMNS: Defines the Kanban board columns
 * Each column has a title (displayed on the board) and a color indicator
 */
export const COLUMNS: Record<Task['column'], { title: string; color: string }> =
  {
    todo: { title: 'TO DO', color: '#3b82f6' },
    in_progress: { title: 'IN PROGRESS', color: '#f59e0b' },
    review: { title: 'IN REVIEW', color: '#8b5cf6' },
    done: { title: 'DONE', color: '#10b981' },
  };

/**
 * PRIORITY_COLORS: Maps task priority levels to background and text colors
 * Used in TaskCard component to visually indicate task importance
 */
export const PRIORITY_COLORS = {
  HIGH: { bg: '#fee2e2', text: '#ef4444' },
  MEDIUM: { bg: '#fef3c7', text: '#f59e0b' },
  LOW: { bg: '#f1f5f9', text: '#64748b' },
};

/**
 * INITIAL_VISIBLE_LIMIT: Number of tasks shown per column before "Load More" button
 * Improves performance by limiting DOM elements rendered initially
 */
export const INITIAL_VISIBLE_LIMIT = 5;

/**
 * LOAD_MORE_INCREMENT: Number of additional tasks to load when user clicks "Load More"
 * Provides gradual loading experience without overwhelming the UI
 */
export const LOAD_MORE_INCREMENT = 5;

/**
 * DEBOUNCE_DELAY: Delay in milliseconds before search query is applied
 * Reduces unnecessary filter operations while user is typing
 */
export const DEBOUNCE_DELAY = 300;
