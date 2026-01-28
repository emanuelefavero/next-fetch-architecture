// =================== ANIMATION CONFIG ===================

/**
 * Configuration for fade-in-up animation
 */
export const animation = {
  className: /*tw*/ 'motion-safe:animate-fade-in-up', // Tailwind CSS class

  staggerSpeeds: {
    slow: 100,
    medium: 50,
    fast: 25,
  }, // Stagger speeds in milliseconds
} as const

// ================== TYPES ===================

/**
 * Type for stagger speed keys
 */
export type StaggerSpeed = keyof typeof animation.staggerSpeeds

// ================== UTILS ===================

/**
 * Calculate stagger delay based on index and speed
 * @param index The index of the element in the stagger sequence
 * @param speed The speed of the stagger effect (default: 'medium')
 * @returns The calculated delay in milliseconds as a string
 */
export const getStaggerDelay = (
  index: number,
  speed: StaggerSpeed = 'medium',
): string => `${index * animation.staggerSpeeds[speed]}ms`
