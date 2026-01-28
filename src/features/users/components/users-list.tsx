'use client'

import type { Users } from '@/features/users/types'
import { USERS_PER_PAGE } from '../config'
import { Pagination } from './pagination'
import { UserCard } from './user-card'
import { UserCardSkeleton } from './user-card-skeleton'

type UsersListProps = {
  users: Users
  currentPage: number
}

/**
 * UI Orchestrator Component for the Users feature
 *
 * Responsibilities:
 * - Composes the layout for the users list
 * - Renders individual UserCards
 * - Fills remaining grid slots with skeletons for visual consistency
 * - Places the Pagination component
 *
 * This component is purely presentational and agnostic of data fetching.
 */
export function UsersList({ users, currentPage }: UsersListProps) {
  // Calculate how many skeleton cards needed to fill the grid
  const skeletonsNeeded = Math.max(0, USERS_PER_PAGE - users.length)

  return (
    <div className='space-y-6 p-4'>
      <h1 className='text-2xl font-bold'>Users</h1>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6'>
        {/* Render actual user data */}
        {users.map((user, i) => (
          <UserCard key={user.id} user={user} index={i} />
        ))}

        {/* Fill remaining slots with skeletons */}
        {Array.from({ length: skeletonsNeeded }).map((_, i) => (
          <UserCardSkeleton key={`skeleton-${i}`} index={users.length + i} />
        ))}
      </div>

      <Pagination users={users} currentPage={currentPage} />
    </div>
  )
}
