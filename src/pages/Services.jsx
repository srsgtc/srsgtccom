import { useEffect, useRef, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Page from '../components/Page';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import PageHero from '../components/PageHero';
import ChipGroup from '../components/ChipGroup';
import CtaBand from '../components/CtaBand';
import { ContactLink } from '../components/ContactLink';
import { useSiteContent } from '../content/SiteContentProvider';

export default function Services() {
  const { slug } = useParams();
  const [filter, setFilter] = useState('all');
  const [openSlug, setOpenSlug] = useState(null);
  const listRef = useRef(null);

  const { getPage } = useSiteContent();
  const page = getPage('services');
  const sitewide = getPage('sitewide');
  const ui = sitewide.ui || {};
  const hero = page.hero || {};
  const cta = page.ctaBand || {};
  const catsList = page.categories?.cats || [];
  const servicesList = page.list?.items || [];

  const catsDict = Object.fromEntries(catsList.map(c => [c.key, c.label]));

  const chipOptions = useMemo(() => {
    return [
      ['all', 'All', servicesList.length],
      ...catsList.map(c => [c.key, c.label, servicesList.filter(s => s.cat === c.key).length])
    ];
  }, [catsList, servicesList]);

  useEffect(() => {
    setOpenSlug(slug || null);
    if (slug) {
      const t = setTimeout(() => {
        document.getElementById(`acc-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => clearTimeout(t);
    }
  }, [slug]);

  const visible = servicesList.filter(s => filter === 'all' || s.cat === filter);

  const handleFilter = (f) => {
    setFilter(f);
    setOpenSlug(null);
  };

  return (
    <Page id="services" label={sitewide.seoTitles?.['/services'] || 'Services'}>
      <PageHero
        kick={hero.kick}
        title={hero.title}
        lead={hero.lead}
        idx="03"
      />

      <div className="sec">
        <div className="wrap">
          <Reveal>
            <ChipGroup
              options={chipOptions}
              active={filter}
              onSelect={handleFilter}
              ariaLabel="Filter services"
            />
          </Reveal>
          <div ref={listRef}>
            {servicesList.map((s, i) => {
              const open = openSlug === s.slug;
              const show = filter === 'all' || s.cat === filter;
              return (
                <Reveal
                  as="article"
                  key={s.slug}
                  className={`acc${open ? ' open' : ''}`}
                  delay={i * 0.03}
                  style={show ? undefined : { display: 'none' }}
                  id={`acc-${s.slug}`}
                  data-cat={s.cat}
                >
                  <h3 className="acc-h">
                    <button
                      className="acc-btn"
                      id={`accb-${s.slug}`}
                      aria-expanded={open}
                      aria-controls={`accp-${s.slug}`}
                      onClick={() => setOpenSlug(open ? null : s.slug)}
                    >
                      <span className="acc-no mono">{s.no}</span>
                      <span className="acc-name">{s.name}</span>
                      <span className="acc-tag mono">{s.tag}</span>
                      <span className="acc-ic" aria-hidden="true"></span>
                    </button>
                  </h3>
                  <div className="acc-panel" id={`accp-${s.slug}`} role="region" aria-labelledby={`accb-${s.slug}`}>
                    <div><div className="acc-body">
                      <div className="acc-grid">
                        <p>{s.desc}</p>
                        <ul>{(s.pts || '').split('\n').filter(Boolean).map(p => <li key={p}>{p}</li>)}</ul>
                      </div>
                      <Link className="tlink" to="/contact">{ui.btnRequestService} <Icon id="i-arrow-r" /></Link>
                    </div></div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal as="p" className="gal-note">{page.list?.scopeNote}</Reveal>
        </div>
      </div>

      <CtaBand
        data={cta}
        actions={[
          <Link key="q" className="btn btn-p" to="/contact">{ui.btnQuote}</Link>,
          <ContactLink key="wa" type="whatsapp" className="btn btn-l"><Icon id="i-wa" />WhatsApp</ContactLink>
        ]}
      />
    </Page>
  );
}