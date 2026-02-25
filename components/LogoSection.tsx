'use client';

/**
 * LogoSection Component
 * Displays the app branding in the header
 * Shows:
 * - Dashboard icon with blue background
 * - "KANBAN BOARD" title
 * - Total task count
 *
 * Performance: Wrapped with React.memo() to prevent re-renders
 * when parent header updates but total task count hasn't changed
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

/**
 * LogoSectionProps: Props for LogoSection component
 * @param taskCount - Total number of tasks across all columns
 */
interface LogoSectionProps {
  taskCount: number;
}

/**
 * LogoSection: Renders the branding section of the header
 * Memoized for performance optimization
 */
function LogoSection({ taskCount }: LogoSectionProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: { xs: '100%', sm: 'auto' },
      }}
    >
      <Box
        sx={{
          bgcolor: '#4f46e5',
          color: '#fff',
          p: 1,
          borderRadius: 2,
          display: 'flex',
        }}
      >
        <DashboardIcon />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
          KANBAN BOARD
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {taskCount} tasks
        </Typography>
      </Box>
    </Box>
  );
}

export default React.memo(LogoSection);
