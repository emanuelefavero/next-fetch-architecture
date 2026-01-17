import { z } from 'zod'
import { Result, err, ok } from './result'

/**
 * Wrapper around fetch that adds Zod schema validation to responses
 * Mirrors native fetch API signature with additional response configuration
 * @template T - The expected response data type
 * @param schema - Zod schema for runtime validation of response
 * @param url - The URL to fetch (same as fetch API)
 * @param init - Request options (same as fetch API RequestInit)
 * @returns A Result containing either validated data of type T or an Error
 * @example
 * fetchData(
 *   UserSchema,
 *   '/api/users/1',
 *   { method: 'GET', headers: { Accept: 'application/json' } }
 * )
 */
export async function fetchData<T>(
  schema: z.ZodType<T>,
  url: string,
  init?: RequestInit,
): Promise<Result<T, Error>> {
  try {
    const res = await fetch(url, init)

    if (!res.ok) {
      return err(new Error(`HTTP ${res.status}: ${res.statusText}`))
    }

    const data = await res.json()
    const validated = schema.safeParse(data)

    return validated.success
      ? ok(validated.data)
      : err(new Error(validated.error.message))
  } catch (error) {
    return err(error instanceof Error ? error : new Error('Unknown error'))
  }
}
