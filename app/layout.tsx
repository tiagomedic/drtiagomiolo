import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const BASE_URL = 'https://drtiagomiolo.vercel.app'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Tiago Miolo — Cirurgia Plástica & IA na Saúde',
    template: '%s | Tiago Miolo',
  },
  description:
    'Cirurgião Plástico especialista pela SBCP, coordenador da Comissão de IA e Tecnologia da SBCP, e fundador da Prevvine — única healthtech de inteligência artificial no Sandbox Regulatório da ANPD. Medicina, tecnologia e inovação em saúde.',
  keywords: [
    'cirurgião plástico',
    'cirurgia plástica',
    'inteligência artificial saúde',
    'IA saúde',
    'Tiago Miolo',
    'SBCP',
    'Prevvine',
    'StaiDoc',
    'healthtech',
    'ANPD sandbox',
    'machine learning medicina',
    'tecnologia médica',
  ],
  authors: [{ name: 'Tiago Miolo', url: BASE_URL }],
  creator: 'Tiago Miolo',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: 'Tiago Miolo — Cirurgia Plástica & IA na Saúde',
    description:
      'Cirurgião Plástico, coordenador da Comissão de IA da SBCP e fundador da Prevvine — única healthtech IA no Sandbox Regulatório da ANPD.',
    url: BASE_URL,
    siteName: 'Tiago Miolo',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/foto-tiago.jpg',
        width: 800,
        height: 1067,
        alt: 'Tiago Miolo — Cirurgião Plástico e Fundador de HealthTechs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tiago Miolo — Cirurgia Plástica & IA na Saúde',
    description:
      'Cirurgião Plástico, coordenador da Comissão de IA da SBCP e fundador da Prevvine.',
    images: ['/foto-tiago.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white`} style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
