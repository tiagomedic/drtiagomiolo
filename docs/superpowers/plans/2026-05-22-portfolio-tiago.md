# Portfolio Dr. Tiago Miolo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o root `/` do tiagohub por um portfolio single-page imersivo para Dr. Tiago Miolo, com hero Three.js DNA 3D + seções de conteúdo, mantendo `/hub` intacto.

**Architecture:** Single-page Next.js (App Router) com hero hero full-screen e seções abaixo. DnaCanvas é um componente `"use client"` isolado com Three.js. Animações via Framer Motion — `fadeDown` no nav, `fadeUp` no load, `whileInView` nas seções de conteúdo.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS 3, Framer Motion, Three.js, Lucide React, Inter (next/font/google)

---

## File Map

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `app/layout.tsx` | Modificar | Inter font, metadata SEO, body bg-black |
| `app/page.tsx` | Substituir | Compõe todas as seções do portfolio |
| `app/globals.css` | Modificar | Remover background escuro antigo, garantir scroll suave |
| `components/DnaCanvas.tsx` | Criar | Three.js double helix, "use client" |
| `components/Hero.tsx` | Criar | Nav + Stats + Bottom + DnaCanvas canvas |
| `components/SobreMim.tsx` | Criar | Foto placeholder + bio |
| `components/Expertise.tsx` | Criar | 3 cards de competência |
| `components/Projetos.tsx` | Criar | Cards Prevvine, StaiDoc, AuditMed |
| `components/Contato.tsx` | Criar | Email, LinkedIn, CTA, rodapé |

> O diretório `app/hub/` e seus componentes em `components/` existentes NÃO são tocados.

---

## Task 1: Instalar dependências

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Instalar pacotes**

```bash
cd /Users/tiagomiolom1/tiagohub
npm install framer-motion three lucide-react
npm install --save-dev @types/three
```

Expected output: `added N packages` sem erros.

- [ ] **Step 2: Verificar package.json**

```bash
grep -E '"framer-motion|three|lucide-react"' package.json
```

Expected: as três entradas aparecem nas dependencies.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add framer-motion, three, lucide-react"
```

---

## Task 2: Atualizar layout.tsx e globals.css

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Substituir app/layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dr. Tiago Miolo — Cirurgia Plástica & IA na Saúde',
  description:
    'Cirurgião plástico, coordenador da comissão de IA da SBCP e fundador da Prevvine — única healthtech IA no Sandbox Regulatório da ANPD.',
  openGraph: {
    title: 'Dr. Tiago Miolo',
    description: 'Medicina, Tecnologia e Inovação.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Limpar globals.css**

Substituir o conteúdo de `app/globals.css` por:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 3: Verificar build**

```bash
cd /Users/tiagomiolom1/tiagohub && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully` ou similar. Pode aparecer aviso sobre /hub — OK.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "style: Inter font, black background, SEO metadata"
```

---

## Task 3: DnaCanvas — Three.js Double Helix

**Files:**
- Create: `components/DnaCanvas.tsx`

- [ ] **Step 1: Criar DnaCanvas.tsx**

```tsx
// components/DnaCanvas.tsx
'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function DnaCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 7)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // DNA Group
    const helix = new THREE.Group()
    scene.add(helix)

    const NUM_POINTS = 60
    const TURNS = 3
    const HELIX_RADIUS = 1.4
    const HEIGHT = 9

    const sphereGeo = new THREE.SphereGeometry(0.09, 10, 10)
    const mat1 = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const mat2 = new THREE.MeshBasicMaterial({ color: 0x9ca3af })
    const bridgeMat = new THREE.MeshBasicMaterial({ color: 0x27272a })

    const positions1: THREE.Vector3[] = []
    const positions2: THREE.Vector3[] = []

    for (let i = 0; i < NUM_POINTS; i++) {
      const t = i / (NUM_POINTS - 1)
      const angle = t * Math.PI * 2 * TURNS
      const y = (t - 0.5) * HEIGHT

      const x1 = HELIX_RADIUS * Math.cos(angle)
      const z1 = HELIX_RADIUS * Math.sin(angle)
      const x2 = HELIX_RADIUS * Math.cos(angle + Math.PI)
      const z2 = HELIX_RADIUS * Math.sin(angle + Math.PI)

      const v1 = new THREE.Vector3(x1, y, z1)
      const v2 = new THREE.Vector3(x2, y, z2)
      positions1.push(v1)
      positions2.push(v2)

      // Strand spheres
      const s1 = new THREE.Mesh(sphereGeo, mat1)
      s1.position.copy(v1)
      helix.add(s1)

      const s2 = new THREE.Mesh(sphereGeo, mat2)
      s2.position.copy(v2)
      helix.add(s2)
    }

    // Strand lines
    const lineGeo1 = new THREE.BufferGeometry().setFromPoints(positions1)
    const lineGeo2 = new THREE.BufferGeometry().setFromPoints(positions2)
    const lineMat1 = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.6, transparent: true })
    const lineMat2 = new THREE.LineBasicMaterial({ color: 0x9ca3af, opacity: 0.6, transparent: true })
    helix.add(new THREE.Line(lineGeo1, lineMat1))
    helix.add(new THREE.Line(lineGeo2, lineMat2))

    // Cross bridges every 5 points
    for (let i = 0; i < NUM_POINTS; i += 5) {
      const v1 = positions1[i]
      const v2 = positions2[i]
      const mid = v1.clone().add(v2).multiplyScalar(0.5)
      const dir = v2.clone().sub(v1)
      const len = dir.length()

      const bridgeGeo = new THREE.CylinderGeometry(0.025, 0.025, len, 6)
      const bridge = new THREE.Mesh(bridgeGeo, bridgeMat)
      bridge.position.copy(mid)

      const axis = new THREE.Vector3(0, 1, 0)
      bridge.quaternion.setFromUnitVectors(axis, dir.normalize())
      helix.add(bridge)
    }

    // Animation
    let animId: number
    const animate = () => {
      animId = requestAnimationFrame(animate)
      helix.rotation.y += 0.004
      renderer.render(scene, camera)
    }
    animate()

    // Resize
    const handleResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    const ro = new ResizeObserver(handleResize)
    ro.observe(mount)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />
}
```

- [ ] **Step 2: Verificar build**

```bash
cd /Users/tiagomiolom1/tiagohub && npm run build 2>&1 | tail -10
```

Expected: sem erro de tipo no DnaCanvas.

- [ ] **Step 3: Commit**

```bash
git add components/DnaCanvas.tsx
git commit -m "feat: Three.js DNA double helix canvas component"
```

---

## Task 4: Hero — Nav e Mobile Menu

**Files:**
- Create: `components/Hero.tsx` (parcial — será completado nas tarefas seguintes)

- [ ] **Step 1: Criar Hero.tsx com nav e mobile menu**

```tsx
// components/Hero.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X, Menu } from 'lucide-react'
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
          {/* Logo TM */}
          <motion.span
            className="text-white font-semibold tracking-widest uppercase text-sm md:text-base"
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            TM
          </motion.span>

          {/* Links desktop */}
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

          {/* Hamburger */}
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

        {/* STATS ROW — será adicionado na Task 5 */}
        {/* BOTTOM CONTENT — será adicionado na Task 6 */}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Criar app/page.tsx temporário para visualizar**

```tsx
// app/page.tsx
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  )
}
```

- [ ] **Step 3: Verificar build**

```bash
cd /Users/tiagomiolom1/tiagohub && npm run build 2>&1 | tail -10
```

Expected: sem erros de tipo.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: Hero nav + mobile menu + DnaCanvas integration"
```

---

## Task 5: Hero — Stats Row

**Files:**
- Modify: `components/Hero.tsx`

- [ ] **Step 1: Adicionar Stats Row dentro do Hero.tsx**

Localizar o comentário `{/* STATS ROW — será adicionado na Task 5 */}` e substituir por:

```tsx
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
```

- [ ] **Step 2: Verificar build**

```bash
cd /Users/tiagomiolom1/tiagohub && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: Hero stats row (+15 anos, #1 ANPD, SBCP)"
```

---

## Task 6: Hero — Bottom Content (Tagline, Heading, CTA)

**Files:**
- Modify: `components/Hero.tsx`

- [ ] **Step 1: Adicionar Bottom Content no Hero.tsx**

Localizar o comentário `{/* BOTTOM CONTENT — será adicionado na Task 6 */}` e substituir por:

```tsx
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
```

- [ ] **Step 2: Verificar build**

```bash
cd /Users/tiagomiolom1/tiagohub && npm run build 2>&1 | tail -10
```

- [ ] **Step 3: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: Hero bottom content — tagline, CTA, heading clip reveal"
```

---

## Task 7: SobreMim Section

**Files:**
- Create: `components/SobreMim.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Criar SobreMim.tsx**

```tsx
// components/SobreMim.tsx
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
        {/* Foto */}
        <motion.div
          className="w-full aspect-[3/4] bg-zinc-100 rounded-2xl overflow-hidden relative"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Substituir src por foto real: public/foto-tiago.jpg */}
          <div className="w-full h-full flex items-center justify-center bg-zinc-200">
            <span className="text-zinc-400 font-semibold tracking-widest uppercase text-sm">
              Foto
            </span>
          </div>
        </motion.div>

        {/* Bio */}
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
```

- [ ] **Step 2: Adicionar SobreMim no app/page.tsx**

```tsx
// app/page.tsx
import Hero from '@/components/Hero'
import SobreMim from '@/components/SobreMim'

export default function Home() {
  return (
    <main>
      <Hero />
      <SobreMim />
    </main>
  )
}
```

- [ ] **Step 3: Verificar build**

```bash
cd /Users/tiagomiolom1/tiagohub && npm run build 2>&1 | tail -10
```

- [ ] **Step 4: Commit**

```bash
git add components/SobreMim.tsx app/page.tsx
git commit -m "feat: SobreMim section with bio and tags"
```

---

## Task 8: Expertise Section

**Files:**
- Create: `components/Expertise.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Criar Expertise.tsx**

```tsx
// components/Expertise.tsx
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
```

- [ ] **Step 2: Adicionar Expertise no app/page.tsx**

```tsx
// app/page.tsx
import Hero from '@/components/Hero'
import SobreMim from '@/components/SobreMim'
import Expertise from '@/components/Expertise'

export default function Home() {
  return (
    <main>
      <Hero />
      <SobreMim />
      <Expertise />
    </main>
  )
}
```

- [ ] **Step 3: Verificar build**

```bash
cd /Users/tiagomiolom1/tiagohub && npm run build 2>&1 | tail -10
```

- [ ] **Step 4: Commit**

```bash
git add components/Expertise.tsx app/page.tsx
git commit -m "feat: Expertise section — 3 cards (Cirurgia, IA, Empreendedorismo)"
```

---

## Task 9: Projetos Section

**Files:**
- Create: `components/Projetos.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Criar Projetos.tsx**

```tsx
// components/Projetos.tsx
'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projetos = [
  {
    num: '01',
    name: 'Prevvine',
    tagline: 'IA regulada para saúde',
    desc: 'Única healthtech de inteligência artificial selecionada para o Sandbox Regulatório em IA da ANPD. Tratamento de dados clínicos com IA segura e em conformidade regulatória.',
    url: 'https://prevvine.com.br', // atualizar se necessário
  },
  {
    num: '02',
    name: 'StaiDoc',
    tagline: 'Diagnósticos por evidência',
    desc: 'Plataforma de suporte diagnóstico baseada em evidências médicas, aplicando inteligência artificial para aprimorar a tomada de decisão clínica.',
    url: '#', // atualizar com URL real
  },
  {
    num: '03',
    name: 'AuditMed',
    tagline: 'Auditoria médica inteligente',
    desc: 'Sistema de auditoria médica com conformidade à RN 623 da ANS. Automatiza glosas, análise de guias e relatórios de qualidade assistencial.',
    url: 'https://auditmed.vercel.app',
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

export default function Projetos() {
  return (
    <section
      id="projetos"
      className="bg-[#111111] text-white py-24 px-5 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
            Projetos
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-none">
            Empresas que<br />transformam saúde.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projetos.map((p, i) => (
            <motion.a
              key={p.num}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-zinc-800 rounded-2xl p-8 flex flex-col gap-4 hover:border-zinc-600 transition-colors group"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={i}
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold tracking-widest uppercase text-zinc-600">
                  {p.num}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-zinc-600 group-hover:text-white transition-colors"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{p.name}</h3>
                <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400">
                  {p.tagline}
                </p>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Adicionar Projetos no app/page.tsx**

```tsx
// app/page.tsx
import Hero from '@/components/Hero'
import SobreMim from '@/components/SobreMim'
import Expertise from '@/components/Expertise'
import Projetos from '@/components/Projetos'

export default function Home() {
  return (
    <main>
      <Hero />
      <SobreMim />
      <Expertise />
      <Projetos />
    </main>
  )
}
```

- [ ] **Step 3: Verificar build**

```bash
cd /Users/tiagomiolom1/tiagohub && npm run build 2>&1 | tail -10
```

- [ ] **Step 4: Commit**

```bash
git add components/Projetos.tsx app/page.tsx
git commit -m "feat: Projetos section — Prevvine, StaiDoc, AuditMed"
```

---

## Task 10: Contato Section + page.tsx final

**Files:**
- Create: `components/Contato.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Criar Contato.tsx**

```tsx
// components/Contato.tsx
'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, Linkedin } from 'lucide-react'

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
            href="https://linkedin.com/in/tiagomiolo" // atualizar com URL real do LinkedIn
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-zinc-800 rounded-full px-6 py-3 hover:border-zinc-500 hover:text-white transition-colors text-zinc-300 text-sm font-semibold tracking-widest uppercase"
          >
            <Linkedin size={16} />
            LinkedIn
            <ArrowUpRight size={14} />
          </a>
        </motion.div>

        {/* Rodapé */}
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
```

- [ ] **Step 2: Finalizar app/page.tsx com todas as seções**

```tsx
// app/page.tsx
import Hero from '@/components/Hero'
import SobreMim from '@/components/SobreMim'
import Expertise from '@/components/Expertise'
import Projetos from '@/components/Projetos'
import Contato from '@/components/Contato'

export default function Home() {
  return (
    <main>
      <Hero />
      <SobreMim />
      <Expertise />
      <Projetos />
      <Contato />
    </main>
  )
}
```

- [ ] **Step 3: Verificar build completo**

```bash
cd /Users/tiagomiolom1/tiagohub && npm run build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully`, sem erros de tipo, warnings de imagem são OK.

- [ ] **Step 4: Commit**

```bash
git add components/Contato.tsx app/page.tsx
git commit -m "feat: Contato section + complete page composition"
```

---

## Task 11: Deploy via GitHub push

**Files:** nenhum novo

- [ ] **Step 1: Verificar remote**

```bash
cd /Users/tiagomiolom1/tiagohub && git remote -v
```

Expected: origem apontando para GitHub (tiagomedic/tiagohub ou similar).

- [ ] **Step 2: Push para main**

```bash
cd /Users/tiagomiolom1/tiagohub && git push origin main
```

Expected: push aceito, Vercel detecta e inicia deploy automático.

- [ ] **Step 3: Confirmar deploy**

Aguardar ~2 min e acessar `hub.tiagomiolo.com` no browser para confirmar portfolio ao vivo.

---

## Pós-implementação: substituições de placeholder

Após o deploy, estas substituições são triviais (editar o arquivo e fazer push):

| Placeholder | Arquivo | O que colocar |
|---|---|---|
| Foto (div cinza) | `components/SobreMim.tsx` | Salvar foto em `public/foto-tiago.jpg`, usar `<Image>` |
| URL LinkedIn | `components/Contato.tsx` | URL real do perfil |
| URL StaiDoc | `components/Projetos.tsx` | URL real |
| Anos de experiência | `components/Hero.tsx` | Confirmar `+15` ou ajustar |
