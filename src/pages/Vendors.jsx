import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
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

  useEffect(() => {
    document.title = "MARKETPEACE | Vendor Sync";
  }, []);

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
    <div className="w-full min-h-screen pt-24 sm:pt-32 md:pt-40 px-4 sm:px-6 md:px-12 flex flex-col items-center pb-16 sm:pb-20 md:pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="max-w-5xl w-full flex flex-col items-center text-center mb-20 md:mb-32"
      >
        <span className="text-white bg-[#0077b6] px-4 py-1.5 rounded-full tracking-[0.3em] text-[10px] md:text-xs font-black uppercase mb-12 md:mb-16 shadow-[0_0_20px_rgba(0,119,182,0.4)]">
          System Inquiry
        </span>
        <h1 className="text-2xl sm:text-4xl md:text-8xl font-black tracking-tighter mb-12 md:mb-16 text-white leading-[0.95] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase italic">
          Initiate <span className="not-italic text-white drop-shadow-[0_0_15px_rgba(0,119,182,0.8)] [text-shadow:2px_2px_0_#0077b6,-2px_-2px_0_#0077b6,2px_-2px_0_#0077b6,-2px_2px_0_#0077b6]">Protocol Entry</span>
        </h1>
        <p className="text-white/80 text-sm sm:text-lg md:text-2xl leading-relaxed max-w-3xl font-medium px-4 drop-shadow-md mb-8 md:mb-12">
          Direct line to the MARKETPEACE core. Our coordination team is on standby for high-value strategic inquiries.
        </p>
      </motion.div>

      {/* Tiered System Section */}
      <div className="max-w-6xl w-full flex flex-col items-center mb-20 md:mb-32">
        <h2 className="text-xl sm:text-3xl md:text-5xl font-black tracking-tight text-white mb-12 md:mb-20 text-center uppercase italic">System Leverage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <TierCard 
            title="Standard Node" 
            price="$250 ENTRY" 
            desc="6ft table & 2 chairs. Prime placement. Core revenue stream."
            features={["6ft Table & 2 Chairs", "Prime Placement", "Event Listing Inclusion", "Social Media Mention"]}
          />
          <TierCard 
            title="Flagship Node" 
            price="$500 ENTRY" 
            desc="Maximum authority. Premium corner positions. Featured on all promotions."
            features={["Premium Corner Placement", "Featured on Promotions", "Social Media Shoutout", "VIP Platform Listing"]}
            highlighted
          />
        </div>
      </div>

      <div className="max-w-6xl w-full flex flex-col items-center mb-20 md:mb-32 liquid-glass p-12 md:p-20">
        <h3 className="text-2xl md:text-4xl font-black text-white mb-12 uppercase italic text-center">Core Benefits</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {[
              "Premium foot traffic at curated events",
              "Digital listing on Marketpeace + materials",
              "Social media features (IG, TikTok)",
              "Promoter system selling tickets for you",
              "Post-event photo/video content",
              "Early access to future registration",
              "Vendor directory listing on platform",
              "Inclusion in event email blasts",
              "Analytics dashboard with traffic data",
              "Discounted rate for recurring vendors",
              "QR code signage with your links",
              "Secure, cashless payment processing"
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-1 h-1 bg-[#0077b6] rounded-full shrink-0 mt-2" />
                <p className="text-white/50 text-sm font-medium uppercase leading-relaxed description">{benefit}</p>
              </div>
            ))}
        </div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 md:mb-32 items-start">
        <div className="lg:col-span-7 flex flex-col gap-8 md:gap-10">
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <h2 className="text-2xl md:text-5xl font-black tracking-tight text-white leading-tight italic uppercase">Secure Your Node: <span className="not-italic text-[#0077b6]">$100 Position Deposit</span></h2>
            <div className="h-1 w-20 bg-[#0077b6] rounded-full mx-auto lg:mx-0"></div>
            <p className="text-white/50 text-base md:text-lg font-medium mt-2">Lock in your position within the MARKETPEACE rollout. Balance due prior to system activation.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-4">
            <VendorFeature title="Market Leverage" desc="Direct access to curated, high-intent audience." />
            <VendorFeature title="System Synergy" desc="Join a network of high-value creators." />
            <VendorFeature title="High-Fidelity Media" desc="Professional assets to amplify authority." />
            <VendorFeature title="Strategic Access" desc="Guest tickets and promotional resources." />
          </div>
        </div>

        <div className="lg:col-span-5 liquid-glass p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#0077b6]/20 rounded-full blur-[80px] pointer-events-none"></div>
          <h3 className="text-2xl md:text-3xl text-white font-black mb-4 italic uppercase title">
            STRATEGIC ASSET CURATION
          </h3>
          <p className="text-white/70 text-lg font-medium leading-relaxed mb-6 description">
            Seeking to integrate your brand into the rollout? Use the protocol form or send a direct portfolio to our lead curators.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
              <Input name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Brand Name" />
            </div>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Communication Channel (Email)" />
            <Input name="instagram" value={formData.instagram} onChange={handleChange} placeholder="Digital Presence (Instagram)" />
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required className="w-full bg-white/[0.12] border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-white/70 outline-none focus:border-[#0077b6] transition-all appearance-none backdrop-blur-md text-sm">
              <option value="" disabled className="bg-[#061530]">Preferred Settlement Method</option>
              <option value="venmo" className="bg-[#061530]">Venmo</option>
              <option value="zelle" className="bg-[#061530]">Zelle</option>
              <option value="cashapp" className="bg-[#061530]">CashApp</option>
            </select>
            <div className="flex items-start gap-4 mt-2">
              <input type="checkbox" required id="terms" className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5" />
              <label htmlFor="terms" className="text-[10px] md:text-[11px] text-white/40 leading-relaxed font-light">
                I agree to the System Protocol and understand the $100 position deposit is non-refundable.
              </label>
            </div>
            
            {status.error && <p className="text-red-400 text-xs mt-2">{status.error}</p>}

            <button type="submit" disabled={status.submitting} className="w-full mt-4 md:mt-6 py-3 sm:py-4 md:py-5 bg-white text-[#061530] font-bold rounded-xl sm:rounded-2xl tracking-[0.1em] md:tracking-[0.2em] text-[9px] sm:text-[10px] md:text-xs uppercase hover:bg-white/90 transition-all shadow-xl disabled:opacity-50 hover:-translate-y-1 active:translate-y-0 btn-glow">
              {status.submitting ? 'INITIALIZING...' : 'SECURE YOUR POSITION'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function TierCard({ title, price, desc, features, highlighted = false }) {
  return (
    <div className={`flex flex-col p-8 md:p-10 h-full liquid-glass ${highlighted ? 'border-[#0077b6]/40 shadow-[0_0_40px_rgba(0,119,182,0.15)] scale-105 z-10 premium-border' : ''}`}>
      <span className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-4 amount ${highlighted ? 'text-[#0077b6]' : 'text-white/40'}`}>{price}</span>
      <h4 className="text-2xl font-black text-white mb-4 tracking-tight title uppercase italic">{title}</h4>
      <p className="text-white/40 text-sm font-medium leading-relaxed mb-8 h-20 overflow-hidden description">{desc}</p>
      <div className="flex flex-col gap-3 mt-auto">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-3 text-[11px] text-white/50 font-medium description">
            <div className={`w-1 h-1 rounded-full ${highlighted ? 'bg-[#0077b6]' : 'bg-white/20'}`} />
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}

function VendorFeature({ title, desc, highlighted = false }) {
  return (
    <div className={`flex flex-col gap-4 p-6 md:p-10 liquid-glass ${highlighted ? 'border-[#0077b6]/30' : ''}`}>
      <div>
        <h4 className="text-white font-black text-base md:text-lg mb-1 md:mb-3 tracking-tight break-words italic uppercase title">{title}</h4>
        <p className="text-white/40 text-sm md:text-sm leading-relaxed font-medium break-words description">{desc}</p>
      </div>
    </div>
  );
}

function Input({ ...props }) {
  return (
    <input 
      {...props} 
      required 
      className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 md:py-4 text-white outline-none focus:border-[#0077b6] transition-all placeholder:text-white/20 font-light backdrop-blur-md text-sm" 
    />
  );
}
