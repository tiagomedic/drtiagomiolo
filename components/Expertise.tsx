'use client'

import { motion } from 'framer-motion'

const cards = [
  {
    num: '01',
    title: 'Cirurgia Plástica',
    items: [
      'Especialista pela SBCP e AMB',
      'Procedimentos estéticos e reconstrutivos',
      'Membro ativo da SBCP e ISAPS',
      'Atuação em BH e São Paulo',
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
      'AuditMed — auditoria médica',
      'Venture building em healthtech',
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
      className="bg-white text-black py-24 px-5 sm:px-8 md:px-16 lg:px-24 border-t border-zinc-100"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-3">
            Expertise
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-none">
            Três pilares,<br />uma visão.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.num}
              className="border border-zinc-200 rounded-2xl p-8 flex flex-col gap-6 hover:border-zinc-400 transition-colors"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={i}
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-zinc-300">
                {card.num}
              </span>
              <h3 className="text-xl font-semibold tracking-tight">{card.title}</h3>
              <ul className="flex flex-col gap-2">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-zinc-500 leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-zinc-300 mt-1">—</span>
                    {item}
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
