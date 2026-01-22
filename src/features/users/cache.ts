import { revalidateTag } from 'next/cache'

// Single source of truth for user cache tag
export const USERS_CACHE_TAG = 'users'

// Profile for user cache life (immutable object)
export const USERS_CACHE_LIFE = 'hours'

// Side-effect function for revalidation (isolated to boundary)
export function revalidateUsersCache(): void {
  revalidateTag(USERS_CACHE_TAG, { expire: 0 })
}
