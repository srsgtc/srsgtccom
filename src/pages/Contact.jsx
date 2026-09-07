import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import PageHero from '../components/PageHero';
import { useContactHref } from '../components/ContactLink';
import { useToast } from '../components/Toast';
import { useSiteContent } from '../content/SiteContentProvider'; const VALIDATORS = {
  name: v => v.trim().length >= 2,
  phone: v => /^(\+?91[\s-]?)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, '')),
  email: v => v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  service: v => v !== ''
};

function groupServices(services, catsDict) {
  const groups = {};
  services.forEach(s => { (groups[catsDict[s.cat]] ||= []).push(s); });
  return groups;
}

function ContactLines() {
  const { getPage } = useSiteContent();
  const CONTACT = getPage('sitewide').contact || {};
  const callHref = useContactHref('call');
  const waHref = useContactHref('whatsapp');
  const emailHref = useContactHref('email');

  const rows = [];
  if (CONTACT.phone) rows.push({ ic: 'i-phone', label: 'Call', val: CONTACT.phone, href: callHref });
  if (CONTACT.whatsapp) rows.push({ ic: 'i-wa', label: 'WhatsApp', val: CONTACT.phone || 'Chat with us', href: waHref, ext: 1 });
  if (CONTACT.email) rows.push({ ic: 'i-mail', label: 'Email', val: CONTACT.email, href: emailHref });

  return (
    <div>
      {rows.length ? rows.map(r => (
        <a className="cline" key={r.label} href={r.href} {...(r.ext ? { target: '_blank', rel: 'noopener' } : {})}>
          <Icon id={r.ic} />
          <span><b>{r.label}</b><i>{r.val}</i></span>
          <Icon id="i-up-right" className="ic arr" />
        </a>
      )) : (
        <p className="cnote">{getPage('sitewide').sidebar?.noDirectContactMsg}</p>
      )}
    </div>
  );
}

const BAMANDONGRI = [18.9748, 73.0237];

function MapPin() {
  return L.divIcon({
    className: 'cm-pin',
    html: `<svg viewBox="0 0 24 24" width="46" height="46" aria-hidden="true">
      <path d="M12 0C7 0 3 4 3 9c0 7 9 15 9 15s9-8 9-15c0-5-4-9-9-9Z" fill="#E85D04" stroke="#0F2A43" stroke-width="2"/>
      <circle cx="12" cy="9" r="3.4" fill="#fff"/>
    </svg>`,
    iconSize: [46, 46],
    iconAnchor: [23, 46],
    popupAnchor: [0, -42]
  });
}

function ContactMap() {
  const mapRef = useRef(null);
  const { getPage } = useSiteContent();
  const brand = getPage('sitewide').brand || {};
  const name = brand.name || 'SRS Geotech & Construction';
  const full = brand.locationFull || 'Raigad, Maharashtra, India';

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    const map = L.map(el, { scrollWheelZoom: false }).setView(BAMANDONGRI, 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker(BAMANDONGRI, { icon: MapPin(), title: name, alt: name })
      .addTo(map)
      .bindPopup(`<b>${name}</b><br>${full}`)
      .openPopup();

    return () => map.remove();
  }, [name, full]);

  return (
    <div className="contact-map" aria-label={`Map showing ${full}`} ref={mapRef} />
  );
}

function QuoteForm() {
  const toast = useToast();
  const formRef = useRef(null);
  const cardRef = useRef(null);
  const doneRef = useRef(null);
  const doneTxtRef = useRef(null);
  const nameRef = useRef(null);
  const [sent, setSent] = useState(false);
  const [bad, setBad] = useState({});

  const setErr = (f, isBad) => {
    setBad(b => ({ ...b, [f]: isBad }));
  };

  const onInput = e => {
    const fld = e.target.closest('.fld');
    if (fld) {
      const f = fld.dataset.f;
      setBad(b => ({ ...b, [f]: false }));
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const form = formRef.current;
    const data = Object.fromEntries(new FormData(form));
    let firstBad = null;
    const next = {};
    Object.keys(VALIDATORS).forEach(f => {
      const ok = VALIDATORS[f](data[f] || '');
      next[f] = !ok;
      if (!ok && !firstBad) firstBad = f;
    });
    setBad(next);
    if (firstBad) {
      const el = form.querySelector(`[data-f="${firstBad}"] input, [data-f="${firstBad}"] select`);
      el?.focus();
      return;
    }
    try {
      const store = JSON.parse(localStorage.getItem('srs-quotes') || '[]');
      store.push({ ...data, at: new Date().toISOString() });
      localStorage.setItem('srs-quotes', JSON.stringify(store));
    } catch (_) { }
    if (doneTxtRef.current) {
      doneTxtRef.current.textContent = `Thank you, ${data.name.trim().split(' ')[0]} — your request for “${data.service}” has been noted. We'll reach out on ${data.phone} to discuss scope and scheduling.`;
    }
    setSent(true);
    setTimeout(() => doneRef.current?.focus(), 0);
    toast(formConf.toastSuccess);
  };

  const again = () => {
    formRef.current?.reset();
    setSent(false);
    nameRef.current?.focus();
  };

  const fldClass = f => (bad[f] ? 'fld bad' : 'fld');

  const errVisible = f => bad[f] ? 'block' : 'none';

  const { getPage } = useSiteContent();
  const services = getPage('services').list?.items || [];
  const catsList = getPage('services').categories?.cats || [];
  const catsDict = Object.fromEntries(catsList.map(c => [c.key, c.label]));
  const formConf = getPage('sitewide').form || {};

  const groups = groupServices(services, catsDict);

  return (
    <div className={`form-card cross${sent ? ' sent' : ''}`} id="formCard" ref={cardRef}>
      <div className="frm-head">
        <h2>Request a quote</h2>
        <p>Fields marked <em style={{ color: 'var(--orange-ink)', fontStyle: 'normal' }}>*</em> are required.</p>
      </div>
      <form id="quoteForm" ref={formRef} onSubmit={onSubmit} onInput={onInput} noValidate>
        <div className="frow">
          <div className={fldClass('name')} data-f="name">
            <label htmlFor="f-name">{formConf.fLabelName} <em>*</em></label>
            <input id="f-name" name="name" type="text" autoComplete="name" required ref={nameRef}
              aria-invalid={bad.name || undefined} aria-describedby={bad.name ? 'e-name' : undefined} />
            <p className="err" id="e-name" style={{ display: errVisible('name') }}>{formConf.errRequired}</p>
          </div>
          <div className={fldClass('phone')} data-f="phone">
            <label htmlFor="f-phone">{formConf.fLabelPhone} <em>*</em></label>
            <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={formConf.fSubPhone} required
              aria-invalid={bad.phone || undefined} aria-describedby={bad.phone ? 'e-phone' : undefined} />
            <p className="err" id="e-phone" style={{ display: errVisible('phone') }}>{formConf.errPhone}</p>
          </div>
        </div>
        <div className="frow">
          <div className={fldClass('email')} data-f="email">
            <label htmlFor="f-email">{formConf.fLabelEmail} <span style={{ color: 'var(--muted)', letterSpacing: '.06em' }}>(optional)</span></label>
            <input id="f-email" name="email" type="email" autoComplete="email"
              aria-invalid={bad.email || undefined} aria-describedby={bad.email ? 'e-email' : undefined} />
            <p className="err" id="e-email" style={{ display: errVisible('email') }}>{formConf.errEmail}</p>
          </div>
          <div className="fld" data-f="site">
            <label htmlFor="f-site">{formConf.fLabelLocation}</label>
            <input id="f-site" name="site" type="text" autoComplete="off" placeholder="Village, taluka, district" />
          </div>
        </div>
        <div className={fldClass('service')} data-f="service">
          <label htmlFor="f-service">{formConf.fLabelServices} <em>*</em></label>
          <select id="f-service" name="service" required
            aria-invalid={bad.service || undefined} aria-describedby={bad.service ? 'e-service' : undefined}>
            <option value="">Select a service…</option>
            {Object.entries(groups).map(([g, list]) => (
              <optgroup key={g} label={g}>
                {list.map(s => <option key={s.slug} value={s.name}>{s.no} — {s.name}</option>)}
              </optgroup>
            ))}
            <option value="Multiple / other services">11 — Multiple / other services</option>
          </select>
          <p className="err" id="e-service" style={{ display: errVisible('service') }}>{formConf.errRequired}</p>
        </div>
        <div className="fld" data-f="msg">
          <label htmlFor="f-msg">{formConf.fLabelReq}</label>
          <textarea id="f-msg" name="msg" placeholder="Structure type, stage, expected start date, tests discussed…"></textarea>
        </div>
        <button className="btn btn-p" type="submit">{sent ? formConf.btnSending : formConf.btnSubmit} <Icon id="i-arrow-r" /></button>
        <p className="frm-note">Your details are used only to prepare and send your quotation.</p>
      </form>
      <div className="done" id="formDone" role="status" tabIndex={-1} ref={doneRef}>
        <div className="ok-ic"><Icon id="i-check" /></div>
        <h3>Request received.</h3>
        <p id="doneTxt" ref={doneTxtRef}>Thank you — we&apos;ll get back to you shortly.</p>
        <button className="btn btn-g btn-sm" type="button" id="againBtn" onClick={again}>Send another request</button>
      </div>
    </div>
  );
}

export default function Contact() {
  const { getPage } = useSiteContent();
  const pageContent = getPage('contact');
  const hero = pageContent.hero || {};
  const sidebar = pageContent.sidebar || {};
  const sitewide = getPage('sitewide');
  const brand = sitewide.brand || {};
  const seoPage = getPage('seo')['/contact'] || {};

  return (
    <Page id="contact" label={seoPage.title || 'Contact'}>
      <PageHero
        kick={hero.kick}
        title={hero.title}
        lead={hero.lead}
        idx="05"
      />

      <div className="sec">
        <div className="wrap">
          <div className="cgrid">
            <Reveal><QuoteForm /></Reveal>
            <Reveal delay={0.08}>
              <aside className="side-card on-navy" aria-label="Direct contact details">
                <svg className="topo-deco" style={{ right: -110, bottom: -120, width: 340, height: 340 }} aria-hidden="true"><use href="#topo" /></svg>
                <h2>{sidebar.title}</h2>
                <p>{sidebar.sub}</p>
                <ContactLines />
                <div className="cfacts">
                  <div><Icon id="i-pin" /><span><b>Location</b>{brand.locationFull}</span></div>
                  <div><img className="brand-mark-ic" src="/logo.png" alt={brand.name} /><span><b>Proprietor</b>{brand.owner} — Proprietorship, est. {brand.established}</span></div>
                </div>
              </aside>
            </Reveal>
          </div>

          <Reveal className="smap-wrap">
            <p className="kick" style={{ marginBottom: 16 }}>{sidebar.mapLabel}{brand.location}</p>
            <ContactMap />
          </Reveal>
        </div>
      </div>
    </Page>
  );
}