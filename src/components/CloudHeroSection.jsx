import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CloudHeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // The word "marketspace"
  const word = "marketspace".split("");

  // Pre-calculated scattered positions so they are stable across renders
  const initialPositions = [
     { x: -800, y: -400, r: -45, scale: 2 },
     { x: 500, y: -600, r: 90, scale: 3 },
     { x: -600, y: 300, r: 120, scale: 1.5 },
     { x: 300, y: 600, r: -80, scale: 2.5 },
     { x: 800, y: 100, r: 45, scale: 1 },
     { x: -300, y: -800, r: 180, scale: 2 },
     { x: 600, y: -300, r: -20, scale: 1.5 },
     { x: -200, y: 500, r: 60, scale: 3 },
     { x: 900, y: 400, r: -110, scale: 2 },
     { x: -500, y: 100, r: 30, scale: 1.5 },
     { x: 400, y: -500, r: -90, scale: 2.5 }
  ];

  return (
    <div ref={containerRef} className="h-[400vh] w-full relative bg-[#87CEEB]">
       {/* Sticky container that stays on screen while we scroll through the 400vh */}
       <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[1000px]">
           
           {/* Beautiful Sky Background */}
           <div className="absolute inset-0 bg-gradient-to-b from-[#1E90FF] via-[#87CEEB] to-[#E0F6FF]" />
           
           {/* Temporary cloud placeholder image until user provides theirs */}
           <img 
             src="https://images.unsplash.com/photo-1509803874385-db7c23652552?auto=format&fit=crop&q=80&w=2000" 
             alt="Clouds"
             className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
           />

           {/* Animated Cloud Layer 1 - Parallax */}
           <motion.div 
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
              className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/clouds.png')] opacity-30" 
           />

           {/* The Scattered Letters that form "marketspace" */}
           <div className="flex z-20 space-x-1 sm:space-x-2 md:space-x-4">
              {word.map((letter, i) => {
                 const init = initialPositions[i];
                 
                 // Letters come together between 10% and 40% of the scroll section
                 const x = useTransform(scrollYProgress, [0.1, 0.4], [init.x, 0]);
                 const y = useTransform(scrollYProgress, [0.1, 0.4], [init.y, 0]);
                 const rotate = useTransform(scrollYProgress, [0.1, 0.4], [init.r, 0]);
                 const scale = useTransform(scrollYProgress, [0.1, 0.4], [init.scale, 1]);
                 const opacity = useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 0, 1]);
                 
                 // After they form, we zoom the whole word out when scroll reaches 60%
                 const finalY = useTransform(scrollYProgress, [0.6, 0.8], [0, -200]);
                 const finalScale = useTransform(scrollYProgress, [0.6, 0.8], [1, 0.8]);
                 const finalOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

                 return (
                   <motion.span 
                      key={i}
                      style={{ 
                         x, 
                         rotate, 
                         opacity: useTransform(scrollYProgress, (v) => v > 0.8 ? finalOpacity.get() : opacity.get()),
                         y: useTransform(scrollYProgress, (v) => v > 0.6 ? finalY.get() : y.get()),
                         scale: useTransform(scrollYProgress, (v) => v > 0.6 ? finalScale.get() : scale.get()),
                         textShadow: '0 20px 40px rgba(0,0,0,0.2)'
                      }}
                      className="text-6xl sm:text-8xl md:text-[10rem] font-bold text-white uppercase tracking-tight font-sans"
                   >
                     {letter}
                   </motion.span>
                 )
              })}
           </div>

           {/* Next Section Teaser that appears after word scatters in */}
           <motion.div 
             style={{
                opacity: useTransform(scrollYProgress, [0.6, 0.8], [0, 1]),
                y: useTransform(scrollYProgress, [0.6, 0.8], [100, 0])
             }}
             className="absolute top-[60%] flex flex-col items-center z-20 text-white"
           >
             <h2 className="text-3xl md:text-5xl font-light tracking-wider mb-4 shadow-black drop-shadow-xl">
               A New Dimension of Trade
             </h2>
             <p className="text-lg md:text-xl font-light text-white/90 drop-shadow-md">
               Keep scrolling to explore
             </p>
           </motion.div>
       </div>
    </div>
  )
}
