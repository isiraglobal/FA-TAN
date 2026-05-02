import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackgroundClouds from './components/BackgroundClouds';
import LoadingScreen from './components/LoadingScreen';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Vendors = lazy(() => import('./pages/Vendors'));
const Attendees = lazy(() => import('./pages/Attendees'));
const Venues = lazy(() => import('./pages/Venues'));
const Cities = lazy(() => import('./pages/Cities'));
const Legal = lazy(() => import('./pages/Legal'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Success = lazy(() => import('./pages/Success'));
const Contact = lazy(() => import('./pages/Contact'));

// Global scroll manager
let lenisInstance = null;

function ScrollSetup() {
  const { pathname } = useLocation();

  useEffect(() => {
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

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      if (lenisInstance) {
        if (pathname === '/') {
          lenisInstance.destroy();
          lenisInstance = null;
        } else {
          lenisInstance.scrollTo(0, { immediate: true });
        }
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <div className="relative w-full bg-[#061530] text-white font-light">
        <LoadingScreen />
        <ScrollSetup />
        <Cursor />
        <BackgroundClouds />
        <Navbar />
        <Suspense fallback={<div className="min-h-screen bg-[#061530]" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/attendees" element={<Attendees />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/success" element={<Success />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}
