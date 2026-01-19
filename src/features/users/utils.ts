import type { QueryOptions } from '@/lib/api/types'
import { z } from 'zod'
import type { User } from './types'

/**
 * Zod schema for validating URL search params for users
 * Ensures type-safe parsing of query parameters
 */
const UsersSearchParamsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  sortBy: z.enum(['name', 'email', 'age']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  search: z.string().optional(),
})

/**
 * Parses and validates search params for users queries
 * @param searchParams - Raw search params from Next.js page
 * @returns Validated QueryOptions for User
 * @example
 * const options = parseUsersSearchParams({ page: '2', search: 'john' })
 * // Returns: { page: 2, search: 'john' }
 */
export function parseUsersSearchParams(searchParams: {
  [key: string]: string | string[] | undefined
}): QueryOptions<User> {
  return UsersSearchParamsSchema.parse(searchParams)
}
