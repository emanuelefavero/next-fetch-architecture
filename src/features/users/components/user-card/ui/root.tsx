import { Card } from '@/components/ui/card'
import { DEFAULT_STAGGER_SPEED } from '@/features/users/config'
import {
  animation,
  getStaggerDelay,
  type StaggerSpeed,
} from '@/lib/animations/fade-in-up'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type UserCardRootProps = {
  children: ReactNode
  index?: number
  staggerSpeed?: StaggerSpeed
  className?: string
}

/**
 * Shared layout wrapper for UserCard variants
 * Provides consistent structure, styling, and animation behavior
 * Uses flex to center content vertically within stretched grid cells
 */
export function UserCardRoot({
  children,
  index = 0,
  staggerSpeed = DEFAULT_STAGGER_SPEED,
  className,
}: UserCardRootProps) {
  return (
    <Card
      className={cn(
        'flex min-w-0 flex-col items-start justify-center gap-1 p-3',
        animation.className,
        className,
      )}
      style={{
        animationDelay: getStaggerDelay(index, staggerSpeed),
      }}
    >
      {children}
    </Card>
  )
}
