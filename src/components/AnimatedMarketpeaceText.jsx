import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const letters = [
  { char: 'M', src: '/assets/letters/M.png' },
  { char: 'A', src: '/assets/letters/A.png' },
  { char: 'R', src: '/assets/letters/R.png' },
  { char: 'K', src: '/assets/letters/K.png' },
  { char: 'E', src: '/assets/letters/E.png' },
  { char: 'T', src: '/assets/letters/T.png' },
  { char: 'P', src: '/assets/letters/P.png' },
  { char: 'E', src: '/assets/letters/E.png' },
  { char: 'A', src: '/assets/letters/A.png' },
  { char: 'C', src: '/assets/letters/C.png' },
  { char: 'E', src: '/assets/letters/E.png' }
];

const directions = [
  { x: -500, y: -400 },
  { x: 500, y: -400 },
  { x: -600, y: 0 },
  { x: 600, y: 0 },
  { x: -500, y: 400 },
  { x: 500, y: 400 },
];

const LetterComponent = ({ letter, index, isVisible, totalLetters }) => {
  const letterRef = useRef(null);
  const delay = index * 80; // milliseconds between each letter
  
  // Calculate final position
  const spacing = 100;
  const totalWidth = (totalLetters - 1) * spacing;
  const finalX = (index * spacing) - totalWidth / 2;
  const finalY = 0;

  // Get starting position from directions array
  const randomStart = directions[index % directions.length];
  const rotation = Math.random() * 720 - 360;

  useEffect(() => {
    if (!letterRef.current) return;

    if (isVisible) {
      // Trigger animation with delay
      const timer = setTimeout(() => {
        if (letterRef.current) {
          letterRef.current.classList.add('assembled');
        }
      }, delay);

      return () => clearTimeout(timer);
    } else {
      // Reset animation
      if (letterRef.current) {
        letterRef.current.classList.remove('assembled');
      }
    }
  }, [isVisible, delay]);

  return (
    <div
      ref={letterRef}
      className="absolute letter-animate"
      style={{
        '--start-x': `${randomStart.x}px`,
        '--start-y': `${randomStart.y}px`,
        '--start-rotate': `${rotation}deg`,
        '--final-x': `${finalX}px`,
        '--final-y': `${finalY}px`,
        '--index': index,
      }}
    >
      <img
        src={letter.src}
        alt={letter.char}
        className="h-32 md:h-40 w-auto drop-shadow-lg pointer-events-none"
        style={{ filter: 'drop-shadow(0 10px 30px rgba(255,255,255,0.3))' }}
      />
    </div>
  );
};

export default function AnimatedMarketpeaceText() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  return (
    <section
      ref={ref}
      className="relative w-full h-screen flex flex-col items-center justify-center z-20 overflow-hidden"
    >
      <style>{`
        .letter-animate {
          position: absolute;
          transform: translate(var(--start-x), var(--start-y)) rotate(var(--start-rotate)) scale(0);
          opacity: 0;
          transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--index) * 80ms);
        }

        .letter-animate.assembled {
          transform: translate(var(--final-x), var(--final-y)) rotate(0deg) scale(1);
          opacity: 1;
          animation: float-letters 4s ease-in-out infinite calc(var(--index) * 80ms);
        }

        @keyframes float-letters {
          0%, 100% {
            transform: translate(var(--final-x), var(--final-y)) translateY(0px);
          }
          50% {
            transform: translate(var(--final-x), var(--final-y)) translateY(-20px);
          }
        }
      `}</style>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-100/5 to-transparent pointer-events-none" />

      {/* Animated Letters Container */}
      <div className="relative w-full h-80 flex items-center justify-center">
        {letters.map((letter, idx) => (
          <LetterComponent
            key={idx}
            letter={letter}
            index={idx}
            isVisible={inView}
            totalLetters={letters.length}
          />
        ))}
      </div>

      {/* Scroll Hint */}
      <div className={`absolute bottom-20 flex flex-col items-center gap-2 transition-opacity duration-700 ${inView ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <p className="text-white/60 text-sm uppercase tracking-widest">Scroll to assemble</p>
        <div className="flex gap-1">
          <div className="w-1 h-8 bg-white/40 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Tagline appears after assembly */}
      <div
        className={`absolute bottom-40 text-center transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: inView ? '1.2s' : '0s' }}
      >
        <p className="text-2xl md:text-3xl font-light tracking-[0.15em] text-white">
          SHOP. CONNECT. MAKE PEACE.
        </p>
      </div>
    </section>
  );
}
