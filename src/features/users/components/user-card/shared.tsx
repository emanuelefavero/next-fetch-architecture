import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ComponentProps, ReactNode } from 'react'

/**
 * Shared components used by both UserCard and UserCardSkeleton
 * Co-locates layout and primitive elements for the user card feature
 */

// =============================================================
// Root wrapper

type UserCardRootProps = {
  children: ReactNode
  className?: string
}

/**
 * Shared layout wrapper for UserCard variants
 * Provides consistent structure and styling
 * Uses flex to center content vertically within stretched grid cells
 */
export function UserCardRoot({ children, className }: UserCardRootProps) {
  return (
    <Card
      className={cn(
        'flex min-w-0 flex-col items-start justify-center gap-1 p-3',
        className,
      )}
    >
      {children}
    </Card>
  )
}

// =============================================================
// Primitive elements

type UserCardNameProps = ComponentProps<'h2'>

export function UserCardName({
  className,
  children,
  ...props
}: UserCardNameProps) {
  return (
    <h2
      className={cn('truncate rounded text-lg font-semibold', className)}
      {...props}
    >
      {children}
    </h2>
  )
}

// ------------------------------------------------------------

type UserCardEmailProps = ComponentProps<'p'>

export function UserCardEmail({
  className,
  children,
  ...props
}: UserCardEmailProps) {
  return (
    <p
      className={cn(
        'truncate rounded text-sm text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}

// ------------------------------------------------------------

type UserCardBadgeProps = React.ComponentProps<typeof Badge>

export function UserCardBadge({
  variant = 'secondary',
  ...props
}: UserCardBadgeProps) {
  return <Badge variant={variant} {...props} />
}
