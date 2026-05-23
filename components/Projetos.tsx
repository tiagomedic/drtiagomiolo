'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projetos = [
  {
    num: '01',
    name: 'Prevvine',
    tagline: 'IA regulada para saúde',
    desc: 'Única healthtech de inteligência artificial selecionada para o Sandbox Regulatório em IA da ANPD. Tratamento de dados clínicos com IA segura e em conformidade regulatória.',
    url: 'https://prevvine.dev/',
  },
  {
    num: '02',
    name: 'StaiDoc',
    tagline: 'Diagnósticos por evidência',
    desc: 'Plataforma de suporte diagnóstico baseada em evidências médicas, aplicando inteligência artificial para aprimorar a tomada de decisão clínica.',
    url: 'https://staidoc.com/',
  },
  {
    num: '03',
    name: 'Prevvine Auth',
    tagline: 'Autenticação médica segura',
    desc: 'Plataforma de autenticação e controle de acesso para profissionais e instituições de saúde, com conformidade regulatória e integração ao ecossistema Prevvine.',
    url: 'https://prevvine.dev/',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: 'spring' as const, stiffness: 100, damping: 20 },
  }),
}

export default function Projetos() {
  return (
    <section
      id="projetos"
      className="relative bg-[#0a0a0a] text-white py-32 px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Número âncora de fundo */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-6 right-0 font-semibold text-white/[0.03] leading-none"
        style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
      >
        03
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
            Projetos
          </p>
          <h2
            className="font-semibold tracking-tight leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Empresas que<br />transformam saúde.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projetos.map((p, i) => {
            const isExternal = p.url !== '#'
            return (
              <motion.a
                key={p.num}
                href={p.url}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group relative border border-zinc-800 rounded-2xl p-8 flex flex-col gap-5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
              >
                {/* neon glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: '0 0 28px rgba(59,130,246,0.1), inset 0 0 20px rgba(59,130,246,0.04)' }}
                />
                <div className="pointer-events-none absolute bottom-0 left-[12.5%] w-3/4 h-px opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
                <div className="pointer-events-none absolute top-0 left-[12.5%] w-3/4 h-px opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-700">
                    {p.num}
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="text-zinc-700 group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold text-white">{p.name}</h3>
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500">
                    {p.tagline}
                  </p>
                </div>
                <p className="text-[13px] text-zinc-400 leading-relaxed">{p.desc}</p>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
