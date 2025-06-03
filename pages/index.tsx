import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Benefits } from '../components/Benefits';
import { FAQ } from '../components/FAQ';
import { Testimonials } from '../components/Testimonials';
import { FormModal } from '../components/FormModal';
import { QuizModal } from '../components/QuizModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  
  const handleContratarClick = (planName) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };
  
  const handleQuizComplete = (planName) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };
  
  return (
    <Layout>
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4">
            <span className="block text-gray-900 dark:text-white">Marketing Digital</span>
            <span className="block text-primary">Sem Complicação</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Resultados mensuráveis, sem contratos longos e com garantia de performance em 30 dias.
          </p>
          <p className="mt-4 max-w-3xl mx-auto text-sm text-gray-600 dark:text-gray-300 italic font-medium">
            Feito para quem movimenta o Brasil
          </p>
        </div>
        
        {/* Planos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="border rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Starter</h2>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Básico</span>
            </div>
            <p className="mb-2 text-primary text-2xl font-bold">12x de R$197</p>
            <p className="text-sm mb-4">Comece a construir sua presença digital com estratégias eficientes</p>
            
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                1 campanha ativa
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                1 criativo por mês
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Relatórios mensais
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Suporte por email
              </li>
            </ul>
            
            <button 
              onClick={() => handleContratarClick('Starter')}
              className="w-full bg-primary text-white px-4 py-2 rounded inline-block hover:bg-opacity-90 transition"
            >
              Garantir Resultados
            </button>
          </div>

          <div className="border-2 border-primary rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow relative transform scale-105">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
              Mais Popular
            </div>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Aceleração</h2>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Recomendado</span>
            </div>
            <p className="mb-2 text-primary text-2xl font-bold">12x de R$297</p>
            <p className="text-sm mb-4">Dobre seu ROI com estratégias avançadas e campanhas de alta conversão</p>
            
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                2 campanhas ativas
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                3 criativos por mês
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Estratégia de conversão
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Relatórios mensais
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Suporte prioritário
              </li>
            </ul>
            
            <button 
              onClick={() => handleContratarClick('Aceleração')}
              className="w-full bg-primary text-white px-4 py-2 rounded inline-block hover:bg-opacity-90 transition"
            >
              Acelerar Crescimento
            </button>
          </div>

          <div className="border rounded-lg p-6 shadow hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Crescimento Exponencial</h2>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Premium</span>
            </div>
            <p className="mb-2 text-primary text-2xl font-bold">12x de R$397</p>
            <p className="text-sm mb-4">Multiplique seus resultados com estratégias omnichannel e otimização contínua</p>
            
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                4 campanhas ativas
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                5 criativos por mês
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Sistema completo de funil
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Estratégia omnichannel
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Relatórios quinzenais
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Suporte via WhatsApp
              </li>
            </ul>
            
            <button 
              onClick={() => handleContratarClick('Crescimento Exponencial')}
              className="w-full bg-primary text-white px-4 py-2 rounded inline-block hover:bg-opacity-90 transition"
            >
              Escalar Negócio
            </button>
          </div>
        </div>
      </section>
      
      {/* Calendário de Implementação - Como Funciona */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto my-8">
        <h2 className="text-2xl font-bold text-center mb-8">Como Funciona</h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-1 w-5 h-5 rounded-full bg-primary"></div>
              <div className="ml-auto mr-8 md:mr-auto md:ml-8 md:pl-8 w-full md:w-1/2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="font-bold mb-2">Dia 1: Diagnóstico</h3>
                <p className="text-sm">Análise completa da sua presença digital atual e definição de objetivos claros.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-1 w-5 h-5 rounded-full bg-primary"></div>
              <div className="mr-auto ml-8 md:ml-auto md:mr-8 md:pr-8 w-full md:w-1/2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="font-bold mb-2">Dia 3-5: Estratégia</h3>
                <p className="text-sm">Desenvolvimento da estratégia personalizada e criação dos primeiros materiais.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-1 w-5 h-5 rounded-full bg-primary"></div>
              <div className="ml-auto mr-8 md:mr-auto md:ml-8 md:pl-8 w-full md:w-1/2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="font-bold mb-2">Dia 7: Lançamento</h3>
                <p className="text-sm">Ativação das campanhas e início do monitoramento em tempo real.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-1 w-5 h-5 rounded-full bg-primary"></div>
              <div className="mr-auto ml-8 md:ml-auto md:mr-8 md:pr-8 w-full md:w-1/2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="font-bold mb-2">Dia 15: Otimização</h3>
                <p className="text-sm">Primeira rodada de otimizações baseadas nos dados coletados.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 -mt-1 w-5 h-5 rounded-full bg-primary"></div>
              <div className="ml-auto mr-8 md:mr-auto md:ml-8 md:pl-8 w-full md:w-1/2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <h3 className="font-bold mb-2">Dia 30: Resultados</h3>
                <p className="text-sm">Análise completa dos primeiros resultados e planejamento dos próximos passos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Por que escolher ScalaUai - Seção única e reorganizada */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-gray-50 dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-12">Por que escolher o ScalaUai?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Comparativo com Agências Tradicionais</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b dark:border-gray-600">
                    <th className="text-left py-2">Recursos</th>
                    <th className="text-center py-2">ScalaUai</th>
                    <th className="text-center py-2">Agências Tradicionais</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-600">
                    <td className="py-2">Investimento Mensal</td>
                    <td className="text-center text-green-600 dark:text-green-400">A partir de R$197/mês</td>
                    <td className="text-center text-red-600 dark:text-red-400">R$1.500 a R$5.000/mês</td>
                  </tr>
                  <tr className="border-b dark:border-gray-600">
                    <td className="py-2">Contrato Mínimo</td>
                    <td className="text-center text-green-600 dark:text-green-400">Sem contrato mínimo</td>
                    <td className="text-center text-red-600 dark:text-red-400">6 a 12 meses</td>
                  </tr>
                  <tr className="border-b dark:border-gray-600">
                    <td className="py-2">Garantia de Resultados</td>
                    <td className="text-center text-green-600 dark:text-green-400">30 dias ou dinheiro de volta</td>
                    <td className="text-center text-red-600 dark:text-red-400">Sem garantias</td>
                  </tr>
                  <tr className="border-b dark:border-gray-600">
                    <td className="py-2">Transparência</td>
                    <td className="text-center text-green-600 dark:text-green-400">Relatórios detalhados e dashboard</td>
                    <td className="text-center text-red-600 dark:text-red-400">Relatórios limitados</td>
                  </tr>
                  <tr>
                    <td className="py-2">Tempo para Resultados</td>
                    <td className="text-center text-green-600 dark:text-green-400">Primeiros 30 dias</td>
                    <td className="text-center text-red-600 dark:text-red-400">3 a 6 meses</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">Economize até 75% comparado a agências tradicionais com resultados superiores</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Resultados Mensuráveis</h3>
              <p className="text-gray-600 dark:text-gray-300">Acompanhe o desempenho das suas campanhas com relatórios detalhados que demonstram o retorno sobre seu investimento.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexibilidade Total</h3>
              <p className="text-gray-600 dark:text-gray-300">Sem contratos longos ou multas de fidelidade. Você permanece conosco apenas enquanto estiver satisfeito.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Economia Real</h3>
              <p className="text-gray-600 dark:text-gray-300">Economize até 75% comparado a agências tradicionais com resultados iguais ou superiores.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Equipe Especializada</h3>
              <p className="text-gray-600 dark:text-gray-300">Nossa equipe é formada por profissionais experientes e certificados nas principais plataformas de marketing digital do mercado.</p>
            </div>
          </div>
        </div>
        
        {/* Missão ScalaUai - Movida para abaixo de "Por que escolher ScalaUai" */}
        <div className="bg-white dark:bg-gray-700 rounded-lg p-6 mt-8 shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Nossa Missão</h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
            Fomos feitos para empresas que faturam a partir de R$20 mil por mês e querem escalar seus negócios, 
            aumentar engajamento nas redes sociais, obter mais leads qualificados, aumentar seguidores e vender mais.
          </p>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
            Nossa missão é colocar você, empreendedor, à frente do mercado com estratégias funcionais e objetivas 
            que buscam a digitalização e a alavancagem do seu negócio.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded shadow-sm">
              <h3 className="font-semibold text-primary mb-2">Crescimento Acelerado</h3>
              <p className="text-sm">Estratégias de marketing digital que geram resultados 3x mais rápido que métodos tradicionais.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded shadow-sm">
              <h3 className="font-semibold text-primary mb-2">Presença Digital Efetiva</h3>
              <p className="text-sm">Transformamos sua marca em autoridade digital com conteúdo estratégico e campanhas de alta conversão.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded shadow-sm">
              <h3 className="font-semibold text-primary mb-2">ROI Comprovado</h3>
              <p className="text-sm">Cada real investido é rastreado e otimizado para maximizar seu retorno e impulsionar seu crescimento.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Testimonials />
      
      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition"
          aria-label="Chat"
          onClick={() => alert('Chatbot em breve!')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>
      
      <FormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        planName={selectedPlan} 
      />
      
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onComplete={handleQuizComplete}
      />
    </Layout>
  );
}
