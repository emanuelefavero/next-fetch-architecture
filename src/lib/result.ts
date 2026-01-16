/**
 * Result type representing either a success with data of type T
 * or an error with error information of type E (defaulting to string)
 * @template T - Type of the successful result data
 * @template E - Type of the error information (default: string)
 * @example
 * const successResult: Result<number> = { ok: true, data: 42 }
 * const errorResult: Result<never, Error> = { ok: false, error: new Error('Something went wrong') }
 */
export type Result<T, E = string> =
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
export function err<E = string>(error: E): Result<never, E> {
  return { ok: false, error }
}
