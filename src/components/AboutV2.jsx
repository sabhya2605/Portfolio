import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutV2.css';

import imgPigeons from '../images/about-v2/figure-pigeons.jpg';
import imgKitchen from '../images/about-v2/kitchen.jpg';
import imgPainting from '../images/about-v2/painting.jpg';
import imgJesmonite from '../images/about-v2/jesmonite.jpg';
import imgMusic from '../images/about-v2/music.jpg';
import imgSunset from '../images/about-v2/sunset.jpg';
import imgBreakfast from '../images/about-v2/frame13.jpg';

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

const Reveal = ({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) => {
  const [ref, inView] = useInViewOnce();
  return (
    <Tag
      ref={ref}
      className={`abv2-reveal ${inView ? 'is-in' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const EXPERIENCE = [
  {
    company: "Aspora (YC, S22) | April 26' - July 26'",
    role: 'Product Designer',
    points: [
      'Designed the UAE Gold Investment experience by analyzing differences between UAE and UK products, enabling a localized investment journey for regional users.',
      'Optimized the onboarding experience by introducing contextual exit nudges, reducing user drop-offs by 32% and capturing actionable abandonment insights.',
      'Simplified post-onboarding flows, improving usability and increasing feature discoverability for newly onboarded users.',
      'Designed service downtime communication experiences to ensure transparency, keeping users informed while maintaining access to unaffected platform features.',
    ],
  },
  {
    company: "Magicpin | Oct 23' - Sept 25'",
    role: 'Product Designer',
    // the frame draws this block's last bullet 37px tall where the identical
    // single-line bullets in every other block are 29px
    tailGap: true,
    points: [
      'Enhanced search suggesters and results by making them intent-aware, reducing drop-offs by 57% and significantly increasing conversions',
      'Led end-to-end design for food and fashion delivery products (magicNow, magic9), driving revenue growth by improving brand positioning and optimizing item widget content hierarchy across the app.',
      'Simplified magicPay checkout: Identified the problem of information overload and redesigned magicPay flow, increasing daily average users by 24% and reducing transaction time by 27%.',
      'Revisited merchant portal food delivery: Conducted user research and usability testing and incorporated those insights leading to better delivery experience for merchants and reduced support tickets by 48%.',
      'Optimized voucher and delivery checkout flow by implementing progressive disclosure, reducing cognitive load and information overload, resulting in an average of 30% decrease in checkout completion time and significantly improving user experience.',
      'Developed a comprehensive Design System, reducing design time by 20% and improving cross-functional collaboration between design and technology, further establishing consistency in UI.',
      'Enhanced merchant portal dashboards, streamlining discount creation and incorporating 15+ actionable insights from user feedback.',
      'Redesigned Easy Rewards to boost user interaction, with increased redemptions.',
    ],
  },
  {
    company: "Flying Saints | Jan 23' - April 23'",
    role: 'UI/UX Design Intern',
    points: [
      'Acquired 2 new clients through compelling design pitches. Contributed to multiple live website and mobile app projects.',
    ],
  },
  {
    company: "NapEazy | Sept 22' - Nov 22'",
    role: 'Packaging and UX- IC role',
    points: [
      'I redesign the packaging for their product, travel pillow. I have also worked for their website UX.',
    ],
  },
  {
    company: "Newton School | June 22' - August 22'",
    role: 'Graphic Designer Intern; Growth & Marketing',
    points: [
      'Increased rate of response by more than 50% within 2 months by leading different email campaigns. Contributed as a creative planner and did strategy planning. I was also able to achieve maximum one day registration, via e-mails, till then.',
    ],
  },
];

const CERTIFICATIONS = [
  { body: 'IxDF, Interaction Design Foundation', title: 'AI in Design' },
  { body: 'UC San diego | Coursera', title: 'Human Computer Interaction' },
];

const SOCIALS = [
  { label: 'Linkedin', href: 'https://www.linkedin.com/in/sabhya-singhal/' },
  { label: 'Behnace', href: 'https://www.behance.net/sabhyasinghal' },
  { label: 'Medium', href: 'https://medium.com/@singhalsabhya05' },
  { label: 'Dribble', href: 'https://dribbble.com/sabhyasinghal' },
];

const AboutV2 = () => {
  const backToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="abv2">
      <header className="abv2-nav">
        <div className="abv2-nav-inner">
          <span className="abv2-wordmark">Sabhya Singhal</span>
          <nav className="abv2-nav-pill">
            <Link className="abv2-nav-link" to="/v2">
              Projects
            </Link>
            <span className="abv2-nav-link is-active">About me</span>
            <Link className="abv2-nav-link" to="/resume">
              Resume
            </Link>
          </nav>
          <a className="abv2-nav-contact" href="#contact">
            Contact
          </a>
        </div>
      </header>

      {/* Intro ------------------------------------------------------------ */}
      <section className="abv2-intro">
        <div className="abv2-intro-copy">
          <Reveal as="p" className="abv2-kicker">
            Designer. Curious human.
          </Reveal>
          <Reveal as="h1" className="abv2-title" delay={60}>
            A little beyond
            <br />
            the pixels.
          </Reveal>
          <Reveal as="p" className="abv2-lede" delay={120}>
            Hi, I&rsquo;m Sabhya. I design digital experiences
            <br />
            and do plenty of things away from a screen.
          </Reveal>
          <Reveal as="p" className="abv2-lede abv2-lede-narrow" delay={160}>
            Usually a new recipe, something handmade, or a very well-researched list of places to
            eat.
          </Reveal>
        </div>
        <Reveal className="abv2-intro-figure" delay={100}>
          {/* the lime strip sits over the polaroid like a piece of tape */}
          <span className="abv2-tape" aria-hidden="true" />
          <figure className="abv2-polaroid">
            <img src={imgPigeons} alt="Sabhya feeding pigeons at a lakeside ghat" />
            <figcaption>Collecting experiences, always.</figcaption>
          </figure>
        </Reveal>
      </section>

      {/* Away from the screen --------------------------------------------- */}
      <section className="abv2-section" id="away">
        <Reveal as="p" className="abv2-kicker">
          Me, when I am away from the screen
        </Reveal>
        <Reveal as="h2" className="abv2-heading" delay={60}>
          Curiosity and the excitement to create is the same
        </Reveal>

        <div className="abv2-grid">
          <Reveal className="abv2-card abv2-card-kitchen">
            <p className="abv2-card-index">01 / In the kitchen</p>
            <h3 className="abv2-card-title">
              Recipes are a
              <br />
              starting point.
            </h3>
            <p className="abv2-card-copy">I love cooking, but I love experimenting even more.</p>
            <div className="abv2-kitchen-photo">
              <img src={imgKitchen} alt="One of Sabhya's cooking experiments" loading="lazy" />
            </div>
            <div className="abv2-kitchen-photo-sm">
              <img src={imgBreakfast} alt="A breakfast bowl Sabhya made" loading="lazy" />
            </div>
          </Reveal>

          <Reveal className="abv2-card abv2-card-hand" delay={60}>
            <p className="abv2-card-index">02 / Made by hand</p>
            <h3 className="abv2-card-title">
              My creativity
              <br />
              gets its hands dirty.
            </h3>
            <p className="abv2-card-copy abv2-card-copy-sm">
              I paint, make cute things with Jesmonite, and customise them too. Colour, texture, and
              tiny details are just as fun to play with away from a screen.
            </p>
            <div className="abv2-tiles">
              <figure className="abv2-tile">
                <img src={imgPainting} alt="A painting in progress" loading="lazy" />
                <figcaption className="abv2-tile-cap-top">Painting</figcaption>
              </figure>
              <figure className="abv2-tile">
                <span className="abv2-tile-plus" aria-hidden="true">
                  &#xFF0B;
                </span>
                <img src={imgJesmonite} alt="A Jesmonite piece" loading="lazy" />
                <figcaption className="abv2-tile-cap">Jesmonite</figcaption>
              </figure>
            </div>
          </Reveal>

          <Reveal className="abv2-card abv2-card-trip" delay={120}>
            <p className="abv2-card-index">03 / On the itinerary</p>
            <div className="abv2-chat">
              <p className="abv2-chat-label">The group chat</p>
              <p className="abv2-bubble abv2-bubble-them">Where are we eating?</p>
              <p className="abv2-bubble abv2-bubble-me">I have a shortlist.</p>
              <p className="abv2-chat-note">&#128205; saved for the next trip</p>
            </div>
            <h3 className="abv2-card-title">
              You book the tickets.
              <br />
              I&rsquo;ll find the food.
            </h3>
            <p className="abv2-card-copy">
              Whenever I travel, I&rsquo;m the unofficial food scout in every group trip.
              Shortlisting places to eat? Happily my responsibility.
            </p>
          </Reveal>

          <Reveal className="abv2-card abv2-card-rhythm" delay={180}>
            <p className="abv2-card-index">04 / Finding my rhythm</p>
            <h3 className="abv2-card-title">
              There&rsquo;s usually
              <br />
              a soundtrack.
            </h3>
            <p className="abv2-card-copy abv2-card-copy-sm">
              I love listening to music, have playlists for everything, and am also a really good
              photographer
            </p>
            <div className="abv2-tiles">
              <figure className="abv2-tile">
                <img src={imgMusic} alt="Now playing" loading="lazy" />
                <figcaption className="abv2-tile-cap">I love Coldplay &amp; Spotify</figcaption>
              </figure>
              <figure className="abv2-tile">
                <img src={imgSunset} alt="A sunset photograph" loading="lazy" />
                <figcaption className="abv2-tile-cap">Capturing sunsets is a thing</figcaption>
              </figure>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Icebreaker -------------------------------------------------------- */}
      <Reveal className="abv2-icebreaker">
        <span className="abv2-icebreaker-num" aria-hidden="true">
          07
        </span>
        <div className="abv2-icebreaker-body">
          <p className="abv2-kicker abv2-kicker-tight">My favourite icebreaker</p>
          <p className="abv2-icebreaker-line">MS Dhoni and I share an alma mater; our school.</p>
          <p className="abv2-icebreaker-note">
            Yes, that MS Dhoni. Former captain of the Indian men&rsquo;s cricket team.
            <br />
            And yes, I will find a way to bring it up that I met him in school.
          </p>
        </div>
        <p className="abv2-icebreaker-aside">
          - Consider this
          <br />
          me bringing it up.
        </p>
      </Reveal>

      {/* Experience -------------------------------------------------------- */}
      <section className="abv2-section" id="experience">
        <div className="abv2-work-head">
          <div>
            <Reveal as="p" className="abv2-kicker">
              And now, the professional bit
            </Reveal>
            <Reveal as="h2" className="abv2-heading" delay={60}>
              My work experiences
            </Reveal>
          </div>
          <Reveal delay={100}>
            <a className="abv2-download" href="/resume">
              Download PDF
            </a>
          </Reveal>
        </div>

        <Reveal as="p" className="abv2-work-name" delay={60}>
          Sabhya Singhal
        </Reveal>
        <Reveal as="p" className="abv2-work-summary" delay={80}>
          I bring product thinking into design decisions, creating intuitive experiences and
          collaborating across design, product, and business.
        </Reveal>

        <Reveal as="p" className="abv2-sublabel" delay={60}>
          Experience
        </Reveal>
        <div className="abv2-jobs">
          {EXPERIENCE.map((job, index) => (
            <Reveal
              className={`abv2-job${job.tailGap ? ' has-tail-gap' : ''}`}
              key={job.company}
              delay={index * 40}
            >
              <p className="abv2-job-company">{job.company}</p>
              <p className="abv2-job-role">{job.role}</p>
              <ul className="abv2-job-points">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education --------------------------------------------------------- */}
      <section className="abv2-section" id="education">
        <Reveal as="h2" className="abv2-block-title">
          Education
        </Reveal>
        <Reveal className="abv2-panel" delay={60}>
          <p className="abv2-panel-title">NIFT | July 19&rsquo; - June 23&rsquo;</p>
          <p className="abv2-panel-sub">Fashion Communication</p>
          <p className="abv2-panel-body">
            Activities and societies: Literary Club Organized &ldquo;Kisse and kahaniya&rdquo;, a
            storytelling session to understand the cultural diversity at NIFT and providing a
            platform for people to share their experiences and stories that are dying. Unraveled the
            &ldquo;Indian approach to design&rdquo; with a team of designers and shared it with
            fellow students and staffs.
            <br />
            Minor : Fashion Management, Storytelling &amp; Narratives, and Copywriting.
          </p>
        </Reveal>
      </section>

      {/* Certification ----------------------------------------------------- */}
      <section className="abv2-section" id="certification">
        <Reveal as="h2" className="abv2-block-title">
          Certification
        </Reveal>
        <div className="abv2-cert-grid">
          {CERTIFICATIONS.map((cert, index) => (
            <Reveal className="abv2-panel abv2-panel-sm" key={cert.title} delay={index * 60}>
              <p className="abv2-panel-title">{cert.body}</p>
              <p className="abv2-panel-sub">{cert.title}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Footer ------------------------------------------------------------ */}
      <footer className="abv2-footer" id="contact">
        <div className="abv2-footer-left">
          <p className="abv2-footer-note">
            Let&rsquo;s connect. Drop me a
            <span role="img" aria-label="waving hand">
              {' \u{1F44B} '}
            </span>
            hi!
          </p>
          <a className="abv2-footer-email" href="mailto:singhalsabhya05@gmail.com">
            singhalsabhya05@gmail.com
          </a>
        </div>
        <div className="abv2-footer-right">
          <p>
            Curated by Sabhya Singhal
            <br />
            Powered by fun, food, and caffeine...
          </p>
          <span className="abv2-footer-rule" aria-hidden="true" />
          <p className="abv2-footer-invite">
            I would love to connect to discuss collaboration opportunities. Drop me an email and I
            will get back to you as soon as possible. Let&rsquo;s create something beautiful
            together.
          </p>
        </div>
      </footer>

      <div className="abv2-bottom">
        <span className="abv2-bottom-rule" aria-hidden="true" />
        <div className="abv2-bottom-inner">
          <ul className="abv2-socials">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="abv2-top-link" href="#top" onClick={backToTop}>
            Back to top
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutV2;
