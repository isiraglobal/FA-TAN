import { Instagram, Mail, Twitter, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative w-full flex flex-col items-center z-30 overflow-hidden pt-20 mt-20">
      
      {/* Liquid Glass Footer */}
      <div className="bg-white/[0.03] backdrop-blur-[120px] border-t border-white/10 p-8 md:p-20 w-full flex flex-col shadow-[0_-20px_80px_rgba(0,0,0,0.3)] relative z-30 overflow-hidden">
        {/* Animated Background Depth Elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0077b6]/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none translate-y-1/2"></div>

        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16 relative z-10">
          
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-[0.2em] text-white">MARKETPEACE</h2>
            <p className="text-white/60 max-w-sm leading-relaxed mb-8 text-sm md:text-base font-light">
              A recurring pop-up experience for creators, communities, and clients. We're not testing — we're executing.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer text-white">
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer text-white">
                <Twitter className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="mailto:contact@foreignaffairs.com" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer text-white">
                <Mail className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <h5 className="text-white font-bold tracking-widest uppercase mb-1 md:mb-2 text-sm">Explore</h5>
            <Link to="/vendors" className="text-white/60 hover:text-white transition-colors text-sm font-light">Vendor Registration</Link>
            <Link to="/attendees" className="text-white/60 hover:text-white transition-colors text-sm font-light">Attendee Tickets</Link>
            <Link to="/venues" className="text-white/60 hover:text-white transition-colors text-sm font-light">Venue Partnerships</Link>
            <Link to="/cities" className="text-white/60 hover:text-white transition-colors text-sm font-light">Promoter Program</Link>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <h5 className="text-white font-bold tracking-widest uppercase mb-1 md:mb-2 text-sm">Legal</h5>
            <Link to="/legal#privacy" className="text-white/60 hover:text-white transition-colors text-sm font-light">Privacy Policy</Link>
            <Link to="/legal#terms" className="text-white/60 hover:text-white transition-colors text-sm font-light">Terms of Service</Link>
            <Link to="/contact" className="text-white/60 hover:text-white transition-colors text-sm font-light">Contact Us</Link>
          </div>

        </div>

        <div className="max-w-6xl w-full mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 text-center md:text-left">
          <p className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-widest text-white/40 uppercase font-medium">© 2026 MARKETPEACE (FOREIGN AFFAIRS LLC). DOWN TO EARTH.</p>
          <p className="text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-widest text-white/40 uppercase font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> ALL SYSTEMS OPERATIONAL
          </p>
        </div>
      </div>
    </footer>
  );
}
