import { UsersLoader } from '@/features/users/components/users-loader'
import type { SearchParams } from '@/types/routing'
import { Suspense } from 'react'

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
