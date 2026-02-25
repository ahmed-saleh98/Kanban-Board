'use client';

/**
 * EditTaskModal Component
 * Dialog modal for editing existing tasks
 * Triggered when user clicks the edit (pencil) icon on a task card
 *
 * Features:
 * - Pre-fills form with current task data
 * - Uses useMemo to sync form when selected task changes
 * - Updates only modified fields on submission
 * - Auto-closes on successful update
 * - Uses shared TaskFormFields component
 *
 * Performance Optimization:
 * - useMemo ensures form data only updates when taskToEdit actually changes
 * - Prevents unnecessary form resets when other state updates occur
 */

import { useState, useEffect, useMemo } from 'react';
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

export default function EditTaskModal() {
  const { isEditModalOpen, closeEditModal, taskToEdit } = useStore();
  const { updateTask } = useTasksAPI();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM' as Task['priority'],
  });

  const initialFormData = useMemo(() => {
    if (taskToEdit) {
      return {
        title: taskToEdit.title,
        description: taskToEdit.description,
        priority: taskToEdit.priority,
      };
    }
    return {
      title: '',
      description: '',
      priority: 'MEDIUM' as Task['priority'],
    };
  }, [taskToEdit]);

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleClose = () => {
    closeEditModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !taskToEdit) return;

    updateTask(
      {
        id: taskToEdit.id,
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
      },
      { onSuccess: handleClose },
    );
  };

  return (
    <Dialog
      open={isEditModalOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>Edit Task</DialogTitle>

        <DialogContent dividers>
          <TaskFormFields
            title={formData.title}
            description={formData.description}
            priority={formData.priority}
            onTitleChange={(value) =>
              setFormData({ ...formData, title: value })
            }
            onDescriptionChange={(value) =>
              setFormData({ ...formData, description: value })
            }
            onPriorityChange={(value) =>
              setFormData({ ...formData, priority: value })
            }
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: '#4f46e5', '&:hover': { bgcolor: '#4338ca' } }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
