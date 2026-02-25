'use client';

/**
 * Providers Component
 * Wraps the application with required provider contexts
 * Must be a client component since it uses React hooks and context
 *
 * Provides:
 * - React Query (react-query): For server state management & caching
 *   Handles API requests, caching, and synchronization
 *
 * These providers make hooks like useQuery, useMutation available
 * throughout the entire application
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

/**
 * Providers: Main provider wrapper component
 * @param children - Child components that will have access to providers
 *
 * Creates a single QueryClient instance per component mount
 * This instance is shared by all child components
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  /**
   * Initialize React Query client
   * Created once per component mount using useState
   * Persists across re-renders but not across page navigations
   *
   * Configuration:
   * - Default query and mutation settings
   * - Cache management
   * - Request deduplication
   */
  const [queryClient] = useState(() => new QueryClient());

  return (
    // React Query Provider: Makes useQuery, useMutation hooks available
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
