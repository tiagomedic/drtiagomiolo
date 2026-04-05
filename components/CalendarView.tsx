'use client'

import Link from 'next/link'
import { CalendarWeek } from '@/lib/types'
import { getPilarColor, getMonthName } from '@/lib/calendar'

interface CalendarViewProps {
  weeks: CalendarWeek[]
  currentWeek?: number
}

const STATUS_DOTS: Record<string, string> = {
  planned: 'bg-[#475569]',
  generating: 'bg-amber-400',
  ready: 'bg-emerald-400',
  published: 'bg-indigo-400',
}

const STATUS_LABELS: Record<string, string> = {
  planned: 'Planejado',
  generating: 'Gerando',
  ready: 'Pronto',
  published: 'Publicado',
}

export default function CalendarView({ weeks, currentWeek }: CalendarViewProps) {
  // Group weeks by month
  const monthGroups: Record<string, CalendarWeek[]> = {}

  for (const week of weeks) {
    const monthKey = getMonthName(week.date_send)
    if (!monthGroups[monthKey]) monthGroups[monthKey] = []
    monthGroups[monthKey].push(week)
  }

  return (
    <div className="space-y-8">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 items-center">
        <span className="text-xs text-[#64748b] font-medium uppercase tracking-wide">Status:</span>
        {Object.entries(STATUS_LABELS).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${STATUS_DOTS[key]}`} />
            <span className="text-xs text-[#64748b]">{label}</span>
          </div>
        ))}
      </div>

      {/* Month groups */}
      {Object.entries(monthGroups).map(([month, monthWeeks]) => (
        <div key={month}>
          <h3 className="text-sm font-semibold text-[#64748b] uppercase tracking-widest mb-3 capitalize">
            {month}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
            {monthWeeks.map((week) => {
              const pilarColor = getPilarColor(week.pilar)
              const isCurrentWeek = week.week === currentWeek

              return (
                <Link
                  key={week.week}
                  href={`/hub/week/${week.week}`}
                  className={`group relative bg-[#18181f] border rounded-xl p-3 flex flex-col gap-2 hover:border-[#3d3d4a] transition-all ${
                    isCurrentWeek
                      ? 'border-indigo-500/60 ring-1 ring-indigo-500/30'
                      : 'border-[#2d2d3a]'
                  }`}
                >
                  {/* Current week badge */}
                  {isCurrentWeek && (
                    <div className="absolute -top-2 left-3">
                      <span className="text-[10px] font-bold bg-indigo-600 text-white px-1.5 py-0.5 rounded-full">
                        ATUAL
                      </span>
                    </div>
                  )}

                  {/* Week number */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#94a3b8]">
                      S{String(week.week).padStart(2, '0')}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${STATUS_DOTS[week.status]}`} />
                  </div>

                  {/* Pilar badge */}
                  <div
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full self-start"
                    style={{
                      color: pilarColor,
                      backgroundColor: `${pilarColor}15`,
                    }}
                  >
                    {week.pilar.slice(0, 4)}
                  </div>

                  {/* Theme */}
                  <p className="text-[11px] text-[#64748b] leading-tight line-clamp-2 group-hover:text-[#94a3b8] transition-colors">
                    {week.theme_suggestion}
                  </p>

                  {/* Date */}
                  <p className="text-[10px] text-[#475569] mt-auto">
                    {new Date(week.date_send + 'T12:00:00Z').toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      timeZone: 'UTC',
                    })}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
