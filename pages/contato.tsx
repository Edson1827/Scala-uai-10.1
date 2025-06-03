import { useState } from 'react';
import { Layout } from '../components/Layout';
import { FormModal } from '../components/FormModal';

export default function Contato() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout
      title="Contato | ScalaUai Marketing Digital"
      description="Entre em contato com a equipe do ScalaUai para tirar dúvidas sobre nossos planos de marketing digital."
    >
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Entre em Contato</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Fale Conosco</h2>
            <p className="mb-6">Preencha o formulário ao lado ou utilize um dos canais abaixo para entrar em contato com nossa equipe.</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">contato@scalauai.com.br</p>
              </div>
              
              <div>
                <h3 className="font-medium">Telefone</h3>
                <p className="text-gray-600 dark:text-gray-300">+55 (11) 99999-9999</p>
              </div>
              
              <div>
                <h3 className="font-medium">Endereço</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Av. Paulista, 1000, Sala 101<br />
                  Bela Vista, São Paulo - SP<br />
                  CEP: 01310-100
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Horário de Atendimento</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Segunda a Sexta: 9h às 18h<br />
                Sábado: 9h às 13h
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 px-4 rounded-md transition duration-300"
            >
              Abrir Formulário de Contato
            </button>
          </div>
        </div>
      </section>
      
      <FormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        planName="Contato" 
      />
    </Layout>
  );
}
