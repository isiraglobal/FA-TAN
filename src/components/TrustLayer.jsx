import React from 'react';
import { useInView } from 'react-intersection-observer';

export default function TrustLayer() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="min-h-screen relative w-full flex flex-col items-center justify-center py-20 z-20">
      {/* Section background with city silhouette at bottom */}
      <div className="absolute bottom-0 w-full h-[250px] opacity-20 blur-[3px] bg-cover bg-bottom pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 200\'%3E%3Cpath fill=\'%23000\' d=\'M0 200h1000v-20l-10-10v-30l-10-10v-40h-20v40l-10 10v30l-20-20v-50h-30v50l-10 10v-20l-20-20v-60h-40v60l-10 10v20l-30-30v-40h-20v40l-20 20v20l-10-10v-80h-30v80l-20 20v10l-20-20v-30h-40v30l-20 20v20l-30-30v-40h-20v40l-10 10v-20l-20-20v-50h-30v50l-10 10v20l-20-20v-30h-40v30l-20 20v20l-30-30v-40h-20v40l-10 10v-20l-20-20v-50h-30v50l-10 10v20Z\'/%3E%3C/svg%3E")' }} />
      
      <div className="relative z-10 w-full max-w-[1100px] px-6">
        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className={`liquid-glass backdrop-blur-lg p-12 h-[240px] flex flex-col justify-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.2s' }}>
            <div className="text-6xl text-white/20 font-bold leading-none mb-4">"</div>
            <p className="text-lg text-white font-light mb-6 leading-relaxed">Amazing event! Brought my customers & made $800 in 4 hours.</p>
            <p className="text-white/70 font-medium">— Sarah, Jewelry Vendor</p>
          </div>
          
          <div className={`liquid-glass backdrop-blur-lg p-12 h-[240px] flex flex-col justify-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
            <div className="text-6xl text-white/20 font-bold leading-none mb-4">"</div>
            <p className="text-lg text-white font-light mb-6 leading-relaxed">Sold out in 2 hours! Best ROI I've had at any market.</p>
            <p className="text-white/70 font-medium">— Mike, Food Vendor</p>
          </div>
        </div>

        {/* Stats Panel */}
        <div className={`liquid-glass backdrop-blur-xl w-full max-w-full h-auto md:h-[200px] mx-auto flex flex-col md:flex-row justify-around items-center gap-8 md:gap-0 text-center p-10 md:p-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.6s' }}>
          <div className="flex-1">
            <h3 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight">1000+</h3>
            <p className="text-white/70 text-sm md:text-base uppercase tracking-[0.2em] font-light">Attendees</p>
          </div>
          <div className="hidden md:block w-px h-24 bg-white/20"></div>
          <div className="flex-1">
            <h3 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight">100+</h3>
            <p className="text-white/70 text-sm md:text-base uppercase tracking-[0.2em] font-light">Vendors</p>
          </div>
          <div className="hidden md:block w-px h-24 bg-white/20"></div>
          <div className="flex-1">
            <h3 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight">7</h3>
            <p className="text-white/70 text-sm md:text-base uppercase tracking-[0.2em] font-light">Cities</p>
          </div>
          <div className="hidden md:block w-px h-24 bg-white/20"></div>
          <div className="flex-1">
            <h3 className="text-5xl md:text-7xl font-bold text-white mb-2 tracking-tight">50+</h3>
            <p className="text-white/70 text-sm md:text-base uppercase tracking-[0.2em] font-light">Events</p>
          </div>
        </div>
      </div>
    </section>
  );
}
