'use client';

import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

interface ColumnHeaderProps {
  title: string;
  color: string;
  taskCount: number;
}

/**
 * ColumnHeader Component
 *
 * Renders the header of a Kanban column with visual indicators
 *
 * Features:
 * - Colored status indicator (small circle)
 * - Column title display with bold styling
 * - Task count badge showing number of tasks in the column
 *
 * @param {ColumnHeaderProps} props - Component props
 * @param {string} props.title - Display name of the column (e.g., 'To Do', 'In Progress')
 * @param {string} props.color - Hex or CSS color value for the status indicator dot
 * @param {number} props.taskCount - Number of tasks currently in this column
 *
 * @returns {JSX.Element} Rendered column header with indicator, title, and task count
 */
function ColumnHeader({ title, color, taskCount }: ColumnHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          bgcolor: color,
        }}
      />
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '0.85rem',
          letterSpacing: 1,
        }}
      >
        {title}
      </Typography>
      <Chip
        label={taskCount}
        size="small"
        sx={{ ml: 1, bgcolor: '#e2e8f0', height: 20 }}
      />
    </Box>
  );
}

export default React.memo(ColumnHeader);
