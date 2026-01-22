'use server'

import { unwrapResult } from '@/lib/api/result'
import {
  createUser as apiCreateUser,
  deleteUser as apiDeleteUser,
  updateUser as apiUpdateUser,
} from './api'
import { revalidateUsersCache } from './cache'
import type { CreateUser, UpdateUser, User, UserId } from './types'

/**
 * Server Action to create a new user.
 * Calls the pure API function and revalidates the cache on success.
 */
export async function createUserAction(userData: CreateUser): Promise<User> {
  const user = unwrapResult(await apiCreateUser(userData))
  revalidateUsersCache() // Trigger stale-while-revalidate
  return user
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
  revalidateUsersCache() // Trigger stale-while-revalidate
  return user
}

/**
 * Server Action to delete a user.
 * Calls the pure API function and revalidates the cache on success.
 */
export async function deleteUserAction(id: UserId): Promise<User> {
  const user = unwrapResult(await apiDeleteUser(id))
  revalidateUsersCache() // Trigger stale-while-revalidate
  return user
}
