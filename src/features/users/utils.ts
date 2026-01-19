import type { QueryOptions } from '@/lib/api/types'
import { UsersSearchParamsSchema } from './schemas'
import type { User } from './types'

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
