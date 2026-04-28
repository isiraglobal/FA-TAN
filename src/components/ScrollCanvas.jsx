import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// High quality transparent cloud textures from public repo for parallax depth
const cloud1 = "https://raw.githubusercontent.com/danielstuart14/CSS_FOG_ANIMATION/master/fog1.png";
const cloud2 = "https://raw.githubusercontent.com/danielstuart14/CSS_FOG_ANIMATION/master/fog2.png";

export default function ScrollCanvas({ children }) {
  const containerRef = useRef(null);
  
  // We track the scroll progress of this massive 600vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const word = "marketspace".split("");
  
  // Predictable wildly scattered positions for the letters
  const scatter = [
     { x: -1000, y: -800, r: -45, s: 3 },
     { x: 800, y: -900, r: 90, s: 4 },
     { x: -900, y: 500, r: 120, s: 2 },
     { x: 500, y: 800, r: -80, s: 3.5 },
     { x: 1200, y: 100, r: 45, s: 1.5 },
     { x: -400, y: -1000, r: 180, s: 3 },
     { x: 900, y: -400, r: -20, s: 2.5 },
     { x: -300, y: 700, r: 60, s: 4 },
     { x: 1100, y: 600, r: -110, s: 3 },
     { x: -700, y: 200, r: 30, s: 2 },
     { x: 600, y: -700, r: -90, s: 3.5 }
  ];

  // Cloud Layer 1: Starts immediately, scales up and fades out (flying past it)
  const cloud1Scale = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 3, 8]);
  const cloud1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.8, 0.9, 0]);
  
  // Cloud Layer 2: Starts a bit later, creating depth
  const cloud2Scale = useTransform(scrollYProgress, [0.1, 0.6, 1], [1.2, 4, 10]);
  const cloud2Opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7], [0, 1, 0]);

  // Cloud Layer 3: Deepest clouds, appearing last before transition
  const cloud3Scale = useTransform(scrollYProgress, [0.3, 0.8, 1], [0.8, 2, 6]);
  const cloud3Opacity = useTransform(scrollYProgress, [0.2, 0.6, 0.8], [0, 0.8, 0]);

  // The main text container scale - zooms in infinitely past 40% scroll
  const textContainerScale = useTransform(scrollYProgress, [0.35, 0.55], [1, 30]);
  const textContainerOpacity = useTransform(scrollYProgress, [0.45, 0.55], [1, 0]);

  // Main content reveal (the rest of your application)
  const contentOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.55, 0.65], [100, 0]);
  const contentPointerEvents = useTransform(scrollYProgress, (v) => v > 0.6 ? "auto" : "none");

  return (
    <div ref={containerRef} className="h-[700vh] w-full relative bg-[#0b1b3d]">
       
       {/* Sticky viewport: locks the camera while user scrolls the 700vh */}
       <div className="sticky top-0 h-screen w-full overflow-hidden perspective-[1000px] flex items-center justify-center">
           
           {/* Immersive Sky Gradient */}
           <div className="absolute inset-0 bg-gradient-to-b from-[#1E90FF] via-[#87ceeb] to-[#e0f6ff]" />
           
           {/* Volumetric Flying Clouds Layers */}
           <motion.div 
             style={{ scale: cloud1Scale, opacity: cloud1Opacity }}
             className="absolute inset-0 pointer-events-none origin-center flex justify-center items-center"
           >
             <img src={cloud1} className="w-[150%] h-[150%] object-cover mix-blend-screen" alt="cloud layer 1" />
           </motion.div>

           <motion.div 
             style={{ scale: cloud2Scale, opacity: cloud2Opacity }}
             className="absolute inset-0 pointer-events-none origin-center flex justify-center items-center"
           >
             <img src={cloud2} className="w-[180%] h-[180%] object-cover mix-blend-screen translate-x-[10%] translate-y-[-10%]" alt="cloud layer 2" />
           </motion.div>

           <motion.div 
             style={{ scale: cloud3Scale, opacity: cloud3Opacity }}
             className="absolute inset-0 pointer-events-none origin-center flex justify-center items-center"
           >
             <img src={cloud1} className="w-[120%] h-[120%] object-cover mix-blend-screen translate-x-[-20%] translate-y-[10%]" alt="cloud layer 3" />
           </motion.div>

           {/* Scattered Letters Container */}
           <motion.div 
             style={{ scale: textContainerScale, opacity: textContainerOpacity }}
             className="flex z-20 space-x-1 sm:space-x-2 md:space-x-4 origin-center"
           >
              {word.map((letter, i) => {
                 const init = scatter[i];
                 
                 // Assemble perfectly between 5% and 30% of the total scroll
                 const x = useTransform(scrollYProgress, [0.05, 0.3], [init.x, 0]);
                 const y = useTransform(scrollYProgress, [0.05, 0.3], [init.y, 0]);
                 const rotate = useTransform(scrollYProgress, [0.05, 0.3], [init.r, 0]);
                 const scale = useTransform(scrollYProgress, [0.05, 0.3], [init.s, 1]);
                 const opacity = useTransform(scrollYProgress, [0, 0.1, 0.25], [0, 0, 1]);

                 return (
                   <motion.span 
                      key={i}
                      style={{ 
                        x, y, rotate, scale, opacity, 
                        textShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 100px rgba(255,255,255,0.3)' 
                      }}
                      className="text-6xl sm:text-8xl md:text-[12rem] font-bold text-white uppercase tracking-tighter font-sans relative"
                   >
                     {letter}
                     {/* Inner glow/cloud effect on the letters */}
                     <span className="absolute inset-0 bg-white/20 blur-xl rounded-full mix-blend-overlay"></span>
                   </motion.span>
                 )
              })}
           </motion.div>

           <motion.div
             style={{ opacity: useTransform(scrollYProgress, [0.25, 0.35], [0, 1]), scale: textContainerScale }}
             className="absolute top-[65%] text-white/80 font-light tracking-widest text-xl uppercase drop-shadow-lg"
           >
             Keep Scrolling
           </motion.div>

           {/* The Rest of the Application (fades in when we fly through the text) */}
           <motion.div 
              style={{ 
                opacity: contentOpacity, 
                y: contentY,
                pointerEvents: contentPointerEvents
              }}
              className="absolute inset-0 z-30 h-screen overflow-y-auto bg-brand-navy custom-scrollbar"
           >
              <div className="min-h-screen pt-[10vh] pb-32">
                {children}
              </div>
           </motion.div>

       </div>
    </div>
  )
}
