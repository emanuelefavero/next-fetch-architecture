import { revalidateTag } from 'next/cache'

// =================== PRIVATE CACHE HELPERS ====================

// Cache tags
const tags = {
  users: 'users',
  user: 'user', // ? used as prefix
}

// Cache life profiles
const profiles = {
  minutes: { stale: 300, revalidate: 60, expire: 3600 }, // 5min/1min/1hr
  hours: { stale: 300, revalidate: 3600, expire: 86400 }, // 5min/1hr/24hr
  days: { stale: 300, revalidate: 86400, expire: 604800 }, // 5min/1day/1week
}

// Helper for building user tags
const buildUserTag = (id: string) => `${tags.user}:${id}`

// =================== CACHE CONFIG ===================

/**
 * Cache configuration for users feature
 */
export const cache = {
  users: {
    tag: tags.users,
    life: profiles.hours,
  },
  user: {
    tag: buildUserTag,
    life: profiles.minutes,
  },
}

// =================== CACHE REVALIDATION ====================

/**
 * Cache revalidation functions
 */
export const revalidate = {
  users: () => revalidateTag(tags.users, { expire: 0 }),
  user: (id: string) => revalidateTag(buildUserTag(id), { expire: 0 }),
}
