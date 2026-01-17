import { z } from 'zod'
import { Result, err, ok } from './result'

/**
 * Wrapper around fetch that adds Zod schema validation to responses
 * Mirrors native fetch API signature with additional response configuration
 * @template T - The expected response data type
 * @param url - The URL to fetch (same as fetch API)
 * @param init - Request options (same as fetch API RequestInit)
 * @param response - Response handling configuration
 * @param response.schema - Zod schema for runtime validation of response
 * @param response.error - Error message context (e.g., "Error fetching user")
 * @returns Promise<Result<T, string>>
 * @example
 * fetchWithSchema(
 *   '/api/users/1',
 *   { method: 'GET', headers: { Accept: 'application/json' } },
 *   {
 *     schema: UserSchema,
 *     error: 'Error fetching user'
 *   }
 * )
 */
export async function fetchWithSchema<T>(
  url: string,
  init: RequestInit,
  response: {
    schema: z.ZodType<T>
    error: string
  },
): Promise<Result<T, string>> {
  try {
    const res = await fetch(url, init)

    if (!res.ok) {
      return err(`${response.error}: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    const validated = response.schema.safeParse(data)

    return validated.success
      ? ok(validated.data)
      : err(`${response.error}: ${validated.error.message}`)
  } catch (error) {
    return err(
      error instanceof Error
        ? `${response.error}: ${error.message}`
        : response.error,
    )
  }
}
