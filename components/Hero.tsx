'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import DnaCanvas from './DnaCanvas'

const NAV_LINKS = ['Sobre Mim', 'Expertise', 'Projetos', 'Contato']

const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const sectionIds: Record<string, string> = {
    'Sobre Mim': 'sobre-mim',
    Expertise: 'expertise',
    Projetos: 'projetos',
    Contato: 'contato',
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* DNA Background */}
      <div className="absolute inset-0 z-0">
        <DnaCanvas />
      </div>

      {/* Overlay escurecedor suave */}
      <div className="absolute inset-0 z-[1] bg-black/40" />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* NAV */}
        <nav className="flex items-center justify-between px-5 sm:px-8 md:px-12 pt-5 md:pt-6">
          <motion.span
            className="text-white font-semibold tracking-widest uppercase text-sm md:text-base"
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            TM
          </motion.span>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link}
                onClick={() => scrollTo(sectionIds[link])}
                className="text-white/80 hover:text-white text-[13px] font-semibold tracking-widest uppercase transition-colors"
                variants={fadeDown}
                initial="hidden"
                animate="visible"
                custom={i + 1}
              >
                {link}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex flex-col items-center justify-center gap-[5px] transition-colors md:hidden"
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            custom={5}
            aria-label="Abrir menu"
          >
            <span className="w-4 h-[1.5px] bg-white" />
            <span className="w-4 h-[1.5px] bg-white" />
            <span className="w-4 h-[1.5px] bg-white" />
          </motion.button>
        </nav>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed inset-0 z-50 bg-white flex flex-col px-5 pt-5 pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-black font-semibold tracking-widest uppercase text-sm">TM</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-black flex items-center justify-center"
                  aria-label="Fechar menu"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>

              <div className="flex flex-col gap-8 mt-16">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollTo(sectionIds[link])}
                    className="text-black text-3xl font-semibold tracking-widest uppercase text-left"
                  >
                    {link}
                  </button>
                ))}
              </div>

              <div className="mt-auto">
                <button
                  onClick={() => scrollTo('sobre-mim')}
                  className="flex items-center gap-2 text-black text-xl font-semibold tracking-widest uppercase"
                >
                  Saiba Mais <ArrowUpRight size={22} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STATS ROW */}
        <div className="flex-1 flex items-center justify-end px-5 sm:px-8 md:px-12 py-8 md:py-0">
          <div className="flex gap-5 sm:gap-8 md:gap-10">
            {[
              { num: '+15', label: 'ANOS DE\nEXPERIÊNCIA', index: 2 },
              { num: '#1', label: 'HEALTHTECH\nIA ANPD', index: 3 },
              { num: 'SBCP', label: 'COMISSÃO\nIA & TECH', index: 4 },
            ].map(({ num, label, index }) => (
              <motion.div
                key={num}
                className="flex flex-col items-end"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <span
                  className="font-semibold text-white leading-none"
                  style={{ fontSize: 'clamp(1.4rem, 4.5vw, 3rem)' }}
                >
                  {num}
                </span>
                <span
                  className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-gray-400 whitespace-pre-line leading-tight text-right mt-1"
                >
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM CONTENT */}
        <div className="px-5 sm:px-8 md:px-12 pb-8 md:pb-12 flex flex-col gap-6 md:gap-10">
          {/* Row A: tagline + CTA */}
          <div className="flex items-center justify-between gap-4">
            <motion.p
              className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-white/80 max-w-[130px] sm:max-w-[160px] md:max-w-xs leading-tight"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
            >
              Transformando /<br />
              Medicina com /<br />
              Tecnologia
            </motion.p>

            <motion.button
              onClick={() => scrollTo('sobre-mim')}
              className="flex items-center gap-2 text-white font-semibold tracking-widest uppercase whitespace-nowrap text-base sm:text-xl md:text-2xl hover:text-gray-300 transition-colors"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
            >
              Saiba Mais
              <ArrowUpRight size={18} className="sm:w-[22px] sm:h-[22px]" />
            </motion.button>
          </div>

          {/* Row B: descrição + heading */}
          <div className="flex items-end justify-between gap-3 sm:gap-4">
            <motion.div
              className="w-[120px] sm:w-[180px] md:w-[280px] shrink-0"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={7}
            >
              <p className="text-[9px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-white/60 text-left md:text-right leading-tight">
                Cirurgião Plástico ·<br />
                Fundador de HealthTechs ·<br />
                IA na Saúde
              </p>
            </motion.div>

            {/* Heading clip reveal */}
            <div className="flex flex-col items-end">
              {['TECNOLOGIA.', 'MEDICINA.', 'INOVAÇÃO.'].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.span
                    className="block font-semibold text-white uppercase text-right"
                    style={{
                      fontSize: 'clamp(2rem, 9vw, 9rem)',
                      lineHeight: 0.88,
                    }}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.4 + i * 0.14,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
