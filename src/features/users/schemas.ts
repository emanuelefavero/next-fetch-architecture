import { z } from 'zod'

/**
 * Zod schema for validating a complete user entity
 * @see {@link User} for the corresponding TypeScript type
 * @example
 * const validUser = UserSchema.parse({
 *  id: '1',
 *  createdAt: '2026-01-01T00:00:00Z',
 *  name: 'John Doe',
 *  email: 'john.doe@example.com',
 *  age: 30
 * })
 */
export const UserSchema = z.object({
  // Unique identifier for the user
  id: z.string(),

  // ISO 8601 formatted creation date
  createdAt: z.iso.datetime(),

  // Full name: trimmed, 1-100 chars, letters, spaces, numbers, hyphens, apostrophes, and periods
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be at most 100 characters')
    .regex(
      /^[a-zA-Z0-9\s\-'.]+$/,
      'Name must contain only letters, numbers, spaces, hyphens, apostrophes, and periods',
    ),

  // Email address: ensures valid email format
  email: z.email({ message: 'Invalid email address' }),

  // Age: integer between 0 and 150
  age: z
    .number()
    .int()
    .min(0, 'Age must be at least 0')
    .max(150, 'Age must be at most 150'),
})

/**
 * Zod schema for validating an array of users
 * @see {@link Users} for the corresponding TypeScript type
 * @example
 * const users = UsersSchema.parse([
 *  { id: '1', createdAt: '2026-01-01T00:00:00Z', name: 'John Doe', email: 'john.doe@example.com', age: 30 }
 * ])
 */
export const UsersSchema = z.array(UserSchema)

/**
 * Zod schema for validating data required to create a new user
 * @see {@link CreateUser} for the corresponding TypeScript type
 * @example
 * const newUser = CreateUserSchema.parse({
 *  name: 'Jane Doe',
 *  email: 'jane.doe@example.com',
 *  age: 25
 * })
 */
export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
})

/**
 * Zod schema for validating data that can be updated for an existing user
 * All fields are optional
 * @see {@link UpdateUser} for the corresponding TypeScript type
 * @example
 * const updateUser = UpdateUserSchema.parse({
 *  name: 'Jane Smith'
 * })
 */
export const UpdateUserSchema = CreateUserSchema.partial()
