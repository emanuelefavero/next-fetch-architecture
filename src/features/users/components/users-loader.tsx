import { getUsers } from '@/features/users/api'
import { USERS_PER_PAGE } from '@/features/users/config'
import { parseUsersSearchParams } from '@/features/users/utils'
import { UsersList } from './users-list'

type UsersLoaderProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function UsersLoader({ searchParams }: UsersLoaderProps) {
  // Await and parse searchParams inside the Suspense boundary
  const resolvedSearchParams = await searchParams
  const queryOptions = parseUsersSearchParams(resolvedSearchParams)

  // Fetch data server-side with validated options and fixed limit
  const result = await getUsers({ ...queryOptions, limit: USERS_PER_PAGE })

  // Handle Result: Pass data or error to child
  if (!result.ok) {
    return <div>Error loading users: {result.error.message}</div>
  }

  return <UsersList users={result.data} currentPage={queryOptions.page ?? 1} />
}
