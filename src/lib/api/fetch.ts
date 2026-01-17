import { z } from 'zod'
import { Result, err, ok } from './result'

/**
 * Wrapper around fetch that adds Zod schema validation to responses
 * Mirrors native fetch API signature with additional schema and error context parameters
 * @template T - The expected response data type
 * @param url - The URL to fetch (same as fetch API)
 * @param init - Request options (same as fetch API RequestInit)
 * @param schema - Zod schema for runtime validation of response
 * @param errorContext - Error message context (e.g., "Error fetching user")
 * @returns Promise<Result<T, string>>
 * @example
 * fetchWithSchema(
 *   '/api/users/1',
 *   { method: 'GET', headers: { Accept: 'application/json' } },
 *   UserSchema,
 *   'Error fetching user'
 * )
 */
export async function fetchWithSchema<T>(
  url: string,
  init: RequestInit,
  schema: z.ZodType<T>,
  errorContext: string,
): Promise<Result<T, string>> {
  try {
    const res = await fetch(url, init)

    if (!res.ok) {
      return err(`${errorContext}: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    const validated = schema.safeParse(data)

    return validated.success
      ? ok(validated.data)
      : err(`${errorContext}: ${validated.error.message}`)
  } catch (error) {
    return err(
      error instanceof Error
        ? `${errorContext}: ${error.message}`
        : errorContext,
    )
  }
}
