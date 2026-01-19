import { UsersLoader } from '@/features/users/components/users-loader'
import { Suspense } from 'react'

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default function Home({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<div>Loading users...</div>}>
      <UsersLoader searchParams={searchParams} />
    </Suspense>
  )
}
