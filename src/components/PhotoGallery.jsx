import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PhotoGallery = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  
  const images = [
    "https://images.unsplash.com/photo-1555529733-0e670560f8e1?q=80&w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=600&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=600&auto=format&fit=crop"  
  ];

  return (
    <div className="py-24 px-4 relative z-20 bg-brand-navy/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-center mb-16 text-white drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
          Past Events
        </h2>
        
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative overflow-hidden rounded-2xl aspect-[4/3] group shadow-[0_10px_20px_rgba(0,0,0,0.3)] border border-white/10"
            >
              <img 
                src={img} 
                alt="Past Event" 
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
