import { useState, useEffect } from 'react';

interface CodeScannerProps {
  className?: string;
}

interface Issue {
  id: string;
  type: 'error' | 'warning' | 'info';
  file: string;
  line: number;
  message: string;
  code?: string;
  solution?: string;
}

export const CodeScanner: React.FC<CodeScannerProps> = ({ className }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [scanComplete, setScanComplete] = useState(false);
  const [deployReady, setDeployReady] = useState(false);
  const [filesScanned, setFilesScanned] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  
  // Simular varredura de código
  const startScan = () => {
    setIsScanning(true);
    setProgress(0);
    setScanComplete(false);
    setDeployReady(false);
    setIssues([]);
    
    // Simular número total de arquivos
    const mockTotalFiles = 42;
    setTotalFiles(mockTotalFiles);
    
    // Simular progresso da varredura
    let currentProgress = 0;
    let currentFilesScanned = 0;
    
    const progressInterval = setInterval(() => {
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        completeScan();
        return;
      }
      
      // Incrementar progresso
      const increment = Math.floor(Math.random() * 5) + 1;
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);
      
      // Incrementar arquivos escaneados
      const filesIncrement = Math.floor((increment / 100) * mockTotalFiles);
      currentFilesScanned = Math.min(currentFilesScanned + filesIncrement, mockTotalFiles);
      setFilesScanned(currentFilesScanned);
      
      // Simular encontrar problemas ocasionalmente
      if (Math.random() < 0.2) {
        addRandomIssue();
      }
    }, 200);
    
    return () => clearInterval(progressInterval);
  };
  
  // Adicionar problema aleatório
  const addRandomIssue = () => {
    const issueTypes: ('error' | 'warning' | 'info')[] = ['error', 'warning', 'info'];
    const fileTypes = ['.tsx', '.js', '.css', '.html'];
    const components = ['Header', 'Footer', 'Layout', 'QuizModal', 'FormModal', 'Benefits', 'UpsellComponent', 'AutomatedChatbot', 'EmailAutomation'];
    
    const issueType = issueTypes[Math.floor(Math.random() * issueTypes.length)];
    const fileType = fileTypes[Math.floor(Math.random() * fileTypes.length)];
    const component = components[Math.floor(Math.random() * components.length)];
    const fileName = `${component}${fileType}`;
    const lineNumber = Math.floor(Math.random() * 200) + 1;
    
    let message = '';
    let code = '';
    let solution = '';
    
    // Gerar mensagem baseada no tipo de problema
    switch (issueType) {
      case 'error':
        if (fileType === '.tsx' || fileType === '.js') {
          message = Math.random() < 0.5 
            ? `Referência a variável não definida: '${['data', 'props', 'state', 'config'][Math.floor(Math.random() * 4)]}'`
            : `Erro de sintaxe: ${['parêntese não fechado', 'ponto e vírgula ausente', 'chave não fechada'][Math.floor(Math.random() * 3)]}`;
          code = Math.random() < 0.5
            ? `const ${component} = () => {\n  const [state, setState] = useState()\n  return data.map(item => <div>{item.name}</div>)\n}`
            : `function handle${component}Click() {\n  if(isActive {\n    return true\n  }\n}`;
          solution = Math.random() < 0.5
            ? `Defina a variável antes de usá-la ou verifique se ela está sendo passada corretamente como prop`
            : `Corrija a sintaxe adicionando o ${['parêntese', 'ponto e vírgula', 'chave'][Math.floor(Math.random() * 3)]} ausente`;
        } else {
          message = `Propriedade CSS inválida ou não suportada: '${['flex-displays', 'colours', 'back-ground', 'paddings'][Math.floor(Math.random() * 4)]}'`;
          code = `.${component.toLowerCase()} {\n  flex-displays: flex;\n  colours: #333;\n}`;
          solution = `Corrija o nome da propriedade CSS para '${['display', 'color', 'background', 'padding'][Math.floor(Math.random() * 4)]}'`;
        }
        break;
      case 'warning':
        if (fileType === '.tsx' || fileType === '.js') {
          message = Math.random() < 0.5
            ? `Variável declarada mas nunca utilizada: '${['temp', 'result', 'data', 'response'][Math.floor(Math.random() * 4)]}'`
            : `Dependência ausente no array de useEffect`;
          code = Math.random() < 0.5
            ? `const ${component} = () => {\n  const temp = fetchData();\n  return <div>Content</div>\n}`
            : `useEffect(() => {\n  setData(props.value);\n}, [])`;
          solution = Math.random() < 0.5
            ? `Remova a variável não utilizada ou use-a no código`
            : `Adicione 'props.value' ao array de dependências do useEffect`;
        } else {
          message = `Propriedade CSS obsoleta: '${['border-radius-topleft', 'box-shadow-color', 'text-decoration-style'][Math.floor(Math.random() * 3)]}'`;
          code = `.${component.toLowerCase()} {\n  border-radius-topleft: 5px;\n}`;
          solution = `Use a propriedade moderna 'border-top-left-radius' em vez da obsoleta`;
        }
        break;
      case 'info':
        if (fileType === '.tsx' || fileType === '.js') {
          message = Math.random() < 0.5
            ? `Considere usar uma função memoizada para melhor performance`
            : `Componente pode ser convertido para função pura`;
          code = `const ${component} = (props) => {\n  // Implementação do componente\n}`;
          solution = Math.random() < 0.5
            ? `Use React.memo() ou useMemo() para evitar renderizações desnecessárias`
            : `Converta para uma função pura removendo efeitos colaterais`;
        } else {
          message = `Considere usar variáveis CSS para melhor manutenção`;
          code = `.${component.toLowerCase()} {\n  color: #3366ff;\n  background: #f5f5f5;\n}`;
          solution = `Defina variáveis CSS como :root { --primary: #3366ff; } e use var(--primary)`;
        }
        break;
    }
    
    const newIssue: Issue = {
      id: `issue-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: issueType,
      file: fileName,
      line: lineNumber,
      message,
      code,
      solution
    };
    
    setIssues(prev => [...prev, newIssue]);
  };
  
  // Finalizar varredura
  const completeScan = () => {
    setIsScanning(false);
    setScanComplete(true);
    setProgress(100);
    setFilesScanned(totalFiles);
    
    // Determinar se está pronto para deploy
    const hasErrors = issues.some(issue => issue.type === 'error');
    setDeployReady(!hasErrors);
  };
  
  // Corrigir todos os problemas
  const fixAllIssues = () => {
    // Simular correção de problemas
    setIssues(prev => prev.map(issue => ({
      ...issue,
      type: 'info',
      message: `Corrigido: ${issue.message}`,
      solution: 'Problema resolvido automaticamente'
    })));
    
    setDeployReady(true);
  };
  
  // Obter classe de cor baseada no tipo de problema
  const getIssueTypeClass = (type: 'error' | 'warning' | 'info') => {
    switch (type) {
      case 'error':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20';
      case 'info':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20';
    }
  };
  
  // Obter ícone baseado no tipo de problema
  const getIssueTypeIcon = (type: 'error' | 'warning' | 'info') => {
    switch (type) {
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };
  
  return (
    <div className={`bg-white dark:bg-darkbg-light rounded-xl shadow-card p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gradient">Varredura de Código</h2>
        
        <div>
          {!isScanning && !scanComplete && (
            <button
              onClick={startScan}
              className="btn-primary"
            >
              Iniciar Varredura
            </button>
          )}
          
          {!isScanning && scanComplete && !deployReady && (
            <button
              onClick={fixAllIssues}
              className="btn-primary"
            >
              Corrigir Todos os Problemas
            </button>
          )}
          
          {!isScanning && deployReady && (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Pronto para Deploy</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Progresso da varredura */}
      {(isScanning || scanComplete) && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Progresso</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full transition-all duration-300 ${
                deployReady ? 'bg-green-500' : 'bg-primary'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>{filesScanned} de {totalFiles} arquivos verificados</span>
            <span>{issues.length} problemas encontrados</span>
          </div>
        </div>
      )}
      
      {/* Lista de problemas */}
      {issues.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Problemas Encontrados:</h3>
          
          <div className="space-y-4">
            {issues.map(issue => (
              <div 
                key={issue.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className={`p-4 flex items-start ${getIssueTypeClass(issue.type)}`}>
                  <div className="mr-3 mt-0.5">
                    {getIssueTypeIcon(issue.type)}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium">
                        {issue.type === 'error' ? 'Erro' : issue.type === 'warning' ? 'Aviso' : 'Info'}:
                      </span>
                      <span className="ml-2">{issue.message}</span>
                    </div>
                    <div className="text-sm mt-1">
                      <span className="font-medium">Arquivo:</span> {issue.file} (linha {issue.line})
                    </div>
                  </div>
                </div>
                
                {issue.code && (
                  <div className="bg-gray-50 dark:bg-darkbg border-t border-gray-200 dark:border-gray-700 p-4">
                    <pre className="text-sm overflow-x-auto bg-gray-100 dark:bg-gray-800 p-3 rounded">
                      <code>{issue.code}</code>
                    </pre>
                    
                    {issue.solution && (
                      <div className="mt-3">
                        <span className="font-medium text-sm">Solução Recomendada:</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{issue.solution}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Resumo da varredura */}
      {scanComplete && (
        <div className={`p-4 rounded-lg ${
          deployReady 
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900' 
            : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900'
        }`}>
          <div className="flex items-start">
            {deployReady ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <div>
              <h4 className={`font-medium ${
                deployReady 
                  ? 'text-green-800 dark:text-green-200' 
                  : 'text-yellow-800 dark:text-yellow-200'
              }`}>
                {deployReady 
                  ? 'Código pronto para deploy!' 
                  : 'Código precisa de correções antes do deploy'}
              </h4>
              
              <p className={`text-sm mt-1 ${
                deployReady 
                  ? 'text-green-600 dark:text-green-300' 
                  : 'text-yellow-600 dark:text-yellow-300'
              }`}>
                {deployReady 
                  ? `Varredura completa: ${totalFiles} arquivos verificados, ${issues.filter(i => i.type === 'info').length} sugestões de melhoria.` 
                  : `Varredura completa: ${totalFiles} arquivos verificados, ${issues.filter(i => i.type === 'error').length} erros e ${issues.filter(i => i.type === 'warning').length} avisos encontrados.`}
              </p>
              
              {!deployReady && (
                <p className="text-sm mt-2 text-yellow-600 dark:text-yellow-300">
                  Clique em "Corrigir Todos os Problemas" para resolver automaticamente os problemas encontrados.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Mensagem quando nenhuma varredura foi iniciada */}
      {!isScanning && !scanComplete && (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Nenhuma varredura de código foi iniciada.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Clique em "Iniciar Varredura" para verificar o código em busca de erros que possam impedir o deploy.
          </p>
        </div>
      )}
    </div>
  );
};
