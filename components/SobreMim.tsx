'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function SobreMim() {
  return (
    <section
      id="sobre-mim"
      className="relative bg-black text-white py-32 px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Número âncora de fundo */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-6 right-0 font-semibold text-white/[0.03] leading-none"
        style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
      >
        01
      </span>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Foto com borda neon */}
        <motion.div
          className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="absolute inset-0 rounded-2xl border border-blue-500/30 z-10 pointer-events-none" />
          <div
            className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
            style={{ boxShadow: '0 0 32px rgba(59,130,246,0.18), inset 0 0 24px rgba(59,130,246,0.06)' }}
          />
          <div className="absolute top-0 left-[12.5%] w-3/4 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-[12.5%] w-3/4 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-40 z-10 pointer-events-none" />
          <Image
            src="/foto-tiago.jpg"
            alt="Dr. Tiago Miolo"
            fill
            className="object-cover object-top"
            priority
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="flex flex-col gap-6">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-500">
              Sobre Mim
            </p>
            <h2
              className="font-semibold tracking-tight leading-none text-white"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Tiago Miolo
            </h2>
            <div className="flex flex-col gap-4 text-[15px] text-zinc-400 leading-relaxed max-w-lg">
              <p>
                Médico Cirurgião Plástico. Coordenador da Comissão de Inteligência
                Artificial e Tecnologias da Sociedade Brasileira de Cirurgia Plástica (SBCP).
              </p>
              <p>
                Fundador da <strong className="text-white font-semibold">Prevvine</strong> — única
                healthtech de IA selecionada para o Sandbox Regulatório em Inteligência
                Artificial da ANPD — e da{' '}
                <strong className="text-white font-semibold">StaiDoc</strong>, plataforma de
                diagnósticos baseados em evidências médicas.
              </p>
              <p>
                Formação em Machine Learning, Big Data em Saúde e Engenharia de Software,
                com foco em aplicar IA de forma segura e regulada no sistema de saúde
                brasileiro.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              'Cirurgia Plástica',
              'IA na Saúde',
              'SBCP',
              'ANPD Sandbox',
              'Machine Learning',
              'Gestão Hospitalar',
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 border border-zinc-800 text-zinc-500 text-[10px] font-semibold tracking-[0.2em] uppercase rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
