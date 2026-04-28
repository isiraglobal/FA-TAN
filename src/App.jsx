import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, ShoppingCart, User, Cloud, ShieldCheck, Lock, Package } from 'lucide-react';
import Lenis from 'lenis';
import ExplorationCards from './components/ExplorationCards';
import CategoryScroll from './components/CategoryScroll';
import TrustLayer from './components/TrustLayer';
import Footer from './components/Footer';

const letters = [
  { char: 'm', src: '/assets/letters/M.png' },
  { char: 'a', src: '/assets/letters/A.png' },
  { char: 'r', src: '/assets/letters/R.png' },
  { char: 'k', src: '/assets/letters/K.png' },
  { char: 'e', src: '/assets/letters/E.png' },
  { char: 't', src: '/assets/letters/T.png' },
  { char: 'p', src: '/assets/letters/P.png' },
  { char: 'e', src: '/assets/letters/E.png' },
  { char: 'a', src: '/assets/letters/A.png' },
  { char: 'c', src: '/assets/letters/C.png' },
  { char: 'e', src: '/assets/letters/E.png' },
];

export default function App() {
  const containerRef = useRef(null);
  
  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax calculations for the hero section
  const yBg = useTransform(smoothProgress, [0, 1], ['0%', '30%']);
  const yText = useTransform(smoothProgress, [0, 0.3], ['0%', '150%']);
  const opacityText = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  // Transform for the fixed floating cards to make them scroll up when leaving hero
  const yCards = useTransform(smoothProgress, [0, 0.2], ['0%', '-200%']);
  const opacityCards = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen font-light selection:bg-white/30 selection:text-white">
      
      {/* Background Image Parallax */}
      <motion.div 
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        style={{ 
          y: yBg,
          backgroundImage: 'url("https://images.unsplash.com/photo-1513002749550-c59d220818a6?q=80&w=2574&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale: 1.1 // Prevent edges showing during parallax
        }}
      >
        {/* Sky gradient that shifts based on scroll could be added here, but a static overlay works well too */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#87CFFF]/60 via-[#B8E3FF]/40 to-[#EAF6FF]/90 mix-blend-overlay"></div>
      </motion.div>

      {/* Navbar - Fixed */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between glass-nav"
      >
        <div className="flex items-center gap-12">
          <Cloud className="w-8 h-8 text-white" />
          <div className="hidden md:flex items-center gap-8 text-sm tracking-widest text-white/90">
            <a href="#" className="relative group">
              HOME
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-white transform origin-left transition-transform duration-300"></span>
            </a>
            <a href="#" className="relative group hover:text-white transition-colors">
              MARKETPLACE
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
            <a href="#" className="relative group hover:text-white transition-colors">
              CATEGORIES
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
            <a href="#" className="relative group hover:text-white transition-colors">
              ABOUT US
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
            <a href="#" className="relative group hover:text-white transition-colors">
              CONTACT
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-6 text-white">
          <button className="hover:scale-110 transition-transform"><Search className="w-5 h-5" /></button>
          <button className="hover:scale-110 transition-transform"><ShoppingCart className="w-5 h-5" /></button>
          <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <User className="w-4 h-4" />
          </button>
        </div>
      </motion.nav>

      {/* Pagination Dots */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
        <div className="w-2 h-2 rounded-full border border-white/50"></div>
        <div className="w-2 h-2 rounded-full border border-white/50"></div>
      </div>

      {/* Floating Glass Cards - Fixed but fades out on scroll */}
      <motion.div 
        className="fixed bottom-12 left-0 w-full px-8 md:px-24 flex flex-col md:flex-row justify-center gap-6 z-40 pointer-events-none"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: yCards, opacity: opacityCards }}
      >
        <Card 
          icon={<ShieldCheck className="w-6 h-6 text-[#1E3A8A]" />} 
          title="Trusted Sellers" 
          subtitle="Verified & reliable"
        />
        <Card 
          icon={<Lock className="w-6 h-6 text-[#1E3A8A]" />} 
          title="Secure Payments" 
          subtitle="Safe & protected"
        />
        <Card 
          icon={<Package className="w-6 h-6 text-[#1E3A8A]" />} 
          title="Fast Delivery" 
          subtitle="Quick & dependable"
        />
      </motion.div>

      {/* Main Hero Content - Pinned and Parallaxed */}
      <div className="relative w-full h-screen flex flex-col items-center justify-center z-10 pt-20">
        
        {/* Animated Cloud Typography */}
        <motion.div 
          className="flex items-center justify-center gap-1 md:gap-2 mb-8"
          style={{ y: yText, opacity: opacityText }}
        >
          {letters.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.8 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              transition={{ 
                duration: 1.5, 
                delay: i * 0.1, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="relative w-12 h-16 sm:w-16 sm:h-24 md:w-24 md:h-32 lg:w-32 lg:h-40 flex items-center justify-center"
            >
              <motion.img 
                src={l.src} 
                alt={l.char} 
                className="w-full h-full object-contain drop-shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 4 + (i % 3), 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
          style={{ y: yText, opacity: opacityText }}
          className="text-center flex flex-col items-center"
        >
          <h2 className="text-white text-sm md:text-base tracking-[0.3em] font-medium mb-10 text-shadow-sm">
            SHOP. CONNECT. MAKE PEACE.
          </h2>
          
          <button className="glass-button px-8 py-3 rounded-full flex items-center gap-2 text-sm tracking-wider text-white hover:text-white group">
            <svg className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            EXPLORE
          </button>
        </motion.div>

      </div>

      {/* The Descent: Render subsequent sections */}
      <div className="relative z-20 bg-gradient-to-b from-transparent via-[#F5F5F5]/90 to-[#F5F5F5]">
        <ExplorationCards />
        <CategoryScroll />
        <TrustLayer />
      </div>
      <Footer />

    </div>
  );
}

function Card({ icon, title, subtitle }) {
  return (
    <div className="liquid-glass px-6 py-5 flex items-center gap-4 w-full md:w-[300px] cursor-pointer group pointer-events-auto">
      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500 ease-out">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-medium text-sm md:text-base tracking-wide">{title}</h3>
        <p className="text-white/70 text-xs md:text-sm tracking-wide">{subtitle}</p>
      </div>
    </div>
  );
}
