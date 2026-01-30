import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type UserCardRootProps = {
  children: ReactNode
  index?: number
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
  className,
}: UserCardRootProps) {
  return (
    <Card
      className={cn(
        'flex min-w-0 flex-col items-start justify-center gap-1 p-3',
        'motion-safe:animate-fade-in-up', // animation
        className,
      )}
      style={{
        animationDelay: `${index * 50}ms`, // staggered delay
      }}
    >
      {children}
    </Card>
  )
}
