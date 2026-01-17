import { ENDPOINTS } from '@/lib/api/endpoints'
import { apiFetch } from '@/lib/api/fetch'
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

  return apiFetch({
    url,
    method: 'GET',
    schema: z.array(UserSchema),
    errorContext: 'Error fetching users',
  })
}

/**
 * Fetches a single user by ID
 */
export async function getUserById(id: UserId): Promise<Result<User, string>> {
  return apiFetch({
    url: `${endpoint}/${id}`,
    method: 'GET',
    schema: UserSchema,
    errorContext: `Error fetching user with ID ${id}`,
  })
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

  return apiFetch({
    url: endpoint,
    method: 'POST',
    body: userData,
    schema: UserSchema,
    errorContext,
  })
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

  return apiFetch({
    url: `${endpoint}/${id}`,
    method: 'PUT',
    body: userData,
    schema: UserSchema,
    errorContext,
  })
}

/**
 * Deletes a user by ID
 */
export async function deleteUser(id: UserId): Promise<Result<null, string>> {
  return apiFetch({
    url: `${endpoint}/${id}`,
    method: 'DELETE',
    schema: z.null(),
    errorContext: `Error deleting user with ID ${id}`,
  })
}
