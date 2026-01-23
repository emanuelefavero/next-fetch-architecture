import { ENDPOINTS } from '@/lib/api/endpoints'
import { fetchData } from '@/lib/api/fetch'
import { Result, err } from '@/lib/api/result'
import { QueryOptions } from '@/lib/api/types'
import { buildQueryParams } from '@/lib/api/utils'
import { cacheLife, cacheTag } from 'next/cache'
import { cache } from './cache'
import {
  CreateUserSchema,
  UpdateUserSchema,
  UserSchema,
  UsersSchema,
} from './schemas'
import { CreateUser, UpdateUser, User, UserId, Users } from './types'

const endpoint = ENDPOINTS.users

// ==================== QUERIES ====================

/**
 * Fetches all users
 */
export async function getUsers(
  options?: QueryOptions<User>,
): Promise<Result<Users, Error>> {
  'use cache'
  cacheTag(cache.users.tag)
  cacheLife(cache.users.life)

  const queryParams = buildQueryParams(options).toString()
  const url = queryParams ? `${endpoint}?${queryParams}` : endpoint

  return fetchData(UsersSchema, url, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })
}

/**
 * Fetches a single user by ID
 */
export async function getUserById(id: UserId): Promise<Result<User, Error>> {
  'use cache'
  cacheTag(cache.user.tag(id))
  cacheLife(cache.user.life)

  return fetchData(UserSchema, `${endpoint}/${id}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })
}

// =================== MUTATIONS ===================

/**
 * Creates a new user
 */
export async function createUser(
  userData: CreateUser,
): Promise<Result<User, Error>> {
  // Validate input data
  const parsedData = CreateUserSchema.safeParse(userData)
  if (!parsedData.success) {
    return err(new Error(`Error creating user: ${parsedData.error.message}`))
  }

  return fetchData(UserSchema, endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userData),
  })
}

/**
 * Updates an existing user by ID
 */
export async function updateUser(
  id: UserId,
  userData: UpdateUser,
): Promise<Result<User, Error>> {
  // Validate input data
  const parsedData = UpdateUserSchema.safeParse(userData)
  if (!parsedData.success) {
    return err(new Error(`Error updating user: ${parsedData.error.message}`))
  }

  return fetchData(UserSchema, `${endpoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userData),
  })
}

/**
 * Deletes a user by ID
 */
export async function deleteUser(id: UserId): Promise<Result<User, Error>> {
  return fetchData(UserSchema, `${endpoint}/${id}`, {
    method: 'DELETE',
    headers: { Accept: 'application/json' },
  })
}
