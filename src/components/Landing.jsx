import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

import imgHeroPhoto from '../images/rectangle1.png';
import imgHeroPhotoFrame from '../images/landing/hero-photo-frame.svg';
import imgAspora from '../images/aspora-post-onboarding-card.jpg';
import imgSearch from '../images/rectangle3.png';
import imgMerchant from '../images/rectangle6.png';
import imgAbout from '../images/landing-v2/about-photo.jpg';
import imgRecog1 from '../images/landing-v2/recog-1.jpg';
import imgRecog2 from '../images/landing-v2/recog-2.jpg';
import imgRecog3 from '../images/landing-v2/recog-3.jpg';
import imgSkweez from '../images/project-1-squeez.png';
import imgCoffeeTableBook from '../images/f32c.png';
import imgWebsite from '../images/mockup.png';
import imgSwiggy from '../images/frame485.png';
import imgCalendar from '../images/img11.png';
import imgEffortlessCaret from '../images/landing/hero-effortless-caret.svg';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Adds `inView` once the element has been scrolled into view (plays a single time). */
const useInViewOnce = (rootMargin = '-12% 0px', fallbackMs = 2500) => {
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
 * Figma component 2042:29322: "Crafting Experiences" opens a gap, types
 * "Digital" one letter per variant, then the handwritten "Effortless" mark
 * fades in above the typed word.
 */
const HERO_WORD = 'Digital';
const HERO_LETTER_MS = 90;
const HERO_GAP_MS = 400;

const HeroHeadline = () => {
  const reduced = prefersReducedMotion();
  const [step, setStep] = useState(reduced ? HERO_WORD.length + 1 : 0);

  useEffect(() => {
    if (reduced) return;
    const total = HERO_WORD.length + 1; // one step opens the gap, then a step per letter
    if (step > total) return;
    const delay = step === 0 ? HERO_GAP_MS : HERO_LETTER_MS;
    const timer = setTimeout(() => setStep((current) => current + 1), delay);
    return () => clearTimeout(timer);
  }, [step, reduced]);

  const typed = step === 0 ? '' : HERO_WORD.slice(0, step - 1);
  const done = step > HERO_WORD.length;

  return (
    <h2 className="lv2-hero-headline">
      <span aria-hidden="true">
        {step === 0 ? (
          'Crafting Experiences'
        ) : (
          <>
            {'Crafting '}
            {/* The mark is anchored to the typed word so it tracks any font size */}
            <span className="lv2-typed-word">
              {typed}
              <span className={`lv2-annotation ${done ? 'is-visible' : ''}`}>
                <span className="lv2-annotation-text">Effortless</span>
                <img src={imgEffortlessCaret} alt="" className="lv2-annotation-caret" />
              </span>
            </span>
            {' Experiences'}
          </>
        )}
      </span>
      <span className="lv2-sr-only">Crafting Digital Experiences</span>
    </h2>
  );
};

// Scrolled distance past which a pointer gesture counts as a drag, not a click.
const DRAG_CLICK_THRESHOLD = 6;

// Drag-to-scroll for a horizontal carousel (mouse + touch), as on the original
// landing page - the testimonial and exploration rails are both grab-scrolled.
const useDragScroll = () => {
  const ref = useRef(null);
  // Kept in a ref, not state: `moved` has to survive into the click event that
  // follows mouse-up, and dragging shouldn't re-render on every pointer move.
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });

  const start = (pageX) => {
    const el = ref.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const move = (e, pageX) => {
    const el = ref.current;
    if (!drag.current.active || !el) return;
    e.preventDefault();
    const walk = (pageX - el.offsetLeft - drag.current.startX) * 2; // scroll speed multiplier
    if (Math.abs(walk) > DRAG_CLICK_THRESHOLD) drag.current.moved = true;
    el.scrollLeft = drag.current.scrollLeft - walk;
  };

  const stop = () => {
    drag.current.active = false;
    if (ref.current) ref.current.style.cursor = 'grab';
  };

  const handlers = {
    onMouseDown: (e) => {
      start(e.pageX);
      if (ref.current) ref.current.style.cursor = 'grabbing';
    },
    onMouseLeave: stop,
    onMouseUp: stop,
    onMouseMove: (e) => move(e, e.pageX),
    onTouchStart: (e) => start(e.touches[0].pageX),
    onTouchMove: (e) => move(e, e.touches[0].pageX),
    onTouchEnd: stop,
    // A drag that ends over a tile must not open its link, so swallow the
    // click that follows. Capture phase runs before the anchor's own handling.
    onClickCapture: (e) => {
      if (!drag.current.moved) return;
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    },
  };

  return { ref, handlers };
};

/*
 * Marquee the rail on its own. The items are rendered twice, so once the
 * scroll passes the halfway mark it can jump back by exactly one set and the
 * seam is never visible. Pauses while a pointer or focus is inside it, while
 * the tab is hidden, and entirely under prefers-reduced-motion.
 */
const AUTO_SCROLL_PX_PER_FRAME = 0.35;

const useAutoScroll = (ref) => {
  const paused = useRef(false);
  // the position is tracked here as a float and assigned outright: reading
  // scrollLeft back gives a rounded value, so `+= 0.35` each frame rounds
  // away to nothing and the rail never moves
  const pos = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;
    let raf = 0;
    let last = 0;
    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (!last) {
        last = now;
        return;
      }
      const delta = now - last;
      last = now;
      const half = el.scrollWidth / 2;
      if (half <= 0) return;
      if (paused.current || document.hidden) {
        // stay in step with wherever a drag left it
        pos.current = el.scrollLeft;
        return;
      }
      // normalise to a 60fps step so speed is frame-rate independent
      pos.current += AUTO_SCROLL_PX_PER_FRAME * (delta / 16.67);
      if (pos.current >= half) pos.current -= half;
      el.scrollLeft = pos.current;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ref]);

  const hold = () => {
    paused.current = true;
  };
  const release = () => {
    paused.current = false;
  };
  return {
    onMouseEnter: hold,
    onMouseLeave: release,
    onTouchStart: hold,
    onTouchEnd: release,
    onFocusCapture: hold,
    onBlurCapture: release,
  };
};

/* both hooks want some of the same events, so run them in order */
const mergeHandlers = (...sets) => {
  const merged = {};
  sets.forEach((set) => {
    Object.entries(set).forEach(([name, fn]) => {
      const prev = merged[name];
      merged[name] = prev
        ? (event) => {
            prev(event);
            fn(event);
          }
        : fn;
    });
  });
  return merged;
};

/*
 * Figma Component 8 (1880:43010): a gradient stroke draws itself around the
 * tag. Its 9 variants are frames of that draw-on, so one dash-offset
 * animation stands in for importing each partial stroke.
 */
const WorkTag = ({ children }) => {
  const [ref, inView] = useInViewOnce();
  return (
    <span className={`lv2-work-tag ${inView ? 'is-drawn' : ''}`} ref={ref}>
      {children}
      <svg
        className="lv2-work-tag-outline"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="0.5" y="0.5" rx="10" pathLength="100" />
      </svg>
    </span>
  );
};

const Reveal = ({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) => {
  const [ref, inView] = useInViewOnce();
  return (
    <Tag
      ref={ref}
      className={`lv2-reveal ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/* a card links out when it carries `href`, and routes when it carries `to` */
const WorkCard = ({ item, children }) =>
  item.href ? (
    <a className="lv2-work-card" href={item.href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link className="lv2-work-card" to={item.to}>
      {children}
    </Link>
  );

const PREVIOUSLY_WORKED_AT = ['Aspora, YC S22', 'Magicpin', 'Flying Saints', 'Newton School'];

const WORK = [
  {
    image: imgAspora,
    role: 'Product Designer IC | Aspora',
    title: 'UAE Gold Investments',
    /* copy taken from the case study's own hero (2110:2095) - this card
       previously repeated the post-onboarding blurb */
    body: (
      <>
        Bringing Aspora Gold to the UAE. A new market, a new brand language, and a first purchase
        that needed to feel clear.
      </>
    ),
    tag: 'Fintech Investment Experience',
    to: '/aspora-gold',
  },
  {
    image: imgSearch,
    role: 'Product Designer 01 | Magicpin',
    title: 'Making search intent-aware',
    body: (
      <>
        Optimized search suggesters and results by making them intent-aware,{' '}
        <strong>reducing drop-offs by 39%</strong> and significantly increasing conversions.
      </>
    ),
    tag: 'Multi-Functional Search Experience',
    /* temporarily pointing at the deck - /search-v1 is still routed and will
       take this back once it is reworked */
    href: 'https://www.figma.com/deck/QrGmLRinM3sdFA99CevFeF/Search?node-id=1-354',
  },
  {
    image: imgAspora,
    role: 'Product Designer IC | Aspora',
    title: 'Simplifying account verification',
    body: (
      <>
        Reworked Aspora's post-onboarding flow from a single overwhelming checklist into a
        sequential system that surfaces only the current step, its status, and the next action
      </>
    ),
    tag: 'Fintech Onboarding Experience',
    to: '/aspora-post-onboarding',
  },
  {
    image: imgMerchant,
    role: 'Product Designer 01 | Magicpin',
    title: 'Helping merchants manage orders and resolve issues',
    body: (
      <>
        Conducted user research and usability testing to incorporate those insights for better
        delivery experience for merchants. Result:{' '}
        <strong>Reduced support tickets by 48%.</strong>
      </>
    ),
    tag: 'Communication Gap Between MX -CX -Delivery Partner',
    /* points at the write-up for now - /delivery-checkout-v1 is still routed
       and takes this back once the case study is reworked */
    href: 'https://medium.com/@sabhya.jvm/order-here-app-order-acceptance-flow-revamp-eaad7571e760',
    to: '/delivery-checkout-v1',
  },
];

const RECOGNITIONS = [
  {
    image: imgRecog1,
    org: 'UXINDIA@24',
    title: 'Part of the community',
    body:
      "Volunteered for UXINDIA's 20th summit, in Bengaluru. I hosted a couple of events while interviewing a bunch of people.",
  },
  {
    image: imgRecog2,
    org: 'Magicpin',
    title: 'Most Valuable Player',
    body:
      'I was recognized through cross-functional nomination for the MVP award at Magicpin.',
  },
  {
    image: imgRecog3,
    org: 'MDI Gurgaon',
    title: 'Design × product',
    body:
      'I was invited to MDI as a guest speaker to host a workshop on “Design and Product collaboration” over Figma.',
  },
];

const TESTIMONIALS = [
  {
    role: 'Staff software engineer at Magicpin',
    name: 'Md Shahbaz Hussain',
    body:
      'Sabhya has been owning the flows like a Pro. Always ready to give her best shot in the design from both the UI and UX persepective and gauges the tech constraints as well. Beyond her design execution, Sabhya brings tremendous value by actively engaging in product discussions as well. Her work ethic, quality of output, and collaborative spirit make her an asset to any te\u2026',
    tone: 'cream',
  },
  {
    role: 'Ex- Senior designer at Microsoft | ADP List',
    name: 'Rhiddit Paul',
    body:
      "Sabhya's approach when it comes to UX research is truly commendable for her age! What I loved about her work was the attention to detail she had and the determination to understand the entire ecosystem in which the project is situated! I would definitely feel lucky to have her on any team I am working in!",
    tone: 'grey',
  },
  {
    role: 'Faculty at NIFT',
    name: 'Arnav Deepak Barik',
    body:
      'I had the privilege of teaching and mentoring Sabhya in various subjects and projects. During her study, I was consistently impressed with her dedication towards projects, curiosity to know more and go deep into the subject. She is a good thinker and visual designer with the ability to think critically and analyze complex issues. I personally recommend h\u2026',
    tone: 'cream',
  },
  {
    role: 'Ex- Newton School, Associate manager',
    name: 'Lavin Punjabi',
    body:
      'Worked With Sabhya for a brief period. She converted imagination into a visual design rapidly and with elegance, a profound thinker and an intriguing person beyond work conversations.',
    tone: 'grey',
  },
];

const EXPLORATIONS = [
  {
    image: imgSkweez,
    title: 'Quirky branding and packaging design',
    description: 'Designer for a juice tetra-pack brand to attract children.',
    href: 'https://www.behance.net/gallery/136344091/Self-project-PACKAGING-DESIGN',
  },
  {
    image: imgCoffeeTableBook,
    title: 'Coffee table book design',
    description: 'An interactive photography and illustrative flip book experience.',
    href: 'https://www.behance.net/gallery/117719167/Food-Styling-and-Photography',
  },
  {
    image: imgWebsite,
    title: 'Website Design Project',
    description:
      'Mobile responsive design with progressive disclosure and interactive hover states.',
    href: 'https://www.behance.net/gallery/167455935/Website-Design-Project',
  },
  {
    image: imgSwiggy,
    title: 'Swiggy group ordering feature',
    description:
      'Designed and pitched in 2022 summer. An experience designed to bring people together.',
    href: 'https://www.behance.net/gallery/143395399/SWIGGY-UIUX-Project',
  },
  {
    image: imgCalendar,
    title: 'Calendar design',
    description: 'Evoking different emotions through themed visuals.',
    href: 'https://www.behance.net/gallery/123455395/CALENDAR-DESIGN-2022',
  },
];

const Landing = () => {
  const testimonialRail = useDragScroll();
  const exploreRail = useDragScroll();
  const testimonialAuto = useAutoScroll(testimonialRail.ref);
  const exploreAuto = useAutoScroll(exploreRail.ref);

  return (
    <div className="lv2">
      {/* Shared gradient for the tag outlines (Figma Component 8 stroke) */}
      <svg className="lv2-gradient-def" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="lv2TagStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#094020" />
            <stop offset="100%" stopColor="#DFFCA1" />
          </linearGradient>
        </defs>
      </svg>
      <header className="lv2-nav">
        <span className="lv2-wordmark">Sabhya Singhal</span>
        <nav className="lv2-nav-pill">
          <a className="lv2-nav-link is-active" href="#projects">
            Projects
          </a>
          {/* the full read, not the teaser section further down this page */}
          <Link className="lv2-nav-link" to="/about">
            About me
          </Link>
          {/* the resume lives on the about page, in its experience section */}
          <Link className="lv2-nav-link" to="/about#experience">
            Resume
          </Link>
        </nav>
        <a className="lv2-nav-contact" href="#contact">
          Contact
        </a>
      </header>

      <section className="lv2-hero">
        <h1 className="lv2-hero-title">
          <span>Product</span>
          <span className="lv2-hero-photo">
            <img className="lv2-hero-photo-frame" src={imgHeroPhotoFrame} alt="" />
            <img className="lv2-hero-photo-img" src={imgHeroPhoto} alt="Sabhya Singhal" />
          </span>
          <span>Designer</span>
        </h1>
        <HeroHeadline />
        <p className="lv2-hero-sub">
          Designing where money, marketplaces, and everyday convenience meet.
          <br />
          ~3 years of experience building thoughtful, outcome-driven experiences across different
          platforms
        </p>
      </section>

      <section className="lv2-prev">
        <div className="lv2-prev-inner">
          <span className="lv2-prev-label">Previously worked at</span>
          <ul className="lv2-prev-list">
            {PREVIOUSLY_WORKED_AT.map((company) => (
              <li key={company}>{company}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="lv2-section" id="projects">
        <Reveal as="h3" className="lv2-section-title">
          Some of my favorite works from the pool
        </Reveal>
        <div className="lv2-work-list">
          {WORK.map((item, index) => (
            <Reveal key={item.title} delay={index * 60}>
              <WorkCard item={item}>
                <div className="lv2-work-media">
                  <img src={item.image} alt="" loading="lazy" />
                </div>
                <div className="lv2-work-body">
                  <p className="lv2-work-role">{item.role}</p>
                  <h4 className="lv2-work-title">{item.title}</h4>
                  <p className="lv2-work-copy">{item.body}</p>
                  <WorkTag>{item.tag}</WorkTag>
                </div>
              </WorkCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="lv2-section" id="about">
        <Reveal as="h3" className="lv2-section-title">
          About me
        </Reveal>
        <Reveal className="lv2-about-figure">
          <img src={imgAbout} alt="Sabhya Singhal feeding pigeons at a lakeside ghat" loading="lazy" />
        </Reveal>
        <div className="lv2-about-grid">
          <Reveal as="p" className="lv2-about-copy">
            Always love a great serve of iced coffee while working. I ask clarifying questions in
            every situation. This helps me navigate through life and create meaningful experiences
            for myself and others. If you're someone who has an ambiguous idea I can help you frame
            it into something more meaningful. Basically, I enjoy shaping experiences for a company,
            for users, and myself; everything else in-between. I enjoy food, music, coffee, and
            dancing.
          </Reveal>
          <Reveal className="lv2-about-aside" delay={80}>
            <p className="lv2-about-quote">
              I am no constructor but I surely know how to "bridge" the gap between business and
              user needs!
            </p>
            <Link className="lv2-about-cta" to="/about">
              <span>More about me</span>
              <span className="lv2-about-cta-arrow" aria-hidden="true">
                <svg viewBox="0 0 28 16" width="24" height="14" fill="none">
                  <path
                    d="M1 8h24m0 0-6-6m6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="lv2-section" id="recognitions">
        <Reveal as="h3" className="lv2-section-title">
          Recognitions and participations
        </Reveal>
        <div className="lv2-recog-grid">
          {RECOGNITIONS.map((item, index) => (
            <Reveal key={item.title} className="lv2-recog-card" delay={index * 80}>
              <div className="lv2-recog-media">
                <img src={item.image} alt="" loading="lazy" />
              </div>
              <p className="lv2-recog-org">{item.org}</p>
              <h4 className="lv2-recog-title">{item.title}</h4>
              <p className="lv2-recog-copy">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="lv2-section lv2-section-bleed" id="testimonials">
        <Reveal as="h3" className="lv2-section-title">
          See what people say about their experience working with me
        </Reveal>
        <div
          className="lv2-testi-rail"
          ref={testimonialRail.ref}
          {...mergeHandlers(testimonialRail.handlers, testimonialAuto)}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((item, i) => (
            <article
              key={`${item.name}-${i}`}
              className={`lv2-testi-card is-${item.tone}`}
              aria-hidden={i >= TESTIMONIALS.length ? 'true' : undefined}
            >
              <p className="lv2-testi-role">{item.role}</p>
              <h4 className="lv2-testi-name">{item.name}</h4>
              <p className="lv2-testi-copy">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lv2-section lv2-section-bleed" id="explorations">
        <Reveal as="h3" className="lv2-section-title">
          Some visual exploration
        </Reveal>
        <div
          className="lv2-explore-rail"
          ref={exploreRail.ref}
          {...mergeHandlers(exploreRail.handlers, exploreAuto)}
        >
          {[...EXPLORATIONS, ...EXPLORATIONS].map((item, i) => (
            <a
              className="lv2-explore-item"
              key={`${item.title}-${i}`}
              aria-hidden={i >= EXPLORATIONS.length ? 'true' : undefined}
              tabIndex={i >= EXPLORATIONS.length ? -1 : undefined}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            >
              <img src={item.image} alt={item.title} loading="lazy" draggable="false" />
              <span className="lv2-explore-overlay">
                <span className="lv2-explore-overlay-title">{item.title}</span>
                <span className="lv2-explore-overlay-desc">{item.description}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <footer className="lv2-footer" id="contact">
        <div className="lv2-footer-left">
          <p className="lv2-footer-note">
            Since we have come to the finish line, I believe we should get in touch. Drop me a
            <span className="lv2-footer-wave" role="img" aria-label="waving hand">
              {' \u{1F44B} '}
            </span>
            hi!
          </p>
          <a className="lv2-footer-email" href="mailto:singhalsabhya05@gmail.com">
            singhalsabhya05@gmail.com
          </a>
        </div>
        {/* Figma Component 2 (1249:2431): hovering reveals the note while the
            rule redraws from a short stub and the heading turns green */}
        <div className="lv2-footer-right">
          <div className="lv2-footer-credit">
            <p className="lv2-footer-curated">
              Curated by <strong>Sabhya Singhal</strong>
            </p>
            <p className="lv2-footer-powered">Powered by fun, food, and caffeine...</p>
          </div>
          <span className="lv2-footer-rule" aria-hidden="true" />
          <p className="lv2-footer-invite">
            I would love to connect to discuss collaboration opportunities. Drop me an email and
            I will get back to you as soon as possible. Let’s create something beautiful
            together.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
