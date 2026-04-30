import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Instagram, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false });
    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbz_REPLACE_WITH_YOUR_SCRIPT_ID/exec';
      await fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({ ...formData, type: 'Contact', timestamp: new Date().toISOString() })
      });
      setStatus({ submitting: false, success: true });
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      console.error(err);
      setStatus({ submitting: false, success: false });
    }
  };

  return (
    <div className="w-full min-h-screen pt-32 md:pt-40 px-6 md:px-12 flex flex-col items-center pb-20 md:pb-32 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full flex flex-col items-center text-center mb-16 md:mb-24"
      >
        <span className="text-white bg-[#0690d4] px-4 py-1.5 rounded-full tracking-[0.3em] text-[10px] md:text-xs font-black uppercase mb-8 shadow-[0_0_20px_rgba(6,144,212,0.4)]">
          Get In Touch
        </span>
        <h1 className="text-4xl md:text-8xl font-black tracking-tighter mb-8 text-white leading-[0.95] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase italic">
          Connect <span className="text-[#0690d4] not-italic">With Us</span>
        </h1>
        <p className="text-white/80 text-lg md:text-2xl leading-relaxed max-w-3xl font-medium px-4 drop-shadow-md">
          Have questions about the market? Whether you're a creator, an attendee, or just curious, we're here to help.
        </p>
      </motion.div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ContactMethod 
              icon={<Mail />} 
              title="Email Us" 
              value="contact@foreignaffairs.com" 
              link="mailto:contact@foreignaffairs.com"
            />
            <ContactMethod 
              icon={<Instagram />} 
              title="Follow Us" 
              value="@foreignaffairsmarket" 
              link="https://instagram.com"
            />
          </div>

          {/* Vendor Specific Box */}
          <div className="bg-[#0690d4]/10 border border-[#0690d4]/30 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#0690d4]/20 rounded-full blur-[80px] pointer-events-none"></div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-4">
              <MapPin className="text-[#0690d4]" /> FOR VENDORS
            </h3>
            <p className="text-white/70 text-lg font-light leading-relaxed mb-6">
              Looking to showcase your brand? You can use the form or send a direct portfolio to our curation team.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 inline-block">
              <p className="text-[#0690d4] font-bold tracking-widest text-sm uppercase mb-1">Direct Curation Email</p>
              <p className="text-white text-xl font-mono">vendors@foreignaffairs.com</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-12 backdrop-blur-[60px] shadow-2xl relative overflow-hidden">
          <h3 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight">Send a Message</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              required 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#0690d4] text-sm backdrop-blur-md"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              required 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#0690d4] text-sm backdrop-blur-md"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <select 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white/70 outline-none focus:border-[#0690d4] text-sm backdrop-blur-md appearance-none"
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
            >
              <option value="General Inquiry" className="bg-[#061530]">General Inquiry</option>
              <option value="Vendor Question" className="bg-[#061530]">Vendor Question</option>
              <option value="Venue Partnership" className="bg-[#061530]">Venue Partnership</option>
              <option value="Promoter Inquiry" className="bg-[#061530]">Promoter Inquiry</option>
            </select>
            <textarea 
              placeholder="Your Message" 
              required 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none focus:border-[#0690d4] h-32 text-sm backdrop-blur-md"
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
            />
            <button 
              type="submit" 
              disabled={status.submitting}
              className="w-full mt-4 py-5 bg-white text-[#061530] font-bold rounded-2xl tracking-[0.2em] text-xs uppercase hover:bg-white/90 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              {status.submitting ? 'SENDING...' : <><Send size={16} /> SEND MESSAGE</>}
            </button>
            {status.success && <p className="text-green-400 text-center mt-4 text-xs font-bold">Message sent! We'll be in touch soon.</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactMethod({ icon, title, value, link }) {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="flex flex-col gap-4 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group backdrop-blur-sm">
      <div className="w-12 h-12 rounded-2xl bg-[#0690d4]/10 flex items-center justify-center text-[#0690d4] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h4 className="text-white/40 font-bold tracking-widest text-[10px] uppercase mb-1">{title}</h4>
        <p className="text-white text-lg font-medium break-all">{value}</p>
      </div>
    </a>
  );
}
