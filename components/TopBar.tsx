import Link from 'next/link'
import { WeekContent } from '@/lib/types'
import { getPilarColor, getPilarTextColor } from '@/lib/calendar'

interface TopBarProps {
  week: WeekContent
}

const PILAR_ICONS: Record<string, string> = {
  'LÍDER':     'L',
  CONSTRUTOR:  'C',
  'VISIONÁRIO': 'V',
  'CIRURGIÃO': 'S',
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  planned: { label: 'Planejado', color: 'text-[#64748b]' },
  generating: { label: 'Gerando...', color: 'text-amber-400' },
  ready: { label: 'Pronto', color: 'text-emerald-400' },
  published: { label: 'Publicado', color: 'text-indigo-400' },
}

function getPlatformsReady(week: WeekContent): number {
  // Count platforms with content
  let count = 0
  if (week.newsletter?.body) count++
  if (week.linkedin?.body) count++
  if (week.instagram?.caption) count++
  if (week.twitter?.thread?.length > 0) count++
  return count
}

export default function TopBar({ week }: TopBarProps) {
  const pilarColor = getPilarColor(week.pilar)
  const pilarTextClass = getPilarTextColor(week.pilar)
  const status = STATUS_LABELS[week.status] || STATUS_LABELS.planned
  const readyCount = getPlatformsReady(week)

  // Format date
  const sendDate = new Date(week.date_send + 'T12:00:00Z')
  const dayName = sendDate.toLocaleDateString('pt-BR', { weekday: 'long', timeZone: 'UTC' })
  const dayNum = sendDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'UTC' })

  return (
    <header className="sticky top-0 z-40 bg-[#0f0f13]/95 backdrop-blur-sm border-b border-[#2d2d3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: brand + week info */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Logo */}
          <Link href="/hub" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-black text-xs">TH</span>
            </div>
            <span className="text-[#e2e8f0] font-bold text-sm hidden sm:block">TiagoHub</span>
          </Link>

          <div className="w-px h-5 bg-[#2d2d3a] hidden sm:block" />

          {/* Week badge */}
          <span className="text-[#64748b] text-sm font-medium">
            Semana{' '}
            <span className="text-[#e2e8f0] font-semibold">
              {String(week.week).padStart(2, '0')}
            </span>
          </span>

          {/* Pilar badge */}
          <div
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{
              backgroundColor: `${pilarColor}20`,
              color: pilarColor,
              border: `1px solid ${pilarColor}40`,
            }}
          >
            <span className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
              style={{ backgroundColor: `${pilarColor}30` }}>
              {PILAR_ICONS[week.pilar]}
            </span>
            {week.pilar}
          </div>
        </div>

        {/* Center: status info */}
        <div className="hidden lg:flex items-center gap-2 text-sm">
          <span
            className={`flex items-center gap-1.5 ${status.color} font-medium`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-50 ${
                week.status === 'generating' ? 'bg-amber-400' :
                week.status === 'ready' ? 'bg-emerald-400' :
                week.status === 'published' ? 'bg-indigo-400' : 'bg-slate-500'
              }`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                week.status === 'generating' ? 'bg-amber-400' :
                week.status === 'ready' ? 'bg-emerald-400' :
                week.status === 'published' ? 'bg-indigo-400' : 'bg-slate-500'
              }`} />
            </span>
            {readyCount} plataformas
          </span>
          <span className="text-[#475569]">·</span>
          <span className="text-[#64748b] capitalize">
            {dayName.charAt(0).toUpperCase() + dayName.slice(1)} {dayNum} · 07:00
          </span>
        </div>

        {/* Right: calendar link */}
        <Link
          href="/hub/calendar"
          className="flex items-center gap-1.5 text-sm text-[#64748b] hover:text-[#e2e8f0] transition-colors font-medium shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
            <path d="M1 5.5H13" stroke="currentColor" strokeWidth="1.25" />
            <path d="M4 1V3.5M10 1V3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:block">Calendário</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="hidden sm:block">
            <path d="M2.5 5H7.5M5.5 3L7.5 5L5.5 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </header>
  )
}
