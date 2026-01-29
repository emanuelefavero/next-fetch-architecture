'use client'

import { Button } from '@/components/ui/button'
import { USERS_PER_PAGE } from '@/features/users/config'
import type { Users } from '@/features/users/types'

type PaginationProps = {
  users: Users
  currentPage: number
  isPending: boolean
  onNavigate: (page: number) => void
}

/**
 * Client Component: Handles pagination controls and navigation logic
 *
 * Responsibilities:
 * - Computes next/previous page availability based on data length
 * - Renders pagination buttons with loading states
 * - Delegates navigation to parent component
 */
export function Pagination({
  users,
  currentPage,
  isPending,
  onNavigate,
}: PaginationProps) {
  // Determine if next/previous pages are available
  const hasNextPage = users.length === USERS_PER_PAGE
  const hasPrevPage = currentPage > 1

  return (
    <div className='flex flex-col items-center justify-center gap-4 2xs:flex-row'>
      <Button
        onClick={() => onNavigate(currentPage - 1)}
        disabled={isPending || !hasPrevPage}
        variant='outline'
        className='w-full select-none 2xs:w-28'
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
        onClick={() => onNavigate(currentPage + 1)}
        disabled={isPending || !hasNextPage}
        variant='outline'
        className='w-full select-none 2xs:w-28'
      >
        {isPending ? 'Loading...' : 'Next'}
      </Button>
    </div>
  )
}
