import { useState, useEffect } from 'react';

interface EmailAutomationProps {
  className?: string;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  preview: string;
  category: string;
  conversionRate: number;
}

interface EmailSequence {
  id: string;
  name: string;
  description: string;
  steps: number;
  status: 'active' | 'paused' | 'draft';
  performance: number;
  leads: number;
}

export const EmailAutomation: React.FC<EmailAutomationProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<'templates' | 'sequences' | 'analytics'>('templates');
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [automationStats, setAutomationStats] = useState({
    emailsSent: 0,
    openRate: 0,
    clickRate: 0,
    conversionRate: 0,
    automationRate: 0
  });
  
  // Simular dados de templates de email
  useEffect(() => {
    const mockTemplates: EmailTemplate[] = [
      {
        id: 'template-001',
        name: 'Boas-vindas Inicial',
        subject: 'Bem-vindo à ScalaUai! Vamos impulsionar seu negócio',
        preview: 'Olá {nome}, é um prazer ter você conosco! Estamos ansiosos para ajudar sua empresa a alcançar resultados extraordinários...',
        category: 'onboarding',
        conversionRate: 68
      },
      {
        id: 'template-002',
        name: 'Qualificação de Lead',
        subject: 'Descubra o plano ideal para o seu negócio',
        preview: 'Olá {nome}, para oferecer a melhor solução para a {empresa}, preparamos um diagnóstico rápido que vai identificar...',
        category: 'nurturing',
        conversionRate: 42
      },
      {
        id: 'template-003',
        name: 'Proposta Personalizada',
        subject: 'Sua proposta personalizada está pronta, {nome}',
        preview: 'Conforme conversamos, preparamos uma proposta totalmente personalizada para a {empresa} baseada nas suas necessidades específicas...',
        category: 'conversion',
        conversionRate: 76
      },
      {
        id: 'template-004',
        name: 'Reativação de Lead Frio',
        subject: '{nome}, sentimos sua falta! Veja o que preparamos para você',
        preview: 'Notamos que faz algum tempo desde nosso último contato e queríamos compartilhar algumas novidades que podem interessar à {empresa}...',
        category: 'reactivation',
        conversionRate: 35
      },
      {
        id: 'template-005',
        name: 'Confirmação de Reunião',
        subject: 'Sua reunião com a ScalaUai está confirmada',
        preview: 'Olá {nome}, sua reunião com nosso especialista está confirmada para {data} às {hora}. Para sua conveniência, adicionamos um link do Google Meet...',
        category: 'meeting',
        conversionRate: 92
      },
      {
        id: 'template-006',
        name: 'Follow-up Pós-Reunião',
        subject: 'Próximos passos após nossa conversa, {nome}',
        preview: 'Foi um prazer conversar com você hoje sobre as necessidades da {empresa}. Conforme prometido, estou enviando os materiais adicionais...',
        category: 'follow-up',
        conversionRate: 64
      },
      {
        id: 'template-007',
        name: 'Upsell para Clientes',
        subject: 'Amplie seus resultados com recursos adicionais',
        preview: 'Olá {nome}, vimos que você está tendo ótimos resultados com nosso plano atual. Para potencializar ainda mais seu crescimento...',
        category: 'upsell',
        conversionRate: 53
      },
      {
        id: 'template-008',
        name: 'Renovação Automática',
        subject: 'Sua assinatura será renovada em breve',
        preview: 'Olá {nome}, sua assinatura do plano {plano} será renovada automaticamente em {data}. Para sua conveniência, mantivemos o mesmo método de pagamento...',
        category: 'retention',
        conversionRate: 88
      }
    ];
    
    setTemplates(mockTemplates);
  }, []);
  
  // Simular dados de sequências de email
  useEffect(() => {
    const mockSequences: EmailSequence[] = [
      {
        id: 'sequence-001',
        name: 'Onboarding de Novos Leads',
        description: 'Sequência de boas-vindas e qualificação para novos leads',
        steps: 5,
        status: 'active',
        performance: 72,
        leads: 156
      },
      {
        id: 'sequence-002',
        name: 'Nutrição de Leads Qualificados',
        description: 'Sequência educativa para leads já qualificados',
        steps: 7,
        status: 'active',
        performance: 68,
        leads: 89
      },
      {
        id: 'sequence-003',
        name: 'Reativação de Leads Frios',
        description: 'Sequência para reengajar leads sem interação por 30+ dias',
        steps: 4,
        status: 'active',
        performance: 41,
        leads: 237
      },
      {
        id: 'sequence-004',
        name: 'Conversão para Plano Aceleração',
        description: 'Sequência focada em converter leads para o plano Aceleração',
        steps: 6,
        status: 'active',
        performance: 58,
        leads: 64
      },
      {
        id: 'sequence-005',
        name: 'Upsell para Clientes Starter',
        description: 'Sequência para upgrade de clientes do plano Starter',
        steps: 3,
        status: 'paused',
        performance: 45,
        leads: 42
      },
      {
        id: 'sequence-006',
        name: 'Renovação Anual Antecipada',
        description: 'Sequência para incentivar renovação antecipada com desconto',
        steps: 4,
        status: 'draft',
        performance: 0,
        leads: 0
      }
    ];
    
    setSequences(mockSequences);
    
    // Calcular estatísticas de automação
    setAutomationStats({
      emailsSent: 12458,
      openRate: 68,
      clickRate: 42,
      conversionRate: 18,
      automationRate: 92
    });
  }, []);
  
  // Filtrar templates
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  // Filtrar sequências
  const filteredSequences = sequences.filter(sequence => {
    return sequence.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           sequence.description.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  // Categorias de templates
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'onboarding', name: 'Onboarding' },
    { id: 'nurturing', name: 'Nutrição' },
    { id: 'conversion', name: 'Conversão' },
    { id: 'reactivation', name: 'Reativação' },
    { id: 'meeting', name: 'Reuniões' },
    { id: 'follow-up', name: 'Follow-up' },
    { id: 'upsell', name: 'Upsell' },
    { id: 'retention', name: 'Retenção' }
  ];
  
  // Obter classe de cor baseada no status
  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'draft':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };
  
  // Obter classe de cor baseada na taxa de conversão
  const getConversionRateClass = (rate: number): string => {
    if (rate >= 70) return 'text-green-600 dark:text-green-400';
    if (rate >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  return (
    <div className={`bg-white dark:bg-darkbg-light rounded-xl shadow-card p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gradient mb-6">Automação de Email Marketing</h2>
      
      {/* Estatísticas de Automação */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-gray-50 dark:bg-darkbg p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Emails Enviados</p>
          <p className="text-2xl font-bold text-primary">{automationStats.emailsSent.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 dark:bg-darkbg p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Taxa de Abertura</p>
          <p className="text-2xl font-bold text-primary">{automationStats.openRate}%</p>
        </div>
        <div className="bg-gray-50 dark:bg-darkbg p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Taxa de Clique</p>
          <p className="text-2xl font-bold text-primary">{automationStats.clickRate}%</p>
        </div>
        <div className="bg-gray-50 dark:bg-darkbg p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Taxa de Conversão</p>
          <p className="text-2xl font-bold text-primary">{automationStats.conversionRate}%</p>
        </div>
        <div className="bg-primary bg-opacity-10 dark:bg-primary dark:bg-opacity-20 p-4 rounded-lg text-center">
          <p className="text-sm text-primary dark:text-primary-light">Taxa de Automação</p>
          <p className="text-2xl font-bold text-primary">{automationStats.automationRate}%</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-6">
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('sequences')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'sequences'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Sequências
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Analytics
          </button>
        </nav>
      </div>
      
      {/* Filtros e Busca */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        {activeTab === 'templates' && (
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setFilterCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  filterCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-darkbg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
        
        <div className="relative">
          <input
            type="text"
            placeholder={activeTab === 'templates' ? "Buscar templates..." : "Buscar sequências..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-darkbg dark:text-white"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Conteúdo da Tab */}
      {activeTab === 'templates' && (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map(template => (
              <div key={template.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-gray-50 dark:bg-darkbg p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{template.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      template.category === 'onboarding' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                      template.category === 'nurturing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      template.category === 'conversion' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      template.category === 'reactivation' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      template.category === 'meeting' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' :
                      template.category === 'follow-up' ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' :
                      template.category === 'upsell' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {categories.find(c => c.id === template.category)?.name || template.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">{template.subject}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.preview}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Taxa de Conversão:</span>
                      <span className={`ml-1 font-medium ${getConversionRateClass(template.conversionRate)}`}>
                        {template.conversionRate}%
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">Nenhum template encontrado com os filtros atuais.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilterCategory('all');
                }}
                className="mt-4 text-primary hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'sequences' && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-darkbg">
              <tr>
                <th className="px-4 py-3 text-left">Nome da Sequência</th>
                <th className="px-4 py-3 text-left">Descrição</th>
                <th className="px-4 py-3 text-center">Etapas</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Performance</th>
                <th className="px-4 py-3 text-center">Leads</th>
                <th className="px-4 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSequences.length > 0 ? (
                filteredSequences.map(sequence => (
                  <tr key={sequence.id} className="hover:bg-gray-50 dark:hover:bg-darkbg-light transition-colors">
                    <td className="px-4 py-3 font-medium">{sequence.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{sequence.description}</td>
                    <td className="px-4 py-3 text-center">{sequence.steps}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(sequence.status)}`}>
                        {sequence.status === 'active' ? 'Ativo' : sequence.status === 'paused' ? 'Pausado' : 'Rascunho'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {sequence.status !== 'draft' ? (
                        <div className="flex items-center justify-center">
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                            <div 
                              className={`h-2.5 rounded-full ${
                                sequence.performance >= 70 ? 'bg-green-500' :
                                sequence.performance >= 40 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${sequence.performance}%` }}
                            ></div>
                          </div>
                          <span className={getConversionRateClass(sequence.performance)}>
                            {sequence.performance}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">{sequence.leads}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        {sequence.status === 'active' ? (
                          <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        ) : (
                          <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400">Nenhuma sequência encontrada com os filtros atuais.</p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="mt-4 text-primary hover:underline"
                    >
                      Limpar filtros
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {activeTab === 'analytics' && (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Visualização detalhada de analytics em desenvolvimento.</p>
          <p className="text-gray-600 dark:text-gray-300">
            Esta funcionalidade estará disponível na próxima atualização.
          </p>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sistema de automação de email marketing - Taxa de automação: <span className="font-semibold text-primary">{automationStats.automationRate}%</span>
        </p>
      </div>
    </div>
  );
};
