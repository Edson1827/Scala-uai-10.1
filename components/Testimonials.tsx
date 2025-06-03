import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

interface TestimonialsProps {}

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  image: string;
  text: string;
  results: string;
}

export const Testimonials: React.FC<TestimonialsProps> = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const testimonials: Testimonial[] = [
    {
      id: 'test1',
      name: 'Carlos Mendes',
      company: 'TechSolve',
      role: 'CEO',
      image: '/avatar1.svg',
      text: 'Antes de trabalhar com a ScalaUai, investíamos R$5.000 por mês em marketing digital com resultados medíocres. Após 2 meses com o plano Aceleração, dobramos nosso ROI e reduzimos o custo de aquisição em 60%.',
      results: 'Aumento de 127% em leads qualificados'
    },
    {
      id: 'test2',
      name: 'Mariana Silva',
      company: 'Boutique Elegance',
      role: 'Proprietária',
      image: '/avatar2.svg',
      text: 'Como pequena empresária, não tinha orçamento para grandes agências. O plano Starter da ScalaUai foi perfeito para começar no marketing digital. Em 45 dias, aumentamos nossas vendas online em 43%.',
      results: 'ROI de 320% no primeiro trimestre'
    },
    {
      id: 'test3',
      name: 'Roberto Almeida',
      company: 'Construtech',
      role: 'Diretor de Marketing',
      image: '/avatar3.svg',
      text: 'Migramos de uma agência tradicional para o plano Crescimento Exponencial e a diferença foi impressionante. Além da economia de 65% no investimento, temos muito mais transparência e resultados concretos.',
      results: 'Redução de 72% no custo por lead'
    }
  ];
  
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-darkbg-light">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl font-bold text-gradient mb-4">O que nossos clientes dizem</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Veja como ajudamos empresas como a sua a alcançar resultados extraordinários com nossas estratégias de marketing digital.
          </p>
        </div>
        
        <div className="relative bg-white dark:bg-darkbg-light rounded-xl shadow-card p-6 md:p-8 animate-slideUp">
          {/* Decorative quote */}
          <div className="absolute top-4 left-4 text-6xl text-primary opacity-20">"</div>
          <div className="absolute bottom-4 right-4 text-6xl text-primary opacity-20">"</div>
          
          {/* Testimonial content */}
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-secondary bg-opacity-20 mb-4 md:mb-0 md:mr-6 relative shadow-md">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gradient">{testimonials[activeTestimonial].name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{testimonials[activeTestimonial].role}, {testimonials[activeTestimonial].company}</p>
                <div className="mt-2 inline-flex items-center badge badge-success">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  {testimonials[activeTestimonial].results}
                </div>
              </div>
            </div>
            
            <blockquote className="text-gray-700 dark:text-gray-300 italic mb-6 text-lg leading-relaxed">
              "{testimonials[activeTestimonial].text}"
            </blockquote>
            
            {/* Testimonial navigation */}
            <div className="flex justify-center space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-gradient-to-r from-primary to-primary-light scale-125' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-light'
                  }`}
                  aria-label={`Ver depoimento ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Client logos */}
        <div className="mt-16 animate-fadeIn" style={{animationDelay: '0.3s'}}>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8 font-medium">
            Empresas que confiam na ScalaUai
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105">
              <div className="bg-gray-200 dark:bg-gray-700 h-6 w-24 rounded"></div>
            </div>
            <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105">
              <div className="bg-gray-200 dark:bg-gray-700 h-6 w-24 rounded"></div>
            </div>
            <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105">
              <div className="bg-gray-200 dark:bg-gray-700 h-6 w-24 rounded"></div>
            </div>
            <div className="flex items-center justify-center h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105">
              <div className="bg-gray-200 dark:bg-gray-700 h-6 w-24 rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Results counter */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="card animate-bounceIn" style={{animationDelay: '0.1s'}}>
            <p className="text-4xl font-bold text-gradient mb-2">127+</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Clientes satisfeitos</p>
          </div>
          <div className="card animate-bounceIn" style={{animationDelay: '0.2s'}}>
            <p className="text-4xl font-bold text-gradient mb-2">3.5x</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">ROI médio</p>
          </div>
          <div className="card animate-bounceIn" style={{animationDelay: '0.3s'}}>
            <p className="text-4xl font-bold text-gradient mb-2">-65%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Redução de custos</p>
          </div>
          <div className="card animate-bounceIn" style={{animationDelay: '0.4s'}}>
            <p className="text-4xl font-bold text-gradient mb-2">30d</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Resultados garantidos</p>
          </div>
        </div>
      </div>
    </section>
  );
};
