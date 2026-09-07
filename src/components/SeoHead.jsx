import { Helmet } from 'react-helmet-async';
import { useSiteContent } from '../content/SiteContentProvider';

const SITE_URL = 'https://srsgeotech.com';
const DEFAULT_OG = `${SITE_URL}/og-image.jpg`;

function trim(s, n) {
  if (!s) return '';
  const t = String(s).replace(/\s+/g, ' ').trim();
  return t.length > n ? t.slice(0, n - 1) + '…' : t;
}

function processPath(path) {
  if (path.startsWith('/services/')) return '/services';
  if (path.startsWith('/admin')) return null;
  return path;
}

export default function SeoHead({ path, noindex }) {
  const { getPage } = useSiteContent();
  const site = getPage('sitewide') || {};
  const brand = site.brand || {};
  const contact = site.contact || {};
  const seo = getPage('seo') || {};
  const services = getPage('services').list?.items || [];

  const route = processPath(path);
  if (route === null) return null;

  const seoEntry = seo[route] || {};
  const title = seoEntry.title || brand.name || 'SRS Geotech & Construction';
  const description = seoEntry.description
    || 'SRS Geotech & Construction provides geotechnical, soil testing and construction services in Raigad, Maharashtra.';
  const ogImage = seoEntry.ogImage || seo.ogImage || DEFAULT_OG;
  const canonical = `${SITE_URL}${path === '/' ? '' : path}`;
  const ogUrl = `${SITE_URL}${path === '/' ? '' : path}`;

  const trTitle = trim(title, 60);
  const trDesc = trim(description, 155);
  const brandName = brand.name || 'SRS Geotech & Construction';
  const phone = contact.phoneHref ? contact.phoneHref.replace(/[^0-9+]/g, '') : '';
  const email = contact.email || '';
  const fullLoc = brand.locationFull || 'Raigad, Maharashtra, India';

  const currentLabel = {
    '/about': 'About SRS Geotech & Construction',
    '/services': 'Geotechnical & Soil Testing Services',
    '/projects': 'Projects & Field Gallery',
    '/contact': 'Contact & Request a Quote'
  }[route] || 'Home';

  const breadcrumbItems = route === '/'
    ? null
    : [
        { name: 'Home', path: '/' },
        { name: currentLabel, path: route }
      ];

  const jsonLd = [];

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: brandName,
    description: trDesc,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: ogImage,
    foundingDate: brand.established || '2021',
    legalName: brand.name || 'SRS Geotech & Construction',
    founder: { '@type': 'Person', name: brand.owner || 'S Singh' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Raigad',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN'
    },
    areaServed: 'Raigad, Maharashtra',
    geo: { '@type': 'GeoCoordinates', latitude: 18.9748, longitude: 73.0237 },
    knowsAbout: services.map(s => s.name)
  };
  if (phone) localBusiness.telephone = phone;
  if (email) localBusiness.email = email;
  jsonLd.push(localBusiness);

  if (route !== '/' && breadcrumbItems) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: `${SITE_URL}${b.path === '/' ? '' : b.path}`
      }))
    });
  }

  if (route === '/services') {
    services
      .filter(s => !['gis-testing', 'topographic-survey'].includes(s.slug))
      .forEach(s => {
        jsonLd.push({
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: s.name,
          description: trim(s.desc, 200),
          provider: { '@type': 'LocalBusiness', name: brandName },
          areaServed: 'Raigad, Maharashtra, India'
        });
      });
  }

  if (route === '/') {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: brandName,
      url: SITE_URL,
      description: trDesc
    });
  }

  return (
    <Helmet>
      <title>{trTitle}</title>
      <meta name="description" content={trDesc} />
      {noindex ? (
        <>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
        </>
      ) : (
        <>
          <link rel="canonical" href={canonical} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={brandName} />
          <meta property="og:locale" content="en_IN" />
          <meta property="og:title" content={trTitle} />
          <meta property="og:description" content={trDesc} />
          <meta property="og:url" content={ogUrl} />
          <meta property="og:image" content={ogImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={trTitle} />
          <meta name="twitter:description" content={trDesc} />
          <meta name="twitter:image" content={ogImage} />
        </>
      )}
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
}
