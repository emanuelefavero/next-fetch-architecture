import { UserCardSkeleton } from '@/features/users/components/user-card/skeleton'
import { USERS_PER_PAGE } from '@/features/users/config'
import { UsersListLayout } from './layout'
import { Pagination } from './pagination'

/**
 * Skeleton for UsersList during Suspense fallback
 * Mirrors exact structure of UsersList for zero layout shift
 */
export function UsersListSkeleton() {
  return (
    <>
      <UsersListLayout>
        {Array.from({ length: USERS_PER_PAGE }).map((_, i) => (
          <UserCardSkeleton key={`skeleton-${i}`} animate />
        ))}
      </UsersListLayout>

      {/* Pagination with defaults renders disabled state */}
      <Pagination />
    </>
  )
}
