'use client'

import { StaggeredFadeIn } from '@/components/animations/staggered-fade-in'
import { USERS_PER_PAGE } from '@/features/users/config'
import type { Users } from '@/features/users/types'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Pagination } from './pagination'
import { UserCard, UserCardSkeleton } from './user-card'
import { UsersListLayout } from './users-list-layout'

type UsersListProps = {
  users: Users
  currentPage: number
}

/**
 * UI Orchestrator Component for the Users feature
 *
 * Responsibilities:
 * - Manages pagination navigation with optimistic UI
 * - Renders individual UserCards
 * - Fills remaining grid slots with skeletons for visual consistency
 * - Composes layout via UsersListLayout
 */
export function UsersList({ users, currentPage }: UsersListProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const navigateToPage = (page: number) => {
    startTransition(() => {
      router.push(`?page=${page}`)
    })
  }

  const skeletonsNeeded = Math.max(0, USERS_PER_PAGE - users.length)

  return (
    <>
      <UsersListLayout isPending={isPending}>
        {users.map((user, i) => (
          <StaggeredFadeIn key={user.id} index={i}>
            <UserCard user={user} />
          </StaggeredFadeIn>
        ))}

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
