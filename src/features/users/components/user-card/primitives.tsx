import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

/**
 * Primitive components for user card content
 * Atomic elements used to compose UserCard and UserCardSkeleton
 */

type UserCardNameProps = ComponentProps<'h2'>

export function UserCardName({
  className,
  children,
  ...props
}: UserCardNameProps) {
  return (
    <h2
      className={cn('w-full truncate rounded text-lg font-semibold', className)}
      {...props}
    >
      {children}
    </h2>
  )
}

type UserCardEmailProps = ComponentProps<'p'>

export function UserCardEmail({
  className,
  children,
  ...props
}: UserCardEmailProps) {
  return (
    <p
      className={cn(
        'w-full truncate rounded text-sm text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  )
}

type UserCardBadgeProps = ComponentProps<typeof Badge>

export function UserCardBadge({
  variant = 'secondary',
  ...props
}: UserCardBadgeProps) {
  return <Badge variant={variant} {...props} />
}
