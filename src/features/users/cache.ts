import { revalidateTag } from 'next/cache'
import type { UserId } from './types'

// =================== CACHE CONFIG ===================

/**
 * Cache configuration for users feature
 */
export const cache = {
  users: {
    tag: 'users',
    life: 'hours',
  },
  user: {
    tag: (id: UserId) => `user:${id}`,
    life: 'minutes',
  },
} as const

// =================== CACHE REVALIDATION ====================

/**
 * Cache revalidation functions
 */
export const revalidate = {
  users: (): void => revalidateTag(cache.users.tag, { expire: 0 }),
  user: (id: UserId): void => revalidateTag(cache.user.tag(id), { expire: 0 }),
} as const
