import { ENDPOINTS } from '@/lib/api/endpoints'
import { fetchWithSchema } from '@/lib/api/fetch'
import { Result, err } from '@/lib/api/result'
import { QueryOptions } from '@/lib/api/types'
import { buildQueryParams } from '@/lib/api/utils'
import { z } from 'zod'
import { CreateUserSchema, UpdateUserSchema, UserSchema } from './schemas'
import { CreateUser, UpdateUser, User, UserId } from './types'

const endpoint = ENDPOINTS.users

/**
 * Fetches all users
 */
export async function getUsers(
  options?: QueryOptions<User>,
): Promise<Result<User[], string>> {
  const queryParams = buildQueryParams(options).toString()
  const url = queryParams ? `${endpoint}?${queryParams}` : endpoint

  return fetchWithSchema(
    url,
    { method: 'GET', headers: { Accept: 'application/json' } },
    z.array(UserSchema),
    'Error fetching users',
  )
}

/**
 * Fetches a single user by ID
 */
export async function getUserById(id: UserId): Promise<Result<User, string>> {
  return fetchWithSchema(
    `${endpoint}/${id}`,
    { method: 'GET', headers: { Accept: 'application/json' } },
    UserSchema,
    `Error fetching user with ID ${id}`,
  )
}

/**
 * Creates a new user
 */
export async function createUser(
  userData: CreateUser,
): Promise<Result<User, string>> {
  const errorContext = 'Error creating user'

  // Validate input data
  const parsedData = CreateUserSchema.safeParse(userData)
  if (!parsedData.success) {
    return err(`${errorContext}: ${parsedData.error.message}`)
  }

  return fetchWithSchema(
    endpoint,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userData),
    },
    UserSchema,
    errorContext,
  )
}

/**
 * Updates an existing user by ID
 */
export async function updateUser(
  id: UserId,
  userData: UpdateUser,
): Promise<Result<User, string>> {
  const errorContext = `Error updating user with ID ${id}`

  // Validate input data
  const parsedData = UpdateUserSchema.safeParse(userData)
  if (!parsedData.success) {
    return err(`${errorContext}: ${parsedData.error.message}`)
  }

  return fetchWithSchema(
    `${endpoint}/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userData),
    },
    UserSchema,
    errorContext,
  )
}

/**
 * Deletes a user by ID
 */
export async function deleteUser(id: UserId): Promise<Result<null, string>> {
  return fetchWithSchema(
    `${endpoint}/${id}`,
    { method: 'DELETE', headers: { Accept: 'application/json' } },
    z.null(),
    `Error deleting user with ID ${id}`,
  )
}
