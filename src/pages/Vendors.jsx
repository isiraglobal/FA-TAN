import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Users, Zap, CheckCircle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Vendors() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    instagram: '',
    paymentMethod: ''
  });

  const [status, setStatus] = useState({ submitting: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    const transactionID = 'VND-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    try {
      const scriptURL = 'https://script.google.com/macros/s/AKfycbz_REPLACE_WITH_YOUR_SCRIPT_ID/exec';
      
      await fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({ 
          ...formData, 
          type: 'Vendor', 
          transactionID,
          status: 'Pending',
          timestamp: new Date().toISOString() 
        })
      });

      // 2. Call Stripe Checkout API
      const stripeRes = await fetch('/api/stripe-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'Vendor',
          name: formData.name,
          email: formData.email,
          transactionID,
          amount: 75 // Deposit amount
        })
      });

      const stripeData = await stripeRes.json();
      
      if (stripeData.url) {
        window.location.href = stripeData.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
      
      setFormData({ name: '', businessName: '', email: '', instagram: '', paymentMethod: '' });
    } catch (err) {
      console.error(err);
      setStatus({ submitting: false, success: false, error: 'Failed to process. Please try again.' });
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
          Vendor Opportunities
        </span>
        <h1 className="text-4xl md:text-8xl font-black tracking-tighter mb-8 text-white leading-[0.95] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase italic">
          Creators <span className="text-[#0690d4] not-italic">Connect</span>,<br/>Shine, and Sell
        </h1>
        <p className="text-white/80 text-lg md:text-2xl leading-relaxed max-w-3xl font-medium px-4 drop-shadow-md">
          You're not just renting a booth — you're investing in visibility, community, and sales. Join the Foreign Affairs Market Pop-Up.
        </p>
      </motion.div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 md:mb-32 items-start">
        <div className="lg:col-span-7 flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <h2 className="text-2xl md:text-5xl font-medium tracking-tight text-white leading-tight">Your Investment: $150 Booth Fee</h2>
            <div className="h-1 w-20 bg-[#0690d4] rounded-full mx-auto lg:mx-0"></div>
            <p className="text-white/50 text-base md:text-lg font-light mt-2 italic">Only $75 Deposit Due Today to Secure Your Spot.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4">
            <Feature icon={<Zap />} title="Digital Exposure" desc="Thousands of social media engagements pre and post event." />
            <Feature icon={<Users />} title="A Crowd of 150-300" desc="Targeted local creatives, influencers, and supporters." />
            <Feature icon={<Camera />} title="Professional Content" desc="5-10 high-res photos and 1-2 short video clips." />
            <Feature icon={<Package />} title="Custom Promo Assets" desc="Personal promo flyer and 10 free guest tickets." />
          </div>
        </div>

        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-12 backdrop-blur-[60px] shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#0690d4]/20 rounded-full blur-[80px] pointer-events-none"></div>
          <h3 className="text-2xl md:text-3xl font-medium mb-4 tracking-tight">Secure Your Space</h3>
          <p className="text-white/40 text-sm mb-8 md:mb-10 font-light leading-relaxed">Only 10 spots available per event. Apply now and pay the $75 deposit to confirm.</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" />
              <Input name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Business Name" />
            </div>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
            <Input name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Instagram Handle" />
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white/70 outline-none focus:border-[#0690d4] transition-all appearance-none backdrop-blur-md text-sm">
              <option value="" disabled className="bg-[#061530]">Preferred Payment Method</option>
              <option value="venmo" className="bg-[#061530]">Venmo</option>
              <option value="zelle" className="bg-[#061530]">Zelle</option>
              <option value="cashapp" className="bg-[#061530]">CashApp</option>
            </select>
            <div className="flex items-start gap-4 mt-2">
              <input type="checkbox" required id="terms" className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5" />
              <label htmlFor="terms" className="text-[10px] md:text-[11px] text-white/40 leading-relaxed font-light">
                I agree to the Terms and understand the $75 deposit is non-refundable.
              </label>
            </div>
            
            {status.error && <p className="text-red-400 text-xs mt-2">{status.error}</p>}

            <button type="submit" disabled={status.submitting} className="w-full mt-4 md:mt-6 py-4 md:py-5 bg-white text-[#061530] font-bold rounded-2xl tracking-[0.2em] text-[10px] md:text-xs uppercase hover:bg-white/90 transition-all shadow-xl disabled:opacity-50 hover:-translate-y-1 active:translate-y-0">
              {status.submitting ? 'PROCESSING...' : 'PAY $75 DEPOSIT NOW'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex flex-col gap-4 p-6 md:p-8 bg-white/5 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all group backdrop-blur-sm">
      <div className="w-10 md:w-12 h-10 md:h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#0690d4] group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <div>
        <h4 className="text-white font-medium text-base md:text-lg mb-1 md:mb-2 tracking-tight">{title}</h4>
        <p className="text-white/40 text-xs md:text-sm leading-relaxed font-light">{desc}</p>
      </div>
    </div>
  );
}

function Input({ ...props }) {
  return (
    <input 
      {...props} 
      required 
      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 md:py-4 text-white outline-none focus:border-[#0690d4] transition-all placeholder:text-white/20 font-light backdrop-blur-md text-sm" 
    />
  );
}
