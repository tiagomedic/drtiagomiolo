import { generateCalendar, getPilarColor } from '@/lib/calendar'
import { getAllWeeks, getCurrentWeekNumber } from '@/lib/content'
import CalendarView from '@/components/CalendarView'

export default function CalendarPage() {
  const weeks = generateCalendar()
  const allContent = getAllWeeks()
  const currentWeek = getCurrentWeekNumber()

  // Merge status from actual content files into calendar
  const contentByWeek = Object.fromEntries(allContent.map(w => [w.week, w]))
  const weeksWithStatus = weeks.map(w => ({
    ...w,
    status: (contentByWeek[w.week]?.status || 'planned') as 'planned' | 'generating' | 'ready' | 'published',
  }))

  // Stats
  const publishedCount = weeksWithStatus.filter(w => w.status === 'published').length
  const readyCount = weeksWithStatus.filter(w => w.status === 'ready').length
  const generatingCount = weeksWithStatus.filter(w => w.status === 'generating').length

  const pilarCounts = weeksWithStatus.reduce((acc, w) => {
    acc[w.pilar] = (acc[w.pilar] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen bg-[#0f0f13]">
      {/* Simple header for calendar page */}
      <header className="sticky top-0 z-40 bg-[#0f0f13]/95 backdrop-blur-sm border-b border-[#2d2d3a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a href="/hub" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-black text-xs">TH</span>
              </div>
              <span className="text-[#e2e8f0] font-bold text-sm hidden sm:block">TiagoHub</span>
            </a>
            <div className="w-px h-5 bg-[#2d2d3a] hidden sm:block" />
            <span className="text-[#64748b] text-sm">Calendario 2026</span>
          </div>
          <a
            href="/hub"
            className="text-sm text-[#64748b] hover:text-[#e2e8f0] transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Dashboard
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Page title */}
        <div>
          <h1 className="text-xl font-bold text-[#e2e8f0]">Calendario Editorial 2026</h1>
          <p className="text-[#64748b] text-sm mt-1">52 semanas · 4 pilares · newsletter + 3 plataformas</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="bg-[#18181f] border border-[#2d2d3a] rounded-xl px-4 py-3 col-span-2 sm:col-span-2 lg:col-span-1">
            <p className="text-xs text-[#64748b] font-medium">Total</p>
            <p className="text-xl font-bold text-[#e2e8f0] mt-0.5">52</p>
          </div>
          <div className="bg-[#18181f] border border-[#2d2d3a] rounded-xl px-4 py-3">
            <p className="text-xs text-[#64748b] font-medium">Publicadas</p>
            <p className="text-xl font-bold text-indigo-400 mt-0.5">{publishedCount}</p>
          </div>
          <div className="bg-[#18181f] border border-[#2d2d3a] rounded-xl px-4 py-3">
            <p className="text-xs text-[#64748b] font-medium">Prontas</p>
            <p className="text-xl font-bold text-emerald-400 mt-0.5">{readyCount}</p>
          </div>
          <div className="bg-[#18181f] border border-[#2d2d3a] rounded-xl px-4 py-3">
            <p className="text-xs text-[#64748b] font-medium">Gerando</p>
            <p className="text-xl font-bold text-amber-400 mt-0.5">{generatingCount}</p>
          </div>

          {/* Pilar breakdown */}
          {(['LÍDER', 'CONSTRUTOR', 'VISIONÁRIO', 'CIRURGIÃO'] as const).map(pilar => (
            <div
              key={pilar}
              className="bg-[#18181f] border border-[#2d2d3a] rounded-xl px-4 py-3"
              style={{ borderLeftColor: getPilarColor(pilar), borderLeftWidth: 2 }}
            >
              <p className="text-xs text-[#64748b] font-medium truncate">{pilar.slice(0, 5)}</p>
              <p
                className="text-xl font-bold mt-0.5"
                style={{ color: getPilarColor(pilar) }}
              >
                {pilarCounts[pilar] || 0}
              </p>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <CalendarView weeks={weeksWithStatus} currentWeek={currentWeek} />
      </main>
    </div>
  )
}
