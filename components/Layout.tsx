import Head from 'next/head';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const Layout = ({ 
  children, 
  title = 'ScalaUai | Marketing Digital com Resultados Garantidos',
  description = 'Transforme seu investimento em marketing digital em resultados reais e mensuráveis para empresas que faturam de R$ 20 mil até R$ 5 milhões'
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scalauai.com.br" />
        <meta property="og:image" content="https://scalauai.com.br/og-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          {children}
        </main>
        <Footer />
      </div>
      
      <WhatsAppButton />
    </>
  );
};
