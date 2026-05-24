import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/components/providers/QueryProvider'

export const metadata: Metadata = {
  title: 'PRISM AI — AI GitHub PR Review',
  description:
    'AI-powered pull request reviews with security, performance, and architecture analysis.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-prism-bg text-white antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
