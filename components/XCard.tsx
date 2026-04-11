'use client'

import { useState, useEffect } from 'react'
import { Pilar, TwitterContent } from '@/lib/types'
import PlatformCard from './PlatformCard'
import TwitterBody from './TwitterBody'

interface XCardProps {
  content: TwitterContent
  week: number
  pilar: Pilar
  status: 'planned' | 'generating' | 'ready' | 'published'
}

export default function XCard({ content, week, pilar, status }: XCardProps) {
  const storageKey = `hub-twitter-week-${week}`
  const [tweets, setTweets] = useState<string[]>(content.thread)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length === content.thread.length) {
          setTweets(parsed)
        }
      }
    } catch { /* ignore */ }
  }, [storageKey, content.thread.length])

  const copyText = tweets.join('\n\n---\n\n')

  return (
    <PlatformCard
      platform="X"
      pilar={pilar}
      week={week}
      status={status}
      copyText={copyText}
      openUrl="https://twitter.com/compose/tweet"
    >
      <TwitterBody
        content={content}
        week={week}
        onTweetsChange={setTweets}
      />
    </PlatformCard>
  )
}
