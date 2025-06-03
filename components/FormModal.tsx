import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { UpsellComponent } from './UpsellComponent';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

export const FormModal = ({ isOpen, onClose, planName }: FormModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const [showDownsell, setShowDownsell] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [hesitating, setHesitating] = useState(false);
  
  // Resetar estado quando o modal é aberto
  useState(() => {
    if (isOpen) {
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setSelectedUpsells([]);
      setShowDownsell(false);
      setTimeSpent(0);
      setHesitating(false);
    }
  });
  
  // Monitorar tempo gasto no formulário para detectar hesitação
  useState(() => {
    let timer: NodeJS.Timeout;
    
    if (isOpen) {
      timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  });
  
  // Verificar hesitação após 30 segundos sem envio
  useState(() => {
    if (timeSpent > 30 && !hesitating && (planName === 'Aceleração' || planName === 'Crescimento Exponencial')) {
      setHesitating(true);
      setShowDownsell(true);
    }
  });
  
  // Determinar downsell com base no plano atual
  const getDownsellOption = () => {
    if (planName === 'Crescimento Exponencial') {
      return {
        plan: 'Aceleração',
        description: 'Plano Aceleração com 2 campanhas ativas e landing page personalizada',
        price: 'R$297/mês'
      };
    } else if (planName === 'Aceleração') {
      return {
        plan: 'Starter',
        description: 'Plano Starter com 1 campanha ativa e relatório básico',
        price: 'R$197/mês'
      };
    }
    return null;
  };
  
  const handleUpsellSelect = (upsellId: string, selected: boolean) => {
    setSelectedUpsells(prev => 
      selected 
        ? [...prev, upsellId]
        : prev.filter(id => id !== upsellId)
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Aqui você adicionaria a lógica para enviar o formulário
    // Por exemplo, enviar para uma API, serviço de email, etc.
    
    alert(`Obrigado pelo interesse! Entraremos em contato em breve para finalizar sua contratação do plano ${planName}.`);
    onClose();
  };
  
  const switchToDownsell = () => {
    const downsell = getDownsellOption();
    if (downsell) {
      // Mudar para o plano de downsell
      // Na implementação real, você atualizaria o estado global ou usaria props
      alert(`Plano alterado para ${downsell.plan}. Por favor, preencha o formulário para continuar.`);
      setShowDownsell(false);
    }
  };
  
  if (!isOpen) return null;
  
  const downsellOption = getDownsellOption();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-primary">Contratar Plano {planName}</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
          </div>
          
          {showDownsell && downsellOption && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <h4 className="font-semibold mb-2">Opção alternativa para você</h4>
              <p className="text-sm mb-3">
                Que tal começar com nosso plano {downsellOption.plan} por apenas {downsellOption.price}?
              </p>
              <p className="text-sm mb-4">{downsellOption.description}</p>
              <div className="flex space-x-3">
                <button 
                  onClick={switchToDownsell}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm"
                >
                  Mudar para {downsellOption.plan}
                </button>
                <button 
                  onClick={() => setShowDownsell(false)}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-4 py-2 rounded text-sm"
                >
                  Continuar com {planName}
                </button>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"
                required
                placeholder="Seu nome completo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"
                required
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Telefone
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"
                required
                placeholder="(00) 00000-0000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="company">
                Empresa
              </label>
              <input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"
                required
                placeholder="Nome da sua empresa"
              />
            </div>
            
            <UpsellComponent 
              planName={planName}
              onUpsellSelect={handleUpsellSelect}
              selectedUpsells={selectedUpsells}
            />
            
            <button
              type="submit"
              className="w-full bg-primary hover:bg-opacity-90 text-white py-3 px-4 rounded font-medium transition-colors"
            >
              Solicitar contratação
            </button>
            
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
              Ao solicitar, nossa equipe entrará em contato para finalizar sua contratação.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
