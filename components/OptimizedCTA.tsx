import { useState } from 'react';

interface CTAProps {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

export const OptimizedCTA: React.FC<CTAProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  secondaryButtonText,
  secondaryButtonLink,
  className,
  variant = 'primary'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-primary to-primary-light text-white';
      case 'secondary':
        return 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-darkbg dark:to-darkbg-light';
      case 'accent':
        return 'bg-gradient-to-r from-secondary to-secondary-light text-white';
      default:
        return 'bg-gradient-to-r from-primary to-primary-light text-white';
    }
  };
  
  return (
    <div className={`rounded-xl shadow-card p-8 ${getVariantClasses()} ${className}`}>
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          {title}
        </h2>
        
        {subtitle && (
          <p className={`text-lg mb-6 ${variant === 'secondary' ? 'text-gray-600 dark:text-gray-300' : 'text-white/90'}`}>
            {subtitle}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <a 
            href={buttonLink}
            className={`btn-${variant === 'secondary' ? 'primary' : 'white'} text-center px-8 py-3 text-lg`}
          >
            {buttonText}
          </a>
          
          {secondaryButtonText && secondaryButtonLink && (
            <a 
              href={secondaryButtonLink}
              className={`btn-${variant === 'secondary' ? 'outline' : 'outline-white'} text-center px-8 py-3 text-lg`}
            >
              {secondaryButtonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const HeroCTA = () => {
  return (
    <OptimizedCTA
      title="Transforme seu Marketing Digital com Resultados Garantidos"
      subtitle="Aumente suas vendas com estratégias personalizadas e automação inteligente. Resultados em 30 dias ou seu dinheiro de volta."
      buttonText="Começar Agora"
      buttonLink="#planos"
      secondaryButtonText="Ver Como Funciona"
      secondaryButtonLink="#como-funciona"
      className="mb-12"
    />
  );
};

export const DiagnosticCTA = () => {
  return (
    <OptimizedCTA
      title="Descubra o Potencial do Seu Negócio"
      subtitle="Faça nosso diagnóstico gratuito e receba uma análise personalizada das oportunidades de crescimento para sua empresa."
      buttonText="Iniciar Diagnóstico Gratuito"
      buttonLink="#quiz"
      variant="accent"
      className="my-16"
    />
  );
};

export const ConsultationCTA = () => {
  return (
    <OptimizedCTA
      title="Quer Falar com um Especialista?"
      subtitle="Agende uma consulta gratuita de 30 minutos e descubra como podemos ajudar seu negócio a crescer."
      buttonText="Agendar Consulta"
      buttonLink="/contato"
      secondaryButtonText="Ver Planos"
      secondaryButtonLink="#planos"
      variant="secondary"
      className="my-16"
    />
  );
};

export const TrialCTA = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para processar o email
    alert(`Email ${email} registrado com sucesso!`);
    setEmail('');
  };
  
  return (
    <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl shadow-card p-8 text-white">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Experimente Grátis por 7 Dias
        </h2>
        
        <p className="text-lg mb-6 text-white/90">
          Sem compromisso, sem cartão de crédito. Veja na prática como podemos transformar seu marketing digital.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu melhor email"
            className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <button
            type="submit"
            className="btn-white px-6 py-3"
          >
            Começar Trial
          </button>
        </form>
        
        <p className="text-sm mt-4 text-white/80">
          Ao se inscrever, você concorda com nossos Termos de Serviço e Política de Privacidade.
        </p>
      </div>
    </div>
  );
};
