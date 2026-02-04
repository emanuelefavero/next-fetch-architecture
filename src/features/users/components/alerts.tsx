import { AlertMessage } from '@/components/shared/alert-message'
import { AlertCircleIcon, UsersIcon } from 'lucide-react'

/**
 * Alert components for the users feature.
 *
 * This file contains specific alert components used in the users list,
 * such as empty state and error alerts.
 */

export function NoUsersAlert() {
  return (
    <AlertMessage
      icon={<UsersIcon />}
      title='No users found'
      description='There are no users to display at the moment.'
    />
  )
}

export function UsersLoadErrorAlert({ error }: { error: Error }) {
  return (
    <AlertMessage
      icon={<AlertCircleIcon />}
      title='Failed to load users'
      description={error.message}
      variant='destructive'
    />
  )
}
