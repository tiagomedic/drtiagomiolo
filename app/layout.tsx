import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TiagoHub',
  description: 'Content Operations Dashboard',
  robots: 'noindex, nofollow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0f0f13] text-[#e2e8f0] min-h-screen">
        {children}
      </body>
    </html>
  )
}
