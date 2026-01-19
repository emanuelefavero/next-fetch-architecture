import type { ThemeOption } from './types'

/**
 * Available theme options for the application
 */
export const themes = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
] as const satisfies ThemeOption[]
