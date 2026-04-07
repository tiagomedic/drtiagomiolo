import { CalendarWeek, Pilar } from './types'

const PILAR_ROTATION: Pilar[] = ['LÍDER', 'CONSTRUTOR', 'VISIONÁRIO', 'CIRURGIÃO']

const THEME_SUGGESTIONS: Record<Pilar, string[]> = {
  LÍDER: [
    'Decisão difícil com filosofia',
    'Liderança sob pressão extrema',
    'Marcus Aurelius na sala de reuniões',
    'O que aprendi errando como líder',
    'Liderar médicos vs. engenheiros',
    'Conflito que você evitou (e não devia)',
    'Estoicismo e a gestão hospitalar',
  ],
  CONSTRUTOR: [
    'Bastidores de produto StaiDoc',
    'Erro e aprendizado na Prevvine',
    'Decisão difícil na clínica SP',
    'Feature que quase não lançamos',
    'Contratação/demissão difícil',
    'O que ninguém conta sobre ser médico-fundador',
    'Parceria/negociação real',
  ],
  VISIONÁRIO: [
    'IA que construí errou — o que aprendi',
    'O que médicos ainda não viram sobre IA',
    'Pergunta errada vs. pergunta certa sobre IA',
    'Regulamentação ANVISA SaMD',
    'Healthtech no Brasil: o que falta',
    'IA copiloto vs. IA substituindo',
    'Futuro da medicina preventiva',
  ],
  CIRURGIÃO: [
    'O que a sala de operações ensina',
    'Minha cirurgia mais difícil',
    'Humanidade: o paciente que mudou perspectiva',
    'Precisão como filosofia de vida',
    'Decisão sem volta — sala e negócios',
    'Preparação e execução: cirurgia e startups',
    'O que 2.000 cirurgias ensinam sobre excelência',
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
    LÍDER:      '#8b5cf6', // violeta — liderança filosófica
    CONSTRUTOR: '#6366f1', // índigo — construção
    VISIONÁRIO: '#0ea5e9', // azul — visão de futuro
    CIRURGIÃO:  '#f59e0b', // âmbar — precisão cirúrgica
  }
  return colors[pilar]
}

export function getPilarGradient(pilar: Pilar): string {
  const gradients: Record<Pilar, string> = {
    LÍDER:      'linear-gradient(135deg, #2e1065, #4c1d95)',
    CONSTRUTOR: 'linear-gradient(135deg, #1e1b4b, #312e81)',
    VISIONÁRIO: 'linear-gradient(135deg, #0c4a6e, #075985)',
    CIRURGIÃO:  'linear-gradient(135deg, #78350f, #92400e)',
  }
  return gradients[pilar]
}

export function getPilarBg(pilar: Pilar): string {
  const bgs: Record<Pilar, string> = {
    LÍDER:      'bg-violet-900/30 border-violet-500/30',
    CONSTRUTOR: 'bg-indigo-900/30 border-indigo-500/30',
    VISIONÁRIO: 'bg-sky-900/30 border-sky-500/30',
    CIRURGIÃO:  'bg-amber-900/30 border-amber-500/30',
  }
  return bgs[pilar]
}

export function getPilarTextColor(pilar: Pilar): string {
  const colors: Record<Pilar, string> = {
    LÍDER:      'text-violet-400',
    CONSTRUTOR: 'text-indigo-400',
    VISIONÁRIO: 'text-sky-400',
    CIRURGIÃO:  'text-amber-400',
  }
  return colors[pilar]
}

export function getMonthName(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00Z')
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}
