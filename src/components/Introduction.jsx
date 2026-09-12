import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Introduction.css';
import Menu, { scrollToSection } from './Menu';
import imgMvpAwardJuly2024 from '../images/mvp-award-july-2024.png';
import imgProject1Skweez from '../images/project-1-squeez.png';
import imgMenu from '../images/menu.png';
import imgRectangle1 from '../images/rectangle1.png';
import imgImage1 from '../images/image1.png';
import imgAspora from '../images/aspora.jpg';
import imgAsporaPostOnboardingCard from '../images/aspora-post-onboarding-card.jpg';
import imgRectangle3 from '../images/rectangle3.png';
import imgRectangle4 from '../images/rectangle4.png';
import imgRectangle5 from '../images/rectangle5.png';
import imgRectangle6 from '../images/rectangle6.png';
import imgAdvance from '../images/advance.png';
import imgRectangle7 from '../images/rectangle7.png';
import imgUxindia2024 from '../images/uxindia-2024.png';
import imgMdiWhatsapp1 from '../images/mdi-whatsapp1.png';
import imgMdiWhatsapp2 from '../images/mdi-whatsapp2.png';
import imgMdiScreenshot1 from '../images/mdi-screenshot1.png';
import imgMdiScreenshot2 from '../images/mdi-screenshot2.png';
import imgSimpleMockupFreeScene11 from '../images/mockup.png';
import imgF32C13117719167629462De4680C1 from '../images/f32c.png';
import imgFrame4851 from '../images/frame485.png';
import img11 from '../images/img11.png';
import imgHeroPhotoFrame from '../images/landing/hero-photo-frame.svg';
import imgAboutPhotoFrame from '../images/landing/about-photo-frame.svg';
import imgEffortlessCaret from '../images/landing/hero-effortless-caret.svg';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Adds `inView` once the element has been scrolled into view (animations play a single time).
const useInViewOnce = (rootMargin = '-10% 0px') => {
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
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
};

/*
 * Figma Component 7 (1880:42974): "Crafting Experiences" opens a gap, types
 * "Digital" one letter per variant, then the handwritten "Effortless" mark
 * fades in above the typed word.
 */
const HERO_WORD = 'Digital';
const HERO_LETTER_MS = 90;
const HERO_GAP_MS = 400;

const HeroSubtitle = () => {
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
    <div className="hero-subtitle-wrapper">
      <p className="hero-subtitle" aria-hidden="true">
        {step === 0 ? (
          'Crafting Experiences'
        ) : (
          <>
            {'Crafting '}
            {/* The mark is anchored to the typed word so it tracks any font size */}
            <span className="hero-typed-word">
              {typed}
              <span className={`hero-annotation ${done ? 'is-visible' : ''}`}>
                <span className="hero-annotation-text">Effortless</span>
                <img src={imgEffortlessCaret} alt="" className="hero-annotation-caret" />
              </span>
            </span>
            {' Experiences'}
          </>
        )}
      </p>
      <span className="sr-only">Crafting Digital Experiences</span>
    </div>
  );
};

/*
 * Figma Component 8 (1880:43010): a gradient stroke draws itself around the
 * tag. The 9 variants are frames of that draw-on, so one dash-offset
 * animation replaces importing each partial stroke.
 */
const CaseTag = ({ className = 'case-tag', children }) => {
  const { ref, inView } = useInViewOnce();
  return (
    <span className={`${className} ${inView ? 'is-drawn' : ''}`} ref={ref}>
      {children}
      <svg className="case-tag-outline" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <rect x="0.5" y="0.5" rx="12" pathLength="100" />
      </svg>
    </span>
  );
};

// Card images fade in over their tinted layer once the card is in view.
const CaseImage = ({ src, alt, className, containerClassName, tint, imageRef }) => {
  const { ref, inView } = useInViewOnce();
  return (
    <div
      className={`${containerClassName} case-media ${inView ? 'is-revealed' : ''}`}
      ref={(node) => {
        ref.current = node;
        if (imageRef) imageRef.current = node;
      }}
      style={tint ? { '--case-media-tint': tint } : undefined}
    >
      <img src={src} alt={alt} className={className} />
    </div>
  );
};

// Drag-to-scroll for a horizontal carousel (mouse + touch).
const useDragScroll = () => {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  const start = (pageX) => {
    if (!ref.current) return;
    setIsDragging(true);
    setStartX(pageX - ref.current.offsetLeft);
    setStartScrollLeft(ref.current.scrollLeft);
  };

  const move = (e, pageX) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = pageX - ref.current.offsetLeft;
    ref.current.scrollLeft = startScrollLeft - (x - startX) * 2; // Scroll speed multiplier
  };

  const stop = () => {
    setIsDragging(false);
    if (ref.current) {
      ref.current.style.cursor = 'grab';
    }
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
    onTouchEnd: () => setIsDragging(false),
  };

  return { ref, isDragging, handlers };
};

const Introduction = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const introductionSections = [
    { id: 'about-me', title: 'About me' },
    { to: '/resume', title: 'Resume' },
    { id: 'testimonials', title: 'Testimonials' },
    { id: 'contact', title: 'Contact' },
  ];

  const testimonials = useDragScroll();
  const projects = useDragScroll();

  const handleProjectLinkClick = (e) => {
    // Prevent link navigation if user was dragging
    if (projects.isDragging) {
      e.preventDefault();
    }
  };

  // Refs for matching case image height to text content
  const searchCaseImageRef = useRef(null);
  const searchCaseTextRef = useRef(null);

  // Match search case image height to text content height (desktop only; mobile uses CSS aspect-ratio)
  useEffect(() => {
    const matchSearchCaseImageHeight = () => {
      if (!searchCaseImageRef.current || !searchCaseTextRef.current) return;
      if (window.innerWidth <= 1024) {
        searchCaseImageRef.current.style.height = '';
        return;
      }
      const textHeight = searchCaseTextRef.current.offsetHeight;
      searchCaseImageRef.current.style.height = `${textHeight}px`;
    };

    matchSearchCaseImageHeight();
    window.addEventListener('resize', matchSearchCaseImageHeight);

    return () => {
      window.removeEventListener('resize', matchSearchCaseImageHeight);
    };
  }, []);

  return (
    <div className="introduction-container">
      {/* Shared gradient for the tag outlines (Figma Component 8 stroke) */}
      <svg className="case-tag-gradient-def" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="caseTagStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#094020" />
            <stop offset="100%" stopColor="#DFFCA1" />
          </linearGradient>
        </defs>
      </svg>
      {isMenuOpen && <Menu sections={introductionSections} onClose={() => setIsMenuOpen(false)} />}
      <div className="introduction-content">
        {/* Header Section */}
        <div className="header-section">
          <p className="name-text">Sabhya Singhal</p>
          <nav className="header-nav" aria-label="Primary">
            <button type="button" className="header-nav-link" onClick={() => scrollToSection('about-me')}>About me</button>
            <Link to="/resume" className="header-nav-link">Resume</Link>
            <button type="button" className="header-nav-link" onClick={() => scrollToSection('testimonials')}>Testimonials</button>
            <button type="button" className="header-nav-link" onClick={() => scrollToSection('contact')}>Contact</button>
          </nav>
          <div className="menu-button" onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer' }}>
            <img src={imgMenu} alt="Menu" className="menu-icon" />
            <p className="menu-text">Menu</p>
          </div>
        </div>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-title-container">
            <div className="hero-title-row">
              <p className="hero-title">Product </p>
              <div className="hero-image-wrapper">
                <img src={imgHeroPhotoFrame} alt="" className="hero-image-frame" />
                <img src={imgRectangle1} alt="" className="hero-image" />
              </div>
              <p className="hero-title">Designer </p>
            </div>
            <HeroSubtitle />
          </div>
          <p className="hero-tagline">
            Designing where money, marketplaces, and everyday convenience meet.
            <br />
            ~3 years of experience building thoughtful, outcome-driven experiences across different platforms
          </p>
        </div>

        {/* Work Experience Section - Aspora */}
        <div id="work" className="work-section">
          <div className="work-header">
            <div className="work-header-left">
              <div className="work-image-wrapper">
                <img src={imgAspora} alt="Aspora" className="work-image" />
              </div>
              <div className="work-company-info">
                <p className="work-company-name">Aspora (YC, S22)</p>
                <p className="work-company-text">Wealth and banking platform for diasporas</p>
              </div>
            </div>
            <p className="work-date">April 2026- July 2026</p>
          </div>

          <Link to="/aspora-post-onboarding" className="aspora-case-card-link">
            <div className="aspora-case-card">
              <CaseImage
                src={imgAsporaPostOnboardingCard}
                alt="Aspora post-onboarding case study"
                className="aspora-case-image"
                containerClassName="aspora-case-image-container"
                tint="#E9E7FF"
              />
              <div className="aspora-case-text-container">
                <p className="aspora-case-category">Product Designer IC</p>
                <p className="aspora-case-title">Simplifying account verification</p>
                <p className="aspora-case-description">
                  Reworked Aspora's post-onboarding flow from a single overwhelming checklist into <strong>a sequential system</strong> that surfaces only the current step, its status, and the next action
                </p>
                <div className="aspora-case-tags">
                  <CaseTag className="aspora-case-tag">Fintech Onboarding Experience</CaseTag>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Work Experience Section */}
        <div className="work-section">
          <div className="work-header">
            <div className="work-header-left">
              <div className="work-image-wrapper">
                <img src={imgImage1} alt="Magicpin" className="work-image" />
              </div>
              <div className="work-company-info">
                <p className="work-company-name">Magicpin, India</p>
                <p className="work-company-text">Super-saving application</p>
              </div>
            </div>
            <p className="work-date">Oct, 2023- Sept, 2025</p>
          </div>

          <div className="work-cases">
            {/* Case 1 - Search → Search V1 page */}
            <Link to="/search-v1" className="case-card-link">
              <div className="case-card case-card-large">
                <div className="case-content">
                  <CaseImage
                    src={imgRectangle3}
                    alt="Case 1"
                    className="case-image"
                    containerClassName="case-image-container"
                    tint="#E9E9FF"
                    imageRef={searchCaseImageRef}
                  />
                  <div className="case-text-container" ref={searchCaseTextRef}>
                    <p className="case-category">Product Designer 01</p>
                    <p className="case-title">Making search intent-aware</p>
                    <p className="case-description">
                      Optimized search suggesters and results by making them intent-aware, <strong>reducing drop-offs by 39%</strong> and significantly increasing conversions.
                    </p>
                    <div className="case-tags">
                      <CaseTag>Multi-Functional Search Experience</CaseTag>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Case 2 and 3 */}
            <div className="case-cards-row">
              <Link to="/delivery-checkout-v1" className="case-card-link">
                <div className="case-card case-card-green">
                  <CaseImage
                    src={imgRectangle4}
                    alt="Case 2"
                    className="case-image-full"
                    containerClassName="case-image-top"
                    tint="#EAF8EE"
                  />
                  <div className="case-text-container">
                    <p className="case-category">Product Designer 01</p>
                    <p className="case-title">Simplifying delivery checkout</p>
                    <p className="case-description">
                      Led end-to-end design for food and fashion delivery products, driving revenue growth by improving brand positioning and optimizing item widget content.
                    </p>
                    <div className="case-tags">
                      <CaseTag>An Overwhelming Checkout</CaseTag>
                    </div>
                  </div>
                </div>
              </Link>

              <a
                href="https://medium.com/@sabhya.jvm/magicpay-54cd59bb1e1b"
                target="_blank"
                rel="noopener noreferrer"
                className="case-card-link"
              >
                <div className="case-card case-card-grey">
                  <CaseImage
                    src={imgRectangle5}
                    alt="Case 3"
                    className="case-image-full"
                    containerClassName="case-image-top"
                    tint="#EFEFFF"
                  />
                  <div className="case-text-container">
                    <p className="case-category">Product Designer Intern</p>
                    <p className="case-title">Making in-store payments easier</p>
                    <p className="case-description">
                      Identified the problem of information overload and redesigned magicPay flow, <strong>increasing daily average users by 24%</strong> and reducing transaction time by 27%.
                    </p>
                    <div className="case-tags">
                      <CaseTag>Out-Dated Payment Experience Design</CaseTag>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Case 4 */}
            <a
              href="https://medium.com/@sabhya.jvm/order-here-app-order-acceptance-flow-revamp-eaad7571e760"
              target="_blank"
              rel="noopener noreferrer"
              className="case-card-link"
            >
              <div className="case-card case-card-large">
                <div className="case-content case-content-reverse">
                  <div className="case-text-container">
                    <p className="case-category">Product Designer 01</p>
                    <p className="case-title">Helping merchants manage orders and resolve issues</p>
                    <p className="case-description">
                      Conducted user research and usability testing to incorporate those insights for better delivery experience for merchants. Result: <strong>Reduced support tickets by 48%.</strong>
                    </p>
                    <div className="case-tags">
                      <CaseTag>Communication Gap Between MX -CX -Delivery Partner</CaseTag>
                    </div>
                  </div>
                  <CaseImage
                    src={imgRectangle6}
                    alt="Case 4"
                    className="case-image"
                    containerClassName="case-image-container"
                    tint="#FDECEC"
                  />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* About Me Section */}
        <div id="about-me" className="about-section">
          <div className="section-header">
            <p className="section-title">About me</p>
          </div>
          <div className="about-photo-frame">
            <img src={imgAboutPhotoFrame} alt="" className="about-photo-stripes" />
            <img src={imgRectangle7} alt="Sabhya Singhal" className="about-photo" />
          </div>
          <div className="about-details">
            <p className="about-story">
              I ask clarifying questions in every situation. This helps me navigate through life and create meaningful experiences for myself and others. If you’re someone who has an ambiguous idea I can help you frame it into something more meaningful. Basically, I enjoy shaping experiences for a company, for users, and myself; everything else in-between.
            </p>
            <div className="about-aside">
              <p className="about-bridge">
                I am no constructor but I surely know how to "bridge" the gap between business and user needs!
              </p>
              <Link to="/resume" className="about-resume-button">
                <span className="about-resume-text">Resume</span>
                <span className="about-resume-icon-wrapper">
                  <img src={imgAdvance} alt="" className="about-resume-icon" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Recognitions Section */}
        <div id="recognitions" className="recognitions-section">
          <div className="section-header">
            <p className="section-title">Recognitions and participations</p>
          </div>
          <div className="recognitions-content">
            <div className="recognition-card recognition-card-left">
              <div className="recognition-images-grid recognition-images-single">
                <img src={imgUxindia2024} alt="Volunteer at UXINDIA2024" className="recognition-image" />
              </div>
              <div className="recognition-text-content">
                <p className="recognition-title">Volunteer at UXINDIA2024</p>
                <p className="recognition-description">
                  This September, I had the privilege of volunteering at UXINDIA’s 20th anniversary, in Bangalore.
                </p>
              </div>
            </div>
            <div className="recognitions-right">
              <div className="recognition-card recognition-card-green">
                <div className="recognition-text-content">
                  <p className="recognition-description">
                    Hosted a workshop at MDI Gurgaon for aspiring product managers on <span className="recognition-bold">“Design and Product collaboration over Figma”</span>.
                  </p>
                </div>
                <div className="recognition-collage">
                  <div className="recognition-collage-image recognition-collage-tl">
                    <img src={imgMdiWhatsapp1} alt="MDI workshop" className="recognition-collage-img" />
                  </div>
                  <div className="recognition-collage-image recognition-collage-tr">
                    <img src={imgMdiWhatsapp2} alt="MDI workshop" className="recognition-collage-img" />
                  </div>
                  <div className="recognition-collage-image recognition-collage-br">
                    <div className="recognition-collage-img-wrapper">
                      <img src={imgMdiScreenshot1} alt="MDI workshop" className="recognition-collage-img" />
                    </div>
                  </div>
                  <div className="recognition-collage-image recognition-collage-bl">
                    <div className="recognition-collage-img-wrapper">
                      <img src={imgMdiScreenshot2} alt="MDI workshop" className="recognition-collage-img" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="recognition-card recognition-card-grey">
                <div className="recognition-text-content">
                  <p className="recognition-description">
                    Recognized at the cross functional nomination for <span className="recognition-bold">Most Valuable Player at Magicpin in July 2024.</span>
                  </p>
                </div>
                <div className="recognition-award-image">
                  <img src={imgMvpAwardJuly2024} alt="Award" className="recognition-award-img" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="testimonials-section">
          <div className="section-header">
            <p className="section-title">See what people say about their experience working with me</p>
          </div>
          <div className="testimonials-carousel-wrapper">
            <div
              className="testimonials-content"
              ref={testimonials.ref}
              {...testimonials.handlers}
            >
              <div className="testimonial-card testimonial-card-green">
                <p className="testimonial-role">Staff software engineer at Magicpin</p>
                <p className="testimonial-name">Md Shahbaz Hussain</p>
                <p className="testimonial-text">
                  Sabhya has been owning the flows like a Pro. Always ready to give her best shot in the design from both the UI and UX persepective and gauges the tech constraints as well. Beyond her design execution, Sabhya brings tremendous value by actively engaging in product discussions as well. Her work ethic, quality of output, and collaborative spirit make her an asset to any te...
                </p>
              </div>
              <div className="testimonial-card testimonial-card-grey">
                <p className="testimonial-role">Ex- Senior designer at Microsoft | ADP List</p>
                <p className="testimonial-name">Rhiddit Paul</p>
                <p className="testimonial-text">
                  Sabhya's approach when it comes to UX research is truly commendable for her age! What I loved about her work was the attention to detail she had and the determination to understand the entire ecosystem in which the project is situated! I would definitely feel lucky to have her on any team I am working in!
                </p>
              </div>
              <div className="testimonial-card testimonial-card-green">
                <p className="testimonial-role">Faculty at NIFT</p>
                <p className="testimonial-name">Arnav Deepak Barik</p>
                <p className="testimonial-text">
                  I had the privilege of teaching and mentoring Sabhya in various subjects and projects. During her study, I was consistently impressed with her dedication towards projects, curiosity to know more and go deep into the subject. She is a good thinker and visual designer with the ability to think critically and analyze complex issues. I personally recommend h...
                </p>
              </div>
              <div className="testimonial-card testimonial-card-grey testimonial-card-compact">
                <p className="testimonial-role">Ex- Newton School, Associate manager</p>
                <p className="testimonial-name">Lavin Punjabi</p>
                <p className="testimonial-text">
                  Worked With Sabhya for a brief period. She converted imagination into a visual design rapidly and with elegance, a profound thinker and an intriguing person beyond work conversations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Explorations Section */}
        <div id="explorations" className="projects-section">
          <div className="section-header">
            <p className="section-title">Graduating from NIFT, I tried my hands on a lot of different things; things other than product design as well..</p>
          </div>
          <div className="projects-carousel-wrapper">
            <div
              className="projects-content"
              ref={projects.ref}
              {...projects.handlers}
            >
              <a
                href="https://www.behance.net/gallery/136344091/Self-project-PACKAGING-DESIGN"
                target="_blank"
                rel="noopener noreferrer"
                className="project-image-wrapper project-image-wrapper-first project-image-link"
                onClick={handleProjectLinkClick}
              >
                <img src={imgProject1Skweez} alt="Project 1" className="project-image" />
                <div className="project-image-overlay project-image-overlay-first">
                  <div className="project-image-overlay-content">
                    <p className="project-image-overlay-title">Quirky branding and packaging design</p>
                    <p className="project-image-overlay-description">Designer for a juice tetra-pack brand to attract children.</p>
                  </div>
                </div>
              </a>
              <a
                href="https://www.behance.net/gallery/117719167/Food-Styling-and-Photography"
                target="_blank"
                rel="noopener noreferrer"
                className="project-image-wrapper project-image-wrapper-third project-image-link"
                onClick={handleProjectLinkClick}
              >
                <img src={imgF32C13117719167629462De4680C1} alt="Project 3" className="project-image" />
                <div className="project-image-overlay project-image-overlay-third">
                  <div className="project-image-overlay-content">
                    <p className="project-image-overlay-title">Coffee table book design</p>
                    <p className="project-image-overlay-description">An interactive photography and illustrative flip book experience.</p>
                  </div>
                </div>
              </a>
              <a
                href="https://www.behance.net/gallery/167455935/Website-Design-Project"
                target="_blank"
                rel="noopener noreferrer"
                className="project-image-wrapper project-image-wrapper-second project-image-link"
                onClick={handleProjectLinkClick}
              >
                <img src={imgSimpleMockupFreeScene11} alt="Project 2" className="project-image" />
                <div className="project-image-overlay project-image-overlay-second">
                  <div className="project-image-overlay-content">
                    <p className="project-image-overlay-title">Website Design Project</p>
                    <p className="project-image-overlay-description">Mobile responsive design with progressive disclosure and interactive hover states.</p>
                  </div>
                </div>
              </a>
              <a
                href="https://www.behance.net/gallery/143395399/SWIGGY-UIUX-Project"
                target="_blank"
                rel="noopener noreferrer"
                className="project-image-wrapper project-image-wrapper-fourth project-image-green project-image-link"
                onClick={handleProjectLinkClick}
              >
                <img src={imgFrame4851} alt="Project 4" className="project-image" />
                <div className="project-image-overlay project-image-overlay-fourth">
                  <div className="project-image-overlay-content">
                    <p className="project-image-overlay-title">Swiggy group ordering feature</p>
                    <p className="project-image-overlay-description">Designed and pitched in 2022 summer. An experience designed to bring people together.</p>
                  </div>
                </div>
              </a>
              <a
                href="https://www.behance.net/gallery/123455395/CALENDAR-DESIGN-2022"
                target="_blank"
                rel="noopener noreferrer"
                className="project-image-wrapper project-image-wrapper-fifth project-image-link"
                onClick={handleProjectLinkClick}
              >
                <img src={img11} alt="Project 5" className="project-image" />
                <div className="project-image-overlay project-image-overlay-fifth">
                  <div className="project-image-overlay-content">
                    <p className="project-image-overlay-title">Calendar design</p>
                    <p className="project-image-overlay-description">Evoking different emotions through themed visuals.</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div id="contact" className="footer-section">
          <div className="footer-left">
            <p className="footer-text">
              Since we have come to the finish line, I believe we should get in touch. Drop me a👋 hi!
            </p>
            <a href="mailto:singhalsabhya05@gmail.com" className="footer-email-text">singhalsabhya05@gmail.com</a>
          </div>
          <div className="footer-right">
            <p className="footer-curated">
              <span>Curated by</span>
              <span className="footer-bold"> Sabhya Singhal</span>
            </p>
            <p className="footer-powered">Powered by fun, food, and caffeine...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
