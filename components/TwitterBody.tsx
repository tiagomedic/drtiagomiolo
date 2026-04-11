'use client'

import { useState, useEffect, useRef } from 'react'
import { TwitterContent } from '@/lib/types'

interface TwitterBodyProps {
  content: TwitterContent
  week: number
  onTweetsChange?: (tweets: string[]) => void
}

function AutoTextarea({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = ref.current.scrollHeight + 'px'
    }
  }, [value])

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={1}
      className="w-full bg-transparent text-sm text-[#cbd5e1] leading-relaxed resize-none focus:outline-none placeholder-[#475569] overflow-hidden"
      style={{ minHeight: '1.5rem' }}
    />
  )
}

export default function TwitterBody({ content, week, onTweetsChange }: TwitterBodyProps) {
  const storageKey = `hub-twitter-week-${week}`
  const [tweets, setTweets] = useState<string[]>(content.thread)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length === content.thread.length) {
          setTweets(parsed)
          onTweetsChange?.(parsed)
        }
      }
    } catch { /* ignore */ }
  }, [storageKey, content.thread.length])

  function handleChange(index: number, value: string) {
    const updated = tweets.map((t, i) => (i === index ? value : t))
    setTweets(updated)
    onTweetsChange?.(updated)
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated))
    } catch { /* ignore */ }
  }

  function handleReset() {
    setTweets(content.thread)
    onTweetsChange?.(content.thread)
    try { localStorage.removeItem(storageKey) } catch { /* ignore */ }
    setEditing(false)
  }

  const hasEdits = tweets.some((t, i) => t !== content.thread[i])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-[#64748b] font-medium">
          Thread ({tweets.length} tweets)
        </p>
        <div className="flex items-center gap-2">
          {hasEdits && (
            <button
              onClick={handleReset}
              className="text-xs text-[#475569] hover:text-[#e2e8f0] transition-colors"
            >
              Restaurar
            </button>
          )}
          <button
            onClick={() => setEditing(!editing)}
            className={`text-xs font-medium transition-colors ${
              editing ? 'text-indigo-400' : 'text-[#64748b] hover:text-[#e2e8f0]'
            }`}
          >
            {editing ? 'Fechar edição' : 'Editar tweets'}
          </button>
        </div>
      </div>

      {tweets.map((tweet, i) => (
        <div key={i} className="relative">
          {i < tweets.length - 1 && (
            <div className="absolute left-4 top-8 bottom-0 w-px bg-[#2d2d3a]" />
          )}
          <div className="flex gap-2.5">
            <div className="shrink-0 w-8 h-8 rounded-full bg-[#0f0f13] border border-[#2d2d3a] flex items-center justify-center text-xs font-bold text-[#64748b]">
              {i + 1}
            </div>
            <div
              className={`flex-1 border rounded-lg px-3 py-2.5 mb-2 transition-colors ${
                editing
                  ? 'bg-[#18181f] border-indigo-500/50'
                  : 'bg-[#0f0f13] border-[#2d2d3a]'
              }`}
            >
              {editing ? (
                <AutoTextarea
                  value={tweet}
                  onChange={(v) => handleChange(i, v)}
                />
              ) : (
                <p className="text-sm text-[#cbd5e1] leading-relaxed whitespace-pre-wrap">
                  {tweet}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
