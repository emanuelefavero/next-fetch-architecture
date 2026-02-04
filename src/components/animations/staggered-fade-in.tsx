import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type Speed = 'fast' | 'normal' | 'slow'

type StaggeredFadeInProps = {
  children: ReactNode
  index: number
  disabled?: boolean
  speed?: Speed
  className?: string
}

// Map speed keywords to delay multipliers
const speedMap: Record<Speed, number> = {
  fast: 30,
  normal: 50,
  slow: 70,
} as const

/**
 * Wrapper component that applies staggered fade-in-up animation to its children
 * Useful for list items that should animate in sequence
 *
 * @example
 * ```tsx
 * {items.map((item, i) => (
 *   <StaggeredFadeIn key={item.id} index={i}>
 *     <Card {...item} />
 *   </StaggeredFadeIn>
 * ))}
 * ```
 */
export function StaggeredFadeIn({
  children,
  index = 0,
  disabled = false,
  speed = 'normal',
  className,
}: StaggeredFadeInProps) {
  const delayMs = speedMap[speed]

  return (
    <div
      className={cn(!disabled && 'motion-safe:animate-fade-in-up', className)}
      style={!disabled ? { animationDelay: `${index * delayMs}ms` } : undefined}
    >
      {children}
    </div>
  )
}
