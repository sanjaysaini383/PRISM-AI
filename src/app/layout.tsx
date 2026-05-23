import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PRISM AI - AI-Powered Engineering Intelligence Platform',
  description: 'Revolutionize your development workflow with AI-powered code reviews, security analysis, and intelligent insights.',
  openGraph: {
    title: 'PRISM AI',
    description: 'AI-Powered Engineering Intelligence Platform',
    url: 'https://prism-ai.dev',
    siteName: 'PRISM AI',
    images: [
      {
        url: 'https://prism-ai.dev/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRISM AI',
    description: 'AI-Powered Engineering Intelligence Platform',
    images: ['https://prism-ai.dev/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-prism-bg text-white`}>
        {children}
      </body>
    </html>
  )
}
