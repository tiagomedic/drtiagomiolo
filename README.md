# TiagoHub — Content Command Center

Hub privado de operações de conteúdo para Dr. Tiago Miolo.

Todo o conteúdo gerado pelos squads aparece aqui pronto para distribuição. Você copia e cola em cada rede em ~10 minutos.

---

## Setup Local

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.local.example .env.local
# Editar .env.local e definir HUB_PASSWORD=suasenha

# 3. Rodar em desenvolvimento
npm run dev
# Acesse: http://localhost:3000/hub
```

---

## Deploy (Vercel)

```bash
# 1. Conectar ao GitHub
git init
git add .
git commit -m "feat: TiagoHub inicial"
git remote add origin https://github.com/tiagomedic/tiagohub.git
git push -u origin main

# 2. Na Vercel:
# - Import project do GitHub
# - Add env var: HUB_PASSWORD = sua-senha-secreta
# - Deploy automático

# 3. Domínio customizado:
# Vercel → Settings → Domains → Add: hub.tiagomiolo.com
# No registro.br: CNAME hub → cname.vercel-dns.com
```

---

## Fluxo Semanal

### Segunda-feira (produção — ~30 min)
```bash
# 1. Newsletter
/opensquad run newsletter-ceo

# 2. LinkedIn (adapta automaticamente do brief)
/opensquad run linkedin-content

# 3. Instagram carrossel
/opensquad run plasticabrasil

# 4. X/Twitter
/opensquad run x-content

# 5. Commit para atualizar o hub
cd tiagohub
git add public/content/week-XX.json
git commit -m "content: semana XX - PILAR"
git push
# → Vercel rebuilda em 30 segundos
```

### Terça-feira 07:00 (distribuição — ~10 min)
```
1. Abrir hub.tiagomiolo.com no celular
2. Newsletter: Copiar → Beehiiv → Enviar
3. LinkedIn: Copiar → Colar → Publicar
4. Instagram: Baixar slides → Stories/Feed → Publicar
5. X: Copiar thread → Publicar
```

---

## Estrutura de Conteúdo

```
public/content/
  week-01.json    ← CONSTRUTOR
  week-02.json    ← VISIONÁRIO (planned)
  ...
  week-52.json    ← gerado ao longo do ano
```

### Schema week-XX.json

| Campo | Descrição |
|-------|-----------|
| `week` | Número da semana (1-52) |
| `pilar` | CONSTRUTOR / VISIONÁRIO / GESTOR / CIRURGIÃO |
| `date_send` | Data de envio (terça) |
| `status` | planned / generating / ready / published |
| `newsletter` | Subject, preview, body, score editorial |
| `linkedin` | Hook, body, imagem recomendada |
| `instagram` | Caption, 5 slides |
| `twitter` | Thread de 5 tweets |
| `metrics` | Métricas pós-publicação (manual) |

---

## Templates de Imagem

HTML/CSS templates em `public/templates/`:

| Template | Uso | Tamanho |
|----------|-----|---------|
| `carousel-hook.html` | Slide 1 do carrossel | 1080×1080px |
| `carousel-content.html` | Slides 2-4 | 1080×1080px |
| `carousel-cta.html` | Slide 5 (CTA) | 1080×1080px |
| `quote-card.html` | LinkedIn/X quando recomendado | 1200×628px |

Cores por pilar:
- CONSTRUTOR: `#6366f1` (índigo)
- VISIONÁRIO: `#0ea5e9` (azul)
- GESTOR: `#10b981` (verde)
- CIRURGIÃO: `#f59e0b` (âmbar)

---

## Proteção de Acesso

O hub é protegido por senha via middleware Next.js. Acesse `/hub/login` e insira a senha definida em `HUB_PASSWORD`.

Para uso pessoal, a URL obscura já é suficiente como segurança adicional.

---

## Documentação

- **Spec completa:** `CEO/planejamento/2026-04-05-tiagohub-design-spec.md`
- **Hub-sync:** `squads/hub-sync.md`
- **Calendário 52 semanas:** `squads/newsletter-ceo/pipeline/data/editorial-calendar.md`
- **Framework:** Founder OS Light — Matt Gray
