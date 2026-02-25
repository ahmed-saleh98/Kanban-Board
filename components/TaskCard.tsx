'use client';

/**
 * TaskCard Component
 * Represents a single task on the Kanban board
 * Features:
 * - Draggable (integrates with drag-and-drop library)
 * - Shows task title, description, and priority
 * - Edit and delete action buttons
 * - Visual feedback during drag (elevation/shadow)
 * - Responsive design with MUI styling
 *
 * Performance: Wrapped with React.memo() to prevent re-renders
 * when parent list updates but individual task props haven't changed
 */

import React from 'react';
import { Draggable, DraggableStateSnapshot } from '@hello-pangea/dnd';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Task } from '../types';
import { PRIORITY_COLORS } from '../constants/config';

/**
 * TaskCardProps: Props for TaskCard component
 * @param task - Task data object
 * @param index - Position in the column (used by drag-and-drop library)
 * @param onEdit - Callback when edit button is clicked
 * @param onDelete - Callback when delete button is clicked
 */
interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

/**
 * TaskCard: Renders individual task card with drag-and-drop support
 * - Wraps content in Draggable for drag-and-drop functionality
 * - Updates shadow on drag for visual feedback (snapshot.isDragging)
 */
function TaskCard({ task, index, onEdit, onDelete }: TaskCardProps) {
  return (
    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
      {(provided, snapshot: DraggableStateSnapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            mb: 1.5,
            borderRadius: 2,
            boxShadow: snapshot.isDragging ? 3 : 1,
            border: '1px solid #e0e0e0',
          }}
          elevation={0}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 0.5,
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                {task.title}
              </Typography>

              <Box sx={{ display: 'flex', mt: -0.5, mr: -1 }}>
                <IconButton
                  size="small"
                  onClick={() => onEdit(task)}
                  sx={{ color: '#94a3b8' }}
                >
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onDelete(task.id)}
                  sx={{ color: '#f87171' }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, fontSize: '0.8rem' }}
            >
              {task.description}
            </Typography>
            <Chip
              label={task.priority}
              size="small"
              sx={{
                bgcolor: PRIORITY_COLORS[task.priority].bg,
                color: PRIORITY_COLORS[task.priority].text,
                fontWeight: 'bold',
                fontSize: '0.7rem',
                height: 20,
                borderRadius: 1,
              }}
            />
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(TaskCard);
