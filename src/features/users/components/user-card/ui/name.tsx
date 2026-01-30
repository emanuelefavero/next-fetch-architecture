import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

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
