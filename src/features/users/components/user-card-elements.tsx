import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ComponentProps, ReactNode } from 'react'

/**
 * Styled primitive components for UserCard
 * Pure presentational wrappers that encapsulate base styles
 * Accept native HTML props for maximum flexibility
 */

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

type UserCardBadgeProps = {
  className?: string
  children: ReactNode
}

export function UserCardBadge({ className, children }: UserCardBadgeProps) {
  return (
    <Badge variant='secondary' className={className}>
      {children}
    </Badge>
  )
}
