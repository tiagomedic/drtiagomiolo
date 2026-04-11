'use client'

import { useState } from 'react'
import { InstagramSlide, Pilar } from '@/lib/types'
import { getPilarGradient, getPilarColor } from '@/lib/calendar'

interface CarouselPreviewProps {
  slides: InstagramSlide[]
  pilar: Pilar
}

const SLIDE_TYPE_LABELS: Record<string, string> = {
  hook: 'Hook',
  content: 'Conteudo',
  cta: 'CTA',
}

function SlideModal({
  slide,
  total,
  pilar,
  onClose,
  onPrev,
  onNext,
}: {
  slide: InstagramSlide
  total: number
  pilar: Pilar
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const gradient = getPilarGradient(pilar)
  const color = getPilarColor(pilar)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Slide preview */}
        <div
          className="relative w-full aspect-square rounded-2xl overflow-hidden flex flex-col items-center justify-center p-10"
          style={{ background: gradient }}
        >
          {/* Accent top bar */}
          <div className="absolute top-0 inset-x-0 h-1.5" style={{ backgroundColor: `${color}50` }} />

          {/* Slide number */}
          <div className="absolute top-5 left-5 text-xs font-medium" style={{ color: `${color}80` }}>
            {slide.order}/{total}
          </div>

          {/* Main text */}
          <p className="text-white text-2xl font-black text-center leading-snug whitespace-pre-line">
            {slide.text}
          </p>

          {/* Logo mark */}
          <div
            className="absolute bottom-4 left-5 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white"
            style={{ backgroundColor: `${color}30` }}
          >
            TM
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={onPrev}
            disabled={slide.order <= 1}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-[#2d2d3a] text-[#94a3b8] hover:text-white hover:border-[#3d3d4a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>

          <div className="flex gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{
                  backgroundColor: i + 1 === slide.order ? color : '#2d2d3a',
                  transform: i + 1 === slide.order ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>

          <button
            onClick={onNext}
            disabled={slide.order >= total}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-[#2d2d3a] text-[#94a3b8] hover:text-white hover:border-[#3d3d4a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Proximo
          </button>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 bg-[#18181f] border border-[#2d2d3a] rounded-full flex items-center justify-center text-[#64748b] hover:text-white transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function CarouselPreview({ slides, pilar }: CarouselPreviewProps) {
  const [activeSlide, setActiveSlide] = useState<number | null>(null)
  const gradient = getPilarGradient(pilar)
  const color = getPilarColor(pilar)

  const currentSlide = activeSlide !== null ? slides[activeSlide] : null

  function goToSlide(index: number) {
    if (index >= 0 && index < slides.length) {
      setActiveSlide(index)
    }
  }

  return (
    <>
      <div>
        <p className="text-xs text-[#64748b] font-medium mb-2 uppercase tracking-wide">
          Preview slides ({slides.length})
        </p>
        <div className="flex gap-2 flex-wrap">
          {slides.map((slide, i) => (
            <button
              key={slide.order}
              onClick={() => setActiveSlide(i)}
              className="slide-thumb relative group flex-shrink-0 rounded-lg overflow-hidden cursor-pointer ring-2 ring-transparent hover:ring-offset-1 hover:ring-offset-[#18181f] transition-all"
              style={{
                width: 52,
                height: 52,
                background: gradient,
                outline: `2px solid transparent`,
              }}
              title={`Slide ${slide.order}: ${SLIDE_TYPE_LABELS[slide.type]}`}
              aria-label={`Ver slide ${slide.order}`}
            >
              {/* Slide number */}
              <span
                className="absolute top-1 left-1 text-[9px] font-bold"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {slide.order}
              </span>

              {/* Type indicator */}
              <span
                className="absolute bottom-1 right-1 w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    slide.type === 'hook' ? color :
                    slide.type === 'cta' ? '#10b981' :
                    'rgba(255,255,255,0.4)',
                }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>

      {currentSlide && (
        <SlideModal
          slide={currentSlide}
          total={slides.length}
          pilar={pilar}
          onClose={() => setActiveSlide(null)}
          onPrev={() => goToSlide(activeSlide! - 1)}
          onNext={() => goToSlide(activeSlide! + 1)}
        />
      )}
    </>
  )
}
