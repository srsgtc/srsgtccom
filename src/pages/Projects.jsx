import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import PageHero from '../components/PageHero';
import ChipGroup from '../components/ChipGroup';
import CtaBand from '../components/CtaBand';
import { ContactLink } from '../components/ContactLink';
import { useSiteContent } from '../content/SiteContentProvider';

const galleryImg = g => g.url ? g.url : `https://picsum.photos/seed/${g.seed}/${g.w}/${g.h}.jpg`;

function Lightbox({ index, list, onClose, onStep }) {
  const closeRef = useRef(null);
  const returnRef = useRef(document.activeElement);
  const moveRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    moveRef.current = onStep;
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') moveRef.current(-1);
      if (e.key === 'ArrowRight') moveRef.current(1);
      if (e.key === 'Tab') {
        const f = document.querySelectorAll('#lb button');
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const g = list[index];
  if (!g) return null;
  const count = String(index + 1).padStart(2, '0');
  const total = String(list.length).padStart(2, '0');

  return (
    <div className="lb open" id="lb" role="dialog" aria-modal="true" aria-label="Gallery viewer" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="lb-top">
        <span className="lb-count">{count} / {total}</span>
        <button className="lb-x" id="lbClose" ref={closeRef} aria-label="Close viewer" onClick={onClose}><Icon id="i-x" /></button>
      </div>
      <div className="lb-stage"><img id="lbImg" src={galleryImg(g)} alt={g.cap} /></div>
      <div className="lb-cap">
        <span id="lbCap">{g.cap}</span>
        <div className="lb-nav">
          <button id="lbPrev" aria-label="Previous image" onClick={() => onStep(-1)}><Icon id="i-chev-l" /></button>
          <button id="lbNext" aria-label="Next image" onClick={() => onStep(1)}><Icon id="i-chev-r" /></button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [lb, setLb] = useState(null);

  const { getPage } = useSiteContent();
  const page = getPage('projects');
  const hero = page.hero || {};
  const assign = page.assignments || {};
  const cta = page.ctaBand || {};
  const sitewide = getPage('sitewide');
  const ui = sitewide.ui || {};
  const seoPage = getPage('seo')['/projects'] || {};

  const galleryList = page.gallery?.items || [];
  const assignList = assign.list || [];
  const servicesData = getPage('services');
  const catsList = servicesData.categories?.cats || [];

  const catsDict = Object.fromEntries(catsList.map(c => [c.key, c.label]));

  const chipOptions = useMemo(() => {
    return [
      ['all', 'All', galleryList.length],
      ...catsList.map(c => [c.key, c.label, galleryList.filter(g => g.cat === c.key).length])
    ];
  }, [catsList, galleryList]);

  const openLb = idx => {
    const list = galleryList.map((g, i) => ({ ...g, i })).filter(g => filter === 'all' || g.cat === filter);
    const start = Math.max(0, list.findIndex(g => g.i === idx));
    setLb({ list, index: start });
  };

  const step = d => setLb(s => ({ ...s, index: (s.index + d + s.list.length) % s.list.length }));

  return (
    <Page id="projects" label={seoPage.title || 'Projects and gallery'}>
      <PageHero
        kick={hero.kick}
        title={hero.title}
        lead={hero.lead}
        idx="04"
      />

      <div className="sec">
        <div className="wrap">
          <Reveal>
            <ChipGroup
              options={chipOptions}
              active={filter}
              onSelect={setFilter}
              ariaLabel="Filter gallery"
            />
          </Reveal>
          <div className="gal">
            {galleryList.map((g, i) => {
              const hide = filter !== 'all' && g.cat !== filter;
              return (
                <Reveal
                  as="button"
                  key={g.seed || i}
                  className={`gitem ${g.size}${hide ? ' hide' : ''}`}
                  delay={(i % 6) * 0.04}
                  data-cat={g.cat}
                  data-i={i}
                  aria-label={`Open image: ${g.cap}`}
                  onClick={() => openLb(i)}
                >
                  <span className="ph">
                    <img loading="lazy" src={galleryImg(g)} alt={g.cap} width={g.w || 900} height={g.h || 640} />
                  </span>
                  <span className="gcap mono"><b>{String(i + 1).padStart(2, '0')}</b>{catsDict[g.cat] || g.cat}</span>
                </Reveal>
              );
            })}
          </div>
          <Reveal as="p" className="gal-note">{page.gallery?.scopeNote}</Reveal>
        </div>
      </div>

      <div className="assign sec">
        <div className="wrap">
          <Reveal className="shead">
            <div>
              <p className="kick">{assign.kick}</p>
              <h2>{assign.title}</h2>
            </div>
          </Reveal>
          <div className="assign-grid">
            {assignList.map((a, i) => (
              <Reveal className="arow" key={a.no} delay={i * 0.05}>
                <span className="no">{a.no}</span>
                <div><h3>{a.title}</h3><p>{a.text}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <CtaBand
        data={cta}
        actions={[
          <Link key="q" className="btn btn-p" to="/contact">{ui.btnQuote}</Link>,
          <ContactLink key="c" type="call" className="btn btn-g">{ui.btnCall}</ContactLink>
        ]}
      />

      {lb && <Lightbox index={lb.index} list={lb.list} onClose={() => setLb(null)} onStep={step} />}
    </Page>
  );
}