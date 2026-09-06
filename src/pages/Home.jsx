import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import CtaBand from '../components/CtaBand';
import { ContactLink } from '../components/ContactLink';
import { useSiteContent } from '../content/SiteContentProvider';

function Ticker({ services }) {
  const seq = services.map((s, i) => (
    <span key={i} className="tk">{s.name}<span className="tkp">+</span></span>
  ));
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <div className="tk-set">{seq}</div>
        <div className="tk-set" aria-hidden="true">{seq}</div>
      </div>
    </div>
  );
}

function CapRows({ services }) {
  return (
    <div>
      {services.slice(0, 6).map((s, i) => (
        <Reveal as={Link} className="srow" key={s.slug} delay={i * 0.05} to={`/services/${s.slug}`}>
          <span className="no">{s.no}</span>
          <span><h3>{s.name}</h3><p>{(s.desc || '').split('—')[0].split('.')[0]}.</p></span>
          <Icon id="i-up-right" />
        </Reveal>
      ))}
    </div>
  );
}

function ProcessSteps({ steps }) {
  return (
    <div>
      {steps.map((st, i) => (
        <Reveal className="step" key={st.no} delay={i * 0.06}>
          <div className="step-no">{st.no}</div>
          <div><h3>{st.title}</h3><p>{st.text}</p></div>
        </Reveal>
      ))}
    </div>
  );
}

function FactsBand({ data, uiLabel }) {
  const facts = data.facts || [];
  return (
    <div className="band on-navy">
      <svg className="topo-deco" style={{ right: -120, top: -90, width: 560, height: 560 }} aria-hidden="true"><use href="#topo" /></svg>
      <div className="wrap sec">
        <div className="band-grid">
          <Reveal>
            <p className="kick">{data.kick}</p>
            <h2>{data.title}</h2>
            <p className="lead">{data.lead}</p>
            <Link className="tlink" to="/about">{uiLabel} <Icon id="i-arrow-r" /></Link>
          </Reveal>
          <div>
            {facts.map((f, i) => (
              <Reveal className="fact" key={f.b} delay={i * 0.05}>
                <b>{f.b}</b><span>{f.text}</span>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="band-photo" as="figure">
          <div className="ph"><img loading="lazy" src={data.photoUrl} alt={data.caption} width="1500" height="620" /></div>
          <figcaption>{data.caption}</figcaption>
        </Reveal>
      </div>
    </div>
  );
}

export default function Home() {
  const { getPage } = useSiteContent();
  const page = getPage('home');
  const sitewide = getPage('sitewide');
  const ui = sitewide.ui || {};
  const nav = sitewide.nav || {};

  const hero = page.hero || {};
  const caps = page.capabilities || {};
  const process = page.process || {};
  const factsBand = page.factsBand || {};
  const cta = page.ctaBand || {};
  const featured = page.featuredServices?.items || [];

  const site = getPage('sitewide');
  const servicesData = getPage('services');
  const servicesList = servicesData.list?.items || [];

  return (
    <Page id="home" label={site.seoTitles?.['/'] || 'Home'}>
      <div className="hero grid-bg">
        <svg className="topo-deco" style={{ left: -90, top: -70, width: 520, height: 520 }} aria-hidden="true"><use href="#topo" /></svg>
        <div className="wrap">
          <div>
            <Reveal as="p" className="kick">{hero.kick}</Reveal>
            <Reveal as="h1" delay={0.06}>{hero.title}<span className="hl">{hero.titleHl}</span>{hero.titleRest}</Reveal>
            <Reveal as="p" className="lead" delay={0.12}>{hero.lead}</Reveal>
            <Reveal className="hero-cta" delay={0.18}>
              <Link className="btn btn-p" to="/contact">{ui.btnQuote} <Icon id="i-arrow-r" /></Link>
              <Link className="btn btn-g" to="/services">{ui.btnServices} <Icon id="i-arrow-r" /></Link>
            </Reveal>
          </div>
          <Reveal className="hero-viz" delay={0.15}>
            <div className="viz-frame" aria-hidden="true"></div>
            <figure className="ph cross">
              <img src={hero.heroImage} alt={hero.heroImgAlt} width="920" height="1080" fetchpriority="high" />
            </figure>
            <div className="spec-card" aria-label="Capability summary">
              <h3>{hero.specTitle}{site.brand?.short || 'SRS'}</h3>
              <div className="spec-row"><span>{hero.spec1}</span><i>{hero.spec1label}</i></div>
              <div className="spec-row"><span>{hero.spec2}</span><i>{hero.spec2label}</i></div>
              <div className="spec-row"><span>{hero.spec3}</span><i>{hero.spec3label}</i></div>
            </div>
          </Reveal>
        </div>
      </div>

      <Ticker services={featured} />

      <div className="sec">
        <div className="wrap caps">
          <Reveal className="caps-left">
            <p className="kick">{caps.kick}</p>
            <h2>{caps.title}</h2>
            <p>{caps.desc}</p>
            <Link className="tlink" to="/services">{nav.viewAll} {servicesList.length} {nav.services.toLowerCase()} <Icon id="i-arrow-r" /></Link>
          </Reveal>
          <CapRows services={servicesList} />
        </div>
      </div>

      <div className="proc sec">
        <div className="wrap proc-grid">
          <Reveal className="proc-left">
            <p className="kick">{process.kick}</p>
            <h2>{process.title}</h2>
            <p>{process.desc}</p>
          </Reveal>
          <ProcessSteps steps={process.steps || []} />
        </div>
      </div>

      <FactsBand data={factsBand} uiLabel={ui.btnMoreAbout} />

      <CtaBand
        data={cta}
        actions={[
          <Link key="q" className="btn btn-p" to="/contact">{ui.btnQuote}</Link>,
          <ContactLink key="c" type="call" className="btn btn-g">{ui.btnCall}</ContactLink>
        ]}
      />
    </Page>
  );
}