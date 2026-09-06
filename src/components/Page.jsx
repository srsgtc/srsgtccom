import { useEffect, useRef } from 'react';

let isFirstRoute = true;

export default function Page({ id, label, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isFirstRoute) { isFirstRoute = false; return; }
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section className="page on" id={`page-${id}`} tabIndex={-1} aria-label={label} ref={ref}>
      {children}
    </section>
  );
}