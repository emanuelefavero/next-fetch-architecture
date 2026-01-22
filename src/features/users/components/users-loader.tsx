import { getUsers } from '@/features/users/api'
import { USERS_PER_PAGE } from '@/features/users/config'
import { parseUsersSearchParams } from '@/features/users/utils'
import type { SearchParams } from '@/types/routing'
import { UsersList } from './users-list'

type UsersLoaderProps = {
  searchParams: Promise<SearchParams>
}

/**
 * Server Component: Users data loader and composition root
 *
 * Responsibilities:
 * 1. Awaiting and parsing search parameters
 * 2. Fetching user data on the server
 * 3. Handling the Result pattern (success/failure)
 * 4. Rendering the UI orchestrator or error state
 */
export async function UsersLoader({ searchParams }: UsersLoaderProps) {
  // Await and parse searchParams inside the Suspense boundary
  const resolvedSearchParams = await searchParams
  const queryOptions = parseUsersSearchParams(resolvedSearchParams)

  // Fetch data server-side with validated options and fixed limit (cached)
  const result = await getUsers({ ...queryOptions, limit: USERS_PER_PAGE })

  // Handle Result: Pass data or error to child
  if (!result.ok) {
    return <div>Error loading users: {result.error.message}</div>
  }

  return <UsersList users={result.data} currentPage={queryOptions.page ?? 1} />
}
