/**
 * Generic query options for API requests with pagination and sorting
 * @template T - The entity type to ensure type-safe sortBy keys
 * @example
 * type UsersQueryOptions = QueryOptions<User>
 * const options: UsersQueryOptions = {
 *   page: 1,
 *   limit: 10,
 *   sortBy: 'name', // Type-safe: must be a key of User
 *   order: 'asc'
 * }
 */
export type QueryOptions<T> = {
  page?: number
  limit?: number
  sortBy?: keyof T
  order?: 'asc' | 'desc'
}
