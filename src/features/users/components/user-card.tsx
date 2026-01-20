import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { User } from '@/features/users/types'

type UserCardProps = {
  user: User
}

export function UserCard({ user }: UserCardProps) {
  return (
    <Card key={user.id} className='min-w-0 p-3'>
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
