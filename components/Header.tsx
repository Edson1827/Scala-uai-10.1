import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <header className={`sticky top-0 z-50 bg-white dark:bg-darkbg transition-all duration-300 ${
      scrolled ? 'shadow-lg py-2' : 'shadow-md py-4'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
                <div className="w-10 h-10 mr-2 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
                  <span className="text-white font-bold text-lg">$</span>
                </div>
                <span className="text-2xl font-bold text-gradient">ScalaUai</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-textmain dark:text-white hover:text-primary transition-colors relative group">
              Planos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/institucional" className="text-textmain dark:text-white hover:text-primary transition-colors relative group">
              Sobre
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/contato" className="text-textmain dark:text-white hover:text-primary transition-colors relative group">
              Contato
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
          <div className="flex items-center">
            <Link href="/contato" className="hidden md:block mr-6">
              <button className="btn-primary animate-pulse">
                Fale Conosco
              </button>
            </Link>
            <ThemeToggle />
            <button 
              className="md:hidden ml-4 relative"
              aria-label="Menu"
              title="Menu"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Abrir menu</span>
              <div className={`w-6 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1.5 transition-all ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1.5 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-50 bg-white dark:bg-darkbg-light shadow-lg animate-slideDown">
          <nav className="flex flex-col py-2">
            <Link href="/" 
              className="px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={closeMenu}
            >
              Planos
            </Link>
            <Link href="/institucional"
              className="px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={closeMenu}
            >
              Sobre
            </Link>
            <Link href="/contato"
              className="px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={closeMenu}
            >
              Contato
            </Link>
            <div className="px-4 py-3">
              <button 
                className="btn-primary w-full"
                onClick={() => {
                  closeMenu();
                  window.location.href = '/contato';
                }}
              >
                Fale Conosco
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
