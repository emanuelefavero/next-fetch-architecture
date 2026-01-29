import type { StaggerSpeed } from '@/lib/animations/fade-in-up'
import { UserCardLayout } from './user-card-layout'

type UserCardSkeletonProps = {
  index?: number
  staggerSpeed?: StaggerSpeed
}

/**
 * Skeleton placeholder for UserCard
 * Used during loading states and to fill grid gaps on pagination
 */
export function UserCardSkeleton({
  index,
  staggerSpeed,
}: UserCardSkeletonProps) {
  return (
    <UserCardLayout
      index={index}
      staggerSpeed={staggerSpeed}
      className='aria-hidden border-dashed bg-background'
    >
      {/* Name skeleton */}
      <div className='h-7 w-32 rounded bg-muted' aria-hidden='true' />

      {/* Email skeleton */}
      <div className='h-5 w-48 rounded bg-muted/60' aria-hidden='true' />

      {/* Age badge skeleton */}
      <div
        className='inline-flex h-5 w-16 rounded-full bg-muted/40'
        aria-hidden='true'
      />
    </UserCardLayout>
  )
}
