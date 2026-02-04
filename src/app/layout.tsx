import { Body } from '@/components/layout/body'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { metadata as appMetadata } from '@/config/metadata'
import { ThemeProvider } from '@/features/theme/components/theme-provider'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  ...appMetadata,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <Body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Main>{children}</Main>
        </ThemeProvider>
      </Body>
    </html>
  )
}
