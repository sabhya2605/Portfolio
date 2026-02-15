import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchV1.css';
import Menu from './Menu';

/**
 * Search V1 – Figma frame 2351:19 (1440×10629), sections 2351:32 and 2351:36 only.
 * Layout: flex column, gap 24px, align-items flex-start, align-self stretch.
 */

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const expandArrowSvg = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SearchV1 = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'search-title', title: "Magicpin's search" },
    { id: 'previous-search', title: 'Previous search experience' },
    { id: 'problem', title: 'Problem' },
    { id: 'problem-identification', title: 'Problem identification' },
    { id: 'touchpoints', title: 'Touchpoints' },
  ];

  return (
    <div className="sv1-page" data-node-id="2351:19">
      {isMenuOpen && <Menu sections={sections} onClose={() => setIsMenuOpen(false)} />}

      <header className="sv1-header" data-node-id="2351:24">
        <div className="sv1-header-inner">
          <div className="sv1-header-left">
            <button type="button" className="sv1-back" onClick={() => navigate(-1)} aria-label="Back">
              <span className="sv1-back-icon">{expandArrowSvg}</span>
            </button>
            <p className="sv1-name">Sabhya Singhal</p>
          </div>
          <button type="button" className="sv1-menu-btn" onClick={() => setIsMenuOpen(true)}>
            <span className="sv1-menu-icon"><MenuIcon /></span>
            <span className="sv1-menu-text">Menu</span>
          </button>
        </div>
      </header>

      <main className="sv1-main">
        {/* Section 2351:32 – flex column, gap 24px, align-items flex-start, align-self stretch */}
        <section id="search-title" className="sv1-section sv1-section-title" data-node-id="2351:32">
          <h1 className="sv1-main-title">Magicpin's search</h1>
          <div className="sv1-description-wrapper" data-node-id="2351:34">
            <p className="sv1-description" data-node-id="2351:35">
              This project focused on rethinking how search experience should work across a multi-service ecosystem, balancing relevance, intent, and clarity- to improve both user experience and business outcomes.
            </p>
          </div>
        </section>

        {/* Section 2351:36 – same flex */}
        <section id="previous-search" className="sv1-section sv1-section-previous" data-node-id="2351:36">
          <div className="sv1-previous-title-wrapper" data-node-id="2351:37">
            <h2 className="sv1-previous-title" data-node-id="2351:38">Previous search experience</h2>
          </div>
          <div className="sv1-previous-image-container" data-node-id="2351:39">
            <img
              src={`${process.env.PUBLIC_URL || ''}/images/search-v1/previous-search-image.png`}
              alt="Previous search experience"
              className="sv1-previous-image"
            />
          </div>
          <div className="sv1-previous-captions" data-node-id="2351:40">
            <p className="sv1-caption" data-node-id="2351:41">Global search</p>
            <p className="sv1-caption" data-node-id="2351:42">Recent searches has all services and categories combined with no flexibility to segregate.</p>
            <p className="sv1-caption" data-node-id="2351:43">No clear distinction between going out and delivery merchants.</p>
            <p className="sv1-caption" data-node-id="2351:44">Only services and offers segregation. Fine dine/ budget dine visibility missing.</p>
          </div>
        </section>

        {/* Rectangle 14 – full-width #F3FAF3; inside: 2351:48, 2351:51 */}
        <div className="sv1-rect14" data-name="Rectangle 14">
          <div className="sv1-rect14-inner">
            <section id="problem" className="sv1-section sv1-block" data-node-id="2351:48">
              <h2 className="sv1-section-heading">Problem</h2>
              <p className="sv1-section-text">
                Magicpin's global search suggesters struggled to scale across multiple categories and three services, resulting in cluttered and poorly contextualized suggestions. Users found it overwhelming to identify relevant options, leading to friction and reduced search effectiveness. Data showed a clear drop in search engagement and conversions, creating an urgent need to redesign the suggesters.
              </p>
            </section>
            <section id="problem-identification" className="sv1-section sv1-block" data-node-id="2351:51">
              <h2 className="sv1-section-heading">Problem identification</h2>
              <p className="sv1-section-text">
                During in-office observation, I noticed users opened Magicpin only after deciding what to order or buy on other apps. They spent minimal time exploring or discovering and directly searched for a known merchant or brand. This highlighted a weak search and discovery experience, which was later discussed with product stakeholders and validated through data.
              </p>
            </section>
          </div>
        </div>

        {/* Section 2351:54 – flex column, gap 24px, align-items flex-start, align-self stretch */}
        <section id="touchpoints" className="sv1-section sv1-touchpoints" data-node-id="2351:54">
          <h2 className="sv1-touchpoints-title" data-node-id="2351:55">How do we understand pains of the stakeholders involved?</h2>
          <div className="sv1-touchpoints-content" data-node-id="2351:56">
            <div className="sv1-touchpoints-header" data-node-id="2351:57">
              <p className="sv1-touchpoints-header-text" data-node-id="2351:58">Touchpoints!</p>
            </div>
            <div className="sv1-touchpoints-line" data-node-id="2351:59" aria-hidden />
            {/* 2351:60 – display: flex; padding: 0 24px; align-items: flex-start; gap: 10px; align-self: stretch */}
            <div className="sv1-touchpoints-body" data-node-id="2351:60">
              <div className="sv1-touchpoints-question" data-node-id="2351:61">
                <p className="sv1-touchpoints-question-text" data-node-id="2351:62">
                  How are they<br />being affected?
                </p>
              </div>
              <div className="sv1-touchpoints-lists" data-node-id="2351:63">
                <div className="sv1-touchpoints-list-item" data-node-id="2351:64">
                  <div className="sv1-touchpoints-badge" data-node-id="2351:65">
                    <span className="sv1-touchpoints-badge-text" data-node-id="2351:66">Users</span>
                  </div>
                  <ul className="sv1-touchpoints-list" data-node-id="2351:67">
                    <li>Overwhelming and cluttered search suggestions increased cognitive load</li>
                    <li>Irrelevant results made it harder for users to identify the right intent</li>
                    <li>Higher chances of misclicks and search abandonment</li>
                    <li>Reduced trust in search, leading to lower engagement.</li>
                  </ul>
                </div>
                <div className="sv1-touchpoints-list-item" data-node-id="2351:68">
                  <div className="sv1-touchpoints-badge" data-node-id="2351:69">
                    <span className="sv1-touchpoints-badge-text" data-node-id="2351:70">Business</span>
                  </div>
                  <ul className="sv1-touchpoints-list" data-node-id="2351:71">
                    <li>Lower search engagement and drop-offs due to poor suggester relevance</li>
                    <li>Missed conversion opportunities as users struggled to discover the right merchants or offers</li>
                    <li>Users relied on competitor apps to decide what to eat, then returned to Magicpin only to place the order (observed during dogfooding usability testing)</li>
                    <li>Search failing as a discovery and decision-making surface, weakening Magicpin's competitive edge</li>
                    <li>Users dropping from magicpin app might not come again to explore offers and order form us.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SearchV1;
