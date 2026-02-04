'use client'

import { StaggeredFadeIn } from '@/components/animations/staggered-fade-in'
import { NoUsersAlert } from '@/features/users/components/alerts'
import { UserCard } from '@/features/users/components/user-card/card'
import { UserCardSkeleton } from '@/features/users/components/user-card/skeleton'
import { USERS_PER_PAGE } from '@/features/users/config'
import { usePaginationNavigation } from '@/features/users/hooks/usePaginationNavigation'
import { usePaginationPrefetch } from '@/features/users/hooks/usePaginationPrefetch'
import type { Users } from '@/features/users/types'
import { UsersListLayout } from './layout'
import { Pagination } from './pagination'

type UsersListProps = {
  users: Users
  currentPage: number
}

/**
 * UI Orchestrator Component for the Users feature
 *
 * Responsibilities:
 * - Manages pagination navigation with optimistic UI and prefetching
 * - Renders individual UserCards
 * - Fills remaining grid slots with skeletons for visual consistency
 * - Composes layout via UsersListLayout
 */
export function UsersList({ users, currentPage }: UsersListProps) {
  const { navigateToPage, isPending } = usePaginationNavigation()
  usePaginationPrefetch(currentPage) // Prefetch next and prev pages

  if (users.length === 0) return <NoUsersAlert /> // No users found state

  // Calculate how many skeletons we need to fill the grid (for consistency on the last page, which might have less than USERS_PER_PAGE items)
  const skeletonsNeeded = Math.max(0, USERS_PER_PAGE - users.length)

  return (
    <>
      <UsersListLayout isPending={isPending}>
        {/* Render user cards with staggered fade-in animation */}
        {users.map((user, i) => (
          <StaggeredFadeIn key={user.id} index={i}>
            <UserCard user={user} />
          </StaggeredFadeIn>
        ))}

        {/* Fill remaining grid slots with skeletons for visual consistency */}
        {Array.from({ length: skeletonsNeeded }).map((_, i) => (
          <StaggeredFadeIn key={`skeleton-${i}`} index={users.length + i}>
            <UserCardSkeleton variant='secondary' animate={false} />
          </StaggeredFadeIn>
        ))}
      </UsersListLayout>

      <Pagination
        users={users}
        currentPage={currentPage}
        isPending={isPending}
        onNavigate={navigateToPage}
      />
    </>
  )
}
