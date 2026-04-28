import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ShieldCheck, Lock, Package } from 'lucide-react';

export default function HeroSection() {
  const logoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (logoRef.current) logoRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
      
      // Hide scroll indicator after scrolling
      if (scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="h-[150vh] relative w-full flex flex-col items-center pt-[20vh] z-20">
      
      {/* 3D Cloud Text Logo */}
      <div ref={logoRef} className="flex flex-col items-center">
        <h1 className="cloud-logo text-center relative z-10 leading-tight">marketpeace</h1>
        <p className="mt-4 text-xl tracking-[0.2em] font-light text-white uppercase text-center max-w-2xl px-4 drop-shadow-md">
          Shop. Connect. Make Peace.
        </p>
        
        <button className="mt-12 glass-button rounded-full px-12 py-4 flex items-center gap-3 text-lg font-medium tracking-wider hover:scale-105 active:scale-95">
          <ArrowDown size={20} className="animate-bounce" />
          EXPLORE
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <p className="text-white/60 text-sm uppercase tracking-widest">Scroll to explore</p>
        <div className="flex gap-1">
          <div className="w-1 h-8 bg-white/40 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Trust Cards */}
      <div className="absolute top-[80vh] w-full max-w-5xl px-6 flex flex-col md:flex-row gap-8 justify-center">
        <div className="liquid-glass p-8 w-full md:w-[280px] h-[140px] flex flex-col justify-center items-center text-center group cursor-pointer hover:scale-105">
          <ShieldCheck className="w-8 h-8 mb-2 group-hover:rotate-12 transition-transform duration-300" />
          <h3 className="font-medium text-lg">Trusted Sellers</h3>
          <p className="text-xs text-white/50 mt-1">Verified & reliable</p>
        </div>
        <div className="liquid-glass p-8 w-full md:w-[280px] h-[140px] flex flex-col justify-center items-center text-center group cursor-pointer hover:scale-105">
          <Lock className="w-8 h-8 mb-2 group-hover:rotate-12 transition-transform duration-300" />
          <h3 className="font-medium text-lg">Secure Payments</h3>
          <p className="text-xs text-white/50 mt-1">Safe & protected</p>
        </div>
        <div className="liquid-glass p-8 w-full md:w-[280px] h-[140px] flex flex-col justify-center items-center text-center group cursor-pointer hover:scale-105">
          <Package className="w-8 h-8 mb-2 group-hover:rotate-12 transition-transform duration-300" />
          <h3 className="font-medium text-lg">Fast Delivery</h3>
          <p className="text-xs text-white/50 mt-1">Quick & dependable</p>
        </div>
      </div>
      
    </section>
  );
}
