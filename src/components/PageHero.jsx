import Reveal from './Reveal';

export default function PageHero({ kick, title, lead, idx }) {
  return (
    <div className="phero grid-bg">
      <div className="wrap">
        <Reveal as="p" className="kick">{kick}</Reveal>
        <Reveal as="h1" delay={0.06}>{title}</Reveal>
        <Reveal as="p" className="lead" delay={0.12}>{lead}</Reveal>
        <span className="pg-idx" aria-hidden="true">{idx}</span>
      </div>
    </div>
  );
}