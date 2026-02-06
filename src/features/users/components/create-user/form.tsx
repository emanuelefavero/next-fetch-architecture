'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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

  const form = useForm<CreateUser>({
    resolver: zodResolver(CreateUserSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      age: 1,
    },
  })

  async function onSubmit(data: CreateUser) {
    setIsSubmitting(true)
    setSubmitError(null)

    const result = await createUserAction(data)

    if (!result.ok) {
      setSubmitError(result.error)
      setIsSubmitting(false)
      return
    }

    // Success: reset form
    form.reset()
    setIsSubmitting(false)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='mb-8 rounded-lg border border-border bg-card p-6 shadow-sm'
    >
      <h2 className='mb-6 text-lg font-semibold'>Create New User</h2>

      <div className='space-y-4'>
        {/* Name Field */}
        <Controller
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Name</FieldLabel>
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
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
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
              <FieldLabel htmlFor={field.name}>Age</FieldLabel>
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

      {/* Server Error */}
      {submitError && (
        <div
          role='alert'
          className='mt-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive'
        >
          {submitError}
        </div>
      )}

      {/* Form Actions */}
      <div className='mt-6 flex gap-3'>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create User'}
        </Button>
        <Button
          type='button'
          variant='outline'
          onClick={() => {
            form.reset()
            setSubmitError(null)
          }}
          disabled={isSubmitting}
        >
          Reset
        </Button>
      </div>
    </form>
  )
}
