'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type UsersListLayoutProps = {
  children: ReactNode
  isPending?: boolean
}

/**
 * Layout container for users grid
 * Handles responsive grid and loading state transitions
 */
export function UsersListLayout({
  children,
  isPending = false,
}: UsersListLayoutProps) {
  return (
    <div
      className={cn(
        'grid auto-cols-fr gap-4 *:min-w-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6',
        isPending &&
          'pointer-events-none opacity-50 blur-xs transition-all duration-700',
      )}
    >
      {children}
    </div>
  )
}
