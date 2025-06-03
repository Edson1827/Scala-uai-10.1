import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaBuilding, FaUsers, FaChartLine, FaHashtag, FaBullseye, FaCheckCircle } from 'react-icons/fa';

export const QuizModal = ({ isOpen, onClose, onComplete }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    faturamento: '',
    funcionarios: '',
    experiencia: '',
    redesSociais: '',
    objetivo: ''
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recommendedPlan, setRecommendedPlan] = useState('');
  const [animateIn, setAnimateIn] = useState(false);

  // Fechar o modal quando pressionar ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Impedir scroll do body quando modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNext = () => {
    // Animar transição
    setAnimateIn(false);
    
    setTimeout(() => {
      if (step < 5) {
        setStep(step + 1);
      } else {
        // Calcular plano recomendado
        calculateRecommendedPlan();
        setShowResults(true);
      }
      // Animar entrada do novo conteúdo
      setTimeout(() => setAnimateIn(true), 50);
    }, 300);
  };

  const handlePrev = () => {
    // Animar transição
    setAnimateIn(false);
    
    setTimeout(() => {
      if (step > 1) {
        setStep(step - 1);
      }
      // Animar entrada do novo conteúdo
      setTimeout(() => setAnimateIn(true), 50);
    }, 300);
  };

  const handleAnswerChange = (question, value) => {
    setAnswers({
      ...answers,
      [question]: value
    });
  };

  const calculateRecommendedPlan = () => {
    // Lógica para determinar o plano recomendado com base nas respostas
    let score = 0;
    
    // Faturamento
    if (answers.faturamento === 'ate50k') score += 1;
    else if (answers.faturamento === '50k-100k') score += 2;
    else if (answers.faturamento === '100k-500k') score += 3;
    else if (answers.faturamento === 'mais500k') score += 4;
    
    // Funcionários
    if (answers.funcionarios === 'ate5') score += 1;
    else if (answers.funcionarios === '6-15') score += 2;
    else if (answers.funcionarios === '16-50') score += 3;
    else if (answers.funcionarios === 'mais50') score += 4;
    
    // Experiência prévia
    if (answers.experiencia === 'nenhuma') score += 1;
    else if (answers.experiencia === 'pouca') score += 2;
    else if (answers.experiencia === 'moderada') score += 3;
    else if (answers.experiencia === 'muita') score += 4;
    
    // Redes sociais
    if (answers.redesSociais === 'nenhuma') score += 1;
    else if (answers.redesSociais === 'algumas') score += 2;
    else if (answers.redesSociais === 'varias') score += 3;
    else if (answers.redesSociais === 'todas') score += 4;
    
    // Objetivo
    if (answers.objetivo === 'visibilidade') score += 1;
    else if (answers.objetivo === 'leads') score += 2;
    else if (answers.objetivo === 'vendas') score += 3;
    else if (answers.objetivo === 'fidelizacao') score += 4;
    
    // Determinar plano com base na pontuação
    let plan = '';
    if (score <= 10) {
      plan = 'Starter';
    } else if (score <= 15) {
      plan = 'Aceleração';
    } else {
      plan = 'Crescimento Exponencial';
    }
    
    setRecommendedPlan(plan);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulação de envio de dados
    setTimeout(() => {
      setLoading(false);
      onComplete(recommendedPlan);
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  // Efeito para animar entrada quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimateIn(true), 100);
    } else {
      setAnimateIn(false);
    }
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out">
        {/* Botão de fechar */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 z-10"
          aria-label="Fechar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6">
          {!showResults && !showForm ? (
            <>
              {/* Cabeçalho */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary bg-opacity-10 text-primary mb-4">
                  {step === 1 && <FaBuilding className="h-8 w-8" />}
                  {step === 2 && <FaUsers className="h-8 w-8" />}
                  {step === 3 && <FaChartLine className="h-8 w-8" />}
                  {step === 4 && <FaHashtag className="h-8 w-8" />}
                  {step === 5 && <FaBullseye className="h-8 w-8" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Descubra o plano ideal para seu negócio
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Responda 5 perguntas rápidas para uma recomendação personalizada
                </p>
              </div>
              
              {/* Progresso */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Pergunta {step} de 5</span>
                  <span>{Math.round((step / 5) * 100)}% concluído</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(step / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Perguntas */}
              <div className={`mb-8 transition-all duration-300 ease-in-out ${animateIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
                {step === 1 && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Qual é o faturamento mensal da sua empresa?
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="faturamento"
                          value="ate50k"
                          checked={answers.faturamento === 'ate50k'}
                          onChange={() => handleAnswerChange('faturamento', 'ate50k')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">R$ 20 mil a R$ 50 mil</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="faturamento"
                          value="50k-100k"
                          checked={answers.faturamento === '50k-100k'}
                          onChange={() => handleAnswerChange('faturamento', '50k-100k')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">R$ 50 mil a R$ 100 mil</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="faturamento"
                          value="100k-500k"
                          checked={answers.faturamento === '100k-500k'}
                          onChange={() => handleAnswerChange('faturamento', '100k-500k')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">R$ 100 mil a R$ 500 mil</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="faturamento"
                          value="mais500k"
                          checked={answers.faturamento === 'mais500k'}
                          onChange={() => handleAnswerChange('faturamento', 'mais500k')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">Acima de R$ 500 mil</span>
                      </label>
                    </div>
                  </div>
                )}
                
                {step === 2 && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Quantos funcionários sua empresa possui?
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="funcionarios"
                          value="ate5"
                          checked={answers.funcionarios === 'ate5'}
                          onChange={() => handleAnswerChange('funcionarios', 'ate5')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">Até 5 funcionários</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="funcionarios"
                          value="6-15"
                          checked={answers.funcionarios === '6-15'}
                          onChange={() => handleAnswerChange('funcionarios', '6-15')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">6 a 15 funcionários</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="funcionarios"
                          value="16-50"
                          checked={answers.funcionarios === '16-50'}
                          onChange={() => handleAnswerChange('funcionarios', '16-50')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">16 a 50 funcionários</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="funcionarios"
                          value="mais50"
                          checked={answers.funcionarios === 'mais50'}
                          onChange={() => handleAnswerChange('funcionarios', 'mais50')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">Mais de 50 funcionários</span>
                      </label>
                    </div>
                  </div>
                )}
                
                {step === 3 && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Você já investiu em marketing digital antes?
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="experiencia"
                          value="nenhuma"
                          checked={answers.experiencia === 'nenhuma'}
                          onChange={() => handleAnswerChange('experiencia', 'nenhuma')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">Nunca investi</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="experiencia"
                          value="pouca"
                          checked={answers.experiencia === 'pouca'}
                          onChange={() => handleAnswerChange('experiencia', 'pouca')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">Investi pouco (menos de R$1.000/mês)</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="experiencia"
                          value="moderada"
                          checked={answers.experiencia === 'moderada'}
                          onChange={() => handleAnswerChange('experiencia', 'moderada')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">Invisto regularmente (R$1.000 a R$5.000/mês)</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="experiencia"
                          value="muita"
                          checked={answers.experiencia === 'muita'}
                          onChange={() => handleAnswerChange('experiencia', 'muita')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">Invisto muito (mais de R$5.000/mês)</span>
                      </label>
                    </div>
                  </div>
                )}
                
                {step === 4 && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Sua empresa possui presença em redes sociais?
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="redesSociais"
                          value="nenhuma"
                          checked={answers.redesSociais === 'nenhuma'}
                          onChange={() => handleAnswerChange('redesSociais', 'nenhuma')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">Não possui redes sociais</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="redesSociais"
                          value="algumas"
                          checked={answers.redesSociais === 'algumas'}
                          onChange={() => handleAnswerChange('redesSociais', 'algumas')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">Possui 1 ou 2 redes sociais</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="redesSociais"
                          value="varias"
                          checked={answers.redesSociais === 'varias'}
                          onChange={() => handleAnswerChange('redesSociais', 'varias')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">Possui 3 ou 4 redes sociais</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="redesSociais"
                          value="todas"
                          checked={answers.redesSociais === 'todas'}
                          onChange={() => handleAnswerChange('redesSociais', 'todas')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">Presente em todas as principais redes</span>
                      </label>
                    </div>
                  </div>
                )}
                
                {step === 5 && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Qual é o principal objetivo da sua empresa com marketing digital?
                    </h4>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="objetivo"
                          value="visibilidade"
                          checked={answers.objetivo === 'visibilidade'}
                          onChange={() => handleAnswerChange('objetivo', 'visibilidade')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">Aumentar visibilidade da marca</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="objetivo"
                          value="leads"
                          checked={answers.objetivo === 'leads'}
                          onChange={() => handleAnswerChange('objetivo', 'leads')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">Gerar leads qualificados</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="objetivo"
                          value="vendas"
                          checked={answers.objetivo === 'vendas'}
                          onChange={() => handleAnswerChange('objetivo', 'vendas')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">Aumentar vendas diretas</span>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <input
                          type="radio"
                          name="objetivo"
                          value="fidelizacao"
                          checked={answers.objetivo === 'fidelizacao'}
                          onChange={() => handleAnswerChange('objetivo', 'fidelizacao')}
                          className="h-4 w-4 text-primary"
                        />
                        <span className="ml-3">Fidelizar clientes existentes</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Botões de navegação */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={step === 1}
                  className={`px-4 py-2 rounded ${
                    step === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !answers.faturamento) ||
                    (step === 2 && !answers.funcionarios) ||
                    (step === 3 && !answers.experiencia) ||
                    (step === 4 && !answers.redesSociais) ||
                    (step === 5 && !answers.objetivo)
                  }
                  className={`px-4 py-2 rounded ${
                    (step === 1 && !answers.faturamento) ||
                    (step === 2 && !answers.funcionarios) ||
                    (step === 3 && !answers.experiencia) ||
                    (step === 4 && !answers.redesSociais) ||
                    (step === 5 && !answers.objetivo)
                      ? 'bg-primary bg-opacity-50 text-white cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-opacity-90'
                  }`}
                >
                  {step === 5 ? 'Finalizar' : 'Próximo'}
                </button>
              </div>
            </>
          ) : showResults ? (
            <div className={`transition-all duration-300 ease-in-out ${animateIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
              {/* Tela de resultados */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-4">
                  <FaCheckCircle className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Plano recomendado: {recommendedPlan}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Com base nas suas respostas, identificamos o plano perfeito para o seu negócio.
                </p>
                
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6 mb-6 text-left">
                  <h4 className="font-semibold text-lg mb-3">Por que o plano {recommendedPlan} é ideal para você:</h4>
                  
                  {recommendedPlan === 'Starter' && (
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>Ideal para empresas em fase inicial de marketing digital</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>Foco em resultados rápidos com investimento controlado</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>Flexibilidade para testar e validar estratégias</span>
                      </li>
                    </ul>
                  )}
                  
                  {recommendedPlan === 'Aceleração' && (
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>Perfeito para empresas que já têm experiência com marketing digital</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>Campanhas múltiplas para maximizar alcance e conversão</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>Landing pages personalizadas para aumentar taxas de conversão</span>
                      </li>
                    </ul>
                  )}
                  
                  {recommendedPlan === 'Crescimento Exponencial' && (
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>Estratégia omnichannel para empresas em fase de expansão</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>Otimização contínua para maximizar ROI e escalabilidade</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 mr-2 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span>Suporte prioritário e consultoria estratégica para crescimento acelerado</span>
                      </li>
                    </ul>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex-1 bg-primary text-white px-4 py-3 rounded-lg font-medium hover:bg-opacity-90 transition flex items-center justify-center"
                  >
                    Quero este plano
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-3 rounded-lg font-medium hover:bg-opacity-90 transition"
                  >
                    Ver todos os planos
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Formulário */}
              <div className={`text-center mb-6 transition-all duration-300 ease-in-out ${animateIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Plano recomendado: {recommendedPlan}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-4">
                  Com base nas suas respostas, este é o plano ideal para seu negócio.
                </p>
                
                <div className="bg-primary bg-opacity-10 p-4 rounded-lg mb-6">
                  <p className="text-primary font-medium">
                    Preencha seus dados para receber mais informações sobre o plano {recommendedPlan}
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !nome || !email || !telefone}
                    className={`px-4 py-2 rounded bg-primary text-white ${
                      loading || !nome || !email || !telefone
                        ? 'opacity-70 cursor-not-allowed'
                        : 'hover:bg-opacity-90'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processando...
                      </span>
                    ) : (
                      'Ver plano recomendado'
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
