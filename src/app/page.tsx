import { UsersLoader } from '@/features/users/components/users-loader'
import { Suspense } from 'react'
import type { SearchParams } from '@/types/routing'

type PageProps = {
  searchParams: Promise<SearchParams>
}

export default function Home({ searchParams }: PageProps) {
  return (
    <>
      <Suspense fallback={<div>Loading users...</div>}>
        <UsersLoader searchParams={searchParams} />
      </Suspense>
    </>
  )
}
