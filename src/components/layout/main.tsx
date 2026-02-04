import { cn } from '@/lib/utils'

type MainProps = React.ComponentProps<'main'>

export function Main({ children, className, ...props }: MainProps) {
  return (
    <main className={cn('min-w-0 space-y-6 px-4 py-6', className)} {...props}>
      {children}
    </main>
  )
}
