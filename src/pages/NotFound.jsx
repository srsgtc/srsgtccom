import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Reveal from '../components/Reveal';
import Icon from '../components/Icon';

export default function NotFound() {
  return (
    <Page id="notfound" label="Page not found">
        <div className="phero grid-bg">
          <div className="wrap">
            <Reveal as="p" className="kick">404 — PAGE NOT FOUND</Reveal>
            <Reveal as="h1" delay={0.06}>That page doesn't exist.</Reveal>
            <Reveal as="p" className="lead" delay={0.12}>
              The page you're looking for may have moved or never existed. Head back to the homepage to explore our geotechnical and soil testing services.
            </Reveal>
            <Reveal className="hero-cta" delay={0.18}>
              <Link className="btn btn-p" to="/">Back to Home <Icon id="i-arrow-r" /></Link>
              <Link className="btn btn-g" to="/services">Explore Services <Icon id="i-arrow-r" /></Link>
            </Reveal>
          </div>
        </div>
      </Page>
  );
}
