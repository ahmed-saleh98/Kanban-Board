'use client';

/**
 * Board Component - Main Kanban Board
 * Displays the Kanban board with drag-and-drop functionality
 *
 * Architecture:
 * - Uses @hello-pangea/dnd for drag-and-drop functionality
 * - Zustand store for global state management
 * - Separate components (TaskCard, ColumnHeader) for modularity
 * - React.memo() applied for performance optimization
 *
 * Key Features:
 * - Drag and drop tasks between columns
 * - Load more button to paginate tasks
 * - Search/filter integration from store
 * - Real-time API sync for drag operations
 */

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useStore } from '../store/useStore';
import { useTasksAPI } from '../hooks/useTasksAPI';
import { Task } from '../types';
import AddTaskModal from './AddTaskModal';
import { Box, Paper, Typography, Button } from '@mui/material';
import EditTaskModal from './EditTaskModal';
import TaskCard from './TaskCard';
import ColumnHeader from './ColumnHeader';
import {
  COLUMNS,
  INITIAL_VISIBLE_LIMIT,
  LOAD_MORE_INCREMENT,
} from '../constants/config';

// priority mapping object
const PRIORITY_WEIGHT: Record<Task['priority'], number> = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

/**
 * Board: Renders the Kanban board with 4 columns
 * Manages visible task limits per column and handles drag-and-drop
 */
function Board() {
  // Get global state and API functions
  const {
    localTasks,
    moveTaskLocally,
    openAddModal,
    openEditModal,
    searchQuery,
  } = useStore();
  const { updateTask, deleteTask, isLoading } = useTasksAPI();

  /**
   * visibleLimits: Local state to track how many tasks are displayed per column
   * Allows "Load More" functionality without fetching new data from server
   * Improves performance by limiting DOM elements initially
   */
  const [visibleLimits, setVisibleLimits] = useState<
    Record<Task['column'], number>
  >({
    todo: INITIAL_VISIBLE_LIMIT,
    in_progress: INITIAL_VISIBLE_LIMIT,
    review: INITIAL_VISIBLE_LIMIT,
    done: INITIAL_VISIBLE_LIMIT,
  });

  /**
   * handleLoadMore: Increases the visible task limit for a specific column
   * Called when user clicks "Load More" button
   * Adds LOAD_MORE_INCREMENT (5) tasks to the column's display limit
   */
  const handleLoadMore = (columnId: Task['column']) => {
    setVisibleLimits((prev) => ({
      ...prev,
      [columnId]: prev[columnId] + LOAD_MORE_INCREMENT,
    }));
  };

  /**
   * onDragEnd: Callback fired when drag-and-drop operation completes
   * - Updates local state immediately for instant UI feedback
   * - Syncs changes with backend API
   *
   * Optimistic Update Pattern:
   * 1. Update local state (moveTaskLocally) for instant UI response
   * 2. Send API request (updateTask) to persist changes
   * 3. If API fails, local state may differ from server (handle in production)
   */
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    // If dropped outside a droppable area, ignore
    if (!destination) return;
    // If dropped in same position, ignore
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newColumn = destination.droppableId as Task['column'];

    // Optimistic UI update
    moveTaskLocally(draggableId, newColumn);
    // Sync with server
    updateTask({ id: draggableId, column: newColumn });
  };

  if (isLoading && localTasks.length === 0)
    return <Typography sx={{ p: 4 }}>Loading...</Typography>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          p: 3,
          overflowX: 'auto',
          minHeight: 'calc(100vh - 100px)',
        }}
      >
        {/**
         * Render all Kanban columns
         * Each column displays:
         * - Column header with title, color indicator, and task count
         * - Filtered and paginated task list
         * - "Load More" button if more tasks exist
         * - "Add Task" button
         */}
        {Object.entries(COLUMNS).map(([columnId, config]) => {
          /**
           * Filter tasks: Match both column AND search query
           * Searches in both task title and description
           */
          const allColumnTasks = localTasks.filter((t) => {
            const matchesColumn = t.column === columnId;
            const matchesSearch =
              t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              t.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesColumn && matchesSearch;
          });
          // Sort the tasks by priority before slicing them
          const sortedTasks = [...allColumnTasks].sort((a, b) => {
            return PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
          });

          // Pagination: Only show tasks up to the visible limit
          const currentLimit = visibleLimits[columnId as Task['column']];
          const displayedTasks = sortedTasks.slice(0, currentLimit);
          const hasMoreTasks = allColumnTasks.length > currentLimit;

          return (
            <Box
              key={columnId}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: { xs: '240px', sm: '280px', md: '320px' },
                flexShrink: 0,
              }}
            >
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <Paper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      p: 1.5,
                      bgcolor: '#f4f5f7',
                      borderRadius: 2,
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                    elevation={0}
                  >
                    <ColumnHeader
                      title={config.title}
                      color={config.color}
                      taskCount={allColumnTasks.length}
                    />
                    {displayedTasks.map((task, index) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        index={index}
                        onEdit={openEditModal}
                        onDelete={(taskId) => deleteTask(String(taskId))}
                      />
                    ))}
                    {provided.placeholder}

                    {hasMoreTasks && (
                      <Button
                        size="small"
                        onClick={() =>
                          handleLoadMore(columnId as Task['column'])
                        }
                        sx={{
                          mt: 1,
                          mb: 1,
                          color: '#4f46e5',
                          textTransform: 'none',
                          fontWeight: 'bold',
                        }}
                      >
                        Load {allColumnTasks.length - currentLimit} more...
                      </Button>
                    )}
                    <Button
                      startIcon={<AddIcon />}
                      fullWidth
                      onClick={() => openAddModal(columnId as Task['column'])}
                      sx={{
                        mt: 1,
                        color: '#64748b',
                        border: '1px dashed #cbd5e1',
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        '&:hover': { bgcolor: '#e2e8f0' },
                      }}
                    >
                      Add task
                    </Button>
                  </Paper>
                )}
              </Droppable>
            </Box>
          );
        })}
      </Box>
      <AddTaskModal />
      <EditTaskModal />
    </DragDropContext>
  );
}

export default React.memo(Board);
