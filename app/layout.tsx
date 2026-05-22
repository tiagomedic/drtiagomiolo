import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dr. Tiago Miolo — Cirurgia Plástica & IA na Saúde',
  description:
    'Cirurgião plástico, coordenador da comissão de IA da SBCP e fundador da Prevvine — única healthtech IA no Sandbox Regulatório da ANPD.',
  openGraph: {
    title: 'Dr. Tiago Miolo',
    description: 'Medicina, Tecnologia e Inovação.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  )
}
