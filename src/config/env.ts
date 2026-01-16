/**
 * @fileoverview Environment config and constants.
 */

type NodeEnv = 'development' | 'production' | 'test'

// Internal (Not Exported)
const NODE_ENV: NodeEnv = (process.env.NODE_ENV as NodeEnv) || 'development'
const MOCK_API_SECRET = process.env.MOCK_API_SECRET || ''

// Public (Exported)
export const isDev = NODE_ENV === 'development'
export const isProd = NODE_ENV === 'production'
export const isTest = NODE_ENV === 'test'
export const API_BASE_URL = `https://${MOCK_API_SECRET}.mockapi.io/users`

// Side Effects (Initialization)
if (!MOCK_API_SECRET && (isDev || isTest)) {
  console.warn(
    'Warning: MOCK_API_SECRET is not set. Please set it in your environment variables.'
  )
}
