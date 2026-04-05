import { notFound } from 'next/navigation'
import { getWeekContent, getAllWeeks, countPublishedWeeks } from '@/lib/content'
import { generateCalendar, getPilarGradient, getPilarColor } from '@/lib/calendar'
import TopBar from '@/components/TopBar'
import MetricsBar from '@/components/MetricsBar'
import PlatformCard from '@/components/PlatformCard'
import CarouselPreview from '@/components/CarouselPreview'
import { WeekContent } from '@/lib/types'
import Link from 'next/link'

interface PageProps {
  params: { n: string }
}

function NewsletterBody({ content }: { content: WeekContent['newsletter'] }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-[#64748b] font-medium mb-1">Assunto</p>
          <p className="text-[#e2e8f0] text-sm font-semibold leading-snug">{content.subject}</p>
        </div>
        <div className="shrink-0 flex flex-col items-center">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border-2"
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
      <div>
        <p className="text-xs text-[#64748b] font-medium mb-1">Preview</p>
        <p className="text-[#94a3b8] text-sm italic">&ldquo;{content.preview_text}&rdquo;</p>
      </div>
      <div>
        <p className="text-xs text-[#64748b] font-medium mb-1">Corpo ({content.word_count} palavras)</p>
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
      <div>
        <p className="text-xs text-[#64748b] font-medium mb-1">Hook</p>
        <p className="text-[#e2e8f0] text-sm font-bold leading-snug">{content.hook}</p>
      </div>
      <div>
        <p className="text-xs text-[#64748b] font-medium mb-1">Corpo</p>
        <div className="bg-[#0f0f13] border border-[#2d2d3a] rounded-lg p-3 max-h-40 overflow-y-auto">
          <p className="content-body text-sm text-[#cbd5e1] whitespace-pre-wrap leading-relaxed">
            {content.body}
          </p>
        </div>
      </div>
      {content.has_image && content.image_text && (
        <div className="flex items-center gap-2 bg-[#0f0f13] border border-[#2d2d3a] rounded-lg px-3 py-2.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-sky-400 shrink-0">
            <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.25" />
            <circle cx="4.5" cy="4.5" r="1" fill="currentColor" />
            <path d="M1 9.5L4.5 6L7.5 9L10 7L13 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-xs text-[#64748b] font-medium">{content.image_type === 'quote_card' ? 'Quote card' : 'Stats card'}: </span>
          <span className="text-xs text-[#94a3b8] italic">&ldquo;{content.image_text}&rdquo;</span>
        </div>
      )}
    </div>
  )
}

function InstagramBody({ content }: { content: WeekContent['instagram'] }) {
  return (
    <div className="space-y-3">
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

function TwitterBody({ content }: { content: WeekContent['twitter'] }) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-[#64748b] font-medium mb-2">Thread ({content.thread.length} tweets)</p>
      {content.thread.map((tweet, i) => (
        <div key={i} className="relative">
          {i < content.thread.length - 1 && (
            <div className="absolute left-4 top-8 bottom-0 w-px bg-[#2d2d3a]" />
          )}
          <div className="flex gap-2.5">
            <div className="shrink-0 w-8 h-8 rounded-full bg-[#0f0f13] border border-[#2d2d3a] flex items-center justify-center text-xs font-bold text-[#64748b]">
              {i + 1}
            </div>
            <div className="flex-1 bg-[#0f0f13] border border-[#2d2d3a] rounded-lg px-3 py-2.5 mb-2">
              <p className="text-sm text-[#cbd5e1] leading-relaxed whitespace-pre-wrap">{tweet}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function WeekPage({ params }: PageProps) {
  const weekNum = parseInt(params.n, 10)

  if (isNaN(weekNum) || weekNum < 1 || weekNum > 52) {
    notFound()
  }

  const calendar = generateCalendar()
  const calendarWeek = calendar.find(w => w.week === weekNum)

  if (!calendarWeek) {
    notFound()
  }

  // TypeScript narrowing: after notFound() (which throws), calendarWeek is defined
  const cw = calendarWeek!

  const content = getWeekContent(weekNum)
  const allWeeks = getAllWeeks()
  const publishedCount = countPublishedWeeks(allWeeks)
  const nextWeekCalendar = calendar.find(w => w.week === weekNum + 1)
  const nextPilar = nextWeekCalendar?.pilar || 'CONSTRUTOR'

  // If no content file, show the calendar week info with a planned state
  const displayWeek: WeekContent = content || {
    week: weekNum,
    pilar: cw.pilar,
    date_send: cw.date_send,
    brief_summary: cw.theme_suggestion,
    status: 'planned',
    newsletter: { subject: '', preview_text: '', body: '', word_count: 0, editorial_score: 0, versions: [] },
    linkedin: { hook: '', body: '', has_image: false, image_type: null, image_text: null, versions: [] },
    instagram: { caption: '', slides: [], versions: [] },
    twitter: { thread: [], has_image: false, image_type: null, versions: [] },
    metrics: { beehiiv_subscribers: null, beehiiv_open_rate: null, linkedin_impressions: null, instagram_reach: null, twitter_impressions: null },
  }

  const newsletterCopyText = `ASSUNTO: ${displayWeek.newsletter.subject}\n\nPREVIEW: ${displayWeek.newsletter.preview_text}\n\n${displayWeek.newsletter.body}`
  const linkedInCopyText = `${displayWeek.linkedin.hook}\n\n${displayWeek.linkedin.body}`
  const instagramCopyText = displayWeek.instagram.caption
  const twitterCopyText = displayWeek.twitter.thread.join('\n\n---\n\n')

  return (
    <div className="min-h-screen bg-[#0f0f13]">
      <TopBar week={displayWeek} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link href="/hub/calendar" className="text-[#64748b] hover:text-[#e2e8f0] transition-colors">
            Calendario
          </Link>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#475569]">
            <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
          <span className="text-[#e2e8f0]">Semana {String(weekNum).padStart(2, '0')}</span>

          {/* Prev/Next navigation */}
          <div className="ml-auto flex items-center gap-2">
            {weekNum > 1 && (
              <Link
                href={`/hub/week/${weekNum - 1}`}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[#2d2d3a] text-[#64748b] hover:text-[#e2e8f0] hover:border-[#3d3d4a] transition-colors"
              >
                Semana {weekNum - 1}
              </Link>
            )}
            {weekNum < 52 && (
              <Link
                href={`/hub/week/${weekNum + 1}`}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[#2d2d3a] text-[#64748b] hover:text-[#e2e8f0] hover:border-[#3d3d4a] transition-colors"
              >
                Semana {weekNum + 1}
              </Link>
            )}
          </div>
        </div>

        {/* Week banner */}
        <div
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{ background: getPilarGradient(displayWeek.pilar) }}
        >
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-1">
                  Semana {String(weekNum).padStart(2, '0')} · {displayWeek.pilar}
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
            <p className="text-white/40 text-xs mt-2">
              Tema sugerido: {cw.theme_suggestion}
            </p>
          </div>
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 blur-xl" />
        </div>

        {/* Metrics */}
        <MetricsBar
          week={displayWeek}
          publishedCount={publishedCount}
          nextPilar={nextPilar}
        />

        {/* Platform Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PlatformCard
            platform="Newsletter"
            pilar={displayWeek.pilar}
            week={displayWeek.week}
            status={displayWeek.status}
            copyText={newsletterCopyText}
            openUrl="https://app.beehiiv.com"
          >
            {displayWeek.status !== 'planned' && <NewsletterBody content={displayWeek.newsletter} />}
          </PlatformCard>

          <PlatformCard
            platform="LinkedIn"
            pilar={displayWeek.pilar}
            week={displayWeek.week}
            status={displayWeek.status}
            copyText={linkedInCopyText}
            openUrl="https://www.linkedin.com/feed/"
          >
            {displayWeek.status !== 'planned' && <LinkedInBody content={displayWeek.linkedin} />}
          </PlatformCard>

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
            {displayWeek.status !== 'planned' && <InstagramBody content={displayWeek.instagram} />}
          </PlatformCard>

          <PlatformCard
            platform="X"
            pilar={displayWeek.pilar}
            week={displayWeek.week}
            status={displayWeek.status}
            copyText={twitterCopyText}
            openUrl="https://twitter.com/compose/tweet"
          >
            {displayWeek.status !== 'planned' && <TwitterBody content={displayWeek.twitter} />}
          </PlatformCard>
        </div>
      </main>
    </div>
  )
}
