import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText } from 'lucide-react';

export default function Legal() {
  return (
    <div className="w-full min-h-screen pt-32 md:pt-40 px-6 md:px-8 flex flex-col items-center pb-20 md:pb-32 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full flex flex-col items-center text-center mb-16 md:mb-20"
      >
        <span className="text-[#0690d4] tracking-[0.3em] text-[10px] md:text-xs font-bold uppercase mb-4">Legal & Agreements</span>
        <h1 className="text-3xl md:text-6xl font-medium tracking-tight mb-6 md:mb-8 max-w-[90vw]">Transparency and Security</h1>
        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl font-light px-4">
          Foreign Affairs LLC is committed to safe, insured, and transparent events. Review our public policies and vendor agreements below.
        </p>
      </motion.div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20 md:mb-24">
        <div className="bg-[#061530]/40 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl">
          <FileText className="w-8 h-8 md:w-10 md:h-10 text-[#0690d4] mb-6" />
          <h3 className="text-xl md:text-2xl font-medium mb-4">Privacy Policy</h3>
          <p className="text-white/60 font-light text-sm mb-6 leading-relaxed">
            We respect your data. Our privacy policy outlines how we handle attendee and vendor information securely.
          </p>
          <button className="text-[#0690d4] text-[10px] md:text-sm font-bold tracking-widest uppercase hover:underline">Read Policy</button>
        </div>

        <div className="bg-[#061530]/40 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl">
          <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-[#0690d4] mb-6" />
          <h3 className="text-xl md:text-2xl font-medium mb-4">Terms of Service</h3>
          <p className="text-white/60 font-light text-sm mb-6 leading-relaxed">
            The rules of engagement for our platforms, ticketing, and event participation. Ensures a safe environment for all.
          </p>
          <button className="text-[#0690d4] text-[10px] md:text-sm font-bold tracking-widest uppercase hover:underline">Read Terms</button>
        </div>

        <div className="bg-[#061530]/40 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-medium mb-4">Vendor Agreement Template</h3>
            <p className="text-white/60 font-light text-sm leading-relaxed max-w-xl">
              Preview our standard vendor contract. It details booth fees, the $75 non-refundable deposit structure, our $1M liability insurance, and your rights to digital content.
            </p>
          </div>
          <button className="w-full md:w-auto px-10 py-3.5 bg-[#0690d4] text-[#061530] font-bold rounded-xl tracking-widest text-[10px] md:text-xs uppercase hover:bg-[#0690d4]/90 transition-colors whitespace-nowrap">
            DOWNLOAD PDF
          </button>
        </div>
      </div>
    </div>
  );
}
