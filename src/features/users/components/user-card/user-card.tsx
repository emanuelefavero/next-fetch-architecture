import type { User } from '@/features/users/types'
import type { StaggerSpeed } from '@/lib/animations/fade-in-up'
import { UserCardBadge, UserCardEmail, UserCardName, UserCardRoot } from './ui'

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
    <UserCardRoot index={index} staggerSpeed={staggerSpeed}>
      <UserCardName title={user.name} aria-label={user.name}>
        {user.name}
      </UserCardName>
      <UserCardEmail title={user.email} aria-label={user.email}>
        {user.email}
      </UserCardEmail>
      <UserCardBadge>Age: {user.age}</UserCardBadge>
    </UserCardRoot>
  )
}
