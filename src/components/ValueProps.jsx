import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PartyPopper, Briefcase, Building2, CheckCircle2 } from 'lucide-react';

const Card = ({ title, icon: Icon, items, delay, cta, ctaText }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay }}
      className="bg-brand-navy/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-brand-navy transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,255,255,0.15)] flex flex-col w-full max-w-sm"
    >
      <div className="bg-brand-cyan/10 border border-brand-cyan/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-brand-cyan shadow-[0_0_15px_rgba(0,255,255,0.2)]">
        <Icon size={32} />
      </div>
      <h3 className="text-2xl font-bold font-heading mb-6">{title}</h3>
      <ul className="space-y-4 mb-8 flex-grow">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle2 size={20} className="text-brand-yellow shrink-0 mt-0.5" />
            <span className="text-sky-light/90 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
      {cta && (
        <button className="w-full py-3 rounded-full border border-brand-cyan text-brand-cyan font-semibold hover:bg-brand-cyan hover:text-brand-navy transition-colors">
          {ctaText}
        </button>
      )}
    </motion.div>
  );
};

const ValueProps = () => {
  return (
    <div className="py-32 px-4 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-stretch">
        <Card 
          title="For Attendees" 
          icon={PartyPopper}
          delay={0}
          items={[
            "Shop unique finds from local creators",
            "Live music and curated DJ sets",
            "Professional photo booth opportunities",
            "Raffles, freebies & exclusive prizes",
            "Every purchase supports small biz"
          ]}
          cta={true}
          ctaText="Get Tickets ($5)"
        />
        <Card 
          title="For Vendors" 
          icon={Briefcase}
          delay={0.2}
          items={[
            "150-300 targeted shoppers guaranteed",
            "Professional photos & videos of booth",
            "3+ social media features",
            "Custom promo flyers with your logo",
            "10 free guest tickets for your network"
          ]}
          cta={true}
          ctaText="Apply ($150)"
        />
        <Card 
          title="For Venues" 
          icon={Building2}
          delay={0.4}
          items={[
            "Free high-quality content generation",
            "150+ visitors driving community buzz",
            "Turnkey event management by our team",
            "New audience demographic exposure",
            "Partnership opportunities"
          ]}
          cta={true}
          ctaText="Partner With Us"
        />
      </div>
    </div>
  );
};

export default ValueProps;
