import { User } from '@/features/users/types'
import type { StaggerSpeed } from '@/lib/animations/fade-in-up'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import {
  UserCardBadge,
  UserCardEmail,
  UserCardName,
} from './user-card-elements'
import { UserCardLayout } from './user-card-layout'

type UserCardSkeletonProps = {
  index?: number
  staggerSpeed?: StaggerSpeed
  animate?: boolean
}

/**
 * Skeleton style variants using CVA
 * Centralizes skeleton-specific styling with type-safe variant system
 */
const variants = cva(
  'pointer-events-none text-transparent select-none', // Base
  {
    variants: {
      bg: {
        base: 'bg-muted',
        medium: 'bg-muted/60',
        light: 'bg-muted/40',
      },
      animate: {
        true: 'animate-pulse',
      },
    },
  },
)

/**
 * Static skeleton data to match real UserCard content
 */
const data: Pick<User, 'name' | 'email' | 'age'> = {
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  age: 28,
} as const

/**
 * Skeleton placeholder for UserCard
 * Uses invisible text to match exact DOM structure and dimensions of real UserCard
 * Ensures pixel-perfect height matching across all states and breakpoints
 */
export function UserCardSkeleton({
  index,
  staggerSpeed,
  animate = false,
}: UserCardSkeletonProps) {
  return (
    <UserCardLayout
      index={index}
      staggerSpeed={staggerSpeed}
      className={cn(!animate && 'border-dashed bg-background')}
    >
      <UserCardName className={variants({ bg: 'base', animate })} aria-hidden>
        {data.name}
      </UserCardName>

      <UserCardEmail
        className={variants({ bg: 'medium', animate })}
        aria-hidden
      >
        {data.email}
      </UserCardEmail>

      <UserCardBadge className={variants({ bg: 'light', animate })}>
        Age: {data.age}
      </UserCardBadge>
    </UserCardLayout>
  )
}
