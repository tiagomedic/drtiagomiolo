# Design Spec — Portfolio Dr. Tiago Miolo
**Data:** 2026-05-22  
**Repositório:** tiagohub (`hub.tiagomiolo.com`)  
**Abordagem:** B — Single-page completo

---

## 1. Objetivo

Site de personal branding para Dr. Tiago Miolo: cirurgião plástico, coordenador da comissão de IA & Tecnologias da SBCP, fundador da Prevvine (única healthtech IA selecionada para o Sandbox Regulatório da ANPD) e StaiDoc.

Público-alvo: médicos/profissionais de saúde + investidores/empresários tech.

---

## 2. Stack

- **Next.js** (App Router) — já existe em tiagohub
- **Tailwind CSS** — já configurado
- **Framer Motion** — animações de entrada
- **Three.js** — DNA 3D canvas (cliente apenas)
- **Lucide React** — ícones (ArrowUpRight, X, Menu)
- **Fonte:** Inter (Google Fonts)

---

## 3. Paleta

| Token | Valor | Uso |
|---|---|---|
| `--bg-dark` | `#000000` | Hero, Contato |
| `--bg-light` | `#FFFFFF` | Sobre Mim, Expertise |
| `--bg-mid` | `#111111` | Projetos |
| `--text-primary` | `#FFFFFF` | Texto sobre fundo escuro |
| `--text-dark` | `#000000` | Texto sobre fundo claro |
| `--text-muted` | `#9CA3AF` | Labels de stats, meta |
| `--border` | `#27272A` | Bordas sutis |

Sem cor accent colorida — minimalismo preto/branco/cinza puro.

---

## 4. Estrutura de Arquivos

```
app/
  page.tsx              → monta todas as seções em ordem
  layout.tsx            → Inter font, metadata SEO, viewport
components/
  Hero.tsx              → hero completo (nav + stats + heading + DNA)
  DnaCanvas.tsx         → Three.js double helix, "use client"
  SobreMim.tsx          → foto + bio two-column
  Expertise.tsx         → 3 cards (Cirurgia, IA, Empreendedorismo)
  Projetos.tsx          → cards Prevvine, StaiDoc, AuditMed
  Contato.tsx           → email, LinkedIn, CTA
```

---

## 5. Hero Section

Adaptado do prompt fornecido pelo usuário com as seguintes mudanças:

### Background
- `DnaCanvas` full-screen, `position: absolute, inset: 0, z-index: 0`
- DNA double helix em Three.js: esferas brancas + bastões cinza conectando os pares
- Rotação contínua no eixo Y (~0.003 rad/frame)
- Fundo preto puro

### Navegação
- **Logo:** texto "TM" — `font-semibold, tracking-widest, text-white`
- **Links (md+):** Sobre Mim · Expertise · Projetos · Contato — uppercase, tracking-widest
- **Hamburger:** botão redondo preto (36px) com ícones brancos
- **Mobile menu:** overlay branco full-screen com os 4 links em `text-3xl`

### Stats (centro-direita)
```
+15          #1         SBCP
ANOS DE      HEALTHTECH  COMISSÃO
EXPERIÊNCIA  IA ANPD     IA & TECH
```
- Número: `clamp(1.5rem, 5vw, 3.5rem)`, branco
- "+" em cinza (`#9CA3AF`), menor
- Label: `text-xs md:text-sm`, cinza, uppercase

### Bottom Content
- **Tagline (esquerda):** "Transformando / Medicina com / Tecnologia"
- **CTA (direita):** "Saiba Mais ↗" — texto branco, `text-xl md:text-2xl`
- **Descrição (esquerda):** "Cirurgião Plástico · Fundador de HealthTechs · IA na Saúde"
- **Heading (direita):** três palavras com clip reveal:
  - TECNOLOGIA.
  - MEDICINA.
  - INOVAÇÃO.
  - `clamp(2rem, 9vw, 9rem)`, `lineHeight: 0.88`, branco

### Animações Framer Motion
- `fadeDown`: nav elementos, delay escalonado `index * 0.1s`
- `fadeUp`: stats e bottom content, delay `index * 0.12s`
- `slideUp` clip: heading words, `y: "110%" → 0`, delay `0.4 + i*0.14s`

---

## 6. Seções de Conteúdo

### Sobre Mim (`bg-white`)
- Layout: duas colunas — foto à esquerda, bio à direita (mobile: empilhado)
- Bio: cargo, SBCP, Prevvine ANPD, cursos (ML, Big Data Saúde, Engenharia de Software)
- Animação: `fadeUp` on scroll via Framer Motion `whileInView`

### Expertise (`bg-white`)
- 3 cards em grid `grid-cols-1 md:grid-cols-3`
- **Cirurgia Plástica:** formação, especialidades, sociedades (SBCP)
- **IA & Tecnologia na Saúde:** ML, Big Data, Engenharia de Software, coordenação SBCP IA
- **Empreendedorismo:** Prevvine (Sandbox ANPD), StaiDoc, AuditMed
- Cards: borda cinza `#27272A`, padding `p-8`, título `text-xl font-semibold`

### Projetos (`bg-[#111111]`, texto branco)
- 3 cards: Prevvine · StaiDoc · AuditMed
- Cada card: nome, tagline, descrição curta, link externo `↗`
- Grid `grid-cols-1 md:grid-cols-3`

### Contato (`bg-black`)
- Título: "Vamos Conversar"
- Email: contato@drtiagomiolo.com.br
- LinkedIn: link com ícone
- CTA botão branco: "Fale Comigo"
- Rodapé: "© 2026 Tiago Miolo · Medicina & Tecnologia"

---

## 7. DNA Animation (Three.js)

```
DnaCanvas.tsx ("use client")
- useEffect: cria Scene, PerspectiveCamera, WebGLRenderer
- Geometria: double helix
  - 2 colunas de esferas (SphereGeometry r=0.15) em espiral
  - Bastões (CylinderGeometry) conectando pares entre as colunas
  - Material: MeshBasicMaterial (white/gray, sem luz necessária)
- Rotação: requestAnimationFrame, helix.rotation.y += 0.003
- Resize: ResizeObserver para manter canvas full-screen
- Cleanup: renderer.dispose() no return do useEffect
```

---

## 8. Responsividade

Mobile-first, três tiers: default / `sm:` (640px) / `md:` (768px)  
Nav links ocultos no mobile → hamburger menu overlay.

---

## 9. SEO / Metadata

```tsx
// app/layout.tsx
metadata = {
  title: "Dr. Tiago Miolo — Cirurgia Plástica & IA na Saúde",
  description: "Cirurgião plástico, coordenador da comissão de IA da SBCP e fundador da Prevvine — única healthtech IA no Sandbox Regulatório da ANPD.",
  openGraph: { ... }
}
```

---

## 10. Conteúdo a Fornecer (antes da implementação)

| Item | Status |
|---|---|
| Foto profissional (jpg/png) → `public/foto-tiago.jpg` | ⏳ aguardando |
| URL LinkedIn | ⏳ aguardando |
| URL Prevvine | ⏳ aguardando |
| URL StaiDoc | ⏳ aguardando |
| Anos de experiência (confirmação do "15") | ⏳ aguardando |

A implementação usará placeholders para esses itens — substituição trivial depois.

---

## 11. Critérios de Sucesso

- [ ] Hero carrega com DNA girando em < 3s
- [ ] Animações Framer Motion fluidas no scroll
- [ ] Mobile menu funciona corretamente
- [ ] Todas as seções visíveis e legíveis no mobile
- [ ] Deploy via GitHub push (tiagohub repo) → Vercel automático
