import { buildPaginationUrl } from '@/lib/api/utils'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Hook for prefetching the next page in a paginated list
 *
 * Automatically prefetches the next page when the component mounts
 * or when currentPage changes, improving perceived performance.
 *
 * @param currentPage - The current page number
 * @example
 * usePrefetchNextPage(1) // Prefetches page 2
 */
export function usePrefetchNextPage(currentPage: number) {
  const router = useRouter()

  useEffect(() => {
    const nextPageUrl = buildPaginationUrl(currentPage + 1)
    router.prefetch(nextPageUrl)
  }, [currentPage, router])
}
