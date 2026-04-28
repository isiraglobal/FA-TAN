import React from 'react';
import { Instagram, Music2, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative w-full z-20" style={{ background: '#F5F5F5' }}>
      
      {/* Ground texture overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'30\' height=\'30\' viewBox=\'0 0 30 30\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h30v30H0z\' fill=\'%23000\' opacity=\'0.02\'/%3E%3Ccircle cx=\'5\' cy=\'5\' r=\'0.5\' fill=\'%23000\' opacity=\'0.1\'/%3E%3C/svg%3E")' }} />

      <div className="relative z-10 py-20 px-6 flex flex-col items-center text-center max-w-full">
        
        {/* Logo */}
        <h2 className="text-4xl md:text-5xl font-light mb-12 text-black/80 tracking-wider">☁️ marketpeace</h2>
        
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-black/60 uppercase tracking-[0.15em] text-xs md:text-sm mb-12 font-light">
          <a href="#" className="hover:text-black transition-colors duration-300 relative group">
            Events
            <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
          </a>
          <span className="text-black/20">|</span>
          <a href="#" className="hover:text-black transition-colors duration-300 relative group">
            Vendors
            <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
          </a>
          <span className="text-black/20">|</span>
          <a href="#" className="hover:text-black transition-colors duration-300 relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
          </a>
          <span className="text-black/20">|</span>
          <a href="#" className="hover:text-black transition-colors duration-300 relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 md:gap-6 mb-12">
          <a href="#" className="w-12 h-12 rounded-full glass-button flex items-center justify-center text-black/60 hover:text-black transition-all duration-300 hover:scale-110">
            <Instagram size={20} />
          </a>
          <a href="#" className="w-12 h-12 rounded-full glass-button flex items-center justify-center text-black/60 hover:text-black transition-all duration-300 hover:scale-110">
            <Music2 size={20} />
          </a>
          <a href="#" className="w-12 h-12 rounded-full glass-button flex items-center justify-center text-black/60 hover:text-black transition-all duration-300 hover:scale-110">
            <Mail size={20} />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-black/50 text-xs md:text-sm font-light tracking-wide">
          <p className="mb-1">© 2026 Foreign Affairs LLC</p>
          <p>Adeola James, CEO</p>
        </div>

      </div>
    </footer>
  );
}
