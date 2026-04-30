import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Video, ShieldCheck } from 'lucide-react';

export default function Venues() {
  const [formData, setFormData] = React.useState({ venueName: '', name: '', email: '', phone: '', location: '', capacity: '', notes: '' });
  const [status, setStatus] = React.useState({ submitting: false, success: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false });
    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbz_REPLACE_WITH_YOUR_SCRIPT_ID/exec';
      await fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({ ...formData, type: 'Venue', status: 'In Review', timestamp: new Date().toISOString() })
      });
      setStatus({ submitting: false, success: true });
      setFormData({ venueName: '', name: '', email: '', phone: '', location: '', capacity: '', notes: '' });
    } catch (err) {
      console.error(err);
      setStatus({ submitting: false, success: false });
    }
  };

  return (
    <div className="w-full min-h-screen pt-32 md:pt-40 px-6 md:px-12 flex flex-col items-center pb-20 md:pb-32 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="max-w-5xl w-full flex flex-col items-center text-center mb-16 md:mb-24"
      >
        <span className="text-white bg-[#0690d4] px-4 py-1.5 rounded-full tracking-[0.3em] text-[10px] md:text-xs font-black uppercase mb-8 shadow-[0_0_20px_rgba(6,144,212,0.4)]">
          Venue Partnerships
        </span>
        <h1 className="text-4xl md:text-8xl font-black tracking-tighter mb-8 text-white leading-[0.95] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase italic">
          Host a <span className="text-[#0690d4] not-italic">Market</span>,<br/>Get Noticed
        </h1>
        <p className="text-white/80 text-lg md:text-2xl leading-relaxed max-w-3xl font-medium px-4 drop-shadow-md">
          Host a Foreign Affairs Market Pop-Up. We fill it with 150+ eager shoppers and provide professional content.
        </p>
      </motion.div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 md:mb-32 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <FeatureItem icon={<Users />} title="New Foot Traffic" desc="150-300+ people discover your venue." />
            <FeatureItem icon={<Video />} title="Professional Content" desc="Free Reels, professional photos, and social posts." />
            <FeatureItem icon={<MapPin />} title="Recurring Revenue" desc="Consistent, hands-off income monthly." />
            <FeatureItem icon={<ShieldCheck />} title="Full Insurance" desc="$1M liability policy for every event." />
          </div>
        </div>

        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-12 backdrop-blur-[60px] shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#0690d4]/20 rounded-full blur-[80px] pointer-events-none"></div>
          <h3 className="text-2xl md:text-3xl font-medium mb-4 tracking-tight">Partner With Us</h3>
          <p className="text-white/40 text-sm mb-8 md:mb-10 font-light leading-relaxed">Let's discuss how we can work together.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">
            <input type="text" placeholder="Venue Name" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 md:py-4 text-white outline-none focus:border-[#0690d4] text-sm" value={formData.venueName} onChange={e => setFormData({...formData, venueName: e.target.value})} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Contact Name" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 md:py-4 text-white outline-none focus:border-[#0690d4] text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input type="email" placeholder="Email" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 md:py-4 text-white outline-none focus:border-[#0690d4] text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <input type="text" placeholder="Location (City/Address)" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 md:py-4 text-white outline-none focus:border-[#0690d4] text-sm" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
            <textarea placeholder="Tell us about your space..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 md:py-4 text-white outline-none focus:border-[#0690d4] h-32 text-sm" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
            <button type="submit" disabled={status.submitting} className="w-full mt-4 md:mt-6 py-4 md:py-5 bg-white text-[#061530] font-bold rounded-2xl tracking-[0.2em] text-[10px] md:text-xs uppercase hover:bg-white/90 transition-all shadow-xl disabled:opacity-50 hover:-translate-y-1 active:translate-y-0">
              {status.submitting ? 'SENDING...' : 'REQUEST PARTNERSHIP'}
            </button>
            {status.success && <p className="text-green-400 text-center mt-4 text-xs">Application sent! We'll be in touch.</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col gap-4 backdrop-blur-sm hover:border-white/20 transition-all">
      <div className="text-[#0690d4] w-10 md:w-12 h-10 md:h-12 bg-white/5 rounded-2xl flex items-center justify-center">{icon}</div>
      <div>
        <h4 className="text-white font-medium text-base md:text-lg mb-1 md:mb-2 tracking-tight">{title}</h4>
        <p className="text-white/40 text-xs md:text-sm leading-relaxed font-light">{desc}</p>
      </div>
    </div>
  );
}
