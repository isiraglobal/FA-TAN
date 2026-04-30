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

function ScrollSetup() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Standard browser scroll reset
    window.scrollTo(0, 0);
    
    // Lenis smooth scroll setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    // Immediate scroll reset for Lenis
    lenis.scrollTo(0, { immediate: true });
    
    requestAnimationFrame(raf);

    return () => lenis.destroy();
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
          </Routes>
          <Footer />
        </div>
    </Router>
  );
}
