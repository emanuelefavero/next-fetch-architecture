import type { User } from '@/features/users/types'
import { cva, type VariantProps } from 'class-variance-authority'
import { UserCardLayout } from './layout'
import { UserCardBadge, UserCardEmail, UserCardName } from './primitives'

type UserCardSkeletonProps = {
  variant?: VariantProps<typeof rootVariants>['variant']
  animate?: boolean
}

/**
 * Root card variants for skeleton states
 * Controls the overall card appearance (border, background)
 */
const rootVariants = cva('', {
  variants: {
    variant: {
      default: '',
      secondary: 'border-dashed bg-background',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

/**
 * Primitive element variants for skeleton content
 * Centralizes skeleton-specific styling with type-safe variant system
 */
const primitiveVariants = cva(
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
  name: 'Loading...',
  email: 'loading@example.com',
  age: 30,
} as const

/**
 * Skeleton placeholder for UserCard
 * Uses invisible text to match exact DOM structure and dimensions of real UserCard
 * Ensures pixel-perfect height matching across all states and breakpoints
 */
export function UserCardSkeleton({
  variant = 'default',
  animate = false,
}: UserCardSkeletonProps) {
  return (
    <UserCardLayout className={rootVariants({ variant })}>
      <UserCardName
        className={primitiveVariants({ bg: 'base', animate })}
        aria-hidden
      >
        {data.name}
      </UserCardName>

      <UserCardEmail
        className={primitiveVariants({ bg: 'medium', animate })}
        aria-hidden
      >
        {data.email}
      </UserCardEmail>

      <UserCardBadge className={primitiveVariants({ bg: 'light', animate })}>
        Age: {data.age}
      </UserCardBadge>
    </UserCardLayout>
  )
}
