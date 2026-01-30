import { Badge } from '@/components/ui/badge'
import type { ReactNode } from 'react'

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
