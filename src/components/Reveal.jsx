import { useEffect, useRef } from 'react';

export default function Reveal({ as: Tag = 'div', delay, className = '', children, style, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(en => {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mergedStyle = {
    ...(delay !== undefined ? { '--d': `${delay}s` } : {}),
    ...style
  };

  return (
    <Tag ref={ref} className={`rv ${className}`.trim()} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}