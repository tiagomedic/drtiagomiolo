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
      className="bg-black text-white py-24 px-5 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Foto com borda neon */}
        <motion.div
          className="group relative w-full aspect-[3/4] rounded-2xl overflow-hidden"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Neon border frame */}
          <div className="absolute inset-0 rounded-2xl border border-blue-500/30 z-10 pointer-events-none" />
          {/* Neon glow */}
          <div
            className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
            style={{ boxShadow: '0 0 32px rgba(59,130,246,0.18), inset 0 0 24px rgba(59,130,246,0.06)' }}
          />
          {/* Top line */}
          <div className="absolute top-0 left-[12.5%] w-3/4 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 z-10 pointer-events-none" />
          {/* Bottom line */}
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
          className="flex flex-col gap-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
              Sobre Mim
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-none mb-6 text-white">
              Dr. Tiago Miolo
            </h2>
            <div className="flex flex-col gap-4 text-sm sm:text-base text-zinc-400 leading-relaxed">
              <p>
                Médico Cirurgião Plástico. Coordenador da Comissão de Inteligência
                Artificial e Tecnologias da Sociedade Brasileira de Cirurgia Plástica (SBCP).
              </p>
              <p>
                Fundador da <strong className="text-white">Prevvine</strong> — única
                healthtech de IA selecionada para o Sandbox Regulatório em Inteligência
                Artificial da ANPD — e da{' '}
                <strong className="text-white">StaiDoc</strong>, plataforma de
                diagnósticos baseados em evidências médicas.
              </p>
              <p>
                Formação em Machine Learning, Big Data em Saúde e Engenharia de Software,
                com foco em aplicar IA de forma segura e regulada no sistema de saúde
                brasileiro.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
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
                className="px-3 py-1 border border-zinc-700 text-zinc-400 text-xs font-semibold tracking-widest uppercase rounded-full hover:border-blue-500/40 hover:text-white transition-colors duration-300"
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
