import { getWeekContent, getAllWeeks, countPublishedWeeks, getCurrentWeekNumber } from '@/lib/content'
import { generateCalendar, getPilarGradient } from '@/lib/calendar'
import { WeekContent } from '@/lib/types'
import TopBar from '@/components/TopBar'
import MetricsBar from '@/components/MetricsBar'
import PlatformCard from '@/components/PlatformCard'
import CarouselPreview from '@/components/CarouselPreview'
import XCard from '@/components/XCard'
import { redirect } from 'next/navigation'

function NewsletterBody({ content }: { content: WeekContent['newsletter'] }) {
  return (
    <div className="space-y-3">
      {/* Score badge */}
      <div className="flex justify-end">
        <div className="flex flex-col items-center">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black border-2"
            style={{
              borderColor: content.editorial_score >= 85 ? '#10b981' : content.editorial_score >= 70 ? '#f59e0b' : '#ef4444',
              color: content.editorial_score >= 85 ? '#10b981' : content.editorial_score >= 70 ? '#f59e0b' : '#ef4444',
            }}
          >
            {content.editorial_score}
          </div>
          <span className="text-[10px] text-[#475569] mt-0.5">score</span>
        </div>
      </div>

      {/* Título — campo "Title" no Beehiiv */}
      <div className="bg-[#0f0f13] border border-[#2d2d3a] rounded-lg px-3 py-2.5">
        <p className="text-[10px] text-[#475569] font-semibold uppercase tracking-widest mb-1">Título · Beehiiv "Title"</p>
        <p className="text-[#e2e8f0] text-sm font-bold leading-snug">{content.title}</p>
      </div>

      {/* Subtítulo — campo "Subtitle" no Beehiiv */}
      {content.subtitle && (
        <div className="bg-[#0f0f13] border border-[#2d2d3a] rounded-lg px-3 py-2.5">
          <p className="text-[10px] text-[#475569] font-semibold uppercase tracking-widest mb-1">Subtítulo · Beehiiv "Subtitle"</p>
          <p className="text-[#94a3b8] text-sm leading-snug">{content.subtitle}</p>
        </div>
      )}

      {/* Assunto do email — campo "Subject line" no Beehiiv (aba Email) */}
      <div className="bg-[#0f0f13] border border-[#2d2d3a] rounded-lg px-3 py-2.5">
        <p className="text-[10px] text-[#475569] font-semibold uppercase tracking-widest mb-1">Assunto · Beehiiv "Subject line" (aba Email)</p>
        <p className="text-[#e2e8f0] text-sm leading-snug">{content.subject}</p>
      </div>

      {/* Preview text */}
      <div>
        <p className="text-[10px] text-[#475569] font-semibold uppercase tracking-widest mb-1">Preview · Beehiiv "Preview text"</p>
        <p className="text-[#94a3b8] text-sm italic">&ldquo;{content.preview_text}&rdquo;</p>
      </div>

      {/* Corpo */}
      <div>
        <p className="text-[10px] text-[#475569] font-semibold uppercase tracking-widest mb-1">Corpo ({content.word_count} palavras)</p>
        <div className="bg-[#0f0f13] border border-[#2d2d3a] rounded-lg p-3 max-h-48 overflow-y-auto">
          <p className="content-body text-sm text-[#cbd5e1] whitespace-pre-wrap leading-relaxed">
            {content.body}
          </p>
        </div>
      </div>
    </div>
  )
}

function LinkedInBody({ content }: { content: WeekContent['linkedin'] }) {
  return (
    <div className="space-y-3">
      {/* Hook */}
      <div>
        <p className="text-xs text-[#64748b] font-medium mb-1">Hook</p>
        <p className="text-[#e2e8f0] text-sm font-bold leading-snug">{content.hook}</p>
      </div>

      {/* Body */}
      <div>
        <p className="text-xs text-[#64748b] font-medium mb-1">Corpo</p>
        <div className="bg-[#0f0f13] border border-[#2d2d3a] rounded-lg p-3 max-h-40 overflow-y-auto">
          <p className="content-body text-sm text-[#cbd5e1] whitespace-pre-wrap leading-relaxed">
            {content.body}
          </p>
        </div>
      </div>

      {/* Image info */}
      {content.has_image && content.image_text && (
        <div className="flex items-center gap-2 bg-[#0f0f13] border border-[#2d2d3a] rounded-lg px-3 py-2.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-sky-400 shrink-0">
            <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.25" />
            <circle cx="4.5" cy="4.5" r="1" fill="currentColor" />
            <path d="M1 9.5L4.5 6L7.5 9L10 7L13 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="min-w-0">
            <span className="text-xs text-[#64748b] font-medium">{content.image_type === 'quote_card' ? 'Quote card' : 'Stats card'}: </span>
            <span className="text-xs text-[#94a3b8] italic">&ldquo;{content.image_text}&rdquo;</span>
          </div>
        </div>
      )}
    </div>
  )
}

function InstagramBody({ content }: { content: WeekContent['instagram'] }) {
  return (
    <div className="space-y-3">
      {/* Caption */}
      <div>
        <p className="text-xs text-[#64748b] font-medium mb-1">Caption</p>
        <div className="bg-[#0f0f13] border border-[#2d2d3a] rounded-lg p-3 max-h-28 overflow-y-auto">
          <p className="content-body text-sm text-[#cbd5e1] whitespace-pre-wrap leading-relaxed">
            {content.caption}
          </p>
        </div>
      </div>
    </div>
  )
}


export default async function HubPage() {
  const currentWeekNum = getCurrentWeekNumber()
  const week = getWeekContent(currentWeekNum)

  // If current week doesn't have content, try week 1
  const displayWeek = week || getWeekContent(1)

  if (!displayWeek) {
    return (
      <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#64748b] text-sm">Nenhum conteudo encontrado.</p>
          <p className="text-[#475569] text-xs mt-1">Adicione arquivos JSON em public/content/</p>
        </div>
      </div>
    )
  }

  const allWeeks = getAllWeeks()
  const publishedCount = countPublishedWeeks(allWeeks)
  const calendar = generateCalendar()
  const currentCalendarWeek = calendar.find(w => w.week === displayWeek.week)
  const nextWeekCalendar = calendar.find(w => w.week === displayWeek.week + 1)
  const nextPilar = nextWeekCalendar?.pilar || 'CONSTRUTOR'

  const newsletterCopyText = `TÍTULO: ${displayWeek.newsletter.title || displayWeek.newsletter.subject}\n\nSUBTÍTULO: ${displayWeek.newsletter.subtitle || ''}\n\nASSUNTO DO EMAIL: ${displayWeek.newsletter.subject}\n\nPREVIEW: ${displayWeek.newsletter.preview_text}\n\n---\n\n${displayWeek.newsletter.body}`
  const linkedInCopyText = `${displayWeek.linkedin.hook}\n\n${displayWeek.linkedin.body}`
  const instagramCopyText = displayWeek.instagram.caption
  return (
    <div className="min-h-screen bg-[#0f0f13]">
      <TopBar week={displayWeek} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Week banner */}
        <div
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{ background: getPilarGradient(displayWeek.pilar) }}
        >
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-1">
                  Semana {String(displayWeek.week).padStart(2, '0')} · {displayWeek.pilar}
                </p>
                <p className="text-white/90 text-base font-medium leading-snug max-w-2xl">
                  {displayWeek.brief_summary}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-white/50 mb-0.5">Envio</p>
                <p className="text-white/80 text-sm font-semibold">
                  {new Date(displayWeek.date_send + 'T12:00:00Z').toLocaleDateString('pt-BR', {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'short',
                    timeZone: 'UTC',
                  })}
                </p>
              </div>
            </div>

            {/* Theme suggestion if exists */}
            {currentCalendarWeek && (
              <p className="text-white/40 text-xs mt-2">
                Tema sugerido: {currentCalendarWeek.theme_suggestion}
              </p>
            )}
          </div>

          {/* Decorative gradient orb */}
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 blur-xl" />
        </div>

        {/* Metrics */}
        <MetricsBar
          week={displayWeek}
          publishedCount={publishedCount}
          nextPilar={nextPilar}
        />

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Newsletter */}
          <PlatformCard
            platform="Newsletter"
            pilar={displayWeek.pilar}
            week={displayWeek.week}
            status={displayWeek.status}
            copyText={newsletterCopyText}
            openUrl="https://app.beehiiv.com"
          >
            <NewsletterBody content={displayWeek.newsletter} />
          </PlatformCard>

          {/* LinkedIn */}
          <PlatformCard
            platform="LinkedIn"
            pilar={displayWeek.pilar}
            week={displayWeek.week}
            status={displayWeek.status}
            copyText={linkedInCopyText}
            openUrl="https://www.linkedin.com/feed/"
          >
            <LinkedInBody content={displayWeek.linkedin} />
          </PlatformCard>

          {/* Instagram */}
          <PlatformCard
            platform="Instagram"
            pilar={displayWeek.pilar}
            week={displayWeek.week}
            status={displayWeek.status}
            copyText={instagramCopyText}
            openUrl="https://www.instagram.com/"
            extraInfo={
              displayWeek.instagram.slides.length > 0 ? (
                <CarouselPreview
                  slides={displayWeek.instagram.slides}
                  pilar={displayWeek.pilar}
                />
              ) : undefined
            }
          >
            <InstagramBody content={displayWeek.instagram} />
          </PlatformCard>

          {/* X/Twitter */}
          <XCard
            content={displayWeek.twitter}
            week={displayWeek.week}
            pilar={displayWeek.pilar}
            status={displayWeek.status}
          />
        </div>
      </main>
    </div>
  )
}
