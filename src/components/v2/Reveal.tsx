'use client';

import { useEffect, useRef } from 'react';

type Variant = 'up' | 'left' | 'right' | 'mask' | 'scale' | 'line';

let observer: IntersectionObserver | null = null;
function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            observer?.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
  }
  return observer;
}

// Der Inhalt steht immer im HTML. Das Verstecken (.js [data-reveal]) greift nur, wenn JS läuft.
export default function Reveal({
  children,
  variant = 'up',
  stagger = false,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  variant?: Variant;
  stagger?: boolean;
  className?: string;
  as?: 'div' | 'ul' | 'ol' | 'section' | 'header' | 'figure' | 'p';
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = getObserver();
    o.observe(el);
    return () => o.unobserve(el);
  }, []);
  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} data-reveal={variant} data-stagger={stagger ? '' : undefined} className={className}>
      {children}
    </Comp>
  );
}
