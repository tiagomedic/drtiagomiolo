'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, ExternalLink } from 'lucide-react'

export default function Contato() {
  return (
    <section
      id="contato"
      className="relative bg-black text-white py-32 px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Número âncora de fundo */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-6 right-0 font-semibold text-white/[0.03] leading-none"
        style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
      >
        04
      </span>

      <div className="relative max-w-6xl mx-auto flex flex-col gap-20">
        <motion.div
          className="flex flex-col gap-8 max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-500">
            Contato
          </p>
          <h2
            className="font-semibold tracking-tight leading-[0.92] text-white"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
          >
            Construa o<br />futuro da saúde<br />comigo.
          </h2>
          <p className="text-[15px] text-zinc-400 leading-relaxed max-w-md">
            Projetos em IA na saúde, palestras ou colaborações institucionais.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="mailto:contato@drtiagomiolo.com.br"
            className="flex items-center gap-3 border border-zinc-800 rounded-full px-6 py-3 hover:border-zinc-600 hover:text-white transition-colors duration-300 text-zinc-400 text-[12px] font-semibold tracking-[0.2em] uppercase"
          >
            <Mail size={14} />
            contato@drtiagomiolo.com.br
          </a>
          <a
            href="https://www.linkedin.com/in/tiago-miolo-a4b61b186/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-zinc-800 rounded-full px-6 py-3 hover:border-zinc-600 hover:text-white transition-colors duration-300 text-zinc-400 text-[12px] font-semibold tracking-[0.2em] uppercase"
          >
            <ExternalLink size={14} />
            LinkedIn
            <ArrowUpRight size={13} />
          </a>
        </motion.div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-zinc-700 text-[11px] font-semibold tracking-[0.2em] uppercase">
            © 2026 Tiago Miolo · Medicina & Tecnologia
          </span>
          <span className="text-zinc-800 text-[11px] font-semibold tracking-[0.2em] uppercase">
            TM
          </span>
        </div>
      </div>
    </section>
  )
}
