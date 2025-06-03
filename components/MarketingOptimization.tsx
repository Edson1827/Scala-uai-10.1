import { useState, useEffect } from 'react';
import Head from 'next/head';

// Declaração de tipos para o Google Analytics e Facebook Pixel
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    _fbq: any;
  }
}

interface MarketingOptimizationProps {
  pageType?: 'home' | 'institucional' | 'contato' | 'blog' | 'planos';
}

export const MarketingOptimization: React.FC<MarketingOptimizationProps> = ({
  pageType = 'home'
}) => {
  const [hasAnalytics, setHasAnalytics] = useState(false);
  const [hasPixel, setHasPixel] = useState(false);
  
  // Configurar scripts de marketing e analytics
  useEffect(() => {
    // Verificar se estamos no navegador (client-side)
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    
    // Verificar se já existem scripts para evitar duplicação
    if (document.getElementById('ga-script') || document.getElementById('fb-pixel')) {
      return;
    }
    
    // Google Analytics (implementação simulada)
    const gaScript = document.createElement('script');
    gaScript.id = 'ga-script';
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(gaScript);
    
    const gaConfigScript = document.createElement('script');
    gaConfigScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `;
    document.head.appendChild(gaConfigScript);
    setHasAnalytics(true);
    
    // Facebook Pixel (implementação simulada)
    const fbScript = document.createElement('script');
    fbScript.id = 'fb-pixel';
    fbScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'XXXXXXXXXXXXXXXXX');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(fbScript);
    setHasPixel(true);
    
    // Implementar UTM tracking
    const trackUtm = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
      
      const utmData: Record<string, string> = {};
      let hasUtm = false;
      
      utmParams.forEach(param => {
        const value = urlParams.get(param);
        if (value) {
          utmData[param] = value;
          hasUtm = true;
        }
      });
      
      if (hasUtm) {
        // Armazenar UTM params no localStorage para uso posterior
        localStorage.setItem('utm_data', JSON.stringify(utmData));
        localStorage.setItem('utm_timestamp', Date.now().toString());
        
        // Enviar evento para analytics
        // Verificar se gtag está disponível antes de usar
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'utm_captured', {
            event_category: 'marketing',
            event_label: utmData.utm_source || 'unknown',
            ...utmData
          });
        }
      }
    };
    
    // Executar tracking de UTM
    trackUtm();
    
    // Implementar tracking de eventos
    const setupEventTracking = () => {
      // Rastrear cliques em CTAs
      document.querySelectorAll('[data-track="cta"]').forEach(element => {
        element.addEventListener('click', (e) => {
          const target = e.currentTarget as HTMLElement;
          const ctaName = target.getAttribute('data-cta-name') || 'unknown';
          
          // Verificar se gtag está disponível antes de usar
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'cta_click', {
              event_category: 'engagement',
              event_label: ctaName,
              page_type: pageType
            });
          }
          
          // Verificar se fbq está disponível antes de usar
          if (typeof window.fbq === 'function') {
            window.fbq('trackCustom', 'CTAClick', {
              cta_name: ctaName,
              page_type: pageType
            });
          }
        });
      });
      
      // Rastrear envios de formulário
      document.querySelectorAll('form[data-track="form"]').forEach(form => {
        form.addEventListener('submit', (e) => {
          const target = e.currentTarget as HTMLFormElement;
          const formName = target.getAttribute('data-form-name') || 'unknown';
          
          // Verificar se gtag está disponível antes de usar
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'form_submit', {
              event_category: 'conversion',
              event_label: formName,
              page_type: pageType
            });
          }
          
          // Verificar se fbq está disponível antes de usar
          if (typeof window.fbq === 'function') {
            window.fbq('track', 'Lead', {
              form_name: formName,
              page_type: pageType
            });
          }
        });
      });
    };
    
    // Configurar tracking de eventos após carregamento da página
    window.addEventListener('load', setupEventTracking);
    
    return () => {
      window.removeEventListener('load', setupEventTracking);
    };
  }, [pageType]);
  
  // Implementar rich snippets específicos para cada tipo de página
  const getRichSnippet = () => {
    switch (pageType) {
      case 'home':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "ScalaUai",
          "url": "https://www.scalauai.com.br",
          "logo": "https://www.scalauai.com.br/logo.png",
          "description": "Soluções de marketing digital para pequenas e médias empresas que desejam escalar seus negócios.",
          "sameAs": [
            "https://www.facebook.com/scalauai",
            "https://www.instagram.com/scalauai",
            "https://www.linkedin.com/company/scalauai"
          ]
        };
      
      case 'planos':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Planos de Marketing Digital ScalaUai",
          "description": "Soluções de marketing digital para pequenas e médias empresas.",
          "offers": [
            {
              "@type": "Offer",
              "name": "Plano Starter",
              "price": "197.00",
              "priceCurrency": "BRL",
              "description": "Ideal para pequenas empresas iniciando no marketing digital"
            },
            {
              "@type": "Offer",
              "name": "Plano Aceleração",
              "price": "297.00",
              "priceCurrency": "BRL",
              "description": "Para empresas que buscam crescimento acelerado"
            },
            {
              "@type": "Offer",
              "name": "Plano Crescimento Exponencial",
              "price": "397.00",
              "priceCurrency": "BRL",
              "description": "Solução completa para empresas em expansão"
            }
          ]
        };
      
      case 'blog':
        return {
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Blog ScalaUai",
          "description": "Dicas, estratégias e novidades sobre marketing digital para PMEs.",
          "url": "https://www.scalauai.com.br/blog"
        };
      
      default:
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "ScalaUai - Marketing Digital para PMEs",
          "description": "Soluções de marketing digital para pequenas e médias empresas que desejam escalar seus negócios."
        };
    }
  };
  
  return (
    <Head>
      {/* Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getRichSnippet())
        }}
      />
      
      {/* Metadados para compartilhamento social otimizado */}
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="ScalaUai" />
      <meta name="twitter:site" content="@scalauai" />
      
      {/* Metadados para rastreamento de conversão */}
      <meta name="facebook-domain-verification" content="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
      
      {/* Prevenção de indexação em ambientes de desenvolvimento */}
      {process.env.NODE_ENV !== 'production' && (
        <meta name="robots" content="noindex, nofollow" />
      )}
    </Head>
  );
};
