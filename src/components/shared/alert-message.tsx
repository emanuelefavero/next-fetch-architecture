import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

type AlertVariant = React.ComponentProps<typeof Alert>['variant']

type AlertMessageProps = {
  icon?: React.ReactNode
  title: string
  description: string
  variant?: AlertVariant
  className?: string
}

/**
 * A reusable alert component that displays a message with optional icon, title, and description.
 * Wraps the shadcn/ui Alert component for consistent styling and behavior.
 *
 * @param icon - Optional icon (e.g., a Lucide icon component).
 * @param title - The alert title text.
 * @param description - The alert description text.
 * @param variant - The alert variant ('default' or 'destructive')
 *
 * @example
 * <AlertMessage
 *   icon={<InfoIcon />}
 *   title="Information"
 *   description="This is an informational alert."
 *   variant="default"
 * />
 */
export function AlertMessage({
  icon,
  title,
  description,
  variant = 'default',
  className,
}: AlertMessageProps) {
  return (
    <Alert variant={variant} className={cn(className)}>
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
