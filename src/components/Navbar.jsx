import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Search, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'FOR VENDORS', path: '/vendors' },
    { name: 'FOR ATTENDEES', path: '/attendees' },
    { name: 'FOR VENUES', path: '/venues' },
    { name: 'CITIES', path: '/cities' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1 }}
        className="fixed top-0 left-0 w-full z-[100] px-6 py-4 md:px-12 md:py-6 flex items-center justify-between bg-black/5 backdrop-blur-[60px] border-b border-white/10 shadow-2xl"
      >
        <div className="flex items-center gap-12">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:scale-110 transition-transform">
            <Cloud className="w-8 h-8 text-white stroke-[1.5]" />
          </Link>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold tracking-[0.3em] text-white">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} current={location.pathname === link.path}>
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-white hover:scale-110 transition-transform hidden md:block">
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>
          
          {/* Hamburger Icon */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white relative z-[101]"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-[#061530] flex flex-col items-center justify-center p-8 lg:hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0690d4]/10 rounded-full blur-[120px]"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="flex flex-col items-center gap-10 z-10">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-medium tracking-[0.2em] transition-colors ${
                      location.pathname === link.path ? 'text-white' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-20 z-10"
            >
              <Link to="/vendors" onClick={() => setIsOpen(false)}>
                <button className="px-10 py-4 bg-white text-[#061530] font-bold rounded-2xl tracking-[0.2em] text-[10px] uppercase shadow-2xl">
                  BECOME A VENDOR
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ to, children, current }) {
  return (
    <Link to={to} className={`relative group transition-colors ${current ? 'text-white' : 'text-white/60 hover:text-white'}`}>
      {children}
      <span className={`absolute -bottom-2 left-0 w-full h-[1.5px] bg-[#0077b6] transform origin-left transition-transform duration-500 ${current ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
    </Link>
  );
}
