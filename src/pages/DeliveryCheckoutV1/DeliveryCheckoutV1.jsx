import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuV1 from './MenuV1';
import './DeliveryCheckoutV1.css';
import imgMockupDiscount from '../../images/delivery-checkout-v1/mockup-discount.png';
import imgMockupProgressive from '../../images/delivery-checkout-v1/mockup-progressive.png';
import imgMockupCognition from '../../images/delivery-checkout-v1/mockup-cognition.png';
import imgCompetitorPhone1 from '../../images/delivery-checkout/competitor-phone-1.png';
import imgCompetitorPhone2 from '../../images/delivery-checkout/competitor-phone-2.png';
import imgOneClickZomato from '../../images/delivery-checkout/one-click-zomato.png';
import imgOneClickSwiggy from '../../images/delivery-checkout/one-click-swiggy.png';
import imgPro from '../../images/delivery-checkout/pro.png';
import imgNonPro1 from '../../images/delivery-checkout/non-pro-1.png';
import imgPro1 from '../../images/delivery-checkout/pro-1.png';
import imgPd1 from '../../images/delivery-checkout/pd-1.png';
import imgDeliveryTipAdded2 from '../../images/delivery-checkout/delivery-tip-added-2.png';
import imgDeliveryTipAdded from '../../images/delivery-checkout/delivery-tip-added.png';
import imgPro1Pd1 from '../../images/delivery-checkout/pro-1-pd-1.png';
import imgThingsWorkingForUs from '../../images/delivery-checkout/things-working-for-us.png';

const EXPAND_ARROW_SVG = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HAMBURGER_SVG = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DeliveryCheckoutV1 = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { id: 'dcv1-title', title: 'Delivery checkout | Magicpin' },
    { id: 'dcv1-problem', title: 'Problem' },
    { id: 'dcv1-why-problem', title: 'Why is it a problem?' },
    { id: 'dcv1-breaking-down', title: 'Breaking down the need to solve this' },
    { id: 'dcv1-opportunity', title: 'Opportunity' },
    { id: 'dcv1-things-working', title: 'Things that have been working' },
    { id: 'dcv1-competitor', title: 'Competitor analysis' },
    { id: 'dcv1-one-clicks', title: 'One clicks' },
    { id: 'dcv1-design-solution', title: 'Design Solution' },
    { id: 'dcv1-phase-01', title: 'Phase 01 Payment details' },
  ];

  const handleBackClick = () => navigate('/');

  return (
    <div className="dcv1-container">
      {isMenuOpen && <MenuV1 sections={sections} onClose={() => setIsMenuOpen(false)} />}
      <div className="dcv1-content-wrapper">
        <header className="dcv1-header">
          <div className="dcv1-header-left">
            <button className="dcv1-back-button" onClick={handleBackClick} aria-label="Back">
              <span className="dcv1-back-icon">{EXPAND_ARROW_SVG}</span>
            </button>
            <span className="dcv1-user-name">Sabhya Singhal</span>
          </div>
          <button className="dcv1-menu-button" onClick={() => setIsMenuOpen(true)} aria-label="Menu">
            <span className="dcv1-menu-icon">{HAMBURGER_SVG}</span>
            <span className="dcv1-menu-text">Menu</span>
          </button>
        </header>

        <div className="dcv1-content">
          <div id="dcv1-title" className="dcv1-title-block">
            <div className="dcv1-main-title">Delivery checkout | Magicpin</div>
            <div className="dcv1-title-subtitle">Match between system and the real world</div>
            <p className="dcv1-title-description">This was the inspiration behind the entire design and product re-vamp for voucher and delivery checkout.</p>
          </div>

          <div id="dcv1-problem" className="dcv1-section" data-node-id="2362:17133">
            <h2 className="dcv1-section-title dcv1-section-title-large">Problem</h2>
            <p className="dcv1-section-text">The delivery checkout process had high user drop rates as users spent a lot of time on it, which <strong>could be</strong> because of lack of clarity around discounts, insufficient prioritization of upsell/cross-sell options, and poor visibility of charges.</p>
          </div>

          <div className="dcv1-bg-layer" data-node-id="2362:17136">
            <div className="dcv1-bg-layer-inner">
              <div id="dcv1-why-problem" className="dcv1-section" data-node-id="2362:17136">
                <h2 className="dcv1-section-title dcv1-section-title-large">Why is it a problem?</h2>
                <p className="dcv1-section-text">This confusion and lack of information hierarchy lead to user frustration and abandonment of carts, resulting in lost sales opportunities and decreased overall conversion rates. Users struggle to understand their payment details and available promotions, which further hinders their shopping experience.</p>
              </div>
              <div id="dcv1-breaking-down" className="dcv1-section" data-node-id="2362:17139">
                <h2 className="dcv1-section-title dcv1-section-title-large">Breaking down the need to solve this</h2>
                <p className="dcv1-section-text">Improving the checkout experience is crucial for providing better experience to users in order to retain customers. By addressing issues, we can enhance user satisfaction, maximize revenue through effective upselling, and streamline the checkout process, ultimately fostering long-term customer loyalty and business growth.</p>
              </div>
            </div>
          </div>

          <div className="dcv1-gap" />

          <div id="dcv1-opportunity" className="dcv1-section" data-node-id="2362:17144">
            <h2 className="dcv1-section-title">Opportunity</h2>
            <div className="dcv1-opportunity-row">
              <div className="dcv1-opportunity-column">
                <img src={imgMockupDiscount} alt="Discount highlight and product upsell" className="dcv1-mockup" />
                <p className="dcv1-opportunity-label">Discount highlight and product upsell</p>
              </div>
              <div className="dcv1-opportunity-column">
                <img src={imgMockupProgressive} alt="Progressive disclosure of payment details" className="dcv1-mockup" />
                <p className="dcv1-opportunity-label">Progressive disclosure of payment details</p>
              </div>
              <div className="dcv1-opportunity-column">
                <img src={imgMockupCognition} alt="Cognition at checkout decision making" className="dcv1-mockup" />
                <p className="dcv1-opportunity-label">Cognition at checkout decision making</p>
              </div>
            </div>
          </div>

          <div id="dcv1-things-working" className="dcv1-things-working-section" data-node-id="2362:17175">
            <div className="dcv1-things-working-content">
              <img src={imgThingsWorkingForUs} alt="Things that have been working for us" className="dcv1-things-working-image" />
            </div>
          </div>

          <div className="dcv1-rectangle17-wrapper" data-node-id="2362:17205">
            <div className="dcv1-rectangle17-content">
              <div id="dcv1-competitor" className="dcv1-competitor-section">
                <h2 className="dcv1-section-title">Competitor analysis</h2>
                <p className="dcv1-section-subtitle">Analyzing what is, and why is it, working for our competitors.</p>
                <div className="dcv1-competitor-grid">
                  <img src={imgCompetitorPhone1} alt="Competitor 1" className="dcv1-competitor-phone-1" />
                  <img src={imgCompetitorPhone2} alt="Competitor 2" className="dcv1-competitor-phone-2" />
                </div>
              </div>
              <div id="dcv1-one-clicks" className="dcv1-one-clicks-section" data-node-id="2362:17233">
                <h2 className="dcv1-section-title">One clicks</h2>
                <p className="dcv1-section-subtitle">Same content with different positioning</p>
                <div className="dcv1-one-clicks-items">
                  <img src={imgOneClickZomato} alt="Zomato" className="dcv1-one-clicks-item" />
                  <img src={imgOneClickSwiggy} alt="Swiggy" className="dcv1-one-clicks-item" />
                </div>
              </div>
            </div>
          </div>

          <div id="dcv1-design-solution" className="dcv1-phases-wrapper" data-node-id="2362:17243">
            <div className="dcv1-phases-section">
              <div className="dcv1-design-solution-title">
                <div className="dcv1-phases-title-text dcv1-design">DESIGN</div>
                <div className="dcv1-phases-title-text dcv1-solution">SOLUTION</div>
              </div>
              <div className="dcv1-design-phases-list">
                <div className="dcv1-design-phase-item">
                  <div className="dcv1-design-phase-heading">Phase: 01</div>
                  <div className="dcv1-design-phase-title">Payment Details</div>
                  <p className="dcv1-design-phase-desc">This was <strong>prioritized</strong> in order to incorporate it across all the verticals in the customer app.</p>
                </div>
                <div className="dcv1-design-phase-item">
                  <div className="dcv1-design-phase-heading">Phase: 02</div>
                  <div className="dcv1-design-phase-title">Checkout landing</div>
                  <p className="dcv1-design-phase-desc">This included everything: Items cards, Address selection, Upselling different products, Cross sell widgets, Instructions, Offers and other policies.</p>
                </div>
                <div className="dcv1-design-phase-item">
                  <div className="dcv1-design-phase-heading">Phase: 03</div>
                  <div className="dcv1-design-phase-title">Highlighting Takeaway</div>
                  <p className="dcv1-design-phase-desc">With changing business requirement, order takeaway was supposed to be given attention in order to tackle different delivery flaws and also to enhance business.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="dcv1-gap" />
          <div id="dcv1-phase-01" className="dcv1-phase01-section" data-node-id="2362:17258">
            <p className="dcv1-phase01-title" data-node-id="2362:17259">Phase : 01</p>
            <p className="dcv1-phase01-subtitle" data-node-id="2362:17260">Payment details</p>
          </div>

          <div className="dcv1-phase01-bg-wrapper" data-node-id="2362:17261">
            <div className="dcv1-phase01-bg-inner">
              <div className="dcv1-phase01-image-frame">
                <div className="dcv1-phase01-images-container" data-node-id="2362:17265">
                  <div className="dcv1-phase01-phone-slot">
                    <div className="dcv1-phase01-image" data-node-id="2362:17266">
                      <img src={imgPro} alt="Pro" className="dcv1-phase01-img" />
                    </div>
                    <span className="dcv1-phase01-label-spacer" aria-hidden="true" />
                  </div>
                  <div className="dcv1-phase01-phone-slot">
                    <div className="dcv1-phase01-image" data-node-id="2362:17267">
                      <img src={imgNonPro1} alt="Non pro 1" className="dcv1-phase01-img" />
                    </div>
                    <span className="dcv1-phase01-label-spacer" aria-hidden="true" />
                  </div>
                  <div className="dcv1-phase01-phone-slot">
                    <div className="dcv1-phase01-image" data-node-id="2362:17268">
                      <img src={imgPro1} alt="Pro 1" className="dcv1-phase01-img" />
                    </div>
                    <span className="dcv1-phase01-label-spacer" aria-hidden="true" />
                  </div>
                  <div className="dcv1-phase01-arrow-slot" data-node-id="2362:17272">
                    <img src={imgPro1Pd1} alt="Arrow" className="dcv1-phase01-arrow-img" />
                  </div>
                  <div className="dcv1-phase01-phone-slot dcv1-phase01-phone-with-label">
                    <div className="dcv1-phase01-image" data-node-id="2362:17269">
                      <img src={imgPd1} alt="PD 1" className="dcv1-phase01-img" />
                    </div>
                    <p className="dcv1-phase01-label" data-node-id="2362:17263">delivery tip not added</p>
                  </div>
                  <div className="dcv1-phase01-phone-slot dcv1-phase01-phone-with-label">
                    <div className="dcv1-phase01-image" data-node-id="2362:17270">
                      <img src={imgDeliveryTipAdded2} alt="Delivery tip added 2" className="dcv1-phase01-img" />
                    </div>
                    <p className="dcv1-phase01-label" data-node-id="2362:17262">delivery tip added</p>
                  </div>
                  <div className="dcv1-phase01-phone-slot dcv1-phase01-phone-with-label">
                    <div className="dcv1-phase01-image" data-node-id="2362:17271">
                      <img src={imgDeliveryTipAdded} alt="Delivery tip added" className="dcv1-phase01-img" />
                    </div>
                    <p className="dcv1-phase01-label" data-node-id="2362:17264">delivery tip added from here</p>
                  </div>
                </div>
              </div>
              <p className="dcv1-phase01-description">
                Inspired by competitor patterns, we highlighted <strong>discount coupons</strong> upfront to ensure quick visibility within users' <strong>limited attention span</strong>, aiming to increase delight. To reduce <strong>cognitive load</strong> from multiple calculations, <strong>payment details</strong> were moved to a <strong>bottom-sheet interaction</strong>, making the action more focused and intentional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCheckoutV1;
