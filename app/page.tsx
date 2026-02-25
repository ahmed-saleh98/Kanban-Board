'use client';
import Header from '../components/Header';
import Board from '../components/Board';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
      <Header />
      <Board />
    </Box>
  );
}
