'use client'

import { useState, useEffect } from 'react'

interface HybridAdjustPanelProps {
  week: number
  platform: string
  currentContent: string
  onSave: (newContent: string) => void
  onClose: () => void
}

const FEEDBACK_CHIPS: Record<string, string[]> = {
  newsletter: [
    'Muito técnico',
    'Aumentar urgência',
    'Mais pessoal',
    'Reduzir tamanho',
    'Adicionar dados',
    'Fortalecer CTA',
    'Mudar tom',
    'Mais storytelling',
  ],
  linkedin: [
    'Hook mais forte',
    'Mais conciso',
    'Adicionar dados',
    'Menos formal',
    'CTA mais claro',
    'Mais polêmico',
    'Estrutura diferente',
    'Mais pessoal',
  ],
  instagram: [
    'Primeiro slide fraco',
    'Reduzir texto',
    'Mais visual',
    'Caption menor',
    'CTA mais forte',
    'Mais hashtags',
    'Menos hashtags',
    'Tom diferente',
  ],
  twitter: [
    'Thread muito longa',
    'Hook fraco',
    'Mais opinativo',
    'Reduzir tweets',
    'Mais direto',
    'Adicionar dados',
    'Tom mais casual',
    'Primeiro tweet fraco',
  ],
}

export default function HybridAdjustPanel({
  week,
  platform,
  currentContent,
  onSave,
  onClose,
}: HybridAdjustPanelProps) {
  const [feedback, setFeedback] = useState('')
  const [editedContent, setEditedContent] = useState(currentContent)
  const [selectedChips, setSelectedChips] = useState<string[]>([])
  const [saved, setSaved] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [editMode, setEditMode] = useState(false)

  const storageKey = `hub-feedback-week-${week}-${platform}`
  const chips = FEEDBACK_CHIPS[platform.toLowerCase()] || FEEDBACK_CHIPS.linkedin

  useEffect(() => {
    // Load any saved feedback
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const data = JSON.parse(saved)
        if (data.feedback) setFeedback(data.feedback)
        if (data.chips) setSelectedChips(data.chips)
      }
    } catch {
      // ignore
    }
  }, [storageKey])

  function toggleChip(chip: string) {
    setSelectedChips(prev =>
      prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
    )
  }

  function buildFullFeedback(): string {
    const parts: string[] = []
    if (selectedChips.length > 0) parts.push(selectedChips.join(', '))
    if (feedback.trim()) parts.push(feedback.trim())
    return parts.join('. ')
  }

  function handleSaveFeedback() {
    setSaved('saving')
    const fullFeedback = buildFullFeedback()
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          feedback: feedback,
          chips: selectedChips,
          fullFeedback,
          timestamp: new Date().toISOString(),
          platform,
          week,
        })
      )
      setTimeout(() => setSaved('saved'), 300)
      setTimeout(() => setSaved('idle'), 3000)
    } catch {
      setSaved('idle')
    }
  }

  function handleSaveEdit() {
    onSave(editedContent)
    onClose()
  }

  function handleRegenerateAndAdjust() {
    handleSaveFeedback()
    setEditMode(true)
  }

  return (
    <div className="mt-3 border border-[#2d2d3a] rounded-xl bg-[#0f0f13] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d2d3a]">
        <span className="text-sm font-medium text-[#e2e8f0]">Ajustar conteudo</span>
        <button
          onClick={onClose}
          className="text-[#64748b] hover:text-[#e2e8f0] transition-colors"
          aria-label="Fechar painel"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#2d2d3a]">
        {/* Left: feedback chips + textarea */}
        <div className="p-4 space-y-3">
          <div>
            <p className="text-xs text-[#64748b] font-medium mb-2 uppercase tracking-wide">
              Feedback rapido
            </p>
            <div className="flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => toggleChip(chip)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                    selectedChips.includes(chip)
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-transparent border-[#2d2d3a] text-[#64748b] hover:border-indigo-500/50 hover:text-indigo-400'
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-[#64748b] font-medium mb-2 uppercase tracking-wide">
              Instrucao personalizada
            </p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Ex: Mencionar o caso do HMC, usar tom mais direto, reduzir para 3 slides..."
              rows={4}
              className="w-full bg-[#18181f] border border-[#2d2d3a] rounded-lg px-3 py-2.5 text-sm text-[#e2e8f0] placeholder-[#475569] resize-none focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {saved === 'saved' && (
            <div className="flex items-start gap-2 bg-emerald-900/20 border border-emerald-500/30 rounded-lg px-3 py-2.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0 text-emerald-400">
                <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className="text-xs text-emerald-400 leading-relaxed">
                Feedback salvo. Rode o squad no Claude Code para regenerar.
              </p>
            </div>
          )}
        </div>

        {/* Right: current content editable */}
        <div className="p-4 space-y-3">
          <p className="text-xs text-[#64748b] font-medium uppercase tracking-wide">
            Conteudo atual {editMode && <span className="text-indigo-400 normal-case">(editando)</span>}
          </p>
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            disabled={!editMode}
            rows={10}
            className={`w-full border rounded-lg px-3 py-2.5 text-sm text-[#e2e8f0] resize-none focus:outline-none transition-colors font-mono leading-relaxed ${
              editMode
                ? 'bg-[#18181f] border-indigo-500 focus:border-indigo-400'
                : 'bg-[#0a0a0e] border-[#2d2d3a] text-[#94a3b8] cursor-not-allowed'
            }`}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-[#2d2d3a] bg-[#18181f]/50">
        <button
          onClick={onClose}
          className="text-sm text-[#64748b] hover:text-[#e2e8f0] transition-colors"
        >
          Cancelar
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveFeedback}
            disabled={saved === 'saving'}
            className="px-3 py-2 text-sm font-medium rounded-lg border border-[#2d2d3a] text-[#94a3b8] hover:text-[#e2e8f0] hover:border-[#3d3d4a] transition-colors"
          >
            {saved === 'saving' ? 'Salvando...' : 'Regenerar'}
          </button>

          {editMode ? (
            <button
              onClick={handleSaveEdit}
              className="px-3 py-2 text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              Salvar edicao
            </button>
          ) : (
            <button
              onClick={handleRegenerateAndAdjust}
              className="px-3 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              Regenerar e ajusto
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
