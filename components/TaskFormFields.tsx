'use client';

/**
 * TaskFormFields Component
 * Shared form fields used by both AddTaskModal and EditTaskModal
 * Reduces code duplication and ensures consistent form behavior across modals
 *
 * Props are passed from parent modal to allow flexible state management
 * Parent is responsible for form state and submission logic
 */

import { Box, TextField, MenuItem } from '@mui/material';
import { Task } from '../types';

/**
 * Props for TaskFormFields component
 * @param title - Current title input value
 * @param description - Current description textarea value
 * @param priority - Selected priority level
 * @param onTitleChange - Callback when title input changes
 * @param onDescriptionChange - Callback when description input changes
 * @param onPriorityChange - Callback when priority dropdown changes
 */
interface TaskFormFieldsProps {
  title: string;
  description: string;
  priority: Task['priority'];
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onPriorityChange: (value: Task['priority']) => void;
}

/**
 * TaskFormFields: Renders three form input fields
 * - Title input (required)
 * - Description textarea
 * - Priority dropdown select
 * Designed to be reused in multiple modals
 */
export default function TaskFormFields({
  title,
  description,
  priority,
  onTitleChange,
  onDescriptionChange,
  onPriorityChange,
}: TaskFormFieldsProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
      <TextField
        label="Task Title"
        required
        fullWidth
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <TextField
        label="Description"
        multiline
        rows={3}
        fullWidth
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />

      <TextField
        select
        label="Priority"
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value as Task['priority'])}
        fullWidth
      >
        <MenuItem value="LOW">Low</MenuItem>
        <MenuItem value="MEDIUM">Medium</MenuItem>
        <MenuItem value="HIGH">High</MenuItem>
      </TextField>
    </Box>
  );
}
