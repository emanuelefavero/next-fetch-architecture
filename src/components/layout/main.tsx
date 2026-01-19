import { cn } from '@/lib/utils'

type MainProps = React.ComponentProps<'main'>

export function Main({ children, className, ...props }: MainProps) {
  return (
    <main className={cn('px-4 py-3', className)} {...props}>
      {children}
    </main>
  )
}
