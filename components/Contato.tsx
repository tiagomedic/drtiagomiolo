'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, ExternalLink } from 'lucide-react'

export default function Contato() {
  return (
    <section
      id="contato"
      className="bg-black text-white py-24 px-5 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
            Contato
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-none">
            Vamos<br />Conversar.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg max-w-md leading-relaxed">
            Projetos em IA na saúde, parcerias em cirurgia plástica, palestras ou
            colaborações institucionais.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="mailto:contato@drtiagomiolo.com.br"
            className="flex items-center gap-3 border border-zinc-800 rounded-full px-6 py-3 hover:border-zinc-500 hover:text-white transition-colors text-zinc-300 text-sm font-semibold tracking-widest uppercase"
          >
            <Mail size={16} />
            contato@drtiagomiolo.com.br
          </a>
          <a
            href="https://www.linkedin.com/in/tiago-miolo-a4b61b186/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-zinc-800 rounded-full px-6 py-3 hover:border-zinc-500 hover:text-white transition-colors text-zinc-300 text-sm font-semibold tracking-widest uppercase"
          >
            <ExternalLink size={16} />
            LinkedIn
            <ArrowUpRight size={14} />
          </a>
        </motion.div>

        <div className="pt-12 border-t border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-zinc-600 text-xs font-semibold tracking-widest uppercase">
            © 2026 Tiago Miolo · Medicina & Tecnologia
          </span>
          <span className="text-zinc-700 text-xs font-semibold tracking-widest uppercase">
            TM
          </span>
        </div>
      </div>
    </section>
  )
}
