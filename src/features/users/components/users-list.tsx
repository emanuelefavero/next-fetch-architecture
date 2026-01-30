'use client'

import { StaggeredFadeIn } from '@/components/animations/staggered-fade-in'
import { USERS_PER_PAGE } from '@/features/users/config'
import type { Users } from '@/features/users/types'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Pagination } from './pagination'
import { UserCard, UserCardSkeleton } from './user-card'

type UsersListProps = {
  users: Users
  currentPage: number
}

/**
 * UI Orchestrator Component for the Users feature
 *
 * Responsibilities:
 * - Composes the layout for the users list
 * - Manages pagination navigation with optimistic UI (keeps content visible during transitions)
 * - Renders individual UserCards
 * - Fills remaining grid slots with skeletons for visual consistency
 * - Places the Pagination component with loading state feedback
 */
export function UsersList({ users, currentPage }: UsersListProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Navigation handler passed to Pagination
  const navigateToPage = (page: number) => {
    startTransition(() => {
      router.push(`?page=${page}`)
    })
  }

  // Calculate how many skeleton cards needed to fill the grid
  const skeletonsNeeded = Math.max(0, USERS_PER_PAGE - users.length)

  return (
    <div className='space-y-6 p-4'>
      <h1 className='text-2xl font-bold'>Users</h1>

      <div
        className={cn(
          'grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6',
          isPending &&
            'pointer-events-none opacity-50 blur-xs transition-all duration-700',
        )}
      >
        {/* Always render actual user data during pagination */}
        {users.map((user, i) => (
          <StaggeredFadeIn key={user.id} index={i}>
            <UserCard user={user} />
          </StaggeredFadeIn>
        ))}

        {/* Fill remaining slots with static skeletons */}
        {Array.from({ length: skeletonsNeeded }).map((_, i) => (
          <StaggeredFadeIn key={`skeleton-${i}`} index={users.length + i}>
            <UserCardSkeleton variant='secondary' animate={false} />
          </StaggeredFadeIn>
        ))}
      </div>

      <Pagination
        users={users}
        currentPage={currentPage}
        isPending={isPending}
        onNavigate={navigateToPage}
      />
    </div>
  )
}
