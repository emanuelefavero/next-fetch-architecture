'use client'

import { Button } from '@/components/ui/button'
import { USERS_PER_PAGE } from '@/features/users/config'
import type { Users } from '@/features/users/types'

type PaginationProps = {
  users?: Users
  currentPage?: number
  isPending?: boolean
  onNavigate?: (page: number) => void
}

/**
 * Client Component: Handles pagination controls and navigation logic
 *
 * Responsibilities:
 * - Computes next/previous page availability based on data length
 * - Renders pagination buttons with loading states
 * - Delegates navigation to parent component
 *
 * Defaults allow rendering as skeleton without separate component
 */
export function Pagination({
  users = [],
  currentPage = 1,
  isPending = false,
  onNavigate = () => {},
}: PaginationProps) {
  // Determine if next/previous pages are available
  // NOTE: The Mock API provides no total pages, so we assume more pages exist if we received exactly USERS_PER_PAGE items (since this constant is also used to set the limit of received items). If less, we're probably on the last page
  const hasNextPage = users.length === USERS_PER_PAGE
  const hasPrevPage = currentPage > 1

  return (
    <div className='flex flex-col items-center justify-center gap-4 2xs:flex-row'>
      {/* Prev button */}
      <Button
        onClick={() => onNavigate(currentPage - 1)}
        disabled={isPending || !hasPrevPage}
        variant='outline'
        className='w-full select-none 2xs:w-28'
      >
        {isPending ? 'Loading...' : 'Previous'}
      </Button>

      {/* Current page indicator */}
      <span className='text-sm font-medium'>
        Page{' '}
        <span className='inline-block min-w-[2ch] text-center'>
          {currentPage}
        </span>
      </span>

      {/* Next button */}
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
