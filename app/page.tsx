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
