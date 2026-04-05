import { CalendarWeek, Pilar } from './types'

const PILAR_ROTATION: Pilar[] = ['CONSTRUTOR', 'VISIONÁRIO', 'GESTOR', 'CIRURGIÃO']

const THEME_SUGGESTIONS: Record<Pilar, string[]> = {
  CONSTRUTOR: [
    'Bastidores de produto',
    'Erro e aprendizado',
    'Decisão difícil',
    'Conquista real',
    'Contratação/demissão',
    'Feature lançada',
    'Parceria/negociação',
  ],
  VISIONÁRIO: [
    'IA no diagnóstico',
    'Regulamentação ANVISA',
    'Tendência internacional',
    'O que médicos ainda não viram',
    'Healthtech no Brasil',
    'IA na gestão clínica',
    'Futuro da medicina',
  ],
  GESTOR: [
    'Eficiência operacional',
    'Liderança sob pressão',
    'Dado que surpreendeu',
    'Processo que mudou',
    'Conflito e decisão',
    'Glosa e faturamento',
    'Time e cultura',
  ],
  CIRURGIÃO: [
    'Sala de operações e negócios',
    'O que a cirurgia ensina',
    'Humanidade do paciente',
    'Precisão como filosofia',
    'Decisão sem volta',
    'Preparação e execução',
    'O silêncio antes de operar',
  ],
}

export function generateCalendar(): CalendarWeek[] {
  const weeks: CalendarWeek[] = []
  // Week 1 starts on April 6 (Monday), send on April 7 (Tuesday)
  const week1Monday = new Date('2026-04-06T00:00:00Z')

  for (let i = 0; i < 52; i++) {
    const weekNum = i + 1
    const pilar = PILAR_ROTATION[i % 4]
    const suggestions = THEME_SUGGESTIONS[pilar]
    const theme = suggestions[(weekNum - 1) % suggestions.length]

    const monday = new Date(week1Monday)
    monday.setUTCDate(week1Monday.getUTCDate() + i * 7)

    const tuesday = new Date(monday)
    tuesday.setUTCDate(monday.getUTCDate() + 1)

    weeks.push({
      week: weekNum,
      pilar,
      date_start: monday.toISOString().split('T')[0],
      date_send: tuesday.toISOString().split('T')[0],
      theme_suggestion: theme,
      status: weekNum === 1 ? 'ready' : 'planned',
    })
  }

  return weeks
}

export function getPilarColor(pilar: Pilar): string {
  const colors: Record<Pilar, string> = {
    CONSTRUTOR: '#6366f1',
    VISIONÁRIO: '#0ea5e9',
    GESTOR: '#10b981',
    CIRURGIÃO: '#f59e0b',
  }
  return colors[pilar]
}

export function getPilarGradient(pilar: Pilar): string {
  const gradients: Record<Pilar, string> = {
    CONSTRUTOR: 'linear-gradient(135deg, #1e1b4b, #312e81)',
    VISIONÁRIO: 'linear-gradient(135deg, #0c4a6e, #075985)',
    GESTOR: 'linear-gradient(135deg, #14532d, #166534)',
    CIRURGIÃO: 'linear-gradient(135deg, #78350f, #92400e)',
  }
  return gradients[pilar]
}

export function getPilarBg(pilar: Pilar): string {
  const bgs: Record<Pilar, string> = {
    CONSTRUTOR: 'bg-indigo-900/30 border-indigo-500/30',
    VISIONÁRIO: 'bg-sky-900/30 border-sky-500/30',
    GESTOR: 'bg-emerald-900/30 border-emerald-500/30',
    CIRURGIÃO: 'bg-amber-900/30 border-amber-500/30',
  }
  return bgs[pilar]
}

export function getPilarTextColor(pilar: Pilar): string {
  const colors: Record<Pilar, string> = {
    CONSTRUTOR: 'text-indigo-400',
    VISIONÁRIO: 'text-sky-400',
    GESTOR: 'text-emerald-400',
    CIRURGIÃO: 'text-amber-400',
  }
  return colors[pilar]
}

export function getMonthName(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00Z')
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}
