import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Truck, Users, Music, DollarSign, Flag } from 'lucide-react';

const TimelineItem = ({ time, title, icon: Icon, isLast }) => {
  const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: false });
  
  return (
    <div className="flex" ref={ref}>
      <div className="flex flex-col items-center mr-8">
        <motion.div 
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-14 h-14 rounded-full bg-brand-cyan flex items-center justify-center text-brand-navy z-10 shadow-[0_0_20px_rgba(0,255,255,0.6)]"
        >
          <Icon size={28} />
        </motion.div>
        {!isLast && (
          <motion.div 
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-1 bg-gradient-to-b from-brand-cyan to-transparent flex-grow my-2 opacity-50"
          />
        )}
      </div>
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="pb-16 pt-3"
      >
        <p className="text-brand-yellow font-bold text-xl mb-2 font-heading tracking-wider">{time}</p>
        <h4 className="text-2xl md:text-3xl text-white font-semibold">{title}</h4>
      </motion.div>
    </div>
  );
};

const EventTimeline = () => {
  return (
    <div className="py-24 px-4 relative z-20">
      <div className="max-w-4xl mx-auto bg-brand-navy/60 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl" />
        
        <h2 className="text-4xl md:text-6xl font-heading font-bold text-center mb-20 text-white relative z-10">
          The <span className="text-brand-cyan glow-text">Experience</span>
        </h2>
        
        <div className="max-w-lg mx-auto relative z-10">
          <TimelineItem time="10:00 AM" title="Vendor Load-In & Setup" icon={Truck} />
          <TimelineItem time="11:30 AM" title="Final Check-In" icon={Clock} />
          <TimelineItem time="12:00 PM" title="Doors Open - Shoppers Arrive" icon={Users} />
          <TimelineItem time="12:30 PM - 5:00 PM" title="Live Music, Raffles & Shopping" icon={Music} />
          <TimelineItem time="5:30 PM" title="Last Call for Sales" icon={DollarSign} />
          <TimelineItem time="6:00 PM" title="Event Ends - Teardown" icon={Flag} isLast={true} />
        </div>
      </div>
    </div>
  );
};

export default EventTimeline;
