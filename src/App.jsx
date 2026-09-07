import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SvgSprite from './components/SvgSprite';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBar from './components/MobileBar';
import BackToTop from './components/BackToTop';
import { ToastProvider } from './components/Toast';
import SeoHead from './components/SeoHead';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { supabaseKeepAlive } from './supabase';

const Admin = lazy(() => import('./admin/Admin'));

export default function App() {
  const location = useLocation();

  useEffect(() => {
    supabaseKeepAlive();
    const interval = setInterval(() => {
      supabaseKeepAlive();
    }, 24 * 60 * 60 * 1000); // 24 hours
    return () => clearInterval(interval);
  }, []);

  if (location.pathname.startsWith('/admin')) {
    return (
      <Suspense fallback={<div style={{ padding: 40, fontFamily: 'sans-serif' }}>Loading Admin...</div>}>
        <Admin />
      </Suspense>
    );
  }

  const knownRoutes = ['/', '/about', '/services', '/projects', '/contact'];
  const isUnknown = !knownRoutes.some(p =>
    location.pathname === p ||
    (p !== '/' && location.pathname.startsWith(p + '/'))
  );

  return (
    <ToastProvider>
      <SeoHead path={location.pathname} noindex={isUnknown} />
      <ScrollToTop />
      <a className="skip" href="#main">Skip to main content</a>
      <SvgSprite />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileBar />
      <BackToTop />
    </ToastProvider>
  );
}