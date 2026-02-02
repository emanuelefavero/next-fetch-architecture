import { buildPaginationUrl } from '@/lib/api/utils'
import { useRouter } from 'next/navigation'
import { useCallback, useTransition } from 'react'

/**
 * Hook for handling pagination navigation with optimistic UI updates
 *
 * Manages router navigation and transition state for paginated lists.
 * Uses startTransition to provide non-blocking navigation with isPending state.
 *
 * @returns Object containing navigateToPage function and isPending state
 * @example
 * const { navigateToPage, isPending } = usePaginationNavigation()
 * navigateToPage(2) // Navigate to page 2
 */
export function usePaginationNavigation() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const navigateToPage = useCallback(
    (page: number) => {
      startTransition(() => {
        const url = buildPaginationUrl(page)
        router.push(url)
      })
    },
    [router],
  )

  return { navigateToPage, isPending }
}
