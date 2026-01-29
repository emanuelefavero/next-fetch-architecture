import { Badge } from '@/components/ui/badge'
import type { StaggerSpeed } from '@/lib/animations/fade-in-up'
import { cn } from '@/lib/utils'
import { UserCardLayout } from './user-card-layout'

type UserCardSkeletonProps = {
  index?: number
  staggerSpeed?: StaggerSpeed
  animate?: boolean
}

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
      {/* Name skeleton - exact h2 structure with invisible text */}
      <h2
        className={cn(
          'truncate rounded bg-muted text-lg font-semibold text-transparent select-none',
          animate && 'animate-pulse',
        )}
        aria-hidden='true'
      >
        <span className='pointer-events-none'>Jane Doe</span>
      </h2>

      {/* Email skeleton - exact p structure with invisible text */}
      <p
        className={cn(
          'truncate rounded bg-muted/60 text-sm text-transparent select-none',
          animate && 'animate-pulse',
        )}
        aria-hidden='true'
      >
        <span className='pointer-events-none'>jane.doe@example.com</span>
      </p>

      {/* Age badge skeleton - uses Badge component with invisible text */}
      <Badge
        variant='secondary'
        className={cn(
          'bg-muted/40 text-transparent select-none',
          animate && 'animate-pulse',
        )}
        aria-hidden='true'
      >
        <span className='pointer-events-none'>Age: 28</span>
      </Badge>
    </UserCardLayout>
  )
}
