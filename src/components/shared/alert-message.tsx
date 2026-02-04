import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type AlertVariant = React.ComponentProps<typeof Alert>['variant']

type AlertMessageProps = {
  variant?: AlertVariant
  icon?: React.ReactNode
  title: string
  description: string
}

export function AlertMessage({
  icon,
  title,
  description,
  variant = 'default',
}: AlertMessageProps) {
  return (
    <Alert variant={variant}>
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
