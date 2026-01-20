'use client'

import type { Users } from '@/features/users/types'
import { Pagination } from './pagination'
import { UserCard } from './user-card'

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
 * - Places the Pagination component
 *
 * This component is purely presentational and agnostic of data fetching.
 */
export function UsersList({ users, currentPage }: UsersListProps) {
  return (
    <div className='space-y-6 p-4'>
      <h1 className='text-2xl font-bold'>Users</h1>

      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <Pagination users={users} currentPage={currentPage} />
    </div>
  )
}
