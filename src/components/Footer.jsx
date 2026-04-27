import React from 'react';
import { Instagram, Mail, Video } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-navy border-t border-white/10 pt-20 pb-10 relative z-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
        <div className="text-center md:text-left">
          <h3 className="font-heading font-black text-4xl mb-3 text-white glow-text drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]">marketpeace</h3>
          <p className="text-sky-mid text-lg mb-8 font-medium tracking-wide">Where Creators Connect, Shine & Sell</p>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-cyan hover:text-brand-navy hover:scale-110 transition-all shadow-lg">
              <Instagram size={22} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-cyan hover:text-brand-navy hover:scale-110 transition-all shadow-lg">
              <Video size={22} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-cyan hover:text-brand-navy hover:scale-110 transition-all shadow-lg">
              <Mail size={22} />
            </a>
          </div>
        </div>
        
        <div className="flex gap-16 text-center md:text-left">
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Explore</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sky-light/70 hover:text-brand-cyan transition-colors text-lg">Events</a></li>
              <li><a href="#" className="text-sky-light/70 hover:text-brand-cyan transition-colors text-lg">Vendors</a></li>
              <li><a href="#" className="text-sky-light/70 hover:text-brand-cyan transition-colors text-lg">About Us</a></li>
              <li><a href="#" className="text-sky-light/70 hover:text-brand-cyan transition-colors text-lg">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 mt-20 pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sky-light/50 text-sm">© 2024 Foreign Affairs LLC. All rights reserved.</p>
        <p className="text-sky-light/50 text-sm font-medium tracking-wide">Adeola James, CEO</p>
      </div>
    </footer>
  );
};

export default Footer;
