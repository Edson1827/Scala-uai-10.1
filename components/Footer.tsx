import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-darkbg shadow-inner pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="animate-fadeIn">
            <h3 className="text-lg font-semibold text-gradient mb-4">ScalaUai</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Soluções de marketing digital para pequenas e médias empresas que desejam escalar seus negócios.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transform hover:scale-110 transition-all duration-300" aria-label="Facebook">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transform hover:scale-110 transition-all duration-300" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transform hover:scale-110 transition-all duration-300" aria-label="LinkedIn">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transform hover:scale-110 transition-all duration-300" aria-label="Twitter">
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
            <h3 className="text-lg font-semibold text-gradient mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300 flex items-center">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Planos</span>
                </Link>
              </li>
              <li>
                <Link href="/institucional" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300 flex items-center">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Sobre</span>
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300 flex items-center">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Contato</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300 flex items-center">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  <span>Blog</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <h3 className="text-lg font-semibold text-gradient mb-4">Contato</h3>
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contato@scalauai.com.br
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +55 (11) 99999-9999
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                São Paulo, SP - Brasil
              </p>
            </div>
            <div className="mt-4">
              <button className="btn-accent text-sm py-1.5">
                Fale Conosco
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            &copy; {currentYear} ScalaUai. Todos os direitos reservados.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/termos" className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
