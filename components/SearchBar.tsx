'use client';

/**
 * SearchBar Component
 * Input field for searching/filtering tasks by title or description
 * Features:
 * - Search icon integrated in input
 * - Responsive width (full width on mobile, fixed width on desktop)
 * - Connected to Header component's debounce logic
 *
 * Performance: Wrapped with React.memo() to prevent re-renders
 * when parent components update
 */

import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

/**
 * SearchBarProps: Props for SearchBar component
 * @param value - Current search query string
 * @param onChange - Callback when user types in the input
 */
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * SearchBar: Renders search input with icon
 * Memoized to prevent unnecessary re-renders
 */
function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <TextField
      placeholder="Search tasks..."
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        width: { xs: '100%', sm: 300 },
        bgcolor: '#f4f5f7',
        '& fieldset': { border: 'none' },
        mt: { xs: 2, sm: 0 },
        borderRadius: 3,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default React.memo(SearchBar);
