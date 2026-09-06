import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const motionOK = typeof window !== 'undefined'
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : true;

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    const onScroll = () => btnRef.current?.classList.toggle('show', window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      ref={btnRef}
      className="totop"
      id="toTop"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: motionOK ? 'smooth' : 'auto' })}
    >
      <Icon id="i-up" />
    </button>
  );
}