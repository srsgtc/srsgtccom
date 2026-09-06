import { Link } from 'react-router-dom';
import Icon from './Icon';
import { ContactLink } from './ContactLink';
import { useSiteContent } from '../content/SiteContentProvider';

export default function Footer() {
  const year = new Date().getFullYear();
  const { getPage, getSection } = useSiteContent();
  const sitewide = getPage('sitewide');
  const servicesData = getPage('services');

  const brand = sitewide.brand || {};
  const footer = sitewide.footer || {};
  const nav = sitewide.nav || {};
  const servicesList = servicesData.list?.items || [];
  const contact = sitewide.contact || {};

  return (
    <footer className="foot on-navy">
      <svg className="topo-deco" style={{ right: -140, top: -110, width: 520, height: 520 }} aria-hidden="true"><use href="#topo" /></svg>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="brand" to="/">
              <img className="brand-mark" src="/logo.png" alt="SRS Geotech & Construction" />
              <span className="brand-txt"><b>{brand.short}</b><span>{brand.sub}</span></span>
            </Link>
            <p className="foot-blurb">{footer.blurb}</p>
            <div className="foot-tags"><span>{footer.tag1}</span><span>{footer.tag2}</span><span>{footer.tag3}</span></div>
          </div>
          <nav aria-label="Footer pages">
            <h3>{nav.pagesHeading}</h3>
            <ul>
              <li><Link to="/">{nav.home}</Link></li>
              <li><Link to="/about">{nav.about}</Link></li>
              <li><Link to="/services">{nav.services}</Link></li>
              <li><Link to="/projects">{nav.projects}</Link></li>
              <li><Link to="/contact">{nav.contact}</Link></li>
            </ul>
          </nav>
          <nav aria-label="Footer services">
            <h3>{nav.servicesHeading}</h3>
            <ul>
              {servicesList.slice(0, 6).map(s => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}><b>{s.no}</b>{s.name}</Link>
                </li>
              ))}
              <li><Link to="/services" style={{ color: 'var(--orange)' }}>{nav.viewAll} {servicesList.length} →</Link></li>
            </ul>
          </nav>
          <div>
            <h3>{nav.contactHeading}</h3>
            <div className="foot-cfacts">
              <div><Icon id="i-pin" /><span>{brand.locationFull}</span></div>
              <div><Icon id="i-phone" /><span><ContactLink type="call">Call {brand.name}</ContactLink></span></div>
              <div><Icon id="i-wa" /><span><ContactLink type="whatsapp">WhatsApp us</ContactLink></span></div>
              <div><Icon id="i-mail" /><span><ContactLink type="email">Email the office</ContactLink></span></div>
            </div>
          </div>
        </div>
        <div className="foot-bar">
          <span>{footer.barLeft.replace('{year}', year)}</span>
          <span>{footer.barRight}</span>
        </div>
      </div>
    </footer>
  );
}