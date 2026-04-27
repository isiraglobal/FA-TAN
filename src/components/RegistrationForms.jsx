import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2 } from 'lucide-react';

const RegistrationForms = () => {
  const [activeTab, setActiveTab] = useState('attendee');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="py-32 px-4 relative z-20 min-h-screen flex items-center" id="register">
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto w-full"
      >
        <div className="bg-white text-brand-navy rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border-4 border-brand-cyan/20">
          {!isSubmitted && (
            <div className="flex bg-sky-light border-b border-sky-mid/30">
              <button 
                className={`flex-1 py-8 text-2xl font-bold font-heading transition-colors ${activeTab === 'attendee' ? 'bg-brand-cyan text-brand-navy' : 'text-brand-navy/60 hover:bg-white/50'}`}
                onClick={() => setActiveTab('attendee')}
              >
                Get Tickets
              </button>
              <button 
                className={`flex-1 py-8 text-2xl font-bold font-heading transition-colors ${activeTab === 'vendor' ? 'bg-brand-yellow text-brand-navy' : 'text-brand-navy/60 hover:bg-white/50'}`}
                onClick={() => setActiveTab('vendor')}
              >
                Apply to Vendor
              </button>
            </div>
          )}

          <div className="p-8 md:p-16">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-brand-cyan/20 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-cyan">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-4xl font-heading font-bold mb-4">You're on the list!</h3>
                <p className="text-xl text-brand-navy/70 mb-8 max-w-lg mx-auto">
                  {activeTab === 'attendee' 
                    ? "Check your email for your ticket and event details. Don't forget to share on social media if you claimed a free entry!"
                    : "Your application has been received. Please check your email for payment instructions for the $75 deposit."}
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-4 bg-brand-navy text-white font-bold rounded-full hover:bg-brand-cyan hover:text-brand-navy transition-colors"
                >
                  Return to form
                </button>
              </motion.div>
            ) : activeTab === 'attendee' ? (
              <motion.form 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-brand-navy/60">Name</label>
                    <input type="text" required className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-brand-cyan outline-none transition-all bg-gray-50 text-lg" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-brand-navy/60">Email</label>
                    <input type="email" required className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-brand-cyan outline-none transition-all bg-gray-50 text-lg" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 pt-2">
                  <div>
                    <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-brand-navy/60">Phone (Optional)</label>
                    <input type="tel" className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-brand-cyan outline-none transition-all bg-gray-50 text-lg" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-brand-navy/60">How did you hear about us?</label>
                    <select className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-brand-cyan outline-none transition-all bg-gray-50 text-lg">
                      <option>Instagram</option>
                      <option>TikTok</option>
                      <option>Friend</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-sky-light/50 rounded-xl mt-6 border border-sky-mid/30">
                  <input type="checkbox" id="free-entry" className="w-6 h-6 rounded border-gray-300 text-brand-cyan focus:ring-brand-cyan" />
                  <label htmlFor="free-entry" className="font-semibold text-lg cursor-pointer">I want FREE entry (I will share on social media)</label>
                </div>

                <button className="w-full py-6 bg-brand-navy text-brand-cyan text-2xl font-bold font-heading rounded-xl hover:bg-brand-cyan hover:text-brand-navy transition-all duration-300 mt-10 shadow-xl hover:-translate-y-1">
                  Secure My Spot
                </button>
              </motion.form>
            ) : (
              <motion.form 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-brand-navy/60">Business Name</label>
                    <input type="text" required className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-brand-yellow outline-none transition-all bg-gray-50 text-lg" placeholder="Your Brand" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-brand-navy/60">Your Name</label>
                    <input type="text" required className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-brand-yellow outline-none transition-all bg-gray-50 text-lg" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-brand-navy/60">Instagram Handle</label>
                    <input type="text" required className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-brand-yellow outline-none transition-all bg-gray-50 text-lg" placeholder="@yourbrand" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-brand-navy/60">Product Category</label>
                    <select className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-brand-yellow outline-none transition-all bg-gray-50 text-lg">
                      <option>Apparel/Clothing</option>
                      <option>Art/Prints</option>
                      <option>Jewelry</option>
                      <option>Food/Beverage</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-brand-navy/60">Email</label>
                    <input type="email" required className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-brand-yellow outline-none transition-all bg-gray-50 text-lg" placeholder="hello@brand.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-brand-navy/60">Phone</label>
                    <input type="tel" required className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-brand-yellow outline-none transition-all bg-gray-50 text-lg" placeholder="(555) 123-4567" />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-brand-navy/60">Preferred Payment</label>
                  <select className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-brand-yellow outline-none transition-all bg-gray-50 text-lg">
                    <option>Venmo</option>
                    <option>Zelle</option>
                    <option>CashApp</option>
                    <option>PayPal</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-200 mt-4">
                  <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-brand-navy/60">Add-On: Digital Marketing Subscription (Optional)</label>
                  <select className="w-full p-4 rounded-xl border-2 border-brand-yellow/50 focus:border-brand-yellow outline-none transition-all bg-brand-yellow/5 text-lg">
                    <option value="none">No thanks, just the booth</option>
                    <option value="99">$99/month: 4 Reels + 8 Stories + 1 Feed Post</option>
                    <option value="199">$199/month: Full content calendar, ads, & analytics</option>
                  </select>
                  <p className="text-sm text-brand-navy/60 mt-2 italic">Turn your event momentum into long-term growth with our in-house team.</p>
                </div>

                <div className="flex items-start gap-4 p-6 bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl mt-6">
                  <input type="checkbox" id="vendor-agree" required className="w-6 h-6 rounded border-gray-300 text-brand-yellow focus:ring-brand-yellow mt-1 shrink-0" />
                  <label htmlFor="vendor-agree" className="font-semibold text-lg leading-relaxed cursor-pointer text-brand-navy/80">
                    I agree to the <span className="font-bold text-brand-navy">$150 booth fee</span>. ($75 deposit due upon approval to secure spot, remaining $75 due 7 days before event).
                  </label>
                </div>

                <button className="w-full py-6 bg-brand-navy text-brand-yellow text-2xl font-bold font-heading rounded-xl hover:bg-brand-yellow hover:text-brand-navy transition-all duration-300 mt-10 shadow-xl hover:-translate-y-1">
                  Submit Application
                </button>
              </motion.form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationForms;
