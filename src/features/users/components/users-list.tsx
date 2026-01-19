'use client'

import { USERS_PER_PAGE } from '@/features/users/config'
import type { Users } from '@/features/users/types'
import Link from 'next/link'

type UsersListProps = {
  users: Users
  currentPage: number
}

export function UsersList({ users, currentPage }: UsersListProps) {
  // Build URL helper
  const buildUrl = (page: number): string => `?page=${page}`

  const hasNextPage = users.length === USERS_PER_PAGE
  const hasPrevPage = currentPage > 1

  return (
    <div>
      <h1 className='text-2xl font-bold'>Users</h1>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - Age: {user.age}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <nav>
        {hasPrevPage ? (
          <Link href={buildUrl(currentPage - 1)}>Previous</Link>
        ) : (
          <span>Previous</span>
        )}
        <span> Page {currentPage} </span>
        {hasNextPage ? (
          <Link href={buildUrl(currentPage + 1)}>Next</Link>
        ) : (
          <span>Next</span>
        )}
      </nav>
    </div>
  )
}
