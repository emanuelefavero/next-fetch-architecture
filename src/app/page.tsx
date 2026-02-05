import { TypographyH1 } from '@/components/typography/h1'
import CreateUserForm from '@/features/users/components/create-user/form'
import { UsersLoader } from '@/features/users/components/users-list/loader'
import { UsersListSkeleton } from '@/features/users/components/users-list/skeleton'
import type { SearchParams } from '@/types/routing'
import { Suspense } from 'react'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default function Home({ searchParams }: PageProps) {
  return (
    <>
      <TypographyH1>Users</TypographyH1>

      <CreateUserForm />

      <Suspense fallback={<UsersListSkeleton />}>
        <UsersLoader searchParams={searchParams} />
      </Suspense>
    </>
  )
}
