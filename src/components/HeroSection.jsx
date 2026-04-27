import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative z-20 px-4 py-20" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-5xl mx-auto backdrop-blur-md bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,255,255,0.1)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-cyan/10 to-transparent pointer-events-none" />
        
        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white drop-shadow-lg relative z-10">
          The Foreign Affairs Spotlight
        </h2>
        <p className="text-xl md:text-3xl text-sky-light mb-10 font-light relative z-10">
          Shop Local. Meet Creators. Experience Something Special.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
          <button className="group relative px-8 py-4 bg-brand-cyan text-brand-navy font-bold rounded-full text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]">
            <span className="relative z-10">Get Free Ticket</span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          </button>
          
          <button className="group relative px-8 py-4 bg-transparent border-2 border-brand-yellow text-brand-yellow font-bold rounded-full text-lg overflow-hidden transition-all hover:bg-brand-yellow hover:text-brand-navy hover:scale-105 hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]">
            <span className="relative z-10">Become a Vendor</span>
          </button>
        </div>

        <div className="mt-16 p-8 bg-brand-navy/60 rounded-2xl border border-white/10 inline-block text-left relative z-10 w-full md:w-auto">
          <div className="flex flex-col sm:flex-row gap-8 justify-between items-center text-center sm:text-left">
            <div>
              <p className="text-sm text-sky-mid uppercase tracking-widest mb-2 font-bold">Next Event</p>
              <p className="text-xl md:text-2xl font-bold text-white">Aug 24, 2024</p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-white/20"></div>
            <div>
              <p className="text-sm text-sky-mid uppercase tracking-widest mb-2 font-bold">Location</p>
              <p className="text-xl md:text-2xl font-bold text-white">NYC Rooftop Studio</p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-white/20"></div>
            <div>
              <p className="text-sm text-sky-mid uppercase tracking-widest mb-2 font-bold">Time</p>
              <p className="text-xl md:text-2xl font-bold text-white">12PM - 6PM</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
