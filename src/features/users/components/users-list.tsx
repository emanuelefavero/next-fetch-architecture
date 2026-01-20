'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { USERS_PER_PAGE } from '@/features/users/config'
import type { Users } from '@/features/users/types'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

type UsersListProps = {
  users: Users
  currentPage: number
}

export function UsersList({ users, currentPage }: UsersListProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Build URL helper
  const buildUrl = (page: number): string => `?page=${page}`

  const hasNextPage = users.length === USERS_PER_PAGE
  const hasPrevPage = currentPage > 1

  return (
    <div className='space-y-6 p-4'>
      <h1 className='text-2xl font-bold'>Users</h1>

      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {users.map((user) => (
          <Card key={user.id} className='min-w-0 p-3'>
            <div className='space-y-1'>
              <h2 className='text-lg font-semibold'>{user.name}</h2>
              <p className='truncate text-sm text-muted-foreground' title={user.email} aria-label={user.email}>{user.email}</p>
              <Badge variant='secondary'>Age: {user.age}</Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex flex-col items-center justify-center gap-4 2xs:flex-row'>
        <Button
          onClick={() =>
            startTransition(() => router.push(buildUrl(currentPage - 1)))
          }
          disabled={isPending || !hasPrevPage}
          variant='outline'
          className='w-full 2xs:w-28'
        >
          {isPending ? 'Loading...' : 'Previous'}
        </Button>
        <span className='text-sm font-medium'>
          Page{' '}
          <span className='inline-block min-w-[2ch] text-center'>
            {currentPage}
          </span>
        </span>
        <Button
          onClick={() =>
            startTransition(() => router.push(buildUrl(currentPage + 1)))
          }
          disabled={isPending || !hasNextPage}
          variant='outline'
          className='w-full 2xs:w-28'
        >
          {isPending ? 'Loading...' : 'Next'}
        </Button>
      </div>
    </div>
  )
}
