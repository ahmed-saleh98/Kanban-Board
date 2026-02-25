'use client';

/**
 * Header Component
 * Displays the Kanban board title, task count, and search functionality
 * Uses debouncing to avoid excessive re-renders while searching
 *
 * Performance: Wrapped with React.memo() to prevent re-renders
 * when parent component updates but Header props haven't changed
 */

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useStore } from '../store/useStore';
import LogoSection from './LogoSection';
import SearchBar from './SearchBar';
import { DEBOUNCE_DELAY } from '../constants/config';

/**
 * Header: Main app header with search and branding
 * - Renders LogoSection (title and task count)
 * - Renders SearchBar (search input with debounce)
 * - Responsive layout: stacks on mobile, horizontal on desktop
 */
function Header() {
  const { searchQuery, setSearchQuery, localTasks } = useStore();
  const [inputValue, setInputValue] = useState(searchQuery);

  /**
   * Debounce Hook: Delays search state update to optimize performance
   * Waits 300ms after user stops typing before filtering tasks
   * This reduces unnecessary re-renders and improves UX
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(timer);
  }, [inputValue, setSearchQuery]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 3,
        borderBottom: '1px solid #e0e0e0',
        bgcolor: '#fff',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 },
      }}
    >
      <LogoSection taskCount={localTasks.length} />
      <SearchBar value={inputValue} onChange={setInputValue} />
    </Box>
  );
}

export default React.memo(Header);
