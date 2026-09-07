import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import { useSiteContent } from '../content/SiteContentProvider';

export default function About() {
  const { getPage } = useSiteContent();
  const page = getPage('about');
  const hero = page.hero || {};
  const story = page.story || {};
  const principles = page.principles || {};
  const team = page.team || {};
  const cta = page.ctaBand || {};

  const site = getPage('sitewide');
  const ui = site.ui || {};
  const profileList = story.profile || [];
  const principlesList = principles.list || [];
  const functionsList = team.functions || [];
  const seoPage = getPage('seo')['/about'] || {};

  return (
    <Page id="about" label={seoPage.title || 'About us'}>
      <PageHero
        kick={hero.kick}
        title={hero.title}
        lead={hero.lead}
        idx="02"
      />

      <div className="sec">
        <div className="wrap story">
          <Reveal className="story-left">
            <p className="kick">{story.kick}</p>
            <h2>{story.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lead">{story.p1}</p>
            <p className="body">{story.p2}</p>
            <p className="body">{story.p3}</p>
            <dl className="spec" aria-label="Company profile">
              {profileList.map((p) => (
                <div key={p.dt}><dt>{p.dt}</dt><dd>{p.dd}</dd></div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      <div className="principles sec">
        <div className="wrap">
          <Reveal className="shead">
            <div>
              <p className="kick">{principles.kick}</p>
              <h2>{principles.title}</h2>
            </div>
          </Reveal>
          {principlesList.map((p, i) => (
            <Reveal className="prow" key={p.no} delay={i * 0.05}>
              <span className="no">{p.no}</span><h3>{p.title}</h3><p>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="sec">
        <div className="wrap team">
          <Reveal className="team-viz">
            <figure className="ph cross">
              <img loading="lazy" src={team.terrainPhoto} alt="Topographic terrain of the kind mapped during geotechnical survey work" width="1000" height="880" />
            </figure>
            <figure className="ph small">
              <img loading="lazy" src={team.fieldPhoto} alt="Sampling and testing equipment prepared for field deployment" width="620" height="760" />
            </figure>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="founder">
              <p className="role">{team.proprietorRole}</p>
              <h3>{team.proprietorName}</h3>
              <p>{team.proprietorBio}</p>
            </div>
            <p style={{ marginTop: 26, color: 'var(--muted)', maxWidth: '52ch' }}>{team.teamDesc}</p>
            <div className="team-fns" aria-label="Team functions">
              {functionsList.map(f => <span className="fn" key={f.name}>{f.name}</span>)}
            </div>
          </Reveal>
        </div>
      </div>

      <CtaBand
        data={cta}
        actions={[
          <Link key="q" className="btn btn-p" to="/contact">{ui.btnQuote}</Link>,
          <Link key="v" className="btn btn-l" to="/services">{ui.btnServices}</Link>
        ]}
      />
    </Page>
  );
}