import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Resume.css';
import Menu from './Menu';
import imgRectangle5 from '../images/resume/rectangle5.png';
import imgDance from '../images/interests/dance.png';
import imgCook from '../images/interests/cook.png';
import imgStyleClick from '../images/interests/style-click.png';
import imgFilming from '../images/interests/filming.png';
import imgNaturePhotography from '../images/interests/nature-photography.png';
import imgMusic from '../images/interests/music.png';
import imgMenu from '../images/menu.png';
import imgExpandArrow from '../images/search/expand-arrow.png';

const Resume = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Refs for matching image height to text content
  const aboutImageRef = useRef(null);
  const aboutTextRef = useRef(null);

  const handleBackClick = () => {
    navigate('/');
  };

  const resumeSections = [
    { id: 'about-me', title: 'About me' },
    { id: 'experience', title: 'Experience' },
    { id: 'education', title: 'Education' },
    { id: 'certification', title: 'Certification' },
    { id: 'interests', title: 'Interests' },
  ];

  // Auto-playing carousel for Interests
  const interestsRef = useRef(null);
  const [isInterestsDragging, setIsInterestsDragging] = useState(false);
  const [interestsStartX, setInterestsStartX] = useState(0);
  const [interestsScrollLeft, setInterestsScrollLeft] = useState(0);
  const totalInterests = 6;
  const carouselIntervalRef = useRef(null);
  const currentIndexRef = useRef(0);

  // Interest images - duplicate for infinite scroll
  const interestImages = [
    { id: 1, name: 'dance', img: imgDance },
    { id: 2, name: 'cook', img: imgCook },
    { id: 3, name: 'style-click', img: imgStyleClick },
    { id: 4, name: 'filming', img: imgFilming },
    { id: 5, name: 'nature-photography', img: imgNaturePhotography },
    { id: 6, name: 'music', img: imgMusic },
  ];

  // Duplicate images for infinite scroll
  const duplicatedImages = [...interestImages, ...interestImages, ...interestImages];

  // Function to start auto-play
  const startAutoPlay = useCallback(() => {
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
    carouselIntervalRef.current = setInterval(() => {
      if (!isInterestsDragging && interestsRef.current) {
        const cardWidth = 174.129; // Width of each card
        const gap = 24; // Gap between cards
        const scrollWidth = cardWidth + gap;
        
        // Get current scroll position
        const currentScroll = interestsRef.current.scrollLeft;
        const nextScroll = currentScroll + scrollWidth;
        
        // If we've scrolled past the first set of images, reset to beginning seamlessly
        if (nextScroll >= totalInterests * scrollWidth) {
          interestsRef.current.scrollLeft = 0;
          currentIndexRef.current = 0;
        } else {
          interestsRef.current.scrollTo({
            left: nextScroll,
            behavior: 'smooth'
          });
          currentIndexRef.current = Math.floor(nextScroll / scrollWidth) % totalInterests;
        }
      }
    }, 3000); // Change slide every 3 seconds
  }, [isInterestsDragging, totalInterests]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, [startAutoPlay]);

  // Match about image height to text content height
  useEffect(() => {
    const matchAboutImageHeight = () => {
      if (aboutImageRef.current && aboutTextRef.current) {
        const textHeight = aboutTextRef.current.offsetHeight;
        aboutImageRef.current.style.height = `${textHeight}px`;
      }
    };

    matchAboutImageHeight();
    window.addEventListener('resize', matchAboutImageHeight);
    
    return () => {
      window.removeEventListener('resize', matchAboutImageHeight);
    };
  }, []);

  // Mouse event handlers for dragging
  const handleInterestsMouseDown = (e) => {
    if (!interestsRef.current) return;
    setIsInterestsDragging(true);
    setInterestsStartX(e.pageX - interestsRef.current.offsetLeft);
    setInterestsScrollLeft(interestsRef.current.scrollLeft);
    interestsRef.current.style.cursor = 'grabbing';
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
  };

  const handleInterestsMouseLeave = () => {
    setIsInterestsDragging(false);
    if (interestsRef.current) {
      interestsRef.current.style.cursor = 'grab';
    }
    // Resume auto-play after a delay
    setTimeout(() => {
      startAutoPlay();
    }, 1000);
  };

  const handleInterestsMouseUp = () => {
    setIsInterestsDragging(false);
    if (interestsRef.current) {
      interestsRef.current.style.cursor = 'grab';
    }
    // Resume auto-play after a delay
    setTimeout(() => {
      startAutoPlay();
    }, 1000);
  };

  const handleInterestsMouseMove = (e) => {
    if (!isInterestsDragging || !interestsRef.current) return;
    e.preventDefault();
    const x = e.pageX - interestsRef.current.offsetLeft;
    const walk = (x - interestsStartX) * 2; // Scroll speed multiplier
    interestsRef.current.scrollLeft = interestsScrollLeft - walk;
  };

  // Touch event handlers for mobile
  const handleInterestsTouchStart = (e) => {
    if (!interestsRef.current) return;
    setIsInterestsDragging(true);
    setInterestsStartX(e.touches[0].pageX - interestsRef.current.offsetLeft);
    setInterestsScrollLeft(interestsRef.current.scrollLeft);
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
  };

  const handleInterestsTouchMove = (e) => {
    if (!isInterestsDragging || !interestsRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - interestsRef.current.offsetLeft;
    const walk = (x - interestsStartX) * 2;
    interestsRef.current.scrollLeft = interestsScrollLeft - walk;
  };

  const handleInterestsTouchEnd = () => {
    setIsInterestsDragging(false);
    // Resume auto-play after a delay
    setTimeout(() => {
      startAutoPlay();
    }, 1000);
  };

  return (
    <div className="resume-container" data-node-id="2409:571">
      {isMenuOpen && <Menu sections={resumeSections} onClose={() => setIsMenuOpen(false)} />}
      <div className="resume-content" data-node-id="2409:572">
        {/* Header Section */}
        <div className="resume-header-section">
          <div className="resume-header-left">
            <div className="resume-back-button" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
              <div className="resume-back-icon-wrapper">
                <div className="resume-back-icon-rotate">
                  <div className="resume-back-icon">
                    <img alt="" src={imgExpandArrow} />
                  </div>
                </div>
              </div>
            </div>
            <p className="resume-name-text">Sabhya Singhal</p>
          </div>
          <div className="resume-menu-button" onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer' }}>
            <img src={imgMenu} alt="Menu" className="resume-menu-icon" />
            <p className="resume-menu-text">Menu</p>
          </div>
        </div>
        {/* About me Section */}
        <div id="about-me" className="resume-section-header" data-node-id="2409:573">
          <p className="resume-section-title" data-node-id="2409:574">About me</p>
        </div>

        <div className="resume-about-card" data-node-id="2409:575">
          <div className="resume-about-image-wrapper" ref={aboutImageRef} data-node-id="2409:576">
            <img alt="" src={imgRectangle5} className="resume-about-image" />
          </div>
          <div className="resume-about-content" data-node-id="2409:577">
            <div className="resume-about-text-container" ref={aboutTextRef} data-node-id="2409:578">
              <div className="resume-name-card" data-node-id="2409:579">
                <p className="resume-name" data-node-id="2409:580">Sabhya Singhal</p>
                <p className="resume-role" data-node-id="2409:581">Product Designer | Living for experiences!</p>
              </div>
              <div className="resume-description-card" data-node-id="2409:582">
                <div className="resume-description-text" data-node-id="2409:583">
                  <p>
                    <span className="resume-description-bold">UX Designer specializing in intuitive, high-impact experiences that drive customer retention and business growth</span>
                    <br />
                    <span className="resume-description-normal">I bring product thinking into every design decision and am always looking to actively collaborate across design, product, and business where I see a strong vision.</span>
                  </p>
                  <p className="resume-description-normal">
                    Something "about me"
                    <br />
                    I treat my brain like software—always updating it. From tracking design trends to learning a new language to sharpen cognition, and experimenting to find faster, smarter ways to work and understand where I truly excel.  Basically, I enjoy building for a company, for users, and myself—everything in between.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div id="experience" className="resume-experience-section" data-node-id="2409:584">
          <div className="resume-section-header" data-node-id="2409:585">
            <p className="resume-section-title" data-node-id="2409:586">Experience</p>
          </div>

          {/* Magicpin Experience */}
          <div className="resume-experience-card" data-node-id="2409:587">
            <div className="resume-experience-header" data-node-id="2409:588">
              <p className="resume-experience-company" data-node-id="2409:589">Magicpin | Oct 23' - Sept 25'</p>
              <p className="resume-experience-position" data-node-id="2409:590">Product Designer</p>
            </div>
            <ul className="resume-experience-list" data-node-id="2409:591">
              <li><span>Enhanced search suggesters and results by making them intent-aware, reducing drop-offs by 57% and significantly increasing conversions </span></li>
              <li><span>Led end-to-end design for food and fashion delivery products (magicNow, magic9), driving revenue growth by improving brand positioning and optimizing item widget content hierarchy across the app. </span></li>
              <li><span>Simplified magicPay checkout: Identified the problem of information overload and redesigned magicPay flow, increasing daily average users by 24% and reducing transaction time by 27%.  </span></li>
              <li><span>Revisited merchant portal food delivery: Conducted user research and usability testing and incorporated those insights leading to better delivery experience for merchants and reduced support tickets by 48%.  </span></li>
              <li><span>Optimized voucher and delivery checkout flow by implementing progressive disclosure, reducing cognitive load and information overload, resulting in an average of 30% decrease in checkout completion time and significantly improving user experience. </span></li>
              <li><span>Developed a comprehensive Design System, reducing design time by 20% and improving cross-functional collaboration between design and technology, further establishing consistency in UI. </span></li>
              <li><span>Enhanced merchant portal dashboards, streamlining discount creation and incorporating 15+ actionable insights from user feedback. </span></li>
              <li><span>Redesigned Easy Rewards to boost user interaction, with increased redemptions.</span></li>
            </ul>
          </div>

          {/* Flying Saints Experience */}
          <div className="resume-experience-card resume-experience-card-small" data-node-id="2409:592">
            <div className="resume-experience-header" data-node-id="2409:593">
              <p className="resume-experience-company" data-node-id="2409:594">Flying Saints | Jan 23' - April 23'</p>
              <p className="resume-experience-position" data-node-id="2409:595">UI/UX Design Intern</p>
            </div>
            <ul className="resume-experience-list" data-node-id="2409:596">
              <li><span>Acquired 2 new clients through compelling design pitches. Contributed to multiple live website and mobile app projects.</span></li>
            </ul>
          </div>

          {/* NapEazy Experience */}
          <div className="resume-experience-card resume-experience-card-small" data-node-id="2409:597">
            <div className="resume-experience-header" data-node-id="2409:598">
              <p className="resume-experience-company" data-node-id="2409:599">NapEazy | Sept 22' - Nov 22'</p>
              <p className="resume-experience-position" data-node-id="2409:600">Packaging and UX- IC role</p>
            </div>
            <ul className="resume-experience-list" data-node-id="2409:601">
              <li><span>I redesign the packaging for their product, travel pillow. I have also worked for their website UX.</span></li>
            </ul>
          </div>

          {/* Newton School Experience */}
          <div className="resume-experience-card resume-experience-card-small" data-node-id="2409:602">
            <div className="resume-experience-header" data-node-id="2409:603">
              <p className="resume-experience-company" data-node-id="2409:604">Newton School | June 22' - August 22'</p>
              <p className="resume-experience-position" data-node-id="2409:605">Graphic Designer Intern</p>
            </div>
            <ul className="resume-experience-list" data-node-id="2409:606">
              <li><span>Increased rate of response by more than 50% within 2 months by leading different email campaigns. Contributed as a creative planner and did strategy planning. I was also able to achieve maximum one day registration, via e-mails, till then.</span></li>
            </ul>
          </div>
        </div>

        {/* Education Section */}
        <div id="education" className="resume-education-section">
          <div className="resume-section-header">
            <p className="resume-section-title">Education</p>
          </div>

          <div className="resume-education-card">
            <p className="resume-education-institution">NIFT | July 19' - June 23'</p>
            <p className="resume-education-degree">Fashion Communication</p>
            <ul className="resume-education-list">
              <li>
                <span>Activities and societies: Literary Club</span>
                <ul className="resume-education-sublist">
                  <li><span>Organized "Kisse and kahaniya", a storytelling session to understand the cultural diversity at NIFT and providing a platform for people to share their experiences and stories that are dying.</span></li>
                  <li><span>Unraveled the "Indian approach to design" with a team of designers and shared it with fellow students and staffs.</span></li>
                </ul>
              </li>
              <li><span>Minor : Fashion Management, Storytelling & Narratives, and Copywriting.</span></li>
            </ul>
          </div>
        </div>

        {/* Certification Section */}
        <div id="certification" className="resume-certification-section">
          <div className="resume-section-header">
            <p className="resume-section-title">Certification</p>
          </div>

          <div className="resume-certification-cards">
            <div className="resume-certification-card">
              <p className="resume-certification-organization">IxDF, Interaction Design Foundation</p>
              <p className="resume-certification-course">AI in Design</p>
            </div>
            <div className="resume-certification-card">
              <p className="resume-certification-organization">UC San diego | Coursera</p>
              <p className="resume-certification-course">Human Computer Interaction</p>
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div id="interests" className="resume-interests-section">
          <div className="resume-section-header">
            <p className="resume-section-title">Interests</p>
          </div>

          <div 
            className="resume-interests-carousel"
            ref={interestsRef}
            onMouseDown={handleInterestsMouseDown}
            onMouseLeave={handleInterestsMouseLeave}
            onMouseUp={handleInterestsMouseUp}
            onMouseMove={handleInterestsMouseMove}
            onTouchStart={handleInterestsTouchStart}
            onTouchMove={handleInterestsTouchMove}
            onTouchEnd={handleInterestsTouchEnd}
          >
            {duplicatedImages.map((image, index) => (
              <div key={`${image.id}-${index}`} className="resume-interest-card">
                <img 
                  src={image.img} 
                  alt={image.name}
                  className="resume-interest-image"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div id="footer" className="resume-footer-section">
          <div className="resume-footer-left">
            <p className="resume-footer-connect">Let's connect. Drop me a 👋 hi!</p>
            <p className="resume-footer-email">singhalsabhya05@gmail.com</p>
          </div>
          <div className="resume-footer-right">
            <p className="resume-footer-curated">Curated by <strong>Sabhya Singhal</strong></p>
            <p className="resume-footer-powered">Powered by fun, food, and caffeine...</p>
            <div className="resume-footer-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
