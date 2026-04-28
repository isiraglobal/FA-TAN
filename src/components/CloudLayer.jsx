import React, { useEffect, useRef } from 'react';

const cloud1 = "https://raw.githubusercontent.com/danielstuart14/CSS_FOG_ANIMATION/master/fog1.png";
const cloud2 = "https://raw.githubusercontent.com/danielstuart14/CSS_FOG_ANIMATION/master/fog2.png";

export default function CloudLayer() {
  const fgRef = useRef(null);
  const mgRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Using proper parallax speeds: fg:1.8, mid:1.0, bg:0.3
      if (fgRef.current) fgRef.current.style.transform = `translateY(${scrollY * 1.8}px)`;
      if (mgRef.current) mgRef.current.style.transform = `translateY(${scrollY * 1.0}px)`;
      if (bgRef.current) bgRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background clouds (slowest) */}
      <div ref={bgRef} className="absolute inset-[-50%] opacity-30 mix-blend-screen" style={{ backgroundImage: `url(${cloud1})`, backgroundSize: 'cover' }} />
      {/* Mid clouds (normal speed) */}
      <div ref={mgRef} className="absolute inset-[-50%] opacity-45 mix-blend-screen scale-150" style={{ backgroundImage: `url(${cloud2})`, backgroundSize: 'cover' }} />
      {/* Foreground clouds (fastest) */}
      <div ref={fgRef} className="absolute inset-[-50%] opacity-60 mix-blend-screen scale-[2]" style={{ backgroundImage: `url(${cloud1})`, backgroundSize: 'cover' }} />
    </div>
  );
}
