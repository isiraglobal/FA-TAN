import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin } from 'lucide-react';

const MultiCity = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: false });
  
  const cities = ['NYC', 'DC', 'Atlanta', 'Philadelphia', 'Miami', 'Boston', 'Dallas'];

  return (
    <div className="py-24 px-4 relative z-20">
      <div className="max-w-5xl mx-auto bg-sky-dark/20 backdrop-blur-md border border-brand-cyan/30 rounded-[3rem] p-8 md:p-16 text-center shadow-[0_0_30px_rgba(0,255,255,0.1)]">
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8 text-white">
          Find an event near you - or bring <span className="text-brand-cyan glow-text">Foreign Affairs</span> to your city
        </h2>
        
        <div ref={ref} className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12">
          {cities.map((city, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-2 bg-white/10 px-6 py-3 rounded-full border border-white/20 hover:bg-brand-cyan hover:text-brand-navy hover:border-brand-cyan transition-colors"
            >
              <MapPin size={18} className="shrink-0" />
              <span className="font-bold text-lg">{city}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiCity;
