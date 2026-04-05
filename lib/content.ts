import { WeekContent } from './types'
import path from 'path'
import fs from 'fs'

export function getWeekContent(week: number): WeekContent | null {
  try {
    const filePath = path.join(process.cwd(), 'public', 'content', `week-${String(week).padStart(2, '0')}.json`)
    if (!fs.existsSync(filePath)) return null
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as WeekContent
  } catch {
    return null
  }
}

export function getAllWeeks(): WeekContent[] {
  const contentDir = path.join(process.cwd(), 'public', 'content')
  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir).filter(f => f.startsWith('week-') && f.endsWith('.json'))
  const weeks: WeekContent[] = []

  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8')
      weeks.push(JSON.parse(raw) as WeekContent)
    } catch {
      // skip malformed files
    }
  }

  return weeks.sort((a, b) => a.week - b.week)
}

export function getCurrentWeekNumber(): number {
  // Week 1 = April 7, 2026
  const week1Start = new Date('2026-04-07T00:00:00Z')
  const now = new Date()
  const diffMs = now.getTime() - week1Start.getTime()
  const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000))
  return Math.max(1, Math.min(52, diffWeeks + 1))
}

export function countPublishedWeeks(weeks: WeekContent[]): number {
  return weeks.filter(w => w.status === 'published').length
}
