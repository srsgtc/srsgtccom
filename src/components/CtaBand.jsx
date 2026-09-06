import Reveal from './Reveal';

export default function CtaBand({ kick, title, text, actions }) {
  return (
    <div className="cta on-navy">
      <div className="hz" aria-hidden="true"></div>
      <div className="wrap">
        <Reveal>
          <p className="kick">{kick}</p>
          <h2>{title}</h2>
          <p>{text}</p>
        </Reveal>
        <Reveal className="cta-acts" delay={0.1}>
          {actions}
        </Reveal>
      </div>
    </div>
  );
}