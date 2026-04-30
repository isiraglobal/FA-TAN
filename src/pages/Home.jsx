import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, MapPin, Users, Zap, Ticket, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const letters = [
  { char: 'm', src: '/assets/letters/M.png' },
  { char: 'a', src: '/assets/letters/A.png' },
  { char: 'r', src: '/assets/letters/R.png' },
  { char: 'k', src: '/assets/letters/K.png' },
  { char: 'e', src: '/assets/letters/E.png' },
  { char: 't', src: '/assets/letters/T.png' },
  { char: 'p', src: '/assets/letters/P.png' },
  { char: 'e', src: '/assets/letters/E.png' },
  { char: 'a', src: '/assets/letters/A.png' },
  { char: 'c', src: '/assets/letters/C.png' },
  { char: 'e', src: '/assets/letters/E.png' },
];


const cities = ["New York, NY", "Washington, D.C.", "Atlanta, GA", "Philadelphia, PA", "Miami, FL", "Boston, MA", "Dallas, TX"];

export default function Home() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const yText = useTransform(smoothProgress, [0, 0.2], ['0%', '150%']);
  const opacityText = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  
  const yCloudSlow = useTransform(smoothProgress, [0, 1], ['0%', '-50%']);
  const yCloudFast = useTransform(smoothProgress, [0, 1], ['0%', '-150%']);

  const ySection1 = useTransform(smoothProgress, [0.1, 0.4], ['20%', '0%']);
  const scaleSection1 = useTransform(smoothProgress, [0.1, 0.4], [0.85, 1]);
  
  const ySection2 = useTransform(smoothProgress, [0.3, 0.6], ['20%', '0%']);
  const scaleSection2 = useTransform(smoothProgress, [0.3, 0.6], [0.85, 1]);
  
  const ySection3 = useTransform(smoothProgress, [0.5, 0.8], ['20%', '0%']);
  const scaleSection3 = useTransform(smoothProgress, [0.5, 0.8], [0.85, 1]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[500vh]"
    >

      {/* Main Hero Content */}
      <div className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-10 pt-10 px-4">
        <motion.div 
          className="flex flex-wrap items-center justify-center mb-4 md:mb-8 max-w-[95vw]"
          style={{ y: yText, opacity: opacityText }}
        >
          {letters.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 150, scale: 0.5, filter: 'blur(20px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 + i * 0.05 }}
              className="relative w-[12vw] sm:w-[8vw] max-w-[70px] h-[18vw] sm:h-[12vw] max-h-[100px] flex items-center justify-center z-20 will-change-transform m-[-1vw]"
              style={{ zIndex: letters.length - i }}
            >
              <motion.img 
                src={l.src} 
                alt={l.char} 
                loading="eager"
                className="w-full h-full object-contain drop-shadow-xl will-change-transform"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: 0.5 + i * 0.2 }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 1.5 }}
          style={{ y: yText, opacity: opacityText }}
          className="text-center flex flex-col items-center z-20"
        >
          <h2 className="text-white text-[9px] sm:text-[11px] md:text-sm tracking-[0.3em] md:tracking-[0.4em] font-medium mb-8 md:mb-12 text-shadow-sm opacity-90 uppercase max-w-[80vw]">
            Where Creators Connect, Shine, and Sell
          </h2>
          
          <Link to="/vendors">
            <button className="flex items-center justify-center gap-3 bg-[#061530]/70 backdrop-blur-xl border border-white/30 text-white px-6 md:px-8 py-3 md:py-3.5 rounded-full text-[10px] md:text-[11px] font-bold tracking-[0.15em] hover:bg-white/30 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:-translate-y-1">
              <ArrowDown className="w-4 h-4 stroke-[2.5]" />
              ENTER THE MARKET
            </button>
          </Link>
        </motion.div>

        {/* Floating Glass Cards at the Bottom of Hero */}
        <motion.div 
          className="absolute bottom-10 md:bottom-12 left-0 w-full px-6 flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 z-30 pointer-events-none"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 250, damping: 25, delay: 1.8 }}
          style={{ opacity: opacityText }}
        >
          <Card icon={<MapPin className="w-5 h-5 text-[#0690d4] stroke-[2]" />} title="Nationwide" subtitle="7 Major Cities" />
          <Card icon={<Users className="w-5 h-5 text-[#0690d4] stroke-[2]" />} title="Community" subtitle="1,000+ RSVPs" />
          <Card icon={<Zap className="w-5 h-5 text-[#0690d4] stroke-[2]" />} title="Growth" subtitle="High ROI" />
        </motion.div>
      </div>

      {/* Content Placed Down the Scroll */}
      <div className="absolute top-[100vh] left-0 w-full z-20 pointer-events-none flex flex-col">
        
        {/* Interactive Sections below clouds */}
        <div className="relative w-full flex flex-col items-center py-20 md:py-40 px-6 md:px-12 gap-24 md:gap-40 pointer-events-auto">
          
          <div className="w-full overflow-hidden bg-white/5 backdrop-blur-3xl border-y border-white/10 py-6 md:py-10 flex relative shadow-2xl">
            <motion.div 
              className="flex whitespace-nowrap gap-8 md:gap-16 items-center text-white/90 font-bold tracking-[0.3em] text-xl md:text-3xl uppercase"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
              <span> ACCEPTING VENDORS</span><span>•</span>
              <span>MULTI-CITY ROLLOUT</span><span>•</span>
              <span>FOREIGN AFFAIRS MARKET</span><span>•</span>
              <span>150+ TARGETED ATTENDEES</span><span>•</span>
            </motion.div>
          </div>

          <motion.div style={{ y: ySection1, scale: scaleSection1 }} className="max-w-7xl w-full flex flex-col lg:flex-row gap-12 md:gap-20 items-center justify-between">
            <div className="w-full lg:w-[55%]">
              <span className="text-[#0690d4] tracking-[0.4em] text-[10px] font-bold uppercase mb-4 block">The Vendor Experience</span>
              <h3 className="text-3xl md:text-7xl font-medium text-white mb-6 md:mb-8 tracking-tight drop-shadow-2xl">FOR VENDORS</h3>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light mb-8 md:mb-12 max-w-2xl">
                You're not just renting a booth — you're investing in visibility, community, and sales. Secure your professional presence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="flex flex-col gap-3 md:gap-4 text-white/90 bg-white/5 p-6 md:p-8 rounded-[2rem] border border-white/10 backdrop-blur-xl group hover:bg-white/10 transition-all">
                  <Camera className="w-8 md:w-10 h-8 md:h-10 text-[#0690d4] group-hover:scale-110 transition-transform" />
                  <div>
                    <h5 className="font-medium text-base md:text-lg mb-1 md:mb-2 tracking-tight">Professional Media</h5>
                    <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed">High-res photos and video coverage of your brand.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 md:gap-4 text-white/90 bg-white/5 p-6 md:p-8 rounded-[2rem] border border-white/10 backdrop-blur-xl group hover:bg-white/10 transition-all">
                  <Users className="w-8 md:w-10 h-8 md:h-10 text-[#0690d4] group-hover:scale-110 transition-transform" />
                  <div>
                    <h5 className="font-medium text-base md:text-lg mb-1 md:mb-2 tracking-tight">Targeted Crowd</h5>
                    <p className="text-white/40 text-xs md:text-sm font-light leading-relaxed">150-300 eager shoppers and supporters.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[40%]">
              <div className="bg-white/5 backdrop-blur-[60px] border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.4)] hover:scale-[1.02] transition-all duration-700 relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#0690d4]/20 rounded-full blur-[100px] pointer-events-none"></div>
                <h4 className="text-3xl md:text-4xl text-white font-medium mb-4 tracking-tight">Secure Your Spot</h4>
                <p className="text-white/40 mb-8 md:mb-10 font-light leading-relaxed text-base md:text-lg">Only 10 spots per event. First come, first served. Secure yours today with a deposit.</p>
                <Link to="/vendors">
                  <button className="w-full py-5 md:py-6 bg-white text-[#061530] font-bold rounded-2xl tracking-[0.2em] text-[10px] md:text-xs uppercase hover:bg-white/90 transition-all shadow-2xl cursor-pointer hover:-translate-y-1 active:translate-y-0">
                    BECOME A VENDOR
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ y: ySection2, scale: scaleSection2 }} className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div className="bg-white/5 backdrop-blur-[60px] border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 hover:bg-white/10 transition-all duration-500 shadow-2xl group flex flex-col justify-between items-start min-h-[350px] md:min-h-[400px]">
              <div className="w-full">
                <div className="w-14 md:w-16 h-14 md:h-16 rounded-2xl bg-[#0690d4]/10 flex items-center justify-center text-[#0690d4] mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                  <Ticket className="w-6 md:w-8 h-6 md:h-8" />
                </div>
                <h4 className="text-2xl md:text-3xl text-white font-medium mb-4 md:mb-6 tracking-tight">FOR ATTENDEES</h4>
                <p className="text-white/40 text-base md:text-lg font-light mb-8 leading-relaxed">
                  Tickets are $5 (or FREE if you share on social). Expect live music, goodie bags, and unique vendors.
                </p>
              </div>
              <Link to="/attendees">
                <button className="w-full md:w-auto px-10 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-xl tracking-[0.2em] text-[10px] uppercase hover:bg-white/10 transition-all">
                  GET TICKETS
                </button>
              </Link>
            </div>
            
            <div className="bg-white/5 backdrop-blur-[60px] border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 hover:bg-white/10 transition-all duration-500 shadow-2xl group flex flex-col justify-between items-start min-h-[350px] md:min-h-[400px]">
              <div className="w-full">
                <div className="w-14 md:w-16 h-14 md:h-16 rounded-2xl bg-[#0690d4]/10 flex items-center justify-center text-[#0690d4] mb-6 md:mb-8 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 md:w-8 h-6 md:h-8" />
                </div>
                <h4 className="text-2xl md:text-3xl text-white font-medium mb-4 md:mb-6 tracking-tight">FOR VENUES</h4>
                <p className="text-white/40 text-base md:text-lg font-light mb-8 leading-relaxed">
                  We bring the crowd, you get the credit. We partner with local spaces to create unique community experiences.
                </p>
              </div>
              <Link to="/venues">
                <button className="w-full md:w-auto px-10 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-xl tracking-[0.2em] text-[10px] uppercase hover:bg-white/10 transition-all">
                  PARTNER WITH US
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div style={{ y: ySection3, scale: scaleSection3 }} className="w-full flex flex-col items-center mt-10 md:mt-20 mb-20 md:mb-40">
            <h3 className="text-2xl md:text-4xl font-medium text-white mb-10 md:mb-16 tracking-[0.2em] md:tracking-[0.3em] uppercase text-center opacity-80">Multi-City Rollout</h3>
            <div className="w-full overflow-hidden flex relative group mb-8 md:mb-12">
              <motion.div 
                className="flex whitespace-nowrap gap-4 md:gap-8 items-center px-4"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
              >
                {[...cities, ...cities, ...cities].map((city, idx) => (
                  <div key={idx} className="px-6 md:px-10 py-3 md:py-5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full text-white/80 font-medium tracking-widest text-[10px] md:text-sm uppercase">
                    {city}
                  </div>
                ))}
              </motion.div>
            </div>
            <Link to="/cities">
              <button className="px-10 md:px-12 py-4 md:py-5 bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-3xl rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.3em] transition-all shadow-xl hover:-translate-y-1">
                VIEW CITY SCHEDULE
              </button>
            </Link>
          </motion.div>

          {/* New Content: Ethos and FAQ */}
          <div className="max-w-5xl w-full flex flex-col gap-16 md:gap-24 mb-20 md:mb-40 px-4">
            <div className="text-center flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 md:mb-8">The Foreign Affairs Ethos</h2>
              <p className="text-white/40 font-light text-base md:text-xl leading-relaxed max-w-3xl">
                We observed that most pop-up markets charge vendors exorbitant fees while doing zero marketing. Foreign Affairs LLC was built to change the paradigm. We cultivate a vibrant, high-energy environment. When you succeed, we succeed.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-[60px] border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-24 shadow-2xl">
              <h3 className="text-xl md:text-3xl font-medium mb-10 md:mb-16 text-center uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-80">Operational FAQ</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-10 md:gap-y-12">
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg md:text-xl font-medium text-white tracking-tight">What does the $150 Vendor Fee cover?</h4>
                  <p className="text-white/40 font-light text-sm md:text-base leading-relaxed">It covers your space, guaranteed foot traffic, professional media assets, and guest tickets.</p>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg md:text-xl font-medium text-white tracking-tight">Is the deposit refundable?</h4>
                  <p className="text-white/40 font-light text-sm md:text-base leading-relaxed">No. The deposit secures your spot and allows us to begin city-specific marketing immediately.</p>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg md:text-xl font-medium text-white tracking-tight">Do you provide equipment?</h4>
                  <p className="text-white/40 font-light text-sm md:text-base leading-relaxed">Vendors bring their own tables and displays. We provide the platform and the audience.</p>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="text-lg md:text-xl font-medium text-white tracking-tight">How do Promoters get paid?</h4>
                  <p className="text-white/40 font-light text-sm md:text-base leading-relaxed">Promoters earn commission on ticket sales and vendor referrals. Paid weekly.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Card({ icon, title, subtitle }) {
  return (
    <div className="bg-[#061530]/60 backdrop-blur-3xl border border-white/20 px-5 py-3 md:px-6 md:py-4 flex items-center gap-4 md:gap-5 w-[85vw] sm:w-[260px] md:w-[280px] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shadow-md shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="text-white font-medium text-[11px] md:text-[13px] tracking-wide mb-0.5">{title}</h3>
        <p className="text-white/70 text-[9px] md:text-[11px] tracking-wide">{subtitle}</p>
      </div>
    </div>
  );
}
