'use client'

import { motion } from 'framer-motion'

const cards = [
  {
    num: '01',
    title: 'Cirurgia Plástica',
    items: [
      'Especialista pela SBCP e AMB',
      'Procedimentos estéticos e reconstrutivos',
      'Membro ativo da SBCP',
    ],
  },
  {
    num: '02',
    title: 'IA & Tecnologia na Saúde',
    items: [
      'Coordenador da Comissão de IA da SBCP',
      'Machine Learning aplicado à medicina',
      'Big Data em Saúde',
      'Engenharia de Software',
      'ANPD Sandbox Regulatório',
    ],
  },
  {
    num: '03',
    title: 'Empreendedorismo',
    items: [
      'Prevvine — IA regulada (ANPD Sandbox)',
      'StaiDoc — diagnósticos por evidência',
      'Prevvine Auth — plataforma de autenticação',
      'Venture building em healthtech',
    ],
  },
  {
    num: '04',
    title: 'Gestão e Liderança',
    items: [
      'Gestor Hospitalar',
      'Diretor Hospitalar no HMC Private',
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export default function Expertise() {
  return (
    <section
      id="expertise"
      className="relative bg-black text-white py-32 px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Número âncora de fundo */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-6 right-0 font-semibold text-white/[0.03] leading-none"
        style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
      >
        02
      </span>

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-500 mb-4">
            Expertise
          </p>
          <h2
            className="font-semibold tracking-tight leading-none text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Quatro pilares,<br />uma visão.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.num}
              className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-6 hover:border-zinc-600 transition-colors duration-300"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={i}
            >
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-700">
                {card.num}
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-white">{card.title}</h3>
              <ul className="flex flex-col gap-3">
                {card.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-zinc-700 text-[11px] mt-[3px] shrink-0">—</span>
                    <span className="text-[13px] text-zinc-400 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
