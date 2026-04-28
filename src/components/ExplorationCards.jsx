import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function ExplorationCards() {
  const airplaneRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    let animationFrameId;
    
    const animate = () => {
      const time = Date.now() / 1000;
      if (airplaneRef.current) {
        airplaneRef.current.style.transform = `translateX(${(time * 5) % 150 - 50}vw) translateY(${Math.sin(time * 0.5) * 15}px) scaleX(${(Math.sin(time * 0.3) > 0 ? 1 : -1)})`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const cards = [
    {
      icon: '🎉',
      label: 'FOR',
      title: 'ATTENDEES',
      desc: 'Shop local creators, live music & raffles'
    },
    {
      icon: '💼',
      label: 'FOR',
      title: 'VENDORS',
      desc: 'Amplify your brand 150+ customers'
    },
    {
      icon: '🏢',
      label: 'FOR',
      title: 'VENUES',
      desc: 'Community buzz with free content'
    }
  ];

  return (
    <section ref={ref} className="min-h-screen relative w-full flex flex-col justify-center items-center py-20 z-20">
      
      {/* Airplane crossing */}
      <div ref={airplaneRef} className="absolute top-[20%] left-0 w-16 h-16 opacity-60 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="white"><path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z"/></svg>
      </div>

      <div className="w-full max-w-[1200px] px-6 grid grid-cols-1 md:grid-cols-3 gap-[60px]">
        {cards.map((card, idx) => (
          <div 
            key={idx}
            onMouseEnter={() => setHoveredCard(idx)}
            onMouseLeave={() => setHoveredCard(null)}
            className={`liquid-glass w-full max-w-[340px] h-[420px] mx-auto flex flex-col items-center justify-center p-10 text-center transition-all duration-1000 cursor-pointer ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } ${hoveredCard === idx ? 'scale-105 shadow-[0_20px_60px_rgba(255,255,255,0.2)]' : ''}`}
            style={{ transitionDelay: `${0.2 + idx * 0.2}s` }}
          >
            <div className={`text-6xl mb-6 transition-transform duration-300 ${hoveredCard === idx ? 'scale-125 rotate-12' : ''}`}>
              {card.icon}
            </div>
            <p className="text-sm uppercase tracking-widest text-white/60 mb-2">{card.label}</p>
            <h3 className={`text-2xl font-bold mb-4 transition-all duration-300 ${hoveredCard === idx ? 'text-white' : ''}`}>
              {card.title}
            </h3>
            <p className="text-base text-white/80 font-light leading-relaxed">{card.desc}</p>
            
            {/* Hover underline */}
            <div className={`mt-6 h-1 bg-white rounded-full transition-all duration-300 ${hoveredCard === idx ? 'w-12' : 'w-0'}`}></div>
          </div>
        ))}
      </div>
      
    </section>
  );
}
