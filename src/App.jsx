import React, { useState, useEffect } from 'react';
import Earth3D from './components/Earth3D';
import RaindropLogo from './components/RaindropLogo';
import HeroSection from './components/HeroSection';
import ValueProps from './components/ValueProps';
import EventTimeline from './components/EventTimeline';
import PhotoGallery from './components/PhotoGallery';
import MultiCity from './components/MultiCity';
import RegistrationForms from './components/RegistrationForms';
import Footer from './components/Footer';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-[500vh] font-body bg-brand-navy">
      <svg width="0" height="0" className="absolute">
        <filter id="liquid-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
          <feBlend in="SourceGraphic" in2="liquid" />
        </filter>
      </svg>

      <Earth3D progress={scrollProgress} />
      
      <div 
        className="fixed inset-0 pointer-events-none transition-colors duration-1000 z-0"
        style={{
          background: scrollProgress > 0.1 
            ? `linear-gradient(to bottom, #1E90FF, #87CEEB, #FFF8DC)`
            : '#1A1A2E',
          opacity: scrollProgress > 0.1 ? 1 : 0
        }}
      />
      
      <div className={`cloud-layer ${scrollProgress > 0.1 ? 'active' : ''}`}></div>

      <div className="relative z-10 w-full pt-[50vh]">
        <RaindropLogo progress={scrollProgress} />
        
        <div className="mt-[100vh]">
          <HeroSection progress={scrollProgress} />
          <ValueProps progress={scrollProgress} />
          <EventTimeline progress={scrollProgress} />
          <PhotoGallery />
          <MultiCity />
          <RegistrationForms progress={scrollProgress} />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
