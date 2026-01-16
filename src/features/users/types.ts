import { z } from 'zod'
import {
  UserSchema,
  CreateUserSchema,
  UpdateUserSchema,
  deleteUserParamsSchema,
} from './schemas'

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

/**
 * Represents the parameters required to delete a user
 * @see {@link deleteUserParamsSchema} for validation details
 * @example
 * const params: DeleteUserParams = {
 *  id: '1'
 * }
 */
export type DeleteUserParams = z.infer<typeof deleteUserParamsSchema>
