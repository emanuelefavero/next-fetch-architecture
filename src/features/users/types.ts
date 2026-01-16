import { z } from 'zod'
import { UserSchema, CreateUserSchema, UpdateUserSchema } from './schemas'

/**
 * Represents a complete user entity with all required fields
 * @see {@link UserSchema} for validation details
 * @example
 * const user: User = {
 *  id: '1',
 *  createdAt: '2026-01-01T00:00:00Z',
 *  name: 'John Doe',
 *  email: 'john.doe@example.com',
 *  age: 30
 * }
 */
export type User = z.infer<typeof UserSchema>

/**
 * Options for fetching users, including pagination and sorting
 * @example
 * const options: GetUsersOptions = {
 *  page: 1,
 *  limit: 10,
 *  sortBy: 'name',
 *  order: 'asc'
 * }
 */
export type GetUsersOptions = {
  page?: number
  limit?: number
  sortBy?: keyof User
  order?: 'asc' | 'desc'
}

/**
 * Represents the unique identifier for a user, derived from the UserSchema
 * Useful for referencing users by ID
 * @see {@link UserSchema} for the source schema
 * @example
 * const userId: UserId = '1'
 */
export type UserId = z.infer<typeof UserSchema.shape.id>

/**
 * Represents the data required to create a new user
 * @see {@link CreateUserSchema} for validation details
 * @example
 * const newUser: CreateUser = {
 *  name: 'Jane Doe',
 *  email: 'jane.doe@example.com',
 *  age: 25
 * }
 */
export type CreateUser = z.infer<typeof CreateUserSchema>

/**
 * Represents the data that can be updated for an existing user
 * All fields are optional
 * @see {@link UpdateUserSchema} for validation details
 * @example
 * const updateUser: UpdateUser = {
 *  name: 'Jane Smith'
 * }
 */
export type UpdateUser = z.infer<typeof UpdateUserSchema>
