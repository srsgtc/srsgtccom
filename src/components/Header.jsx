import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon';
import { ContactLink } from './ContactLink';
import { useSiteContent } from '../content/SiteContentProvider';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' }
];

function Brand({ onNav, brandData }) {
  return (
    <Link className="brand" to="/" onClick={onNav} aria-label={`${brandData.name} — Home`}>
      <img className="brand-mark" src="/logo.png" alt="SRS Geotech & Construction" />
      <span className="brand-txt"><b>{brandData.short}</b><span>{brandData.sub}</span></span>
    </Link>
  );
}

export default function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const firstLinkRef = useRef(null);

  const { getPage } = useSiteContent();
  const sitewide = getPage('sitewide');
  const brand = sitewide.brand || {};
  const topbar = sitewide.topbar || {};
  const nav = sitewide.nav || {};
  const ui = sitewide.ui || {};

  const a = (path) => pathname === path ? 'act' : '';
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const toggleMenu = () => {
    setOpen(o => {
      const next = !o;
      if (next) setTimeout(() => firstLinkRef.current?.focus(), 0);
      return next;
    });
  };

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>{topbar.leftText}</span>
          <span>{topbar.rightText}</span>
        </div>
      </div>

      <header className={`hdr${scrolled ? ' scrolled' : ''}`} id="hdr">
        <div className="wrap hdr-in">
          <Brand onNav={close} brandData={brand} />
          <nav className="nav" aria-label="Primary">
            <NavLink to="/" className={a('/')}>{nav.home}</NavLink>
            <NavLink to="/about" className={a('/about')}>{nav.about}</NavLink>
            <NavLink to="/services" className={pathname.startsWith('/services') ? 'act' : ''}>{nav.services}</NavLink>
            <NavLink to="/projects" className={a('/projects')}>{nav.projects}</NavLink>
            <NavLink to="/contact" className={a('/contact')}>{nav.contact}</NavLink>
          </nav>
          <div className="hdr-cta">
            <ContactLink type="call" className="hbtn" aria-label={`Call ${brand.name}`}>
              <Icon id="i-phone" />
            </ContactLink>
            <Link className="btn btn-p btn-sm" to="/contact">{ui.btnQuote} <Icon id="i-arrow-r" /></Link>
            <button
              className="hbtn burger"
              aria-expanded={open}
              aria-controls="mnav"
              aria-label="Open menu"
              onClick={toggleMenu}
            >
              <Icon id="i-menu" />
            </button>
          </div>
        </div>
      </header>

      <div className={`mnav${open ? ' open' : ''}`} id="mnav" aria-label="Mobile menu">
        <div className="mnav-top">
          <Brand onNav={close} brandData={brand} />
          <button className="hbtn" aria-label="Close menu" onClick={close} style={{ borderColor: 'var(--navy-line)', color: '#fff' }}>
            <Icon id="i-x" />
          </button>
        </div>
        <nav className="mnav-links" aria-label="Mobile primary">
          <Link to="/" className={a('/')} onClick={close}><i>01</i>{nav.home}</Link>
          <Link to="/about" className={a('/about')} onClick={close}><i>02</i>{nav.about}</Link>
          <Link to="/services" className={pathname.startsWith('/services') ? 'act' : ''} onClick={close}><i>03</i>{nav.services}</Link>
          <Link to="/projects" className={a('/projects')} onClick={close}><i>04</i>{nav.projects}</Link>
          <Link to="/contact" className={a('/contact')} onClick={close}><i>05</i>{nav.contact}</Link>
        </nav>
        <div className="mnav-cta">
          <ContactLink type="call" className="btn btn-l"><Icon id="i-phone" />{ui.btnCall}</ContactLink>
          <Link className="btn btn-p" to="/contact" onClick={close}>{ui.btnQuote}</Link>
        </div>
      </div>
    </>
  );
}