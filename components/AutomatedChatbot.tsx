import { useState, useEffect } from 'react';

interface ChatbotProps {
  className?: string;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
  options?: string[];
}

export const AutomatedChatbot: React.FC<ChatbotProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [leadInfo, setLeadInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    interest: '',
    qualified: false
  });
  
  // Inicializar chatbot com mensagem de boas-vindas
  useEffect(() => {
    setTimeout(() => {
      setUnreadCount(1);
    }, 3000);
  }, []);
  
  // Função para adicionar mensagem do bot com delay para simular digitação
  const addBotMessage = (text: string, options?: string[], delay: number = 1000) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          type: 'bot',
          text,
          timestamp: new Date(),
          options
        }
      ]);
    }, delay);
  };
  
  // Função para adicionar mensagem do usuário
  const addUserMessage = (text: string) => {
    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        type: 'user',
        text,
        timestamp: new Date()
      }
    ]);
    
    // Processar resposta baseada na mensagem do usuário
    processUserMessage(text);
  };
  
  // Processar mensagem do usuário e gerar resposta apropriada
  const processUserMessage = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Verificar se é uma resposta para coleta de informações
    if (messages.length > 0 && messages[messages.length - 1].type === 'bot') {
      const lastMessage = messages[messages.length - 1];
      
      // Coleta de nome
      if (lastMessage.text.includes('Qual é o seu nome?')) {
        setLeadInfo(prev => ({ ...prev, name: text }));
        addBotMessage(`Prazer em conhecê-lo, ${text}! Qual é o seu email?`);
        return;
      }
      
      // Coleta de email
      if (lastMessage.text.includes('Qual é o seu email?')) {
        setLeadInfo(prev => ({ ...prev, email: text }));
        addBotMessage('Ótimo! E em qual empresa você trabalha?');
        return;
      }
      
      // Coleta de empresa
      if (lastMessage.text.includes('qual empresa')) {
        setLeadInfo(prev => ({ ...prev, company: text }));
        addBotMessage('Qual o seu telefone para contato?');
        return;
      }
      
      // Coleta de telefone
      if (lastMessage.text.includes('telefone')) {
        setLeadInfo(prev => ({ ...prev, phone: text }));
        addBotMessage('Em qual serviço você tem mais interesse?', [
          'Marketing Digital',
          'Gestão de Redes Sociais',
          'SEO',
          'Google Ads',
          'Facebook Ads',
          'Outro'
        ]);
        return;
      }
    }
    
    // Verificar interesse específico
    if (
      lowerText.includes('marketing digital') ||
      lowerText.includes('redes sociais') ||
      lowerText.includes('seo') ||
      lowerText.includes('google ads') ||
      lowerText.includes('facebook ads')
    ) {
      setLeadInfo(prev => ({ 
        ...prev, 
        interest: text,
        qualified: true
      }));
      
      addBotMessage('Excelente escolha! Baseado nas suas informações, nosso sistema de IA identificou que o plano Aceleração seria o mais adequado para suas necessidades.');
      
      setTimeout(() => {
        addBotMessage('Gostaria de agendar uma reunião com um de nossos especialistas para discutir como podemos ajudar sua empresa a crescer?', [
          'Sim, quero agendar',
          'Não, apenas informações'
        ], 1500);
      }, 2000);
      
      return;
    }
    
    // Resposta para agendamento
    if (lowerText.includes('sim') && lowerText.includes('agendar')) {
      addBotMessage('Ótimo! Nosso sistema está verificando a disponibilidade dos nossos especialistas...');
      
      setTimeout(() => {
        addBotMessage('Temos horários disponíveis nos próximos dias. Qual seria o melhor para você?', [
          'Amanhã - 10:00',
          'Amanhã - 15:00',
          'Depois de amanhã - 09:00',
          'Depois de amanhã - 14:00'
        ], 2000);
      }, 2000);
      
      return;
    }
    
    // Confirmação de horário
    if (lowerText.includes('amanhã') || lowerText.includes('depois de amanhã')) {
      addBotMessage(`Perfeito! Sua reunião foi agendada para ${text}. Você receberá um email de confirmação com o link para a videochamada.`);
      
      setTimeout(() => {
        addBotMessage('Enquanto isso, preparamos uma proposta personalizada baseada nas informações que você compartilhou. Você pode acessá-la através deste link: [Proposta Personalizada]', [], 2000);
      }, 2000);
      
      return;
    }
    
    // Resposta para informações
    if (lowerText.includes('não') && lowerText.includes('apenas informações')) {
      addBotMessage('Sem problemas! Vou enviar mais informações sobre nossos serviços para o seu email. Você também pode baixar nosso material completo aqui: [Material Informativo]');
      
      setTimeout(() => {
        addBotMessage('Caso mude de ideia ou tenha mais perguntas, estarei aqui para ajudar. Tenha um ótimo dia!', [], 2000);
      }, 2000);
      
      return;
    }
    
    // Respostas para perguntas comuns
    if (lowerText.includes('preço') || lowerText.includes('valor') || lowerText.includes('custo')) {
      addBotMessage('Nossos planos começam a partir de R$197/mês. O valor exato depende das necessidades específicas da sua empresa. Posso te apresentar mais detalhes sobre cada plano?', [
        'Sim, quero ver os planos',
        'Não, obrigado'
      ]);
      return;
    }
    
    if (lowerText.includes('plano')) {
      addBotMessage('Temos três planos principais: Starter (R$197/mês), Aceleração (R$297/mês) e Crescimento Exponencial (R$397/mês). Cada um é personalizado para diferentes estágios de negócio. Em qual você tem interesse?', [
        'Starter',
        'Aceleração',
        'Crescimento Exponencial',
        'Comparar todos'
      ]);
      return;
    }
    
    // Resposta padrão para iniciar qualificação
    if (messages.length <= 2) {
      addBotMessage('Olá! Sou o assistente virtual da ScalaUai. Estou aqui para ajudar a encontrar a melhor solução de marketing digital para o seu negócio. Qual é o seu nome?');
      return;
    }
    
    // Resposta genérica
    addBotMessage('Entendi! Para oferecer a melhor solução para sua empresa, nossos especialistas precisam entender melhor suas necessidades. Posso agendar uma consulta gratuita?', [
      'Sim, quero agendar',
      'Não, apenas informações'
    ]);
  };
  
  // Lidar com envio de mensagem
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    addUserMessage(inputValue);
    setInputValue('');
  };
  
  // Lidar com clique em opção
  const handleOptionClick = (option: string) => {
    addUserMessage(option);
  };
  
  // Lidar com tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Abrir chatbot
  const handleOpenChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
    
    if (messages.length === 0) {
      addBotMessage('Olá! Sou o assistente virtual da ScalaUai. Estou aqui para ajudar a encontrar a melhor solução de marketing digital para o seu negócio. Qual é o seu nome?');
    }
  };
  
  return (
    <div className={className}>
      {/* Botão flutuante do chatbot */}
      {!isOpen && (
        <button
          onClick={handleOpenChat}
          className="fixed bottom-6 right-6 bg-primary hover:bg-primary-dark text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all hover:scale-110 z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>
      )}
      
      {/* Janela do chatbot */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-white dark:bg-darkbg rounded-lg shadow-xl flex flex-col z-50 animate-slideUp">
          {/* Cabeçalho */}
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Assistente ScalaUai</h3>
                <p className="text-xs opacity-75">Online | Resposta em até 2 min</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Área de mensagens */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.type === 'user' ? 'flex justify-end' : 'flex justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  {message.options && message.options.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="block w-full text-left px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded border border-gray-200 dark:border-gray-600 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  <span className="block text-xs opacity-75 mt-1 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Área de input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary dark:bg-darkbg dark:text-white"
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ''}
                className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              Atendimento automatizado com IA | Taxa de automação: 85%
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
