import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Music, Gift, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Attendees() {
  const [formData, setFormData] = React.useState({ name: '', email: '', ticketType: 'Regular' });
  const [status, setStatus] = React.useState({ submitting: false, success: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ ...status, submitting: true });
    const transactionID = 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbz_REPLACE_WITH_YOUR_SCRIPT_ID/exec';
      await fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({ ...formData, type: 'Attendee', transactionID, status: 'Pending', timestamp: new Date().toISOString() })
      });

      // 2. Call Stripe Checkout API
      if (formData.ticketType === 'Regular') {
        const stripeRes = await fetch('/api/stripe-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'Attendee',
            name: formData.name,
            email: formData.email,
            transactionID,
            amount: 5
          })
        });
        const stripeData = await stripeRes.json();
        if (stripeData.url) {
          window.location.href = stripeData.url;
          return;
        }
      }

      setStatus({ submitting: false, success: true });
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
          Join the Experience
        </span>
        <h1 className="text-4xl md:text-8xl font-black tracking-tighter mb-8 text-white leading-[0.95] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase italic">
          Fun, <span className="text-[#0690d4] not-italic">Value</span>,<br/>Repeat
        </h1>
        <p className="text-white/80 text-lg md:text-2xl leading-relaxed max-w-3xl font-medium px-4 drop-shadow-md">
          We curate every detail to ensure you have a great time, discover unique brands, and leave with amazing memories.
        </p>
      </motion.div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 md:mb-32 items-start">
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <AttendeeFeature icon={<Ticket />} title="Tickets are $5" desc="Affordable entry to ensure everyone can join the movement." />
            <AttendeeFeature icon={<Gift />} title="Or Get In Free" desc="Share on social or bring 2 friends." highlighted />
          </div>
          <AttendeeFeature icon={<Music />} title="Live Vibes" desc="Live DJ sets, free photos, raffles, and goodie bags." wide />
        </div>

        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-12 backdrop-blur-[60px] shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#0690d4]/20 rounded-full blur-[80px] pointer-events-none"></div>
          <h3 className="text-2xl md:text-3xl font-medium mb-4 tracking-tight">Get Your Tickets</h3>
          <p className="text-white/40 text-sm mb-8 md:mb-10 font-light leading-relaxed">Join the next event and experience the market vibe.</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">
            <input type="text" placeholder="Full Name" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 md:py-4 text-white outline-none focus:border-[#0690d4] transition-all placeholder:text-white/20 text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 md:py-4 text-white outline-none focus:border-[#0690d4] transition-all placeholder:text-white/20 text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 md:py-4 text-white/70 outline-none focus:border-[#0690d4] transition-all appearance-none text-sm backdrop-blur-md" value={formData.ticketType} onChange={e => setFormData({...formData, ticketType: e.target.value})}>
              <option value="Regular" className="bg-[#061530]">Regular Ticket ($5)</option>
              <option value="Free-Social" className="bg-[#061530]">Free (Shared on Social)</option>
              <option value="Free-Friends" className="bg-[#061530]">Free (Bringing 2 Friends)</option>
            </select>
            <button type="submit" disabled={status.submitting} className="w-full mt-4 md:mt-6 py-4 md:py-5 bg-white text-[#061530] font-bold rounded-2xl tracking-[0.2em] text-[10px] md:text-xs uppercase hover:bg-white/90 transition-all shadow-xl disabled:opacity-50 hover:-translate-y-1 active:translate-y-0">
              {status.submitting ? 'PROCESSING...' : 'GET TICKETS NOW'}
            </button>
            {status.success && <p className="text-green-400 text-center mt-4 text-xs">Success! Check your email for details.</p>}
          </form>
        </div>
      </div>

      <div className="max-w-5xl w-full bg-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-20 backdrop-blur-xl text-center relative overflow-hidden mb-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#0690d4]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <MapPin className="w-12 md:w-16 h-12 md:h-16 text-[#0690d4] mx-auto mb-6 md:mb-8" />
        <h2 className="text-2xl md:text-4xl font-medium mb-4 md:mb-6 tracking-tight">Upcoming Pop-Ups</h2>
        <p className="text-white/40 text-base md:text-lg font-light mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
          Launching our nationwide series starting in NY, DC, Atlanta, and more. Join the movement.
        </p>
        <Link to="/cities">
          <button className="px-10 md:px-12 py-4 md:py-5 bg-white/5 border border-white/20 text-white font-bold rounded-2xl tracking-[0.2em] text-[10px] md:text-xs uppercase hover:bg-white/10 transition-all shadow-lg cursor-pointer hover:-translate-y-1">
            VIEW SCHEDULE
          </button>
        </Link>
      </div>
    </div>
  );
}

function AttendeeFeature({ icon, title, desc, highlighted = false, wide = false }) {
  return (
    <div className={`flex flex-col gap-4 p-6 md:p-8 rounded-[2rem] border transition-all backdrop-blur-sm ${wide ? 'w-full' : ''} ${highlighted ? 'bg-[#0690d4]/10 border-[#0690d4]/30' : 'bg-white/5 border-white/10'}`}>
      <div className={`w-10 md:w-12 h-10 md:h-12 rounded-2xl flex items-center justify-center ${highlighted ? 'bg-[#0690d4]/20 text-[#0690d4]' : 'bg-white/5 text-[#0690d4]'}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-white font-medium text-base md:text-lg mb-1 md:mb-2 tracking-tight">{title}</h4>
        <p className="text-white/40 text-xs md:text-sm leading-relaxed font-light">{desc}</p>
      </div>
    </div>
  );
}
