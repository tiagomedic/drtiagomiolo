'use client'

import { useState } from 'react'

interface CopyButtonProps {
  text: string
  className?: string
  label?: string
}

export default function CopyButton({ text, className = '', label = 'Copiar' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-150 ${
        copied
          ? 'text-emerald-400'
          : 'text-[#64748b] hover:text-[#e2e8f0]'
      } ${className}`}
      title={copied ? 'Copiado!' : `Copiar ${label}`}
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Copiado!
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
            <path d="M4 3V2.5C4 1.67 4.67 1 5.5 1H11.5C12.33 1 13 1.67 13 2.5V8.5C13 9.33 12.33 10 11.5 10H11" stroke="currentColor" strokeWidth="1.25" />
          </svg>
          {label}
        </>
      )}
    </button>
  )
}
