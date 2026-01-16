import { GetUsersOptionsSchema } from './schemas'
import { GetUsersOptions } from './types'

/**
 * Validates GetUsersOptions using Zod schema
 * @param options - Options to validate
 * @returns Result of validation
 */
export function validateQueryOptions(options?: GetUsersOptions) {
  return GetUsersOptionsSchema.safeParse(options)
}

/**
 * Builds URLSearchParams from GetUsersOptions
 * @param options - Options for fetching users
 * @returns URLSearchParams representing the options
 */
export function buildQueryParams(options?: GetUsersOptions): URLSearchParams {
  const params = new URLSearchParams()

  if (!options) return params

  const optionsKeys = Object.keys(options) as (keyof GetUsersOptions)[]

  optionsKeys.forEach((key) => {
    const value = options[key]
    if (value !== undefined) {
      params.append(key, String(value))
    }
  })

  return params
}
