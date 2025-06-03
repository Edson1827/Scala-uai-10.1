import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQInteractive: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [helpfulFeedback, setHelpfulFeedback] = useState<{[key: number]: boolean | null}>({});
  
  const faqItems: FAQItem[] = [
    {
      question: 'Como funciona o processo de contratação?',
      answer: 'O processo de contratação é simples e rápido. Após escolher o plano ideal para seu negócio, você preenche um formulário com informações básicas e nossa equipe entra em contato em até 24 horas para agendar uma reunião de diagnóstico. Após essa reunião, desenvolvemos a estratégia personalizada e iniciamos a implementação em até 3 dias úteis.',
      category: 'contratacao'
    },
    {
      question: 'Quanto tempo leva para ver resultados?',
      answer: 'Os primeiros resultados começam a aparecer entre 15 e 30 dias após o início das campanhas. No entanto, resultados mais significativos e consistentes geralmente são observados a partir do segundo mês. Oferecemos garantia de resultados em 30 dias ou seu dinheiro de volta.',
      category: 'resultados'
    },
    {
      question: 'Preciso assinar contrato de fidelidade?',
      answer: 'Não exigimos contratos de fidelidade. Trabalhamos com renovação mensal automática, mas você pode cancelar a qualquer momento sem multas ou taxas adicionais. Acreditamos que a qualidade do nosso trabalho é o que mantém nossos clientes.',
      category: 'contratacao'
    },
    {
      question: 'Como são feitos os relatórios de desempenho?',
      answer: 'Fornecemos relatórios detalhados mensais (ou quinzenais, dependendo do seu plano) com métricas claras e objetivas. Os relatórios incluem dados de tráfego, conversões, ROI, custo por aquisição e outras métricas relevantes para seu negócio. Além disso, você tem acesso a um dashboard em tempo real para acompanhar o desempenho das suas campanhas.',
      category: 'resultados'
    },
    {
      question: 'Posso mudar de plano durante a vigência?',
      answer: 'Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são implementadas no início do próximo ciclo de faturamento. Não há taxas adicionais para mudança de plano.',
      category: 'planos'
    },
    {
      question: 'Quais plataformas de marketing digital vocês trabalham?',
      answer: 'Trabalhamos com as principais plataformas de marketing digital, incluindo Google Ads, Facebook Ads, Instagram Ads, LinkedIn Ads, TikTok Ads, e-mail marketing, SEO e marketing de conteúdo. A combinação de plataformas depende do seu plano e da estratégia personalizada desenvolvida para o seu negócio.',
      category: 'servicos'
    },
    {
      question: 'Como é feito o pagamento?',
      answer: 'Aceitamos pagamentos via cartão de crédito, boleto bancário ou transferência PIX. O pagamento é mensal e pode ser parcelado em até 12x no cartão de crédito. Oferecemos desconto de 10% para pagamentos anuais à vista.',
      category: 'pagamento'
    },
    {
      question: 'Vocês criam o conteúdo para as campanhas?',
      answer: 'Sim, nossos planos incluem a criação de conteúdo para suas campanhas. Dependendo do plano escolhido, você tem direito a um número específico de criativos por mês. Caso necessite de mais conteúdo, oferecemos pacotes adicionais com valores especiais para clientes.',
      category: 'servicos'
    },
    {
      question: 'O que acontece se eu não ficar satisfeito com os resultados?',
      answer: 'Oferecemos garantia de resultados em 30 dias. Se você não estiver satisfeito com os resultados obtidos nos primeiros 30 dias, devolvemos 100% do valor investido. Após esse período, trabalhamos continuamente para otimizar suas campanhas e garantir o melhor ROI possível.',
      category: 'resultados'
    },
    {
      question: 'Vocês atendem a qualquer segmento de negócio?',
      answer: 'Atendemos a maioria dos segmentos de negócio, mas nos especializamos em e-commerce, serviços B2B, profissionais liberais, clínicas e consultórios, e pequenos negócios locais. Alguns segmentos específicos podem ter restrições nas plataformas de anúncios, nesses casos, avaliamos caso a caso.',
      category: 'servicos'
    }
  ];
  
  const categories = [
    { id: 'all', name: 'Todas' },
    { id: 'contratacao', name: 'Contratação' },
    { id: 'resultados', name: 'Resultados' },
    { id: 'planos', name: 'Planos' },
    { id: 'servicos', name: 'Serviços' },
    { id: 'pagamento', name: 'Pagamento' }
  ];
  
  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setActiveIndex(null);
  };
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveIndex(null);
  };
  
  const handleFeedback = (index: number, isHelpful: boolean) => {
    setHelpfulFeedback({
      ...helpfulFeedback,
      [index]: isHelpful
    });
  };
  
  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="bg-white dark:bg-darkbg-light rounded-xl shadow-card p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-4">Perguntas Frequentes</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Encontre respostas para as dúvidas mais comuns sobre nossos serviços e como podemos ajudar seu negócio a crescer.
        </p>
      </div>
      
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar perguntas..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-darkbg dark:text-white"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-darkbg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="space-y-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((item, index) => (
            <div 
              key={index} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-900 dark:text-white">{item.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeIndex === index && (
                <div className="p-4 bg-gray-50 dark:bg-darkbg border-t border-gray-200 dark:border-gray-700 animate-slideDown">
                  <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Esta resposta foi útil?
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleFeedback(index, true)}
                        className={`px-3 py-1 rounded-full text-xs ${
                          helpfulFeedback[index] === true
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900'
                        }`}
                      >
                        Sim
                      </button>
                      <button
                        onClick={() => handleFeedback(index, false)}
                        className={`px-3 py-1 rounded-full text-xs ${
                          helpfulFeedback[index] === false
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900'
                        }`}
                      >
                        Não
                      </button>
                    </div>
                  </div>
                  
                  {helpfulFeedback[index] === false && (
                    <div className="mt-3 animate-fadeIn">
                      <a href="/contato" className="text-sm text-primary hover:underline">
                        Entre em contato para mais informações
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 dark:text-gray-400">Nenhuma pergunta encontrada para sua busca.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 text-primary hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Não encontrou o que procurava?
        </p>
        <a href="/contato" className="btn-primary inline-block">
          Entre em contato
        </a>
      </div>
    </div>
  );
};
