export type Pilar = 'LÍDER' | 'CONSTRUTOR' | 'VISIONÁRIO' | 'CIRURGIÃO'

export interface ContentVersion {
  v: number
  body: string
  feedback: string | null
  timestamp: string
}

export interface NewsletterContent {
  subject: string
  preview_text: string
  body: string
  word_count: number
  editorial_score: number
  versions: ContentVersion[]
}

export interface InstagramSlide {
  order: number
  type: 'hook' | 'content' | 'cta'
  text: string
}

export interface InstagramContent {
  caption: string
  slides: InstagramSlide[]
  versions: ContentVersion[]
}

export interface LinkedInContent {
  hook: string
  body: string
  has_image: boolean
  image_type: 'quote_card' | 'stats_card' | null
  image_text: string | null
  versions: ContentVersion[]
}

export interface TwitterContent {
  thread: string[]
  has_image: boolean
  image_type: 'quote_card' | null
  versions: ContentVersion[]
}

export interface WeekMetrics {
  beehiiv_subscribers: number | null
  beehiiv_open_rate: number | null
  linkedin_impressions: number | null
  instagram_reach: number | null
  twitter_impressions: number | null
}

export interface WeekContent {
  week: number
  pilar: Pilar
  date_send: string
  brief_summary: string
  status: 'planned' | 'generating' | 'ready' | 'published'
  newsletter: NewsletterContent
  linkedin: LinkedInContent
  instagram: InstagramContent
  twitter: TwitterContent
  metrics: WeekMetrics
}

export interface CalendarWeek {
  week: number
  pilar: Pilar
  date_start: string
  date_send: string
  theme_suggestion: string
  status: 'planned' | 'generating' | 'ready' | 'published'
}
