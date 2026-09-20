import React, { useEffect, useRef, useState } from 'react';

/*
 * Scroll-reveal shared by the v2 pages. Landing.jsx and AboutV2.jsx still carry
 * their own copies of this; they can adopt this module when they are next
 * touched, rather than being rewritten here.
 */

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Adds `inView` once the element has been scrolled into view (plays a single time). */
export const useInViewOnce = (rootMargin = '-12% 0px', fallbackMs = 2500) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    // Already on screen at mount (observer callbacks can be throttled in background tabs)
    const box = node.getBoundingClientRect();
    if (box.top < window.innerHeight && box.bottom > 0) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    // Safety net: observer callbacks are throttled in background tabs, and the
    // revealed content must never stay hidden just because they never ran.
    const fallback = setTimeout(() => {
      setInView(true);
      observer.disconnect();
    }, fallbackMs);
    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, [rootMargin, fallbackMs]);

  return [ref, inView];
};

/*
 * `className` is applied alongside the reveal classes, so the caller keeps its
 * own layout class. `prefix` picks the page's reveal namespace (e.g. "agld").
 */
const Reveal = ({ as: Tag = 'div', prefix, className = '', delay = 0, children, ...rest }) => {
  const [ref, inView] = useInViewOnce();
  return (
    <Tag
      ref={ref}
      className={`${prefix}-reveal ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
