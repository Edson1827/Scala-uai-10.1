import { Layout } from '../components/Layout';

export default function Institucional() {
  return (
    <Layout 
      title="Sobre o ScalaUai | Marketing Digital para PMEs"
      description="Conheça o projeto ScalaUai, um MVP focado na venda rápida de planos mensais para empresas brasileiras."
    >
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">Sobre o Projeto ScalaUai</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-4">O ScalaUai é um MVP focado na venda rápida de planos mensais para empresas brasileiras que desejam escalar seus negócios através do marketing digital.</p>
          
          <p className="mb-4">Ideal para agências, freelancers, SaaS e serviços recorrentes, oferecemos uma estrutura responsiva, integração com botões de compra e rastreamento completo para maximizar suas conversões.</p>
          
          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Nossa Missão</h2>
          <p className="mb-4">Democratizar o acesso ao marketing digital de qualidade para pequenas e médias empresas, oferecendo soluções acessíveis e eficientes que realmente geram resultados.</p>
          
          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Nossos Valores</h2>
          <ul className="list-disc pl-5 mb-4">
            <li className="mb-2">Transparência em todas as etapas do processo</li>
            <li className="mb-2">Resultados mensuráveis e baseados em dados</li>
            <li className="mb-2">Atendimento personalizado e humanizado</li>
            <li className="mb-2">Inovação constante em estratégias e tecnologias</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-primary mt-8 mb-4">Por que escolher o ScalaUai?</h2>
          <p className="mb-4">Diferente de outras agências, o ScalaUai foi desenvolvido com foco total em conversão e escalabilidade. Nossos planos são estruturados para oferecer o máximo de resultado com o mínimo de investimento, permitindo que você escale seu negócio de forma sustentável.</p>
          
          <p className="mb-4">Todos os nossos clientes têm acesso a relatórios detalhados e transparentes, mostrando exatamente como seu investimento está sendo aplicado e quais resultados estão sendo obtidos.</p>
        </div>
      </section>
    </Layout>
  );
}
