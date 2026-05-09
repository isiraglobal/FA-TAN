import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';

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
const BackgroundClouds = lazy(() => import('./components/BackgroundClouds'));

// Global scroll manager
let lenisInstance = null;

function ScrollSetup() {
  const { pathname } = useLocation();

  useEffect(() => {
    let active = true;
    let frameId = null;
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    const shouldUseLenis = !isMobile;

    if (!lenisInstance && shouldUseLenis) {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false,
      });

      function raf(time) {
        if (!active) return;
        lenisInstance?.raf(time);
        frameId = requestAnimationFrame(raf);
      }

      frameId = requestAnimationFrame(raf);
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

    return () => {
      active = false;
      if (frameId) cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
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
        <ErrorBoundary fallback={
          // Flat background colour — visually identical to the scene without clouds
          <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundColor: '#0690d4' }} />
        }>
          <Suspense fallback={null}>
            <BackgroundClouds />
          </Suspense>
        </ErrorBoundary>
        <Navbar />
        <Suspense fallback={
          <div className="min-h-screen bg-[#061530] flex items-center justify-center">
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0077b6] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0077b6] animate-bounce" style={{ animationDelay: '120ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0077b6] animate-bounce" style={{ animationDelay: '240ms' }} />
            </div>
          </div>
        }>
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}
