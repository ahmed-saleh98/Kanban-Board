'use client';

/**
 * AddTaskModal Component
 * Dialog modal for creating new tasks
 * Triggered when user clicks "Add Task" button in a Kanban column
 *
 * Features:
 * - Form validation (title required, other fields optional)
 * - Dynamically shows which column the task will be added to
 * - Auto-closes on successful task creation
 * - Uses shared TaskFormFields component for consistency
 */

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { useStore } from '../store/useStore';
import { useTasksAPI } from '../hooks/useTasksAPI';
import { Task } from '../types';
import TaskFormFields from './TaskFormFields';

export default function AddTaskModal() {
  // Get modal state and callback from global store
  const { isAddModalOpen, closeAddModal, activeColumn } = useStore();
  const { createTask, isCreating } = useTasksAPI();

  /**
   * Form state: Controlled by component, passed to TaskFormFields
   * State is cleared when modal closes for a clean form on next open
   */
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('MEDIUM');

  /**
   * handleClose: Resets form and closes modal
   * Called on successful submission or user cancellation
   */
  const handleClose = () => {
    setTitle('');
    setDescription('');
    setPriority('MEDIUM');
    closeAddModal();
  };

  /**
   * handleSubmit: Validates and submits new task
   * @param e - Form submission event
   *
   * Validation:
   * - Title is required and not empty
   * - activeColumn must be set (confirmed by button proximity)
   * - createTask function must exist
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !activeColumn || !createTask) return;

    // Create task with current form values
    createTask(
      { title, description, priority, column: activeColumn },
      { onSuccess: handleClose },
    );
  };

  return (
    <Dialog open={isAddModalOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          Add New Task to {activeColumn?.replace('_', ' ').toUpperCase()}
        </DialogTitle>

        <DialogContent dividers>
          <TaskFormFields
            title={title}
            description={description}
            priority={priority}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onPriorityChange={setPriority}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!title.trim() || isCreating}
            sx={{ bgcolor: '#4f46e5', '&:hover': { bgcolor: '#4338ca' } }}
          >
            {isCreating ? 'Adding...' : 'Add Task'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
