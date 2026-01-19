'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { USERS_PER_PAGE } from '@/features/users/config'
import type { Users } from '@/features/users/types'
import { useRouter } from 'next/navigation'

type UsersListProps = {
  users: Users
  currentPage: number
}

export function UsersList({ users, currentPage }: UsersListProps) {
  const router = useRouter()

  // Build URL helper
  const buildUrl = (page: number): string => `?page=${page}`

  const hasNextPage = users.length === USERS_PER_PAGE
  const hasPrevPage = currentPage > 1

  return (
    <div className='space-y-6 p-4'>
      <h1 className='text-2xl font-bold'>Users</h1>

      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {users.map((user) => (
          <Card key={user.id} className='p-3'>
            <div className='space-y-1'>
              <h2 className='text-lg font-semibold'>{user.name}</h2>
              <p className='text-sm text-muted-foreground'>{user.email}</p>
              <Badge variant='secondary'>Age: {user.age}</Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-center space-x-4'>
        <Button
          onClick={() => router.push(buildUrl(currentPage - 1))}
          disabled={!hasPrevPage}
          variant='outline'
        >
          Previous
        </Button>
        <span className='text-sm font-medium'>Page {currentPage}</span>
        <Button
          onClick={() => router.push(buildUrl(currentPage + 1))}
          disabled={!hasNextPage}
          variant='outline'
        >
          Next
        </Button>
      </div>
    </div>
  )
}
