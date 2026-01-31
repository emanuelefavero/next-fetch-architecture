import type { User } from '@/features/users/types'
import { UserCardLayout } from './layout'
import { UserCardBadge, UserCardEmail, UserCardName } from './primitives'

type UserCardProps = {
  user: User
}

/**
 * Presentation component for a single user entity
 * Displays summary information (name, email, age) in a card format
 */
export function UserCard({ user }: UserCardProps) {
  return (
    <UserCardLayout>
      <UserCardName title={user.name} aria-label={user.name}>
        {user.name}
      </UserCardName>
      <UserCardEmail title={user.email} aria-label={user.email}>
        {user.email}
      </UserCardEmail>
      <UserCardBadge>Age: {user.age}</UserCardBadge>
    </UserCardLayout>
  )
}
