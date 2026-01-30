import { cn } from '@/lib/utils'

type TypographyH1Props = React.ComponentProps<'h1'>

/**
 * Standard H1 heading component
 * Provides consistent typography styling across all pages
 */
export function TypographyH1({
  children,
  className,
  ...props
}: TypographyH1Props) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight text-balance',
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  )
}
