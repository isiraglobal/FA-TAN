import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RaindropLogo = ({ progress }) => {
  const [phase, setPhase] = useState('raindrops'); 
  
  useEffect(() => {
    if (progress < 0.05) setPhase('raindrops');
    else if (progress < 0.15) setPhase('text');
    else setPhase('white');
  }, [progress]);

  const raindrops = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: Math.random() * 400 - 200,
    y: Math.random() * 400 - 200,
    delay: Math.random() * 1
  }));

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
      <div 
        className={`liquid-effect relative flex flex-col items-center justify-center transition-all duration-1000`}
        style={{
          transform: `translateY(${progress > 0.15 ? -(progress - 0.15) * 800 : 0}px)`,
        }}
      >
        <div className="relative flex justify-center items-center">
          <h1 
            className={`font-heading font-black text-6xl md:text-8xl transition-all duration-1000 z-10
              ${phase === 'white' ? 'text-white glow-text' : 'text-white/20'}
            `}
            style={{
              filter: phase === 'white' ? 'none' : 'blur(8px)',
              opacity: phase === 'raindrops' ? 0 : 1,
              transform: phase === 'raindrops' ? 'scale(1.2)' : 'scale(1)',
              textShadow: phase === 'white' ? '0 0 15px rgba(0,255,255,0.6), 0 0 30px rgba(0,255,255,0.4)' : 'none'
            }}
          >
            marketpeace
          </h1>

          {phase !== 'white' && raindrops.map(drop => (
            <motion.div
              key={drop.id}
              initial={{ x: drop.x * 2, y: drop.y * 2 - 400, scale: 0.5, opacity: 0 }}
              animate={phase === 'raindrops' ? 
                { x: drop.x * 2, y: drop.y * 2, scale: 1, opacity: 0.6 } : 
                { x: 0, y: 0, scale: 3, opacity: 0.8 }
              }
              transition={{ duration: 1.5, delay: phase === 'raindrops' ? drop.delay : 0, ease: "easeInOut" }}
              className="absolute w-16 h-16 rounded-full bg-white/60 mix-blend-overlay"
            />
          ))}
        </div>

        <div className={`transition-all duration-1000 delay-500 mt-6 ${phase === 'white' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-xl md:text-2xl text-brand-cyan font-medium text-center tracking-wide glow-text">
            Where Creators Connect, Shine & Sell
          </p>
        </div>
      </div>
    </div>
  );
};

export default RaindropLogo;
