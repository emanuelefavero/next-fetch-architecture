import { Badge } from '@/components/ui/badge'
import type { User } from '@/features/users/types'
import type { StaggerSpeed } from '@/lib/animations/fade-in-up'
import { UserCardLayout } from './user-card-layout'

type UserCardProps = {
  user: User
  index?: number
  staggerSpeed?: StaggerSpeed
}

/**
 * Presentation component for a single user entity
 * Displays summary information (name, email, age) in a card format
 */
export function UserCard({ user, index, staggerSpeed }: UserCardProps) {
  return (
    <UserCardLayout index={index} staggerSpeed={staggerSpeed}>
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
    </UserCardLayout>
  )
}
