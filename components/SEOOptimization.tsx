import { useEffect } from 'react';
import Head from 'next/head';

interface SEOOptimizationProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

export const SEOOptimization: React.FC<SEOOptimizationProps> = ({
  title = "ScalaUai - Marketing Digital para PMEs | Feito para quem movimenta o Brasil",
  description = "Soluções de marketing digital para pequenas e médias empresas que desejam escalar seus negócios. Planos a partir de R$197/mês com resultados garantidos.",
  keywords = "marketing digital, PMEs, pequenas empresas, médias empresas, agência de marketing, resultados garantidos, ROI, escalabilidade",
  ogImage = "/og-image.jpg",
  ogUrl = "https://www.scalauai.com.br",
  canonical = "https://www.scalauai.com.br"
}) => {
  // Implementar script de carregamento otimizado
  useEffect(() => {
    // Verificar se estamos no navegador (client-side)
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }
    
    // Lazy loading de imagens
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            image.src = image.dataset.src || '';
            image.removeAttribute('data-src');
            imageObserver.unobserve(image);
          }
        });
      });
      
      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback para navegadores que não suportam IntersectionObserver
      lazyImages.forEach(img => {
        const image = img as HTMLImageElement;
        image.src = image.dataset.src || '';
      });
    }
    
    // Adiar carregamento de scripts não críticos
    setTimeout(() => {
      const deferredScripts = document.querySelectorAll('script[data-defer]');
      deferredScripts.forEach(script => {
        const newScript = document.createElement('script');
        Array.from(script.attributes).forEach(attr => {
          if (attr.name !== 'data-defer') {
            newScript.setAttribute(attr.name, attr.value);
          }
        });
        newScript.textContent = script.textContent;
        script.parentNode?.replaceChild(newScript, script);
      });
    }, 2000);
    
    // Prefetch de páginas comuns
    setTimeout(() => {
      const commonPages = ['/contato', '/institucional', '/blog'];
      commonPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
      });
    }, 3000);
  }, []);
  
  return (
    <Head>
      {/* Metadados básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Metadados Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ScalaUai" />
      
      {/* Metadados Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Links canônicos e alternados */}
      <link rel="canonical" href={canonical} />
      
      {/* Preconexões para recursos externos */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Preload de recursos críticos */}
      <link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/css/critical.css" as="style" />
      
      {/* Metadados estruturados para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ScalaUai",
            "url": "https://www.scalauai.com.br",
            "logo": "https://www.scalauai.com.br/logo.png",
            "description": "Soluções de marketing digital para pequenas e médias empresas que desejam escalar seus negócios.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "São Paulo",
              "addressRegion": "SP",
              "addressCountry": "BR"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+55-11-99999-9999",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://www.facebook.com/scalauai",
              "https://www.instagram.com/scalauai",
              "https://www.linkedin.com/company/scalauai"
            ]
          })
        }}
      />
      
      {/* Metadados para mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#4F46E5" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  );
};
