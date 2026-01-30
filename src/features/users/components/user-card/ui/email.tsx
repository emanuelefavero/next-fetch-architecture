import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

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
