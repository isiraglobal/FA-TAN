import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const cities = [
  { name: "New York, NY", status: "Active - Booking Vendors", date: "Upcoming" },
  { name: "Washington, D.C.", status: "Active - Venues Confirmed", date: "Upcoming" },
  { name: "Atlanta, GA", status: "Waitlist Open", date: "TBA" },
  { name: "Philadelphia, PA", status: "Waitlist Open", date: "TBA" },
  { name: "Miami, FL", status: "Scouting Venues", date: "TBA" },
  { name: "Boston, MA", status: "Scouting Venues", date: "TBA" },
  { name: "Dallas, TX", status: "Scouting Venues", date: "TBA" },
];

export default function Cities() {
  return (
    <div className="w-full min-h-screen pt-32 md:pt-40 px-6 md:px-12 flex flex-col items-center pb-20 md:pb-32 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="max-w-5xl w-full flex flex-col items-center text-center mb-16 md:mb-24"
      >
        <span className="text-white bg-[#0077b6] px-4 py-1.5 rounded-full tracking-[0.3em] text-[10px] md:text-xs font-black uppercase mb-8 shadow-[0_0_20px_rgba(0,119,182,0.4)]">
          Multi-City Rollout
        </span>
        <h1 className="text-4xl md:text-8xl font-black tracking-tighter mb-8 text-white leading-[0.95] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase italic">
          Nationwide <span className="text-[#0077b6] not-italic">Rollout</span>,<br/>Join Us
        </h1>
        <p className="text-white/80 text-lg md:text-2xl leading-relaxed max-w-3xl font-medium px-4 drop-shadow-md">
          We are launching simultaneous pop-up events across the East Coast and beyond. Find your city, become a promoter, or apply to be a city lead.
        </p>
      </motion.div>

      <div className="max-w-5xl w-full flex flex-col gap-4 md:gap-6 mb-20 md:mb-32 px-4 md:px-0">
        {cities.map((city, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-[2rem] p-6 md:p-10 backdrop-blur-[60px] flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-white/10 transition-all group shadow-xl">
            <div className="flex items-center gap-4 md:gap-8 mb-6 md:mb-0">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#0690d4]/10 flex items-center justify-center text-[#0690d4] shrink-0 group-hover:scale-110 transition-transform duration-500">
                <MapPin className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div>
                <h3 className="text-xl md:text-3xl font-medium text-white mb-1 md:mb-2 tracking-tight">{city.name}</h3>
                <p className="text-white/40 text-[10px] md:text-sm font-light uppercase tracking-[0.2em]">{city.status}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-white/40 bg-white/5 px-4 md:px-6 py-2 md:py-3 rounded-full uppercase">{city.date}</span>
              <Link to="/vendors" className="w-full md:w-auto">
                <button className="w-full md:w-auto px-6 md:px-8 py-3 bg-white text-[#061530] hover:bg-white/90 rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all cursor-pointer shadow-lg hover:-translate-y-1">
                  JOIN WAITLIST
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-5xl w-full bg-[#0690d4]/10 border border-[#0690d4]/30 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-24 text-center backdrop-blur-xl flex flex-col items-center relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0690d4]/20 rounded-full blur-[100px] pointer-events-none"></div>
        <Globe className="w-12 md:w-20 h-12 md:h-20 text-[#0690d4] mb-6 md:mb-8" />
        <h2 className="text-2xl md:text-4xl font-medium mb-4 md:mb-6 tracking-tight">Promoter Commission Program</h2>
        <p className="text-white/60 text-base md:text-lg mb-8 md:mb-12 font-light max-w-3xl leading-relaxed px-4">
          Become a promoter in any of our active cities. Earn $1 per ticket sold, 10% commission on vendors you refer, and get free VIP entry to all events. They profit when we profit.
        </p>
        <a href="mailto:contact@foreignaffairs.com?subject=Promoter%20Application">
          <button className="px-10 md:px-12 py-4 md:py-5 bg-white text-[#061530] font-bold rounded-2xl tracking-[0.2em] text-[10px] md:text-xs uppercase hover:bg-white/90 transition-all shadow-2xl cursor-pointer hover:-translate-y-1">
            APPLY TO BE A PROMOTER
          </button>
        </a>
      </div>
    </div>
  );
}
