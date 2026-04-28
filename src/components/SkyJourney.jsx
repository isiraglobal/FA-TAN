import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ShieldCheck, Lock, Package, ChevronDown } from 'lucide-react';

const cloud1 = "https://raw.githubusercontent.com/danielstuart14/CSS_FOG_ANIMATION/master/fog1.png";
const cloud2 = "https://raw.githubusercontent.com/danielstuart14/CSS_FOG_ANIMATION/master/fog2.png";

// Cloud text letters for "marketpeace"
const letters = ['M', 'A', 'R', 'K', 'E', 'T', 'P', 'E', 'A', 'C', 'E'];

// Pre-calculate wild scatter positions for letters (out of frame)
const scatterPositions = [
  { x: -1200, y: -800, r: -45, s: 2 },
  { x: -800, y: -1000, r: 90, s: 3 },
  { x: -400, y: -900, r: 120, s: 1.5 },
  { x: 0, y: -1200, r: -80, s: 2.5 },
  { x: 400, y: -800, r: 45, s: 2 },
  { x: 800, y: -1100, r: 180, s: 3 },
  { x: 1200, y: -700, r: -20, s: 1.5 },
  { x: 1000, y: -1000, r: 60, s: 2.5 },
  { x: 600, y: -1200, r: -110, s: 2 },
  { x: 200, y: -900, r: 30, s: 3 },
  { x: -200, y: -1100, r: -90, s: 2.5 }
];

export default function SkyJourney() {
  const containerRef = useRef(null);
  
  // Total height 1000vh for a long, cinematic journey
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress for physics-like feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  // --- BACKGROUND COLOR SHIFTS ---
  const skyColor = useTransform(
    smoothProgress, 
    [0, 0.4, 0.6, 0.8, 1], 
    [
      "#56B4D3", // Layer 1: Bright open sky
      "#75C2D9", // Layer 2: Mid sky
      "#E2C8B8", // Layer 3: Warm horizon
      "#8E9EAB", // Layer 4: Near ground (concrete/city tones)
      "#2C3E50"  // Layer 5: Earth surface / Nightfall
    ]
  );

  // --- VOLUMETRIC CLOUD PARALLAX ---
  // Foreground clouds move extremely fast upward as we fall
  const fgCloudY = useTransform(smoothProgress, [0, 1], ["0%", "-400%"]);
  // Mid clouds move moderately
  const mgCloudY = useTransform(smoothProgress, [0, 1], ["0%", "-200%"]);
  // Background clouds move very slowly
  const bgCloudY = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  
  // Clouds fade out as we reach the ground (Layer 4/5)
  const cloudsOpacity = useTransform(smoothProgress, [0.6, 0.8], [1, 0]);

  // --- LAYER 1: HERO & LOGO ANIMATION (0 to 0.2) ---
  const heroOpacity = useTransform(smoothProgress, [0.15, 0.2], [1, 0]);
  const taglineY = useTransform(smoothProgress, [0, 0.1], [50, 0]);
  const taglineOpacity = useTransform(smoothProgress, [0, 0.05, 0.15, 0.2], [0, 1, 1, 0]);

  // --- LAYER 2: MID SKY / FEATURES (0.2 to 0.4) ---
  const l2Opacity = useTransform(smoothProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const airplaneX = useTransform(smoothProgress, [0.15, 0.4], ["-100vw", "100vw"]);
  const balloonY = useTransform(smoothProgress, [0.15, 0.4], ["100vh", "-100vh"]);

  // --- LAYER 3: LOWER SKY / CATEGORIES (0.4 to 0.6) ---
  const l3Opacity = useTransform(smoothProgress, [0.35, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  const citySilhouetteY = useTransform(smoothProgress, [0.35, 0.6], ["50vh", "0vh"]);

  // --- LAYER 4: NEAR GROUND / TRUST (0.6 to 0.8) ---
  const l4Opacity = useTransform(smoothProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const buildingsScale = useTransform(smoothProgress, [0.55, 0.8], [0.8, 1.2]);

  // --- LAYER 5: EARTH SURFACE / FOOTER (0.8 to 1.0) ---
  const l5Opacity = useTransform(smoothProgress, [0.75, 0.85], [0, 1]);
  const earthY = useTransform(smoothProgress, [0.75, 1], ["100vh", "0vh"]);


  return (
    <div ref={containerRef} className="h-[1000vh] w-full relative font-sans text-white">
      
      {/* THE CAMERA VIEWPORT */}
      <motion.div 
        style={{ backgroundColor: skyColor }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center transition-colors duration-500"
      >
        
        {/* === CLOUD LAYERS === */}
        <motion.div style={{ y: bgCloudY, opacity: cloudsOpacity }} className="absolute inset-0 pointer-events-none z-0">
          <img src={cloud1} className="w-[200%] h-[200%] object-cover opacity-30 mix-blend-screen" alt="bg clouds" />
        </motion.div>
        
        <motion.div style={{ y: mgCloudY, opacity: cloudsOpacity }} className="absolute inset-0 pointer-events-none z-10">
          <img src={cloud2} className="w-[150%] h-[150%] object-cover opacity-50 mix-blend-screen translate-x-[-10%]" alt="mg clouds" />
        </motion.div>
        
        <motion.div style={{ y: fgCloudY, opacity: cloudsOpacity }} className="absolute inset-0 pointer-events-none z-40">
          <img src={cloud1} className="w-[300%] h-[300%] object-cover opacity-60 mix-blend-screen translate-y-[20%]" alt="fg clouds" />
        </motion.div>


        {/* === LAYER 1: HERO === */}
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-20 flex flex-col items-center justify-center pt-20">
          
          {/* Logo Assembly */}
          <div className="flex space-x-[-10px] md:space-x-[-20px] items-center justify-center h-32 md:h-48 mb-8">
            {letters.map((char, i) => {
              const init = scatterPositions[i];
              
              // 0 to 0.08: Assemble from scattered
              const x = useTransform(smoothProgress, [0, 0.08], [init.x, 0]);
              // 0.12 to 0.2: Fly straight up out of frame
              const y = useTransform(smoothProgress, [0, 0.08, 0.12, 0.2], [init.y, 0, 0, -1500]);
              const rotate = useTransform(smoothProgress, [0, 0.08], [init.r, 0]);
              const scale = useTransform(smoothProgress, [0, 0.08], [init.s, 1]);
              const opacity = useTransform(smoothProgress, [0, 0.05], [0, 1]);

              return (
                <motion.div 
                  key={i} 
                  style={{ x, y, rotate, scale, opacity }}
                  className="relative drop-shadow-2xl"
                >
                  <img 
                    src={`/assets/letters/${char}.png`} 
                    alt={char} 
                    className="h-24 sm:h-32 md:h-48 lg:h-56 object-contain filter drop-shadow-[0_10px_20px_rgba(255,255,255,0.4)]"
                  />
                </motion.div>
              );
            })}
          </div>

          <motion.div style={{ y: taglineY, opacity: taglineOpacity }} className="flex flex-col items-center">
            <p className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-white/90 drop-shadow-md mb-8">
              Shop. Connect. Make Peace.
            </p>
            <button className="flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-md border border-white/40 rounded-full hover:bg-white/30 transition-all shadow-lg text-white font-medium tracking-wide">
              <ChevronDown className="w-5 h-5 animate-bounce" />
              EXPLORE
            </button>
          </motion.div>
        </motion.div>


        {/* === LAYER 2: MID SKY === */}
        <motion.div style={{ opacity: l2Opacity }} className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <motion.div style={{ x: airplaneX }} className="absolute top-[20%] w-32 h-32 opacity-80 mix-blend-overlay">
             {/* Airplane placeholder silhouette */}
             <svg viewBox="0 0 24 24" fill="white"><path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z"/></svg>
          </motion.div>
          
          <motion.div style={{ y: balloonY }} className="absolute right-[10%] w-48 h-48 opacity-70">
             {/* Balloon placeholder */}
             <svg viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9C5 13.5 10 18.5 10 18.5V20H8V22H16V20H14V18.5C14 18.5 19 13.5 19 9C19 5.13 15.87 2 12 2M12 4C14.76 4 17 6.24 17 9C17 11.83 14.15 15.53 12 17.65C9.85 15.53 7 11.83 7 9C7 6.24 9.24 4 12 4Z"/></svg>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl px-6">
            <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] text-center transform transition hover:scale-105">
              <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-white/90" />
              <h3 className="text-xl font-semibold mb-2">Trusted Sellers</h3>
              <p className="text-white/70 font-light">Verified & reliable global merchants.</p>
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] text-center transform transition hover:scale-105">
              <Lock className="w-12 h-12 mx-auto mb-4 text-white/90" />
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-white/70 font-light">Safe & protected transactions.</p>
            </div>
            <div className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] text-center transform transition hover:scale-105">
              <Package className="w-12 h-12 mx-auto mb-4 text-white/90" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-white/70 font-light">Quick & dependable worldwide shipping.</p>
            </div>
          </div>
        </motion.div>


        {/* === LAYER 3: LOWER SKY === */}
        <motion.div style={{ opacity: l3Opacity }} className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <motion.div 
            style={{ y: citySilhouetteY }} 
            className="absolute bottom-0 w-full h-[40vh] bg-gradient-to-t from-black/20 to-transparent pointer-events-none"
          />
          <h2 className="text-4xl md:text-6xl font-serif text-white/90 mb-8 drop-shadow-xl">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl px-6">
            {['Art', 'Fashion', 'Tech', 'Home'].map((cat) => (
              <div key={cat} className="h-40 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                <span className="text-2xl font-light">{cat}</span>
              </div>
            ))}
          </div>
        </motion.div>


        {/* === LAYER 4: NEAR GROUND === */}
        <motion.div style={{ opacity: l4Opacity }} className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/10">
          <motion.div style={{ scale: buildingsScale }} className="absolute bottom-0 w-full h-1/2 opacity-30">
            {/* Architectural structural lines placeholder */}
            <div className="w-full h-full border-t border-white/20 grid grid-cols-6 gap-4 px-10">
               {[1,2,3,4,5,6].map(i => <div key={i} className="h-full border-l border-white/10" />)}
            </div>
          </motion.div>
          
          <div className="max-w-4xl text-center z-10 px-6">
             <h2 className="text-3xl md:text-5xl font-serif mb-6 text-white">Built on Trust</h2>
             <p className="text-xl font-light text-white/80 leading-relaxed">
               As we descend into the marketplace, peace of mind remains our foundation. Thousands of successful connections made daily across the globe.
             </p>
          </div>
        </motion.div>


        {/* === LAYER 5: EARTH SURFACE === */}
        <motion.div style={{ opacity: l5Opacity, y: earthY }} className="absolute inset-0 z-30 bg-[#1A1A2E] flex flex-col items-center justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <div className="max-w-5xl w-full px-6 py-20 text-center">
            <h1 className="text-5xl md:text-7xl font-bold font-serif mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Welcome to Earth.
            </h1>
            <p className="text-2xl text-gray-400 font-light mb-12">The journey ends, but your experience begins.</p>
            <button className="px-10 py-4 bg-white text-brand-navy rounded-full font-bold text-lg hover:scale-105 transition-transform">
              Start Shopping
            </button>
          </div>
          
          <footer className="absolute bottom-0 w-full p-8 border-t border-white/10 flex justify-between text-gray-500 text-sm">
            <span>© 2026 Marketpeace Inc.</span>
            <div className="space-x-6">
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Privacy</a>
            </div>
          </footer>
        </motion.div>

        {/* Global Navigation - Always visible */}
        <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
          <div className="flex gap-8 text-sm font-medium tracking-widest text-white/90">
             <a href="#" className="hover:text-white border-b border-white/50 pb-1">HOME</a>
             <a href="#" className="hover:text-white">MARKETPLACE</a>
             <a href="#" className="hover:text-white">ABOUT US</a>
          </div>
        </nav>

      </motion.div>
    </div>
  )
}
