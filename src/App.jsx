import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundClouds from './components/BackgroundClouds';

import Home from './pages/Home';
import Vendors from './pages/Vendors';
import Attendees from './pages/Attendees';
import Venues from './pages/Venues';
import Cities from './pages/Cities';
import Legal from './pages/Legal';
import Success from './pages/Success';
import Contact from './pages/Contact';

// Global scroll manager to handle Lenis and Scroll-to-Top
let lenisInstance = null;

function ScrollSetup() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Initialize Lenis only once
    if (!lenisInstance) {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
      });

      function raf(time) {
        lenisInstance?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // 2. On route change, aggressively reset scroll
    // Delay slightly to ensure DOM is ready
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true });
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollSetup />
      <Cursor />
      
      <div className="relative w-full min-h-screen overflow-x-hidden text-white selection:bg-white/30 selection:text-white font-light">
        <BackgroundClouds />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/attendees" element={<Attendees />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/success" element={<Success />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </div>
    </Router>
  );
}
