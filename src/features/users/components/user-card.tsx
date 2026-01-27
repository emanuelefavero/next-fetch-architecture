import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { User } from '@/features/users/types'
import { cn } from '@/lib/utils'

type UserCardProps = {
  user: User
  delay?: number
}

/**
 * Pure presentation component for a single user entity
 * Displays summary information (name, email, age) in a card format
 */
export function UserCard({ user, delay = 0 }: UserCardProps) {
  return (
    <Card
      key={user.id}
      className={cn('min-w-0 p-3', `animate-fade-in-up`)}
      style={{ animationDelay: `${delay * 50}ms` }}
    >
      <div className='space-y-1'>
        <h2 className='text-lg font-semibold'>{user.name}</h2>
        <p
          className='truncate text-sm text-muted-foreground'
          title={user.email}
          aria-label={user.email}
        >
          {user.email}
        </p>
        <Badge variant='secondary'>Age: {user.age}</Badge>
      </div>
    </Card>
  )
}
