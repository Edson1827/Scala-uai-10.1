import { useState } from 'react';

interface ProposalGeneratorProps {
  className?: string;
}

interface ClientInfo {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  employees: string;
  revenue: string;
  website: string;
  goals: string[];
  challenges: string[];
}

export const ProposalGenerator: React.FC<ProposalGeneratorProps> = ({ className }) => {
  const [step, setStep] = useState<number>(1);
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: '',
    company: '',
    email: '',
    phone: '',
    industry: '',
    employees: '',
    revenue: '',
    website: '',
    goals: [],
    challenges: []
  });
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [recommendedPlan, setRecommendedPlan] = useState<string>('');
  
  // Opções para os campos de seleção
  const industryOptions = [
    'Tecnologia', 'Varejo', 'Saúde', 'Educação', 'Alimentação', 
    'Construção', 'Serviços Financeiros', 'Turismo', 'Automotivo', 'Outro'
  ];
  
  const employeeOptions = [
    '1-5', '6-10', '11-25', '26-50', '51-100', '101-250', '251-500', '500+'
  ];
  
  const revenueOptions = [
    'Até R$100 mil/ano', 'R$100 mil a R$500 mil/ano', 'R$500 mil a R$1 milhão/ano',
    'R$1 milhão a R$5 milhões/ano', 'R$5 milhões a R$10 milhões/ano', 'Acima de R$10 milhões/ano'
  ];
  
  const goalOptions = [
    'Aumentar vendas online',
    'Gerar mais leads qualificados',
    'Melhorar presença nas redes sociais',
    'Aumentar tráfego no site',
    'Melhorar posicionamento no Google',
    'Reduzir custo de aquisição de clientes',
    'Aumentar reconhecimento da marca',
    'Lançar novos produtos/serviços',
    'Expandir para novos mercados'
  ];
  
  const challengeOptions = [
    'Orçamento limitado para marketing',
    'Falta de estratégia digital clara',
    'Dificuldade em medir resultados',
    'Alta concorrência no mercado',
    'Equipe pequena/sem especialistas',
    'Baixa conversão de leads',
    'Presença digital desatualizada',
    'Dificuldade em criar conteúdo relevante',
    'Falta de conhecimento técnico em marketing digital'
  ];
  
  // Atualizar informações do cliente
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClientInfo(prev => ({ ...prev, [name]: value }));
  };
  
  // Lidar com seleção de múltiplas opções (goals e challenges)
  const handleMultiSelect = (item: string, field: 'goals' | 'challenges') => {
    setClientInfo(prev => {
      const currentItems = prev[field];
      if (currentItems.includes(item)) {
        return { ...prev, [field]: currentItems.filter(i => i !== item) };
      } else {
        return { ...prev, [field]: [...currentItems, item] };
      }
    });
  };
  
  // Avançar para o próximo passo
  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };
  
  // Voltar para o passo anterior
  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };
  
  // Gerar proposta
  const handleGenerateProposal = () => {
    setIsGenerating(true);
    
    // Simular tempo de processamento
    setTimeout(() => {
      // Lógica para determinar o plano recomendado baseado nas informações do cliente
      let plan = '';
      
      // Lógica simplificada para recomendação de plano
      const revenueIndex = revenueOptions.indexOf(clientInfo.revenue);
      const employeeIndex = employeeOptions.indexOf(clientInfo.employees);
      const goalsCount = clientInfo.goals.length;
      const challengesCount = clientInfo.challenges.length;
      
      // Pontuação para determinar o plano
      const score = revenueIndex + employeeIndex + goalsCount + challengesCount;
      
      if (score < 8) {
        plan = 'Starter';
      } else if (score < 15) {
        plan = 'Aceleração';
      } else {
        plan = 'Crescimento Exponencial';
      }
      
      setRecommendedPlan(plan);
      setIsGenerating(false);
      setIsGenerated(true);
    }, 3000);
  };
  
  // Verificar se o passo atual está completo
  const isStepComplete = () => {
    switch (step) {
      case 1:
        return clientInfo.name && clientInfo.company && clientInfo.email && clientInfo.phone;
      case 2:
        return clientInfo.industry && clientInfo.employees && clientInfo.revenue && clientInfo.website;
      case 3:
        return clientInfo.goals.length > 0 && clientInfo.challenges.length > 0;
      default:
        return true;
    }
  };
  
  return (
    <div className={`bg-white dark:bg-darkbg-light rounded-xl shadow-card p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gradient mb-6 text-center">Gerador de Propostas Automático</h2>
      
      {/* Indicador de progresso */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step > stepNumber 
                    ? 'bg-primary text-white' 
                    : step === stepNumber 
                      ? 'bg-primary-light text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                {step > stepNumber ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                {stepNumber === 1 && 'Informações Básicas'}
                {stepNumber === 2 && 'Dados da Empresa'}
                {stepNumber === 3 && 'Objetivos'}
                {stepNumber === 4 && 'Proposta'}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div 
            className="h-1 bg-primary rounded-full transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Passo 1: Informações Básicas */}
      {step === 1 && (
        <div className="animate-fadeIn">
          <h3 className="text-lg font-semibold mb-4">Informações de Contato</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome Completo *
              </label>
              <input
                type="text"
                name="name"
                value={clientInfo.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-darkbg dark:text-white"
                placeholder="Ex: João Silva"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome da Empresa *
              </label>
              <input
                type="text"
                name="company"
                value={clientInfo.company}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-darkbg dark:text-white"
                placeholder="Ex: Empresa XYZ Ltda"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={clientInfo.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-darkbg dark:text-white"
                placeholder="Ex: joao@empresa.com.br"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Telefone *
              </label>
              <input
                type="tel"
                name="phone"
                value={clientInfo.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-darkbg dark:text-white"
                placeholder="Ex: (11) 98765-4321"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleNextStep}
              disabled={!isStepComplete()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próximo
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Passo 2: Dados da Empresa */}
      {step === 2 && (
        <div className="animate-fadeIn">
          <h3 className="text-lg font-semibold mb-4">Informações da Empresa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Setor de Atuação *
              </label>
              <select
                name="industry"
                value={clientInfo.industry}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-darkbg dark:text-white"
              >
                <option value="">Selecione o setor</option>
                {industryOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Número de Funcionários *
              </label>
              <select
                name="employees"
                value={clientInfo.employees}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-darkbg dark:text-white"
              >
                <option value="">Selecione o tamanho</option>
                {employeeOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Faturamento Anual *
              </label>
              <select
                name="revenue"
                value={clientInfo.revenue}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-darkbg dark:text-white"
              >
                <option value="">Selecione o faturamento</option>
                {revenueOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={clientInfo.website}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-darkbg dark:text-white"
                placeholder="Ex: https://www.empresa.com.br"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePrevStep}
              className="btn-outline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>
            <button
              onClick={handleNextStep}
              disabled={!isStepComplete()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próximo
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Passo 3: Objetivos e Desafios */}
      {step === 3 && (
        <div className="animate-fadeIn">
          <h3 className="text-lg font-semibold mb-4">Objetivos e Desafios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Principais Objetivos *
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Selecione pelo menos um objetivo
              </p>
              <div className="space-y-2">
                {goalOptions.map((goal) => (
                  <div key={goal} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`goal-${goal}`}
                      checked={clientInfo.goals.includes(goal)}
                      onChange={() => handleMultiSelect(goal, 'goals')}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor={`goal-${goal}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {goal}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Principais Desafios *
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Selecione pelo menos um desafio
              </p>
              <div className="space-y-2">
                {challengeOptions.map((challenge) => (
                  <div key={challenge} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`challenge-${challenge}`}
                      checked={clientInfo.challenges.includes(challenge)}
                      onChange={() => handleMultiSelect(challenge, 'challenges')}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor={`challenge-${challenge}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {challenge}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePrevStep}
              className="btn-outline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>
            <button
              onClick={handleNextStep}
              disabled={!isStepComplete()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Gerar Proposta
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Passo 4: Proposta Gerada */}
      {step === 4 && (
        <div className="animate-fadeIn">
          <h3 className="text-lg font-semibold mb-4">Sua Proposta Personalizada</h3>
          
          {!isGenerated ? (
            <div className="text-center py-12">
              {isGenerating ? (
                <>
                  <div className="flex justify-center mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Nossa IA está analisando suas informações e gerando uma proposta personalizada...
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Isso pode levar alguns segundos.
                  </p>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-primary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Estamos prontos para gerar sua proposta personalizada baseada nas informações fornecidas.
                  </p>
                  <button
                    onClick={handleGenerateProposal}
                    className="btn-primary"
                  >
                    Gerar Proposta Agora
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-darkbg p-6 rounded-lg">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-2">Proposta Gerada com Sucesso!</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Com base nas informações fornecidas, nossa IA recomenda o seguinte plano:
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-lg font-semibold">Plano Recomendado:</h5>
                  <span className="badge badge-primary text-lg">
                    {recommendedPlan}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h6 className="font-medium text-gray-700 dark:text-gray-300">Informações do Cliente:</h6>
                    <p className="text-gray-600 dark:text-gray-400">
                      {clientInfo.name} - {clientInfo.company}
                    </p>
                  </div>
                  
                  <div>
                    <h6 className="font-medium text-gray-700 dark:text-gray-300">Objetivos Principais:</h6>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
                      {clientInfo.goals.map((goal, index) => (
                        <li key={index}>{goal}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h6 className="font-medium text-gray-700 dark:text-gray-300">Desafios Identificados:</h6>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
                      {clientInfo.challenges.map((challenge, index) => (
                        <li key={index}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h6 className="font-medium text-gray-700 dark:text-gray-300">Soluções Propostas:</h6>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
                      {recommendedPlan === 'Starter' && (
                        <>
                          <li>Gestão básica de redes sociais (2 plataformas)</li>
                          <li>Criação de 1 criativo por mês</li>
                          <li>Relatórios mensais de desempenho</li>
                          <li>Suporte por email</li>
                        </>
                      )}
                      {recommendedPlan === 'Aceleração' && (
                        <>
                          <li>Gestão avançada de redes sociais (4 plataformas)</li>
                          <li>Criação de 4 criativos por mês</li>
                          <li>Campanhas de Google Ads</li>
                          <li>Relatórios quinzenais de desempenho</li>
                          <li>Suporte prioritário</li>
                        </>
                      )}
                      {recommendedPlan === 'Crescimento Exponencial' && (
                        <>
                          <li>Gestão completa de redes sociais (todas as plataformas)</li>
                          <li>Criação de 8 criativos por mês</li>
                          <li>Campanhas de Google Ads e Meta Ads</li>
                          <li>Estratégia de SEO completa</li>
                          <li>Relatórios semanais de desempenho</li>
                          <li>Suporte via WhatsApp</li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <div>
                    <h6 className="font-medium text-gray-700 dark:text-gray-300">Investimento Mensal:</h6>
                    <p className="text-xl font-bold text-primary">
                      {recommendedPlan === 'Starter' && 'R$ 197,00'}
                      {recommendedPlan === 'Aceleração' && 'R$ 297,00'}
                      {recommendedPlan === 'Crescimento Exponencial' && 'R$ 397,00'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      *Desconto de 10% para pagamento anual
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <button className="btn-outline mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Baixar Proposta
                  </button>
                  <button className="btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Enviar por Email
                  </button>
                </div>
                <button className="btn-primary">
                  Contratar Agora
                </button>
              </div>
            </div>
          )}
          
          <div className="mt-6 flex justify-start">
            <button
              onClick={handlePrevStep}
              className="btn-outline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar e Editar Informações
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sistema de geração automática de propostas - Taxa de automação: <span className="font-semibold text-primary">95%</span>
        </p>
      </div>
    </div>
  );
};
