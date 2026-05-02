import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Success() {
  const [searchParams] = useSearchParams();
  const transactionID = searchParams.get('transaction_id');
  const type = searchParams.get('type');

  return (
    <div className="w-full min-h-screen pt-24 sm:pt-32 md:pt-40 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center pb-16 sm:pb-20 md:pb-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full liquid-glass p-12 text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500">
          <CheckCircle size={48} />
        </div>
        
        <h1 className="text-4xl font-black mb-4 title uppercase italic">Payment <span className="not-italic text-stroke-blue">Confirmed</span></h1>
        <p className="text-white/50 text-lg mb-8 font-medium description">
          Your {type} registration is now synchronized. A confirmation protocol has been dispatched to your email.
        </p>

        <div className="bg-white/5 rounded-2xl p-6 mb-10 inline-block">
          <p className="text-xs text-[#0077b6] font-black uppercase tracking-widest mb-1 amount">Transaction ID</p>
          <p className="text-xl font-black text-white title">{transactionID || 'N/A'}</p>
        </div>

        <div className="flex flex-col gap-4">
          <Link to="/">
            <button className="w-full py-4 bg-white text-[#061530] font-black rounded-xl tracking-widest hover:bg-white/90 transition-all flex items-center justify-center gap-2 btn-glow">
              RETURN TO HOME <ArrowRight size={18} />
            </button>
          </Link>
          <p className="text-xs text-white/30">Your Google Sheet will be updated to "Paid" automatically.</p>
        </div>
      </motion.div>
    </div>
  );
}
