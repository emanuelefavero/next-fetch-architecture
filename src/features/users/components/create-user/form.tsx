'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { createUserAction } from '@/features/users/actions'
import { CreateUserSchema } from '@/features/users/schemas'
import type { CreateUser } from '@/features/users/types'

export default function CreateUserForm() {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [undoData, setUndoData] = useState<CreateUser | null>(null)

  // Define default form values
  const defaultValues: CreateUser = {
    name: '',
    email: '',
    age: 30,
  }

  // Initialize react-hook-form with zod validation and default values
  const form = useForm<CreateUser>({
    resolver: zodResolver(CreateUserSchema),
    mode: 'onChange',
    defaultValues,
  })

  const handleReset = () => {
    // Backup current values before resetting
    const currentValues = form.getValues()
    setUndoData(currentValues)

    // Reset form to original default values and clear any submit errors
    form.reset(defaultValues)
    setSubmitError(null)
  }

  const handleUndo = () => {
    if (!undoData) return

    // Restore form to backed-up values and clear undo data
    form.reset(undoData)
    setUndoData(null)
  }

  const onSubmit = async (data: CreateUser) => {
    setIsSubmitting(true)
    setSubmitError(null)

    const result = await createUserAction(data)

    if (!result.ok) {
      setSubmitError(result.error)
      setIsSubmitting(false)
      return
    }

    // Success: reset form to original defaults
    form.reset(defaultValues)
    setIsSubmitting(false)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm'
    >
      <h2 className='text-lg font-semibold'>Create New User</h2>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
        {/* Name Field */}
        <Controller
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Name{' '}
                {fieldState.isDirty && !fieldState.invalid && (
                  <CheckIcon
                    className='inline-block h-4 w-4 text-green-600 dark:text-green-400'
                    aria-hidden='true'
                  />
                )}
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder='John Doe'
                autoComplete='name'
              />
              {!fieldState.invalid && (
                <FieldDescription>
                  Full user name (1-100 chars)
                </FieldDescription>
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Email Field */}
        <Controller
          name='email'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Email{' '}
                {fieldState.isDirty && !fieldState.invalid && (
                  <CheckIcon
                    className='inline-block h-4 w-4 text-green-600 dark:text-green-400'
                    aria-hidden='true'
                  />
                )}
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type='email'
                aria-invalid={fieldState.invalid}
                placeholder='john.doe@example.com'
                autoComplete='email'
              />
              {!fieldState.invalid && (
                <FieldDescription>Valid email address</FieldDescription>
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Age Field */}
        <Controller
          name='age'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Age{' '}
                {!fieldState.invalid && (
                  <CheckIcon
                    className='inline-block h-4 w-4 text-green-600 dark:text-green-400'
                    aria-hidden='true'
                  />
                )}
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type='number'
                inputMode='numeric'
                pattern='[0-9]*'
                aria-invalid={fieldState.invalid}
                placeholder='Enter age (1-99)'
                min={1}
                max={99}
                onChange={(e) => {
                  const value = e.target.valueAsNumber
                  field.onChange(isNaN(value) ? 1 : value)
                }}
              />
              {!fieldState.invalid && (
                <FieldDescription>Age (1-99 years)</FieldDescription>
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      {/* Bottom Section: Error and Actions */}
      <div className='flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between'>
        {/* Error Section: Reserve space on desktop */}
        <div className='min-h-5 flex-1'>
          {submitError && (
            <div role='alert' className='text-sm text-destructive'>
              {submitError}
            </div>
          )}
        </div>

        {/* Actions Section: Right-aligned */}
        <div className='flex gap-3 md:justify-end'>
          {/* Create User Button (Submit) */}
          <Button
            type='submit'
            variant={
              submitError && !form.formState.isValid ? 'destructive' : 'default'
            }
            disabled={isSubmitting || !form.formState.isValid}
          >
            {isSubmitting ? 'Creating...' : 'Create User'}
          </Button>

          {/* Reset/Undo buttons */}
          {undoData && !form.formState.isDirty ? (
            <Button
              type='button'
              variant='outline'
              onClick={handleUndo}
              disabled={isSubmitting}
              className='min-w-18'
            >
              Undo
            </Button>
          ) : (
            <Button
              type='button'
              variant='secondary'
              onClick={handleReset}
              disabled={isSubmitting || !form.formState.isDirty}
              className='min-w-18'
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}
