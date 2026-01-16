import { API_BASE_URL } from '@/config/env'

/**
 * Centralized API endpoints.
 * @example
 * const usersEndpoint = ENDPOINTS.users
 * // 'https://<MOCK_API_SECRET>.mockapi.io/users'
 */
export const ENDPOINTS = {
  users: `${API_BASE_URL}/users`,
  // Add more endpoints here as needed
} as const
