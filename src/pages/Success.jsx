import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Success() {
  const [searchParams] = useSearchParams();
  const transactionID = searchParams.get('transaction_id');
  const type = searchParams.get('type');

  return (
    <div className="w-full min-h-screen pt-40 px-8 flex flex-col items-center justify-center pb-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-[#061530]/60 border border-white/10 rounded-3xl p-12 backdrop-blur-2xl text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500">
          <CheckCircle size={48} />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-white/70 text-lg mb-8 font-light">
          Your {type} registration is now confirmed. We have sent a confirmation email to your inbox.
        </p>

        <div className="bg-white/5 rounded-2xl p-6 mb-10 inline-block">
          <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Transaction ID</p>
          <p className="text-xl font-mono text-[#0690d4]">{transactionID || 'N/A'}</p>
        </div>

        <div className="flex flex-col gap-4">
          <Link to="/">
            <button className="w-full py-4 bg-[#0690d4] text-[#061530] font-bold rounded-xl tracking-widest hover:bg-[#0690d4]/90 transition-colors flex items-center justify-center gap-2">
              RETURN TO HOME <ArrowRight size={18} />
            </button>
          </Link>
          <p className="text-xs text-white/30">Your Google Sheet will be updated to "Paid" automatically.</p>
        </div>
      </motion.div>
    </div>
  );
}
