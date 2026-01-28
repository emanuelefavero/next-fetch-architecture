import { Card } from '@/components/ui/card'
import {
  animation,
  getStaggerDelay,
  type StaggerSpeed,
} from '@/lib/animations/fade-in-up'
import { cn } from '@/lib/utils'
import { DEFAULT_STAGGER_SPEED } from '../config'

type UserCardLayoutProps = {
  children: React.ReactNode
  index?: number
  staggerSpeed?: StaggerSpeed
  className?: string
}

/**
 * Shared layout wrapper for UserCard variants
 * Provides consistent structure, styling, and animation behavior
 */
export function UserCardLayout({
  children,
  index = 0,
  staggerSpeed = DEFAULT_STAGGER_SPEED,
  className,
}: UserCardLayoutProps) {
  return (
    <Card
      className={cn('min-w-0 p-3', animation.className, className)}
      style={{
        animationDelay: getStaggerDelay(index, staggerSpeed),
      }}
    >
      <div className='space-y-1'>{children}</div>
    </Card>
  )
}
