import { z } from 'zod'
import { Result, err, ok } from './result'

type ApiFetchConfig<T> = {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
  schema: z.ZodType<T>
  errorContext: string
}

/**
 * Wrapper around fetch with common error handling and validation
 * @template T - The expected response data type
 * @param config - Configuration object with url, method, body, headers, schema, and errorContext
 * @returns Ok with data or Err with error message
 * @example
 * apiFetch({
 *   url: '/api/users/1',
 *   method: 'GET',
 *   schema: UserSchema,
 *   errorContext: 'Error fetching user'
 * })
 */
export async function apiFetch<T>(
  config: ApiFetchConfig<T>,
): Promise<Result<T, string>> {
  const {
    url,
    method = 'GET',
    body,
    headers = {},
    schema,
    errorContext,
  } = config

  try {
    // Make the HTTP request
    const res = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...headers, // Custom headers if present
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    // Handle HTTP errors
    if (!res.ok) {
      return err(`${errorContext}: ${res.status} ${res.statusText}`)
    }

    // Parse and validate response
    const data = await res.json()
    const validated = schema.safeParse(data)

    // Return validated data or error
    return validated.success
      ? ok(validated.data)
      : err(`${errorContext}: ${validated.error.message}`)

    // Catch network or other errors
  } catch (error) {
    return err(
      error instanceof Error
        ? `${errorContext}: ${error.message}`
        : errorContext,
    )
  }
}
