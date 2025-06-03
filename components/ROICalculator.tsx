import { useState, useEffect } from 'react';

interface ROICalculatorProps {
  className?: string;
}

export const ROICalculator: React.FC<ROICalculatorProps> = ({ className }) => {
  // Estado para os inputs do usuário
  const [monthlyBudget, setMonthlyBudget] = useState<number>(5000);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(300);
  const [conversionRate, setConversionRate] = useState<number>(2);
  const [plan, setPlan] = useState<string>('aceleracao');
  
  // Estado para os resultados calculados
  const [currentROI, setCurrentROI] = useState<number>(0);
  const [projectedROI, setProjectedROI] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [additionalRevenue, setAdditionalRevenue] = useState<number>(0);
  
  // Preços dos planos
  const planPrices = {
    starter: 197,
    aceleracao: 297,
    crescimento: 397
  };
  
  // Fatores de melhoria por plano (multiplicadores)
  const improvementFactors = {
    starter: 1.5,
    aceleracao: 2.2,
    crescimento: 3.0
  };
  
  // Calcular ROI quando os inputs mudarem
  useEffect(() => {
    // Cálculo do ROI atual (antes da ScalaUai)
    const visits = monthlyBudget / 2; // Estimativa de visitas com orçamento atual
    const currentConversions = visits * (conversionRate / 100);
    const currentRevenue = currentConversions * averageOrderValue;
    const currentROIValue = ((currentRevenue - monthlyBudget) / monthlyBudget) * 100;
    setCurrentROI(currentROIValue);
    
    // Cálculo do ROI projetado com ScalaUai
    const selectedPlanPrice = planPrices[plan as keyof typeof planPrices];
    const improvementFactor = improvementFactors[plan as keyof typeof improvementFactors];
    
    const improvedConversionRate = conversionRate * improvementFactor;
    const improvedVisits = visits * 1.3; // 30% mais visitas com mesmo orçamento
    const projectedConversions = improvedVisits * (improvedConversionRate / 100);
    const projectedRevenue = projectedConversions * averageOrderValue;
    const projectedROIValue = ((projectedRevenue - selectedPlanPrice) / selectedPlanPrice) * 100;
    
    setProjectedROI(projectedROIValue);
    setSavings(monthlyBudget - selectedPlanPrice);
    setAdditionalRevenue(projectedRevenue - currentRevenue);
    
  }, [monthlyBudget, averageOrderValue, conversionRate, plan]);
  
  // Formatar valores monetários
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };
  
  // Formatar percentuais
  const formatPercent = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value / 100);
  };
  
  return (
    <div className={`bg-white dark:bg-darkbg-light rounded-xl shadow-card p-6 ${className}`}>
      <h3 className="text-2xl font-bold text-gradient mb-6 text-center">Calculadora de ROI</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulário de entrada */}
        <div className="space-y-6 animate-fadeIn">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Orçamento mensal atual com marketing
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                R$
              </span>
              <input
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-darkbg dark:text-white"
                placeholder="5000"
                min="0"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Valor médio de pedido/venda
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                R$
              </span>
              <input
                type="number"
                value={averageOrderValue}
                onChange={(e) => setAverageOrderValue(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-darkbg dark:text-white"
                placeholder="300"
                min="0"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Taxa de conversão atual (%)
            </label>
            <div className="relative">
              <input
                type="number"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-darkbg dark:text-white"
                placeholder="2"
                min="0"
                max="100"
                step="0.1"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400">
                %
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Plano ScalaUai
            </label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-primary focus:border-primary dark:bg-darkbg dark:text-white"
            >
              <option value="starter">Starter - R$197/mês</option>
              <option value="aceleracao">Aceleração - R$297/mês</option>
              <option value="crescimento">Crescimento Exponencial - R$397/mês</option>
            </select>
          </div>
        </div>
        
        {/* Resultados */}
        <div className="bg-gray-50 dark:bg-darkbg p-6 rounded-xl animate-slideInRight">
          <h4 className="text-lg font-semibold mb-4 text-primary">Resultados Projetados</h4>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">ROI Atual:</span>
              <span className={`font-semibold ${currentROI < 0 ? 'text-red-500' : 'text-green-500'}`}>
                {formatPercent(currentROI)}
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">ROI Projetado:</span>
              <span className="font-semibold text-green-500">
                {formatPercent(projectedROI)}
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Economia Mensal:</span>
              <span className="font-semibold text-green-500">
                {formatCurrency(savings)}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Receita Adicional:</span>
              <span className="font-semibold text-green-500">
                {formatCurrency(additionalRevenue)}
              </span>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Aumento de ROI:</span>
              <span className="text-xl font-bold text-gradient">
                {formatPercent(projectedROI - currentROI)}
              </span>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="btn-primary w-full">
              Obter Plano Personalizado
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>Esta é uma estimativa baseada em dados médios do mercado. Os resultados reais podem variar.</p>
      </div>
    </div>
  );
};
