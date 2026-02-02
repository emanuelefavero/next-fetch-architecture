import { buildPaginationUrl } from '@/lib/api/utils'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Hook for prefetching adjacent pages in a paginated list
 *
 * Automatically prefetches next page and previous page (if available)
 * when the component mounts or when currentPage changes.
 * Improves perceived performance by warming Next.js router cache.
 *
 * @param currentPage - The current page number
 * @example
 * usePaginationPrefetch(2) // Prefetches pages 1 and 3
 */
export function usePaginationPrefetch(currentPage: number) {
  const router = useRouter()

  useEffect(() => {
    // Prefetch next page
    const nextPageUrl = buildPaginationUrl(currentPage + 1)
    router.prefetch(nextPageUrl)

    // Prefetch previous page if it exists
    if (currentPage > 1) {
      const prevPageUrl = buildPaginationUrl(currentPage - 1)
      router.prefetch(prevPageUrl)
    }
  }, [currentPage, router])
}
