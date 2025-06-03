import { useState } from 'react';

interface ContentBlockProps {
  title: string;
  subtitle?: string;
  content: string;
  ctaText?: string;
  ctaLink?: string;
  className?: string;
}

export const OptimizedContentBlock: React.FC<ContentBlockProps> = ({
  title,
  subtitle,
  content,
  ctaText,
  ctaLink,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Determinar se o conteúdo é longo e precisa ser expandido
  const isLongContent = content.length > 300;
  const displayContent = isLongContent && !isExpanded ? content.substring(0, 300) + '...' : content;
  
  return (
    <div className={`content-block ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-3">{title}</h2>
      
      {subtitle && (
        <h3 className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4">{subtitle}</h3>
      )}
      
      <div className="prose dark:prose-dark max-w-none mb-4">
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {displayContent}
        </p>
        
        {isLongContent && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:text-primary-dark transition-colors mt-2 flex items-center"
          >
            {isExpanded ? 'Mostrar menos' : 'Continuar lendo'}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
      
      {ctaText && ctaLink && (
        <a 
          href={ctaLink}
          className="btn-primary inline-flex items-center"
        >
          {ctaText}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      )}
    </div>
  );
};

export const MissionContent = () => {
  return (
    <OptimizedContentBlock
      title="Nossa Missão"
      content="Fomos feitos para empresas que faturam a partir de 20 mil reais por mês e querem escalar seus negócios. Combinamos estratégias de marketing digital com automação inteligente para maximizar seu ROI e impulsionar seu crescimento de forma sustentável. Acreditamos que o marketing digital deve ser acessível, transparente e, acima de tudo, eficaz para empresas de todos os tamanhos."
      subtitle="Feito para quem movimenta o Brasil"
      ctaText="Conheça Nossa História"
      ctaLink="/institucional"
      className="bg-white dark:bg-darkbg-light p-6 rounded-xl shadow-card"
    />
  );
};

export const ValuePropositionContent = () => {
  return (
    <OptimizedContentBlock
      title="Por que escolher a ScalaUai?"
      content="Diferente das agências tradicionais, a ScalaUai oferece resultados mensuráveis com investimento acessível. Sem contratos longos ou taxas ocultas, você tem total flexibilidade para escalar conforme seus resultados aumentam. Nossa equipe especializada utiliza tecnologia avançada e automação inteligente para otimizar suas campanhas em tempo real, garantindo o máximo retorno sobre investimento. Com a ScalaUai, você economiza até 75% comparado a agências tradicionais, mantendo resultados superiores."
      ctaText="Ver Comparativo Completo"
      ctaLink="#comparativo"
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-darkbg dark:to-darkbg-light p-6 rounded-xl shadow-card"
    />
  );
};

export const HowItWorksContent = () => {
  return (
    <OptimizedContentBlock
      title="Como Funciona"
      content="Nosso processo é simples e eficiente, projetado para maximizar seus resultados desde o primeiro dia. Começamos com um diagnóstico completo da sua presença digital e definição de objetivos claros. Em seguida, desenvolvemos uma estratégia personalizada e criamos os primeiros materiais. Após o lançamento das campanhas, monitoramos em tempo real e otimizamos continuamente com base em dados. Todo o processo é automatizado em até 80%, garantindo eficiência e resultados consistentes."
      ctaText="Iniciar Diagnóstico Gratuito"
      ctaLink="#quiz"
      className="bg-white dark:bg-darkbg-light p-6 rounded-xl shadow-card"
    />
  );
};

export const ResultsGuaranteeContent = () => {
  return (
    <OptimizedContentBlock
      title="Resultados Garantidos"
      content="Na ScalaUai, não apenas prometemos resultados, nós os garantimos. Se você não obtiver um aumento mensurável em tráfego, leads ou vendas nos primeiros 30 dias, devolvemos 100% do seu investimento. Nossa metodologia comprovada já ajudou mais de 127 empresas a aumentarem seu ROI em marketing digital em média 3.5x, com redução de 65% no custo de aquisição de clientes. Trabalhamos com metas claras e relatórios transparentes para que você acompanhe cada centavo investido."
      ctaText="Ver Casos de Sucesso"
      ctaLink="#depoimentos"
      className="bg-gradient-to-br from-primary-light/10 to-primary/5 dark:from-primary/20 dark:to-primary-dark/10 p-6 rounded-xl shadow-card"
    />
  );
};

export const AutomationBenefitsContent = () => {
  return (
    <OptimizedContentBlock
      title="O Poder da Automação"
      content="Nossa plataforma utiliza inteligência artificial e automação avançada para eliminar tarefas repetitivas e maximizar a eficiência do seu marketing digital. Com mais de 80% dos processos automatizados, conseguimos reduzir custos operacionais em até 60% e aumentar a velocidade de implementação em 3x. Desde a qualificação automática de leads até a geração de relatórios personalizados, nossa tecnologia trabalha 24/7 para garantir que sua estratégia de marketing esteja sempre otimizada e gerando resultados."
      ctaText="Conhecer Nossa Tecnologia"
      ctaLink="#tecnologia"
      className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 p-6 rounded-xl shadow-card"
    />
  );
};
