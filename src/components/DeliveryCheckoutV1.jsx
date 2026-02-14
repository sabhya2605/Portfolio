import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryCheckoutV1.css';
import Menu from './Menu';

/**
 * Delivery Checkout V1 – Figma-driven sections.
 * Section order (by node ID): 17118(header) → 17126 → 17133 → [17136,17139 in bg] → 17144 → 17175 → 17205,17233 (Rect 17) → …
 * When adding a new Figma selection, insert by node ID order and update this comment.
 * See .cursor/rules/figma-selection-delivery-checkout-v1.mdc for the import workflow.
 */

// Menu icon: inline SVG (or add src/images/delivery-checkout/menu.png and use img)
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

const DeliveryCheckoutV1 = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { id: 'delivery-title', title: 'Delivery checkout | Magicpin' },
    { id: 'problem', title: 'Problem' },
    { id: 'why-problem', title: 'Why is it a problem?' },
    { id: 'breaking-down', title: 'Breaking down the need to solve this' },
    { id: 'opportunity', title: 'Opportunity' },
    { id: 'things-working', title: 'Things that have been working for us' },
    { id: 'competitor-analysis', title: 'Competitor analysis' },
    { id: 'one-clicks', title: 'One clicks' },
  ];

  return (
    <div className="dc-v1-page" data-node-id="2362:17112">
      {isMenuOpen && <Menu sections={sections} onClose={() => setIsMenuOpen(false)} />}

      {/* Selection 1: Header - flex, width 1200px, space-between, align center, bg #FFF */}
      <header className="dc-v1-selection-1" data-node-id="2362:17118">
        <div className="dc-v1-selection-1-inner">
          <div className="dc-v1-header-left">
            <button type="button" className="dc-v1-back" onClick={() => navigate(-1)} aria-label="Back">
              <span className="dc-v1-back-icon">{expandArrowSvg}</span>
            </button>
            <p className="dc-v1-name">Sabhya Singhal</p>
          </div>
          <button type="button" className="dc-v1-menu-btn" onClick={() => setIsMenuOpen(true)}>
            <span className="dc-v1-menu-icon"><MenuIcon /></span>
            <span className="dc-v1-menu-text">Menu</span>
          </button>
        </div>
      </header>

      <main className="dc-v1-main">
        {/* Selection 2: Title section - flex column, gap 24px, align-self stretch */}
        <section id="delivery-title" className="dc-v1-selection-2 dc-v1-gap" data-node-id="2362:17126">
          <div className="dc-v1-selection-2-inner">
            <h1 className="dc-v1-main-title">Delivery checkout | Magicpin</h1>
            <div className="dc-v1-description-block">
              <p className="dc-v1-tagline">Match between system and the real world</p>
              <p className="dc-v1-description">
                This was the inspiration behind the entire design and product re-vamp for voucher and delivery checkout.
              </p>
            </div>
          </div>
        </section>

        {/* Problem section - 80px gap */}
        <section id="problem" className="dc-v1-problem dc-v1-gap" data-node-id="2362:17133">
          <div className="dc-v1-content-inner">
            <h2 className="dc-v1-section-title">Problem</h2>
            <p className="dc-v1-section-text">
              The delivery checkout process had high user drop rates as users spent a lot of time on it, which could be because of lack of clarity around discounts, insufficient prioritization of upsell/cross-sell options, and poor visibility of charges.
            </p>
          </div>
        </section>

        {/* BG layer Rectangle 14 - full width #F3FAF3, no horizontal padding from screen */}
        <div className="dc-v1-bg-layer" data-name="Rectangle 14">
          <div className="dc-v1-bg-layer-inner">
            {/* Block 2362:17136 - Why is it a problem? */}
            <section id="why-problem" className="dc-v1-block dc-v1-gap-inner" data-node-id="2362:17136">
              <h2 className="dc-v1-section-title">Why is it a problem?</h2>
              <p className="dc-v1-section-text">
                This confusion and lack of information hierarchy lead to user frustration and abandonment of carts, resulting in lost sales opportunities and decreased overall conversion rates. Users struggle to understand their payment details and available promotions, which further hinders their shopping experience.
              </p>
            </section>
            {/* Block 2362:17139 - Breaking down the need to solve this */}
            <section id="breaking-down" className="dc-v1-block" data-node-id="2362:17139">
              <h2 className="dc-v1-section-title">Breaking down the need to solve this</h2>
              <p className="dc-v1-section-text">
                Improving the checkout experience is crucial for providing better experience to users in order to retain customers. By addressing issues, we can enhance user satisfaction, maximize revenue through effective upselling, and streamline the checkout process, ultimately fostering long-term customer loyalty and business growth.
              </p>
            </section>
          </div>
        </div>

        {/* Selection 4: Opportunity - 1176px × 944px, bg #FFF, 80px gap above */}
        <section id="opportunity" className="dc-v1-selection-4 dc-v1-gap" data-node-id="2362:17144">
          <div className="dc-v1-selection-4-inner">
            <h2 className="dc-v1-section-title dc-v1-opportunity-title">Opportunity</h2>
            <div className="dc-v1-opportunity-mockups">
              <div className="dc-v1-mockup-item">
                <img src={`${process.env.PUBLIC_URL || ''}/images/delivery-checkout-v1/mockup-cognition.png`} alt="Discount highlight and product upsell" className="dc-v1-mockup-img" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.add('dc-v1-mockup-placeholder-visible'); }} />
                <div className="dc-v1-mockup-placeholder">Export from Figma (node 2362:17144)</div>
                <p className="dc-v1-mockup-label">1. Discount highlight and product upsell</p>
              </div>
              <div className="dc-v1-mockup-item">
                <img src={`${process.env.PUBLIC_URL || ''}/images/delivery-checkout-v1/mockup-discount.png`} alt="Progressive disclosure of payment details" className="dc-v1-mockup-img" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.add('dc-v1-mockup-placeholder-visible'); }} />
                <div className="dc-v1-mockup-placeholder">Export from Figma (node 2362:17144)</div>
                <p className="dc-v1-mockup-label">2. Progressive disclosure of payment details</p>
              </div>
              <div className="dc-v1-mockup-item">
                <img src={`${process.env.PUBLIC_URL || ''}/images/delivery-checkout-v1/mockup-progressive.png`} alt="Cognition at checkout decision making" className="dc-v1-mockup-img" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.add('dc-v1-mockup-placeholder-visible'); }} />
                <div className="dc-v1-mockup-placeholder">Export from Figma (node 2362:17144)</div>
                <p className="dc-v1-mockup-label">3. Cognition at checkout decision making</p>
              </div>
            </div>
          </div>
        </section>

        {/* Selection 2362:17175 - Things that have been working for us (title in image) */}
        <section id="things-working" className="dc-v1-things-working dc-v1-gap" data-node-id="2362:17175">
          <div className="dc-v1-things-working-inner">
            <div className="dc-v1-things-working-content">
              <img
                src={`${process.env.PUBLIC_URL || ''}/images/delivery-checkout-v1/things-working-for-us.png`}
                alt="Things that have been working for us"
                className="dc-v1-things-working-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling?.classList.add('dc-v1-mockup-placeholder-visible');
                }}
              />
              <div className="dc-v1-things-working-placeholder">
                Export from Figma (node 2362:17175)
              </div>
            </div>
          </div>
        </section>

        {/* Rectangle 17 – full width #094020, left to right of screen; contains 17205 + 17233 */}
        <div id="competitor-analysis" className="dc-v1-rect-17 dc-v1-gap" data-name="Rectangle 17">
          <div className="dc-v1-rect-17-inner">
            {/* Selection 2362:17205 – flex column, align-items center, gap 41px (title/subtitle in image) */}
            <div className="dc-v1-selection-17205" data-node-id="2362:17205">
              <div className="dc-v1-competitor-visual">
                <img
                  src={`${process.env.PUBLIC_URL || ''}/images/delivery-checkout-v1/competitor-analysis.png`}
                  alt="Competitor analysis"
                  className="dc-v1-competitor-analysis-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling?.classList.add('dc-v1-mockup-placeholder-visible');
                  }}
                />
                <div className="dc-v1-mockup-placeholder">Export from Figma (node 2362:17205)</div>
              </div>
            </div>
            {/* Selection 2362:17233 – flex, justify-content center, align-items flex-start, gap 71px */}
            <div id="one-clicks" className="dc-v1-selection-17233" data-node-id="2362:17233">
              <img
                src={`${process.env.PUBLIC_URL || ''}/images/delivery-checkout-v1/one-clicks.png`}
                alt="One clicks - Same content with different positioning"
                className="dc-v1-one-clicks-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling?.classList.add('dc-v1-mockup-placeholder-visible');
                }}
              />
              <div className="dc-v1-mockup-placeholder">Export from Figma (node 2362:17233)</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeliveryCheckoutV1;
