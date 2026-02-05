'use server'

import type { Result } from '@/lib/api/result'
import { err, ok, unwrapResult } from '@/lib/api/result'
import {
  createUser as apiCreateUser,
  deleteUser as apiDeleteUser,
  updateUser as apiUpdateUser,
} from './api'
import { revalidate } from './cache'
import type { CreateUser, UpdateUser, User, UserId } from './types'

/**
 * Serializable Result type for server actions
 * Uses string for error to ensure Next.js can serialize the response
 */
export type ActionResult<T> = Result<T, string>

/**
 * Server Action to create a new user.
 * Returns a serializable Result to handle errors gracefully in the UI.
 */
export async function createUserAction(
  userData: CreateUser,
): Promise<ActionResult<User>> {
  const result = await apiCreateUser(userData)

  if (!result.ok) {
    return err(
      result.error instanceof Error
        ? result.error.message
        : 'Failed to create user',
    )
  }

  revalidate.users()
  return ok(result.data)
}

/**
 * Server Action to update an existing user.
 * Calls the pure API function and revalidates the cache on success.
 */
export async function updateUserAction(
  id: UserId,
  userData: UpdateUser,
): Promise<User> {
  const user = unwrapResult(await apiUpdateUser(id, userData))
  revalidate.users()
  revalidate.user(id)
  return user
}

/**
 * Server Action to delete a user.
 * Calls the pure API function and revalidates the cache on success.
 */
export async function deleteUserAction(id: UserId): Promise<User> {
  const user = unwrapResult(await apiDeleteUser(id))
  revalidate.users()
  revalidate.user(id)
  return user
}
