import { cn } from '@/lib/utils'

type BodyProps = React.ComponentProps<'body'>

export function Body({ children, className, ...props }: BodyProps) {
  return (
    <body
      className={cn(
        'bg-background text-foreground', // Colors
        'font-sans antialiased', // Font styles
        'mx-auto w-full max-w-screen-2xl', // Center content and limit max width
        'max-3xs:origin-top-center max-3xs:min-w-67.5 max-3xs:transform-[scale(calc(100vw/320))]', // Scale down on very small screens
        className,
      )}
      {...props}
    >
      {children}
    </body>
  )
}
