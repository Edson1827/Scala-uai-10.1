import { useState, useEffect } from 'react';

interface LeadScoringProps {
  className?: string;
}

interface LeadData {
  id: string;
  name: string;
  email: string;
  company: string;
  position: string;
  employees: string;
  industry: string;
  revenue: string;
  source: string;
  interactions: number;
  lastInteraction: string;
  score: number;
  status: 'cold' | 'warm' | 'hot';
}

export const LeadAutomationDashboard: React.FC<LeadScoringProps> = ({ className }) => {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<LeadData[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [automationStats, setAutomationStats] = useState({
    totalLeads: 0,
    qualifiedAutomatically: 0,
    emailsSent: 0,
    meetingsScheduled: 0,
    automationRate: 0
  });
  
  // Simular dados de leads
  useEffect(() => {
    const mockLeads: LeadData[] = [
      {
        id: 'lead-001',
        name: 'Carlos Mendes',
        email: 'carlos@techsolve.com.br',
        company: 'TechSolve',
        position: 'CEO',
        employees: '10-50',
        industry: 'Tecnologia',
        revenue: 'R$1M-5M',
        source: 'Formulário Site',
        interactions: 8,
        lastInteraction: '2025-06-01',
        score: 85,
        status: 'hot'
      },
      {
        id: 'lead-002',
        name: 'Mariana Silva',
        email: 'mariana@elegance.com.br',
        company: 'Boutique Elegance',
        position: 'Proprietária',
        employees: '1-10',
        industry: 'Varejo',
        revenue: 'R$500K-1M',
        source: 'Facebook Ads',
        interactions: 5,
        lastInteraction: '2025-05-28',
        score: 65,
        status: 'warm'
      },
      {
        id: 'lead-003',
        name: 'Roberto Almeida',
        email: 'roberto@construtech.com.br',
        company: 'Construtech',
        position: 'Diretor de Marketing',
        employees: '50-200',
        industry: 'Construção',
        revenue: 'R$5M-10M',
        source: 'LinkedIn',
        interactions: 12,
        lastInteraction: '2025-06-02',
        score: 92,
        status: 'hot'
      },
      {
        id: 'lead-004',
        name: 'Ana Ferreira',
        email: 'ana@saborlocal.com.br',
        company: 'Sabor Local',
        position: 'Gerente',
        employees: '10-50',
        industry: 'Alimentação',
        revenue: 'R$1M-5M',
        source: 'Google Ads',
        interactions: 3,
        lastInteraction: '2025-05-25',
        score: 45,
        status: 'cold'
      },
      {
        id: 'lead-005',
        name: 'Paulo Santos',
        email: 'paulo@fitcentral.com.br',
        company: 'Fit Central',
        position: 'Proprietário',
        employees: '10-50',
        industry: 'Fitness',
        revenue: 'R$500K-1M',
        source: 'Instagram',
        interactions: 6,
        lastInteraction: '2025-05-30',
        score: 72,
        status: 'warm'
      },
      {
        id: 'lead-006',
        name: 'Juliana Costa',
        email: 'juliana@edutech.com.br',
        company: 'EduTech',
        position: 'Diretora',
        employees: '10-50',
        industry: 'Educação',
        revenue: 'R$1M-5M',
        source: 'Webinar',
        interactions: 9,
        lastInteraction: '2025-06-01',
        score: 88,
        status: 'hot'
      },
      {
        id: 'lead-007',
        name: 'Fernando Oliveira',
        email: 'fernando@mecanicaexpress.com.br',
        company: 'Mecânica Express',
        position: 'Proprietário',
        employees: '1-10',
        industry: 'Automotivo',
        revenue: 'R$100K-500K',
        source: 'Google Ads',
        interactions: 2,
        lastInteraction: '2025-05-20',
        score: 35,
        status: 'cold'
      },
      {
        id: 'lead-008',
        name: 'Luciana Martins',
        email: 'luciana@designstudio.com.br',
        company: 'Design Studio',
        position: 'Diretora Criativa',
        employees: '1-10',
        industry: 'Design',
        revenue: 'R$100K-500K',
        source: 'Instagram',
        interactions: 7,
        lastInteraction: '2025-05-29',
        score: 68,
        status: 'warm'
      }
    ];
    
    setLeads(mockLeads);
    setFilteredLeads(mockLeads);
    
    // Calcular estatísticas de automação
    const totalLeads = mockLeads.length;
    const qualifiedAutomatically = mockLeads.filter(lead => lead.score > 0).length;
    const emailsSent = 42; // Simulação
    const meetingsScheduled = 12; // Simulação
    const automationRate = 85; // Porcentagem de processos automatizados
    
    setAutomationStats({
      totalLeads,
      qualifiedAutomatically,
      emailsSent,
      meetingsScheduled,
      automationRate
    });
  }, []);
  
  // Filtrar leads
  useEffect(() => {
    let result = [...leads];
    
    if (filterStatus !== 'all') {
      result = result.filter(lead => lead.status === filterStatus);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(lead => 
        lead.name.toLowerCase().includes(query) || 
        lead.company.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query)
      );
    }
    
    setFilteredLeads(result);
  }, [leads, filterStatus, searchQuery]);
  
  // Formatar score como porcentagem
  const formatScore = (score: number): string => {
    return `${score}%`;
  };
  
  // Obter classe de cor baseada no status
  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'hot':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'warm':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cold':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };
  
  // Simular ação automatizada
  const triggerAutomation = (leadId: string, action: string) => {
    // Simulação de ação automatizada
    alert(`Ação "${action}" iniciada automaticamente para o lead ${leadId}`);
  };
  
  return (
    <div className={`bg-white dark:bg-darkbg-light rounded-xl shadow-card p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gradient mb-6">Dashboard de Automação de Leads</h2>
      
      {/* Estatísticas de Automação */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-gray-50 dark:bg-darkbg p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total de Leads</p>
          <p className="text-2xl font-bold text-primary">{automationStats.totalLeads}</p>
        </div>
        <div className="bg-gray-50 dark:bg-darkbg p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Qualificados Auto.</p>
          <p className="text-2xl font-bold text-primary">{automationStats.qualifiedAutomatically}</p>
        </div>
        <div className="bg-gray-50 dark:bg-darkbg p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Emails Enviados</p>
          <p className="text-2xl font-bold text-primary">{automationStats.emailsSent}</p>
        </div>
        <div className="bg-gray-50 dark:bg-darkbg p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Reuniões Agendadas</p>
          <p className="text-2xl font-bold text-primary">{automationStats.meetingsScheduled}</p>
        </div>
        <div className="bg-primary bg-opacity-10 dark:bg-primary dark:bg-opacity-20 p-4 rounded-lg text-center">
          <p className="text-sm text-primary dark:text-primary-light">Taxa de Automação</p>
          <p className="text-2xl font-bold text-primary">{automationStats.automationRate}%</p>
        </div>
      </div>
      
      {/* Filtros */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filterStatus === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 dark:bg-darkbg text-gray-700 dark:text-gray-300'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilterStatus('hot')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filterStatus === 'hot'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 dark:bg-darkbg text-gray-700 dark:text-gray-300'
            }`}
          >
            Quentes
          </button>
          <button
            onClick={() => setFilterStatus('warm')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filterStatus === 'warm'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 dark:bg-darkbg text-gray-700 dark:text-gray-300'
            }`}
          >
            Mornos
          </button>
          <button
            onClick={() => setFilterStatus('cold')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filterStatus === 'cold'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-darkbg text-gray-700 dark:text-gray-300'
            }`}
          >
            Frios
          </button>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar leads..."
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
      
      {/* Tabela de Leads */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-darkbg">
            <tr>
              <th className="px-4 py-3 text-left">Lead</th>
              <th className="px-4 py-3 text-left">Empresa</th>
              <th className="px-4 py-3 text-left">Fonte</th>
              <th className="px-4 py-3 text-center">Score</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-darkbg-light transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{lead.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p>{lead.company}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{lead.industry}</p>
                  </div>
                </td>
                <td className="px-4 py-3">{lead.source}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-block w-12 text-center py-1 rounded-full text-xs font-medium ${
                    lead.score >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    lead.score >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {formatScore(lead.score)}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(lead.status)}`}>
                    {lead.status === 'hot' ? 'Quente' : lead.status === 'warm' ? 'Morno' : 'Frio'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => triggerAutomation(lead.id, 'Enviar Email')}
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      title="Enviar Email Automatizado"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => triggerAutomation(lead.id, 'Agendar Reunião')}
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      title="Agendar Reunião Automaticamente"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => triggerAutomation(lead.id, 'Enviar Proposta')}
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      title="Gerar Proposta Automaticamente"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredLeads.length === 0 && (
        <div className="text-center py-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400">Nenhum lead encontrado com os filtros atuais.</p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setFilterStatus('all');
            }}
            className="mt-4 text-primary hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      )}
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sistema de automação com IA - Taxa de automação atual: <span className="font-semibold text-primary">{automationStats.automationRate}%</span>
        </p>
      </div>
    </div>
  );
};
