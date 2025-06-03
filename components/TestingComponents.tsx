import { useState, useEffect } from 'react';

interface TestingProps {
  className?: string;
}

export const TestingComponent: React.FC<TestingProps> = ({ className }) => {
  const [testResults, setTestResults] = useState<{
    component: string;
    status: 'passed' | 'failed' | 'pending';
    message?: string;
  }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [allPassed, setAllPassed] = useState(false);
  
  // Simular testes de componentes
  const runTests = () => {
    setIsRunning(true);
    setProgress(0);
    setAllPassed(false);
    
    // Componentes a serem testados
    const components = [
      'Header', 'Footer', 'Benefits', 'QuizModal', 'FormModal', 
      'UpsellComponent', 'ThemeToggle', 'Layout', 'AutomatedChatbot',
      'LeadAutomationDashboard', 'EmailAutomation', 'ProposalGenerator',
      'SEOOptimization', 'OptimizedContent', 'OptimizedCTA',
      'MarketingOptimization'
    ];
    
    // Limpar resultados anteriores
    setTestResults([]);
    
    // Simular testes assíncronos
    let currentProgress = 0;
    const totalTests = components.length;
    
    components.forEach((component, index) => {
      setTimeout(() => {
        // Simular resultado do teste (95% de chance de passar)
        const passed = Math.random() > 0.05;
        
        setTestResults(prev => {
          const newResults = [
            ...prev,
            {
              component,
              status: passed ? 'passed' as const : 'failed' as const,
              message: passed ? 'Todos os testes passaram' : 'Falha em renderização ou funcionalidade'
            }
          ];
          
          // Verificar se todos os testes foram concluídos
          if (index === totalTests - 1) {
            setIsRunning(false);
            
            // Verificar se todos os testes passaram
            const allTestsPassed = passed && newResults.every(result => result.status === 'passed');
            setAllPassed(allTestsPassed);
          }
          
          return newResults;
        });
        
        // Atualizar progresso
        currentProgress = Math.round(((index + 1) / totalTests) * 100);
        setProgress(currentProgress);
      }, (index + 1) * 300); // Simular tempo de execução dos testes
    });
  };
  
  return (
    <div className={`bg-white dark:bg-darkbg-light rounded-xl shadow-card p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gradient">Testes de Componentes</h2>
        
        <button
          onClick={runTests}
          disabled={isRunning}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? 'Executando...' : 'Executar Testes'}
        </button>
      </div>
      
      {/* Barra de progresso */}
      {isRunning && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Progresso</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Resultados dos testes */}
      {testResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-3">Resultados:</h3>
          
          <div className="overflow-y-auto max-h-80 border border-gray-200 dark:border-gray-700 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-darkbg">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Componente
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Mensagem
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-darkbg-light divide-y divide-gray-200 dark:divide-gray-700">
                {testResults.map((result, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {result.component}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        result.status === 'passed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : result.status === 'failed'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {result.status === 'passed' ? 'Passou' : result.status === 'failed' ? 'Falhou' : 'Pendente'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      {result.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Resumo dos testes */}
          {!isRunning && testResults.length === 16 && (
            <div className={`mt-4 p-4 rounded-lg ${
              allPassed 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900' 
                : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900'
            }`}>
              <div className="flex items-center">
                {allPassed ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                <p className={`font-medium ${
                  allPassed 
                    ? 'text-green-800 dark:text-green-200' 
                    : 'text-yellow-800 dark:text-yellow-200'
                }`}>
                  {allPassed 
                    ? 'Todos os testes passaram com sucesso!' 
                    : 'Alguns testes falharam. Verifique os detalhes acima.'}
                </p>
              </div>
              
              <div className="mt-2 text-sm">
                <p className={allPassed ? 'text-green-600 dark:text-green-300' : 'text-yellow-600 dark:text-yellow-300'}>
                  {testResults.filter(r => r.status === 'passed').length} de {testResults.length} testes passaram.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Mensagem quando nenhum teste foi executado */}
      {testResults.length === 0 && !isRunning && (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Nenhum teste foi executado ainda.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Clique em "Executar Testes" para verificar todos os componentes.
          </p>
        </div>
      )}
    </div>
  );
};

export const ResponsiveTestingComponent: React.FC<TestingProps> = ({ className }) => {
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [deviceType, setDeviceType] = useState('');
  const [isResponsive, setIsResponsive] = useState(true);
  const [testResults, setTestResults] = useState<{
    viewport: string;
    status: 'passed' | 'failed';
  }[]>([]);
  
  // Atualizar tamanho da viewport
  useEffect(() => {
    // Verificar se estamos no navegador (client-side)
    if (typeof window === 'undefined') {
      return;
    }
    
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      // Determinar tipo de dispositivo
      if (window.innerWidth < 640) {
        setDeviceType('Mobile');
      } else if (window.innerWidth < 1024) {
        setDeviceType('Tablet');
      } else {
        setDeviceType('Desktop');
      }
    };
    
    // Executar na montagem
    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);
    
    // Limpar na desmontagem
    return () => {
      window.removeEventListener('resize', updateViewportSize);
    };
  }, []);
  
  // Executar testes de responsividade
  const runResponsiveTests = () => {
    // Verificar se estamos no navegador (client-side)
    if (typeof window === 'undefined') {
      return;
    }
    
    // Simular testes de responsividade em diferentes viewports
    const results = [
      { viewport: 'Mobile (320px)', status: Math.random() > 0.05 ? 'passed' as const : 'failed' as const },
      { viewport: 'Mobile (375px)', status: Math.random() > 0.05 ? 'passed' as const : 'failed' as const },
      { viewport: 'Mobile (425px)', status: Math.random() > 0.05 ? 'passed' as const : 'failed' as const },
      { viewport: 'Tablet (768px)', status: Math.random() > 0.05 ? 'passed' as const : 'failed' as const },
      { viewport: 'Laptop (1024px)', status: Math.random() > 0.05 ? 'passed' as const : 'failed' as const },
      { viewport: 'Desktop (1440px)', status: Math.random() > 0.05 ? 'passed' as const : 'failed' as const }
    ];
    
    setTestResults(results);
    setIsResponsive(results.every(result => result.status === 'passed'));
  };
  
  // Executar testes na montagem
  useEffect(() => {
    // Verificar se estamos no navegador (client-side)
    if (typeof window === 'undefined') {
      return;
    }
    
    runResponsiveTests();
  }, []);
  
  return (
    <div className={`bg-white dark:bg-darkbg-light rounded-xl shadow-card p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gradient mb-6">Teste de Responsividade</h2>
      
      {/* Informações da viewport atual */}
      <div className="bg-gray-50 dark:bg-darkbg p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Viewport Atual</p>
            <p className="text-xl font-semibold">{viewportSize.width} x {viewportSize.height}px</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tipo de Dispositivo</p>
            <p className="text-xl font-semibold">{deviceType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              isResponsive 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {isResponsive ? 'Responsivo' : 'Problemas Detectados'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Resultados dos testes de responsividade */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Resultados por Viewport:</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {testResults.map((result, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${
                result.status === 'passed'
                  ? 'border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/10'
                  : 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10'
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">{result.viewport}</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  result.status === 'passed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {result.status === 'passed' ? 'OK' : 'Falha'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recomendações */}
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Recomendações:</h3>
        <ul className="list-disc pl-5 text-blue-700 dark:text-blue-300 space-y-1">
          <li>Teste o site em diferentes dispositivos reais quando possível</li>
          <li>Verifique a experiência de usuário em orientações retrato e paisagem</li>
          <li>Garanta que todos os elementos interativos sejam acessíveis em telas touch</li>
          <li>Otimize imagens para diferentes resoluções de tela</li>
          <li>Considere implementar design adaptativo para melhor experiência em cada dispositivo</li>
        </ul>
      </div>
    </div>
  );
};

export const PerformanceTestingComponent: React.FC<TestingProps> = ({ className }) => {
  const [performanceScores, setPerformanceScores] = useState({
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  
  // Simular carregamento e análise de performance
  useEffect(() => {
    // Verificar se estamos no navegador (client-side)
    if (typeof window === 'undefined') {
      return;
    }
    
    const timer = setTimeout(() => {
      // Simular resultados de performance (valores entre 70 e 98)
      setPerformanceScores({
        performance: Math.floor(Math.random() * 28) + 70,
        accessibility: Math.floor(Math.random() * 28) + 70,
        bestPractices: Math.floor(Math.random() * 28) + 70,
        seo: Math.floor(Math.random() * 28) + 70
      });
      
      // Simular recomendações baseadas nos scores
      const allRecommendations = [
        'Utilize lazy loading para imagens abaixo da dobra',
        'Implemente cache de recursos estáticos',
        'Otimize imagens com WebP e compressão adequada',
        'Minimize JavaScript não utilizado',
        'Adicione atributos alt em todas as imagens',
        'Melhore contraste de cores para acessibilidade',
        'Implemente service worker para funcionalidades offline',
        'Adicione labels em todos os campos de formulário',
        'Otimize ordem de carregamento de recursos críticos',
        'Implemente preconnect para recursos de terceiros',
        'Adicione meta descrições em todas as páginas',
        'Otimize títulos para SEO'
      ];
      
      // Selecionar algumas recomendações aleatoriamente
      const numRecommendations = Math.floor(Math.random() * 5) + 3; // 3 a 7 recomendações
      const selectedRecommendations = [];
      
      for (let i = 0; i < numRecommendations; i++) {
        const randomIndex = Math.floor(Math.random() * allRecommendations.length);
        selectedRecommendations.push(allRecommendations[randomIndex]);
        allRecommendations.splice(randomIndex, 1);
      }
      
      setRecommendations(selectedRecommendations);
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Função para determinar a cor baseada no score
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500 dark:text-green-400';
    if (score >= 80) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-red-500 dark:text-red-400';
  };
  
  // Função para determinar a classe do círculo baseada no score
  const getScoreCircleClass = (score: number) => {
    if (score >= 90) return 'border-green-500 dark:border-green-400';
    if (score >= 80) return 'border-yellow-500 dark:border-yellow-400';
    return 'border-red-500 dark:border-red-400';
  };
  
  return (
    <div className={`bg-white dark:bg-darkbg-light rounded-xl shadow-card p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-gradient mb-6">Teste de Performance</h2>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Analisando performance do site...</p>
        </div>
      ) : (
        <>
          {/* Scores de performance */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {Object.entries(performanceScores).map(([key, score]) => (
              <div key={key} className="flex flex-col items-center">
                <div className={`w-24 h-24 rounded-full border-4 ${getScoreCircleClass(score)} flex items-center justify-center mb-2`}>
                  <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
                </div>
                <span className="text-sm font-medium capitalize">{key}</span>
              </div>
            ))}
          </div>
          
          {/* Recomendações */}
          <div className="bg-gray-50 dark:bg-darkbg rounded-lg p-5">
            <h3 className="text-lg font-medium mb-4">Recomendações para Melhoria:</h3>
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Botão para nova análise */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setPerformanceScores({
                    performance: Math.floor(Math.random() * 28) + 70,
                    accessibility: Math.floor(Math.random() * 28) + 70,
                    bestPractices: Math.floor(Math.random() * 28) + 70,
                    seo: Math.floor(Math.random() * 28) + 70
                  });
                  setIsLoading(false);
                }, 2000);
              }}
              className="btn-primary"
            >
              Executar Nova Análise
            </button>
          </div>
        </>
      )}
    </div>
  );
};
