import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { User } from '@/features/users/types'
import {
  animation,
  getStaggerDelay,
  type StaggerSpeed,
} from '@/lib/animations/fade-in-up'
import { cn } from '@/lib/utils'

type UserCardProps = {
  user: User
  index?: number
  staggerSpeed?: StaggerSpeed
}

/**
 * Presentation component for a single user entity
 * Displays summary information (name, email, age) in a card format
 */
export function UserCard({
  user,
  index = 0,
  staggerSpeed = 'medium',
}: UserCardProps) {
  return (
    <Card
      key={user.id}
      className={cn('min-w-0 p-3', animation.className)}
      style={{
        animationDelay: getStaggerDelay(index, staggerSpeed),
      }}
    >
      <div className='space-y-1'>
        <h2
          className='truncate text-lg font-semibold'
          title={user.name}
          aria-label={user.name}
        >
          {user.name}
        </h2>
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
