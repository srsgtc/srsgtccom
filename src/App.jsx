import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import SvgSprite from './components/SvgSprite';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBar from './components/MobileBar';
import BackToTop from './components/BackToTop';
import { ToastProvider } from './components/Toast';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { useSiteContent } from './content/SiteContentProvider';
import { supabaseKeepAlive } from './supabase';

const Admin = lazy(() => import('./admin/Admin'));

function usePageTitle() {
  const { pathname } = useLocation();
  const { getPage } = useSiteContent();
  const titles = getPage('sitewide').seoTitles || {};

  useEffect(() => {
    const key = pathname.startsWith('/services') ? '/services' : pathname;
    document.title = titles[key] || titles['/'] || 'SRS Geotech & Construction';
  }, [pathname, titles]);
}

export default function App() {
  usePageTitle();
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

  return (
    <ToastProvider>
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <MobileBar />
      <BackToTop />
    </ToastProvider>
  );
}