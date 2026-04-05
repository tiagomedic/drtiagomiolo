import { WeekContent } from '@/lib/types'
import { getPilarColor, getPilarTextColor } from '@/lib/calendar'

interface MetricsBarProps {
  week: WeekContent
  publishedCount: number
  nextPilar: string
}

function MetricCard({
  label,
  value,
  suffix,
  link,
  linkLabel,
  highlight,
}: {
  label: string
  value: string | number | null
  suffix?: string
  link?: string
  linkLabel?: string
  highlight?: { color: string; bg: string }
}) {
  return (
    <div className="bg-[#18181f] border border-[#2d2d3a] rounded-xl px-4 py-3 flex flex-col gap-1 min-w-0">
      <span className="text-[#64748b] text-xs font-medium truncate">{label}</span>
      <div className="flex items-baseline gap-1.5">
        {value === null ? (
          <div className="flex items-center gap-2">
            <span className="text-[#475569] text-lg font-semibold">—</span>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {linkLabel || 'Atualizar'}
              </a>
            )}
          </div>
        ) : highlight ? (
          <span
            className="text-sm font-bold px-2 py-0.5 rounded-full"
            style={{ color: highlight.color, backgroundColor: highlight.bg }}
          >
            {value}
          </span>
        ) : (
          <>
            <span className="text-[#e2e8f0] text-lg font-semibold">
              {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
            </span>
            {suffix && <span className="text-[#64748b] text-xs">{suffix}</span>}
          </>
        )}
      </div>
    </div>
  )
}

export default function MetricsBar({ week, publishedCount, nextPilar }: MetricsBarProps) {
  const NEXT_PILAR_COLORS: Record<string, { color: string; bg: string }> = {
    CONSTRUTOR: { color: '#6366f1', bg: '#6366f120' },
    'VISIONÁRIO': { color: '#0ea5e9', bg: '#0ea5e920' },
    GESTOR: { color: '#10b981', bg: '#10b98120' },
    'CIRURGIÃO': { color: '#f59e0b', bg: '#f59e0b20' },
  }

  const nextColors = NEXT_PILAR_COLORS[nextPilar] || NEXT_PILAR_COLORS.CONSTRUTOR

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      <MetricCard
        label="Beehiiv Assinantes"
        value={week.metrics.beehiiv_subscribers}
        link="https://app.beehiiv.com"
        linkLabel="Atualizar"
      />
      <MetricCard
        label="Taxa de Abertura"
        value={
          week.metrics.beehiiv_open_rate !== null
            ? week.metrics.beehiiv_open_rate
            : null
        }
        suffix="%"
        link="https://app.beehiiv.com"
        linkLabel="Ver"
      />
      <MetricCard
        label="LinkedIn Impressões"
        value={week.metrics.linkedin_impressions}
        link="https://www.linkedin.com/analytics/"
        linkLabel="Ver"
      />
      <MetricCard
        label="Semanas Publicadas"
        value={publishedCount}
      />
      <MetricCard
        label="Proximo Pilar"
        value={nextPilar}
        highlight={nextColors}
      />
    </div>
  )
}
