'use client'

import { Button } from '@/components/ui/button'
import { USERS_PER_PAGE } from '@/features/users/config'
import type { Users } from '@/features/users/types'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

type PaginationProps = {
  users: Users
  currentPage: number
}

export function Pagination({ users, currentPage }: PaginationProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Helpers
  const buildUrl = (page: number): string => `?page=${page}`
  const hasNextPage = users.length === USERS_PER_PAGE
  const hasPrevPage = currentPage > 1

  return (
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
  )
}
