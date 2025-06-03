import { useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Verificar preferência de tema do usuário - apenas no lado do cliente
    if (typeof window !== 'undefined') {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const savedTheme = localStorage.getItem('darkMode');
      
      // Aplicar tema inicial
      if (savedTheme === 'true' || (savedTheme === null && isDarkMode)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  return <Component {...pageProps} />;
}
