import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] z-50 glass-nav rounded-full px-8 py-4 flex items-center justify-between text-white/90 transition-all duration-300 ${isScrolled ? 'backdrop-blur-2xl' : ''}`}>
      <div className="flex gap-6 items-center cursor-pointer hover:text-white transition">
        <span className="font-semibold text-lg tracking-widest hidden md:block">☁️ MARKETPEACE</span>
        <span className="font-semibold text-lg tracking-widest md:hidden">☁️</span>
      </div>
      
      <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
        <a href="#" className="hover:text-white transition-colors duration-200 relative group">HOME
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="#" className="hover:text-white transition-colors duration-200 relative group">MARKETPLACE
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="#" className="hover:text-white transition-colors duration-200 relative group">CATEGORIES
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="#" className="hover:text-white transition-colors duration-200 relative group">ABOUT
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="#" className="hover:text-white transition-colors duration-200 relative group">CONTACT
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
        </a>
      </div>

      <div className="flex gap-4 items-center">
        <button className="hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"><Search size={20} /></button>
        <button className="hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"><ShoppingCart size={20} /></button>
        <button className="hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"><User size={20} /></button>
      </div>
    </nav>
  );
}
