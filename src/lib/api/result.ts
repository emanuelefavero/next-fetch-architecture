/**
 * Result type representing either a success with data of type T
 * or an error with error information of type E (defaulting to Error)
 * @template T - Type of the successful result data
 * @template E - Type of the error information (default: Error)
 * @example
 * const successResult: Result<number> = { ok: true, data: 42 }
 * const errorResult: Result<never, Error> = { ok: false, error: new Error('Something went wrong') }
 */
export type Result<T, E = Error> =
  | { ok: true; data: T }
  | { ok: false; error: E }

/**
 * Creates a successful Result object
 * @param data - The successful result data
 * @returns A Result object representing success
 */
export function ok<T>(data: T): Result<T, never> {
  return { ok: true, data }
}

/**
 * Creates an error Result object
 * @param error - The error information
 * @returns A Result object representing an error
 */
export function err<E = Error>(error: E): Result<never, E> {
  return { ok: false, error }
}

/**
 * Unwraps a Result, returning the data on success or throwing the error on failure.
 * Useful for converting Result to exceptions in framework boundaries (e.g., Next.js cache/actions).
 * @param result - The Result to unwrap
 * @returns The successful data
 * @throws The error if the Result is an error
 * @example
 * const data = unwrapResult(getUsers())  // Throws if error, returns data if success
 */
export function unwrapResult<T, E = Error>(result: Result<T, E>): T {
  if (result.ok) {
    return result.data
  }
  throw result.error // Throw the error for exception-based handling (e.g., in cache/actions)
}

/**
 * Pattern match on Result type for exhaustive handling
 * Pure function that branches on success/error without throwing
 * @param result - The Result to match on
 * @param handlers - Object with ok and err handler functions
 * @returns The return value from the matched handler
 * @example
 * match(result, {
 *   ok: (users) => <UsersList users={users} />,
 *   err: (error) => <Alert variant='destructive'>
 *    <AlertTitle>Error</AlertTitle>
 *    <AlertDescription>{error.message}</AlertDescription>
 *   </Alert>
 * })
 */
export function match<T, E, R>(
  result: Result<T, E>,
  handlers: {
    ok: (data: T) => R
    err: (error: E) => R
  },
): R {
  return result.ok ? handlers.ok(result.data) : handlers.err(result.error)
}
