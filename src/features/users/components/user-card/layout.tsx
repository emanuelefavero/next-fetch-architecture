import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type UserCardLayoutProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Layout wrapper for UserCard variants
 * Provides consistent structure and styling
 * Uses flex to center content vertically within stretched grid cells
 */
export function UserCardLayout({ children, className }: UserCardLayoutProps) {
  return (
    <Card
      className={cn(
        'flex w-full min-w-0 flex-col items-start justify-center gap-1 p-3',
        className,
      )}
    >
      {children}
    </Card>
  )
}
