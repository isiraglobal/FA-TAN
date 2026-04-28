import React, { useState } from 'react';

const categories = [
  { title: "ART & CRAFTS", vendors: "25+", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  { title: "FOOD & DRINKS", vendors: "18+", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80" },
  { title: "FASHION & BEAUTY", vendors: "30+", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80" },
  { title: "TECH & GADGETS", vendors: "12+", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=400&q=80" },
  { title: "HOME & DECOR", vendors: "20+", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80" }
];

export default function CategoryScroll() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section className="min-h-screen relative w-full flex flex-col justify-center py-20 z-20 overflow-hidden">
      
      {/* City silhouette bg */}
      <div className="absolute bottom-0 w-full h-[300px] opacity-15 blur-[4px] bg-cover bg-bottom pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1000 200\'%3E%3Cpath fill=\'%23000\' d=\'M0 200h1000v-20l-10-10v-30l-10-10v-40h-20v40l-10 10v30l-20-20v-50h-30v50l-10 10v-20l-20-20v-60h-40v60l-10 10v20l-30-30v-40h-20v40l-20 20v20l-10-10v-80h-30v80l-20 20v10l-20-20v-30h-40v30l-20 20v20l-30-30v-40h-20v40l-10 10v-20l-20-20v-50h-30v50l-10 10v20l-20-20v-30h-40v30l-20 20v20l-30-30v-40h-20v40l-10 10v-20l-20-20v-50h-30v50l-10 10v20l-20-20v-30h-40v30l-20 20v20l-30-30v-40h-20v40l-10 10v-20l-20-20v-50h-30v50l-10 10v20Z\'/%3E%3C/svg%3E")' }} />

      <h2 className="text-5xl font-light tracking-[0.12em] text-center mb-16 text-black/80 mix-blend-overlay">DISCOVER CREATORS</h2>

      <div className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-6 px-[10vw] pb-10">
        {categories.map((cat, idx) => (
          <div 
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`liquid-glass flex-shrink-0 w-[320px] h-[440px] p-4 flex flex-col snap-center group shadow-[inset_0_-80px_60px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-pointer ${
              hoveredIdx === idx ? 'scale-110 shadow-[0_20px_60px_rgba(0,0,0,0.2)]' : ''
            }`}
          >
            <div className="w-full h-2/3 rounded-xl overflow-hidden mb-6 relative">
              <img 
                src={cat.image} 
                alt={cat.title} 
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  hoveredIdx === idx ? 'scale-110' : 'scale-100'
                }`} 
              />
              <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${hoveredIdx === idx ? 'opacity-0' : 'opacity-100'}`}></div>
            </div>
            <h4 className={`text-xl font-bold mb-2 transition-colors duration-300 ${hoveredIdx === idx ? 'text-white' : 'text-black/80'}`}>
              {cat.title}
            </h4>
            <p className={`font-medium transition-colors duration-300 ${hoveredIdx === idx ? 'text-white/80' : 'text-black/60'}`}>
              {cat.vendors} vendors
            </p>
            
            {/* Hover indicator */}
            <div className={`mt-auto h-1 bg-white rounded-full transition-all duration-300 ${hoveredIdx === idx ? 'w-8' : 'w-0'}`}></div>
          </div>
        ))}
      </div>
      
    </section>
  );
}
