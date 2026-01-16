import { z } from 'zod'
import { Result, ok, err } from '@/lib/result'
import { User, UserId, CreateUser, UpdateUser } from './types'
import { UserSchema, CreateUserSchema, UpdateUserSchema } from './schemas'
import { buildQueryParams } from '@/lib/api/utils'
import { QueryOptions } from '@/lib/api/types'
import { ENDPOINTS } from '@/lib/api/endpoints'

const endpoint = ENDPOINTS.users

/**
 * Fetches all users
 */
export async function getUsers(
  options?: QueryOptions<User>
): Promise<Result<User[], string>> {
  const errorTitle = 'Error fetching users'

  try {
    // Build query params
    const queryParams = buildQueryParams(options).toString()

    // Construct URL
    const url = queryParams ? `${endpoint}?${queryParams}` : endpoint

    // Fetch data
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
    })

    if (!res.ok) {
      return err(`${errorTitle}: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    // Validate res data
    const users = z.array(UserSchema).safeParse(data)

    return users.success
      ? ok(users.data)
      : err(`${errorTitle}: ${users.error.message}`)
  } catch (error) {
    return err(
      error instanceof Error ? `${errorTitle}: ${error.message}` : errorTitle
    )
  }
}

/**
 * Fetches a single user by ID
 */
export async function getUserById(id: UserId): Promise<Result<User, string>> {
  const errorTitle = `Error fetching user with ID ${id}`

  try {
    // Fetch data
    const res = await fetch(`${endpoint}/${id}`, {
      headers: { Accept: 'application/json' },
    })

    if (!res.ok) {
      return err(`${errorTitle}: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    // Validate res data
    const user = UserSchema.safeParse(data)

    return user.success
      ? ok(user.data)
      : err(`${errorTitle}: ${user.error.message}`)
  } catch (error) {
    return err(
      error instanceof Error ? `${errorTitle}: ${error.message}` : errorTitle
    )
  }
}

/**
 * Creates a new user
 */
export async function createUser(
  userData: CreateUser
): Promise<Result<User, string>> {
  const errorTitle = 'Error creating user'

  // Validate input data
  const parsedData = CreateUserSchema.safeParse(userData)
  if (!parsedData.success) {
    return err(`${errorTitle}: ${parsedData.error.message}`)
  }

  try {
    // Send POST request
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!res.ok) {
      return err(`${errorTitle}: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    // Validate res data
    const user = UserSchema.safeParse(data)

    return user.success
      ? ok(user.data)
      : err(`${errorTitle}: ${user.error.message}`)
  } catch (error) {
    return err(
      error instanceof Error ? `${errorTitle}: ${error.message}` : errorTitle
    )
  }
}

/**
 * Updates an existing user by ID
 */
export async function updateUser(
  id: UserId,
  userData: UpdateUser
): Promise<Result<User, string>> {
  const errorTitle = `Error updating user with ID ${id}`

  // Validate input data
  const parsedData = UpdateUserSchema.safeParse(userData)
  if (!parsedData.success) {
    return err(`${errorTitle}: ${parsedData.error.message}`)
  }

  try {
    // Send PUT request
    const res = await fetch(`${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!res.ok) {
      return err(`${errorTitle}: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()

    // Validate res data
    const user = UserSchema.safeParse(data)

    return user.success
      ? ok(user.data)
      : err(`${errorTitle}: ${user.error.message}`)
  } catch (error) {
    return err(
      error instanceof Error ? `${errorTitle}: ${error.message}` : errorTitle
    )
  }
}

/**
 * Deletes a user by ID
 */
export async function deleteUser(id: UserId): Promise<Result<null, string>> {
  const errorTitle = `Error deleting user with ID ${id}`

  try {
    // Send DELETE request
    const res = await fetch(`${endpoint}/${id}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    })

    if (!res.ok) {
      return err(`${errorTitle}: ${res.status} ${res.statusText}`)
    }

    return ok(null)
  } catch (error) {
    return err(
      error instanceof Error ? `${errorTitle}: ${error.message}` : errorTitle
    )
  }
}
