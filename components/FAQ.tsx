export const FAQ = () => {
  const faqs = [
    {
      question: 'Qual a diferença entre o ScalaUai e agências convencionais?',
      answer: 'Agências convencionais cobram a partir de R$1.500 mensais com contratos de fidelidade de até 6 meses, sem garantia de resultados. No ScalaUai, você paga menos (a partir de R$197/mês), tem flexibilidade de cancelamento após 3 meses e recebe relatórios detalhados de performance com foco em resultados mensuráveis.'
    },
    {
      question: 'Quais são os prazos de contratação dos planos?',
      answer: 'Todos os nossos planos são contratados por 12 meses, com pagamento mensal. Oferecemos descontos especiais de até 20% para pagamentos anuais à vista, enquanto agências tradicionais raramente oferecem descontos significativos.'
    },
    {
      question: 'O que está incluso no plano Starter?',
      answer: 'O plano Starter (R$197/mês) inclui 1 campanha ativa por mês, 1 criativo por campanha, relatório básico de desempenho e suporte por email. Agências convencionais cobrariam no mínimo R$1.500 pelo mesmo serviço, sem a transparência de resultados que oferecemos.'
    },
    {
      question: 'Como funciona o plano Aceleração?',
      answer: 'O plano Aceleração (R$297/mês) inclui 2 campanhas ativas por mês, 3 criativos por campanha, uma landing page personalizada, relatórios semanais de desempenho e suporte prioritário. Em agências tradicionais, este pacote custaria entre R$2.000 e R$3.500 mensais, com menor flexibilidade.'
    },
    {
      question: 'O plano Crescimento Exponencial oferece quais benefícios?',
      answer: 'O plano Crescimento Exponencial (R$397/mês) inclui 5 campanhas ativas por mês, 5 criativos por campanha, duas landing pages personalizadas, relatórios detalhados semanais, reuniões mensais de estratégia e suporte prioritário 24/7. Agências convencionais cobrariam no mínimo R$4.000 por mês por serviços similares, frequentemente com menor agilidade e transparência.'
    },
    {
      question: 'Posso cancelar meu plano a qualquer momento?',
      answer: 'Nossos planos têm fidelidade de apenas 3 meses. Após esse período, você pode cancelar com 30 dias de antecedência sem multa. Agências tradicionais geralmente exigem contratos de 6 a 12 meses com multas pesadas por cancelamento antecipado.'
    },
    {
      question: 'Como são medidos os resultados das campanhas?',
      answer: 'Utilizamos métricas como CTR, taxa de conversão, custo por lead, ROI e outras métricas relevantes para seu negócio. Todos os dados são apresentados em relatórios periódicos e em um dashboard personalizado, com total transparência. Diferente de agências tradicionais, nosso foco é em resultados mensuráveis e não apenas em métricas de vaidade.'
    },
    {
      question: 'Quanto tempo leva para ver resultados?',
      answer: 'A maioria dos nossos clientes começa a ver resultados significativos entre 30 e 60 dias após o início das campanhas. Agências tradicionais frequentemente pedem 3 a 6 meses antes de garantir qualquer resultado, enquanto cobrando valores muito superiores durante todo esse período.'
    }
  ];

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-primary mb-12">Perguntas Frequentes</h2>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
            >
              <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
