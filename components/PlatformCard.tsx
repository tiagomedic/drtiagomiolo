'use client'

import { useState } from 'react'
import { Pilar } from '@/lib/types'
import { getPilarColor, getPilarGradient } from '@/lib/calendar'
import CopyButton from './CopyButton'
import HybridAdjustPanel from './HybridAdjustPanel'

interface PlatformCardProps {
  platform: 'Newsletter' | 'LinkedIn' | 'Instagram' | 'X'
  pilar: Pilar
  week: number
  status: 'planned' | 'generating' | 'ready' | 'published'
  children: React.ReactNode
  copyText: string
  openUrl: string
  extraInfo?: React.ReactNode
  onContentUpdate?: (newContent: string) => void
}

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  Newsletter: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M1 5.5L8 9.5L15 5.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  ),
  LinkedIn: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.5 1H2.5A1.5 1.5 0 001 2.5v11A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0013.5 1zM5.5 13H3.5V6.5h2V13zm-1-7.5a1 1 0 110-2 1 1 0 010 2zm9 7.5h-2V9.75C11.5 8.5 10.25 8.5 10 9.5V13H8V6.5h2V7.5c.5-1 3.5-1 3.5 2.25V13z" />
    </svg>
  ),
  Instagram: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="11.5" cy="4.5" r="0.75" fill="currentColor" />
    </svg>
  ),
  X: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.23 1.5H14.46L9.55 7.14L15.33 14.5H10.79L7.16 9.77L3 14.5H0.77L6.02 8.45L0.5 1.5H5.16L8.45 5.83L12.23 1.5ZM11.46 13.1H12.69L4.43 2.76H3.1L11.46 13.1Z" />
    </svg>
  ),
}

const PLATFORM_COLORS: Record<string, string> = {
  Newsletter: '#f97316',
  LinkedIn: '#0a66c2',
  Instagram: '#e1306c',
  X: '#e2e8f0',
}

const OPEN_URLS: Record<string, string> = {
  Newsletter: 'https://app.beehiiv.com',
  LinkedIn: 'https://www.linkedin.com/feed/',
  Instagram: 'https://www.instagram.com/',
  X: 'https://twitter.com/compose/tweet',
}

export default function PlatformCard({
  platform,
  pilar,
  week,
  status,
  children,
  copyText,
  openUrl,
  extraInfo,
  onContentUpdate,
}: PlatformCardProps) {
  const [adjusting, setAdjusting] = useState(false)
  const pilarColor = getPilarColor(pilar)
  const platformColor = PLATFORM_COLORS[platform]

  const isGenerating = status === 'generating'
  const isPlanned = status === 'planned'

  return (
    <div className="platform-card bg-[#18181f] border border-[#2d2d3a] rounded-2xl overflow-hidden flex flex-col">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#2d2d3a]">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${platformColor}15`, color: platformColor }}
          >
            {PLATFORM_ICONS[platform]}
          </div>
          <span className="font-semibold text-[#e2e8f0] text-sm">{platform}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Status chip */}
          {isGenerating && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-900/20 border border-amber-500/30 px-2 py-1 rounded-full">
              <svg className="animate-spin w-3 h-3" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="10 5" />
              </svg>
              Gerando...
            </span>
          )}
          {isPlanned && (
            <span className="text-xs font-medium text-[#475569] bg-[#0f0f13] border border-[#2d2d3a] px-2 py-1 rounded-full">
              Planejado
            </span>
          )}
          {status === 'ready' && (
            <span className="text-xs font-medium text-emerald-400 bg-emerald-900/20 border border-emerald-500/30 px-2 py-1 rounded-full">
              Pronto
            </span>
          )}
          {status === 'published' && (
            <span className="text-xs font-medium text-indigo-400 bg-indigo-900/20 border border-indigo-500/30 px-2 py-1 rounded-full">
              Publicado
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="flex-1 p-5">
        {isGenerating ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-3 bg-[#2d2d3a] rounded-full w-3/4" />
            <div className="h-3 bg-[#2d2d3a] rounded-full w-full" />
            <div className="h-3 bg-[#2d2d3a] rounded-full w-5/6" />
            <div className="h-3 bg-[#2d2d3a] rounded-full w-2/3" />
            <div className="h-3 bg-[#2d2d3a] rounded-full w-4/5" />
          </div>
        ) : isPlanned ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#0f0f13] border border-[#2d2d3a] flex items-center justify-center mb-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#475569]">
                <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.25" />
                <path d="M10 6V10.5L13 12.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-[#64748b] text-sm">Conteudo ainda nao gerado</p>
            <p className="text-[#475569] text-xs mt-1">Rode o squad para gerar este conteudo</p>
          </div>
        ) : (
          <div className="space-y-4">
            {children}
            {extraInfo && <div>{extraInfo}</div>}
          </div>
        )}
      </div>

      {/* Card footer actions */}
      {!isGenerating && !isPlanned && (
        <div className="px-5 pb-4 space-y-3">
          {/* Adjust panel */}
          {adjusting && (
            <HybridAdjustPanel
              week={week}
              platform={platform.toLowerCase()}
              currentContent={copyText}
              onSave={(newContent) => {
                onContentUpdate?.(newContent)
                setAdjusting(false)
              }}
              onClose={() => setAdjusting(false)}
            />
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-[#2d2d3a]">
            <div className="flex items-center gap-3">
              <CopyButton text={copyText} label={platform} />
              <button
                onClick={() => window.open(OPEN_URLS[platform] || openUrl, '_blank')}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748b] hover:text-[#e2e8f0] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M6 2H2.5C1.67 2 1 2.67 1 3.5V11.5C1 12.33 1.67 13 2.5 13H10.5C11.33 13 12 12.33 12 11.5V8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                  <path d="M8 1H13V6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13 1L6.5 7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
                Abrir
              </button>
            </div>

            <button
              onClick={() => setAdjusting(!adjusting)}
              className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                adjusting
                  ? 'text-indigo-400'
                  : 'text-[#64748b] hover:text-[#e2e8f0]'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 1L13 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                <path d="M9 1L2 8L1 13L6 12L13 5L9 1Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
              </svg>
              {adjusting ? 'Fechar' : 'Ajustar'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
