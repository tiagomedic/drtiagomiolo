'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function SobreMim() {
  return (
    <section
      id="sobre-mim"
      className="bg-white text-black py-24 px-5 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          className="w-full aspect-[3/4] bg-zinc-100 rounded-2xl overflow-hidden relative"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="w-full h-full flex items-center justify-center bg-zinc-200">
            <span className="text-zinc-400 font-semibold tracking-widest uppercase text-sm">
              Foto
            </span>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-3">
              Sobre Mim
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-none mb-6">
              Dr. Tiago Miolo
            </h2>
            <div className="flex flex-col gap-4 text-sm sm:text-base text-zinc-600 leading-relaxed">
              <p>
                Cirurgião plástico com atuação em Belo Horizonte e São Paulo. Coordenador
                da Comissão de Inteligência Artificial e Tecnologias da Sociedade
                Brasileira de Cirurgia Plástica (SBCP).
              </p>
              <p>
                Fundador da <strong className="text-black">Prevvine</strong> — única
                healthtech de IA selecionada para o Sandbox Regulatório em Inteligência
                Artificial da ANPD — e da{' '}
                <strong className="text-black">StaiDoc</strong>, plataforma de
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
                className="px-3 py-1 border border-zinc-200 text-zinc-600 text-xs font-semibold tracking-widest uppercase rounded-full"
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
