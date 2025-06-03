import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export const WhatsAppButton = () => (
  <Link
    href="https://wa.me/5511999999999?text=Olá,%20tenho%20dúvidas%20sobre%20os%20planos%20do%20ScalaUai!"
    target="_blank"
    className="fixed bottom-20 right-4 z-40 flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition"
  >
    <FaWhatsapp className="w-5 h-5" />
    <span className="hidden sm:inline">Tire suas dúvidas agora</span>
  </Link>
);
