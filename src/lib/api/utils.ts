import { QueryOptions } from './types'

/**
 * Builds URLSearchParams from query options
 * @template T - The entity type
 * @param options - Query options to convert
 * @returns URLSearchParams representing the options
 * @example
 * const params = buildQueryParams({ page: 1, limit: 10, sortBy: 'name' })
 * // Returns: URLSearchParams with "page=1&limit=10&sortBy=name"
 */
export function buildQueryParams<T>(
  options?: QueryOptions<T>
): URLSearchParams {
  const params = new URLSearchParams()

  if (!options) return params

  const optionsKeys = Object.keys(options) as (keyof QueryOptions<T>)[]

  optionsKeys.forEach((key) => {
    const value = options[key]
    if (value !== undefined) {
      params.append(key as string, String(value))
    }
  })

  return params
}
