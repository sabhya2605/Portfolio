import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryCheckout.css';
import Menu from './Menu';
import imgMenu from '../images/delivery-checkout/menu.png';
import imgOpportunityMockup1 from '../images/delivery-checkout/opportunity-mockup1.png';
import imgOpportunityMockup2 from '../images/delivery-checkout/opportunity-mockup2.png';
import imgOpportunityMockup3 from '../images/delivery-checkout/opportunity-mockup.png';
import imgCompetitorPhone1 from '../images/delivery-checkout/competitor-phone-1.png';
import imgCompetitorPhone2 from '../images/delivery-checkout/competitor-phone-2.png';
import imgCompetitorPhone3 from '../images/delivery-checkout/competitor-phone-3.png';
import imgHighlight1 from '../images/delivery-checkout/highlight-1.png';
import imgHighlight2 from '../images/delivery-checkout/highlight-2.png';
import imgHighlight4 from '../images/delivery-checkout/highlight-4.png';
import imgLine19 from '../images/delivery-checkout/line-19.png';
import imgLine17 from '../images/delivery-checkout/line-17.png';
import imgLine13 from '../images/delivery-checkout/line-13.png';
import imgLine11 from '../images/delivery-checkout/line-11.png';
import imgLine188 from '../images/delivery-checkout/line-188.png';
import imgOneClickZomato from '../images/delivery-checkout/one-click-zomato.png';
import imgOneClickSwiggy from '../images/delivery-checkout/one-click-swiggy.png';
import imgPro from '../images/delivery-checkout/pro.png';
import imgNonPro1 from '../images/delivery-checkout/non-pro-1.png';
import imgPro1 from '../images/delivery-checkout/pro-1.png';
import imgPd1 from '../images/delivery-checkout/pd-1.png';
import imgDeliveryTipAdded2 from '../images/delivery-checkout/delivery-tip-added-2.png';
import imgDeliveryTipAdded from '../images/delivery-checkout/delivery-tip-added.png';
import imgPro1Pd1 from '../images/delivery-checkout/pro-1-pd-1.png';
import imgPhase02Phone1 from '../images/delivery-checkout/phase02-phone-1.png';
import imgPhase02Phone2 from '../images/delivery-checkout/phase02-phone-2.png';
import imgPhase02Phone3 from '../images/delivery-checkout/phase02-phone-3.png';
import imgAndroidSilver from '../images/delivery-checkout/android-silver.png';
import imgReviewedFileS11 from '../images/delivery-checkout/reviewed-file-s1-1.png';
import imgAndroidSilverBenefits from '../images/delivery-checkout/android-silver-benefits.png';
import imgMagic9Benefits from '../images/delivery-checkout/magic9-benefits.png';
import imgReviewedFileBenefits from '../images/delivery-checkout/reviewed-file-benefits.png';
import imgMagicNow from '../images/delivery-checkout/magic-now.png';
import imgLine179 from '../images/delivery-checkout/line-179.png';
import imgLine180 from '../images/delivery-checkout/line-180.png';
import imgLine181 from '../images/delivery-checkout/line-181.png';
import imgLine182 from '../images/delivery-checkout/line-182.png';
import imgLine190 from '../images/delivery-checkout/line-190.png';
import imgLine191 from '../images/delivery-checkout/line-191.png';
import imgAndroidSilverPhase03 from '../images/delivery-checkout/android-silver-phase03.png';
import imgCouponApplied from '../images/delivery-checkout/coupon-applied.png';
import imgMxPageTakeaway from '../images/delivery-checkout/mx-page-takeaway.png';
import imgAndroidLSilver1 from '../images/delivery-checkout/android-l-silver-1.png';
import imgAddress1 from '../images/delivery-checkout/address-1.png';
import imgCheckoutTakeaway from '../images/delivery-checkout/checkout-takeaway.png';
import imgMxToPg from '../images/delivery-checkout/mx-to-pg.png';
import imgLine179Phase03 from '../images/delivery-checkout/line-179-phase03.png';
import imgLine180Phase03 from '../images/delivery-checkout/line-180-phase03.png';
import imgLine185 from '../images/delivery-checkout/line-185.png';
import imgLine184 from '../images/delivery-checkout/line-184.png';
import imgPaymentScreenErrorPrevention from '../images/delivery-checkout/payment-screen-error-prevention.png';
import imgPaymentScreen2 from '../images/delivery-checkout/payment-screen-2.png';
import imgPaymentScreen3 from '../images/delivery-checkout/payment-screen-3.png';
import imgIPhone15ProWhiteFinal from '../images/delivery-checkout/iphone-15-pro-white-final.png';
import imgAndroidSilverFinalBg from '../images/delivery-checkout/android-silver-final-bg.png';
import imgFinalComparison from '../images/delivery-checkout/final-comparison.png';
import imgScreenInsertDesignsHereIPhone from '../images/delivery-checkout/screen-insert-designs-here-iphone.png';
import imgWhatsappImageFinal from '../images/delivery-checkout/whatsapp-image-final.png';
import imgScreenInsertDesignsHereAndroidUpdated from '../images/delivery-checkout/screen-insert-designs-here-android-updated.png';
import imgMacbookAirM2SilverFlatten from '../images/delivery-checkout/macbook-air-m2-silver-flatten.png';
import imgThingsWorkingForUs from '../images/delivery-checkout/things-working-for-us.png';
import gifCheckOut from '../video/Check_out.gif';

// Use the same icon as Search page
const imgExpandArrow = "https://www.figma.com/api/mcp/asset/e7b4aaa2-c1b6-44a7-b8b3-5f3e28cfa3ec";

const DeliveryCheckout = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const deliveryCheckoutSections = [
    { id: 'delivery-title', title: 'Delivery checkout | Magicpin' },
    { id: 'problem', title: 'Problem' },
    { id: 'why-problem', title: 'Why is it a problem?' },
    { id: 'breaking-down', title: 'Breaking down the need to solve this' },
    { id: 'opportunity', title: 'Opportunity' },
    { id: 'things-working', title: 'Things that have been working' },
    { id: 'competitor-analysis', title: 'Competitor analysis' },
    { id: 'design-solution', title: 'Design Solution' },
    { id: 'phase-01', title: 'Phase 01' },
    { id: 'phase-02', title: 'Phase 02' },
    { id: 'phase-03', title: 'Phase 03' },
    { id: 'learning', title: 'Learning' },
    { id: 'impact', title: 'Impact' },
    { id: 'final-comparison', title: 'Final Comparison' },
  ];

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="delivery-checkout-container" data-node-id="2362:17114">
      {isMenuOpen && <Menu sections={deliveryCheckoutSections} onClose={() => setIsMenuOpen(false)} />}
      <div className="delivery-checkout-content-wrapper" data-node-id="2362:17115">
        {/* Header Section */}
        <div className="delivery-checkout-header" data-node-id="2362:17118">
          <div className="delivery-checkout-header-left" data-node-id="2362:17119">
            <div className="delivery-checkout-back-button" data-node-id="2362:17120" onClick={handleBackClick}>
              <div className="delivery-checkout-back-icon-wrapper">
                <div className="delivery-checkout-back-icon-rotate">
                  <div className="delivery-checkout-back-icon" data-name="Expand Arrow" data-node-id="2362:17121">
                    <img alt="" src={imgExpandArrow} />
                  </div>
                </div>
              </div>
            </div>
            <p className="delivery-checkout-name" data-node-id="2362:17122">Sabhya Singhal</p>
          </div>
          <div className="delivery-checkout-menu-button" data-node-id="2362:17123" onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer' }}>
            <div className="delivery-checkout-menu-icon" data-name="Menu" data-node-id="2362:17124">
              <img alt="" src={imgMenu} />
            </div>
            <p className="delivery-checkout-menu-text" data-node-id="2362:17125">Menu</p>
          </div>
        </div>

        <div className="delivery-checkout-content" data-node-id="2362:17116">
          {/* Title Section */}
          <div id="delivery-title" className="delivery-checkout-title-section" data-node-id="2362:17126">
            <p className="delivery-checkout-main-title" data-node-id="2362:17127">Delivery checkout | Magicpin</p>
            <div className="delivery-checkout-description-wrapper" data-node-id="2362:17128">
              <p className="delivery-checkout-description" data-node-id="2362:17129">
                <span className="delivery-checkout-description-bold">Match between system and the real world</span>
                <br aria-hidden="true" />
                <span className="delivery-checkout-description-normal">This was the inspiration behind the entire design and product re-vamp for voucher and delivery checkout.</span>
              </p>
            </div>
          </div>

          {/* Problem Section */}
          <div id="problem" className="delivery-checkout-problem-section" data-node-id="2362:17133">
            <p className="delivery-checkout-section-title" data-node-id="2362:17134">Problem</p>
            <p className="delivery-checkout-section-text" data-node-id="2362:17135">
              The delivery checkout process had high user drop rates as users spent a lot of time on it, which <span className="delivery-checkout-text-bold">could be</span> because of lack of clarity around discounts, insufficient prioritization of upsell/cross-sell options, and poor visibility of charges.
            </p>
          </div>

          {/* Why is it a problem? Section Wrapper - node 2362:17136 */}
          <div className="delivery-checkout-why-problem-section-wrapper" data-node-id="2362:17136">
            {/* Background Rectangle 14 - covers Why is it a problem? and Breaking down sections */}
            <div className="delivery-checkout-bg-rectangle-14" data-node-id="2362:17129"></div>
            
            {/* Why is it a problem? Section */}
            <div id="why-problem" className="delivery-checkout-why-problem-section">
              <p className="delivery-checkout-section-title" data-node-id="2362:17137">Why is it a problem?</p>
              <p className="delivery-checkout-section-text" data-node-id="2362:17138">
                This confusion and lack of information hierarchy lead to user frustration and abandonment of carts, resulting in lost sales opportunities and decreased overall conversion rates. Users struggle to understand their payment details and available promotions, which further hinders their shopping experience.
              </p>
            </div>

            {/* Breaking down the need to solve this Section - node 2362:17139 */}
            <div id="breaking-down" className="delivery-checkout-breaking-down-section" data-node-id="2362:17139">
              <p className="delivery-checkout-section-title" data-node-id="2362:17140">Breaking down the need to solve this</p>
              <p className="delivery-checkout-section-text" data-node-id="2362:17141">
                Improving the checkout experience is crucial for providing better experience to users in order to retain customers. By addressing issues, we can enhance user satisfaction, maximize revenue through effective upselling, and streamline the checkout process, ultimately fostering long-term customer loyalty and business growth.
              </p>
            </div>
          </div>

          {/* Opportunity Section - node 2362:17142 */}
          <div id="opportunity" className="delivery-checkout-opportunity-section" data-node-id="2362:17142">
            <div className="delivery-checkout-opportunity-content" data-node-id="2362:17143">
              <div className="delivery-checkout-opportunity-card" data-node-id="2362:17144">
                <div className="delivery-checkout-opportunity-header" data-node-id="2362:17148">
                  <p className="delivery-checkout-section-title delivery-checkout-opportunity-title" data-node-id="2362:17149">Opportunity</p>
                  <div className="delivery-checkout-opportunity-mockups" data-node-id="2362:17150">
                    <div className="delivery-checkout-opportunity-mockups-wrapper" data-node-id="2362:17151">
                      {/* Third Mockup - node 2362:17170 (leftmost) */}
                      <div className="delivery-checkout-opportunity-mockup-container delivery-checkout-opportunity-mockup-3" data-node-id="2362:17170">
                        <img src={imgOpportunityMockup3} alt="Opportunity Mockup 3" className="delivery-checkout-opportunity-mockup-image" />
                      </div>
                      {/* First Mockup - node 2362:17154 (middle) */}
                      <div className="delivery-checkout-opportunity-mockup-container delivery-checkout-opportunity-mockup-1" data-node-id="2362:17154">
                        <img src={imgOpportunityMockup1} alt="Opportunity Mockup 1" className="delivery-checkout-opportunity-mockup-image" />
                      </div>
                      {/* Second Mockup - node 2362:17162 (rightmost) */}
                      <div className="delivery-checkout-opportunity-mockup-container delivery-checkout-opportunity-mockup-2" data-node-id="2362:17162">
                        <img src={imgOpportunityMockup2} alt="Opportunity Mockup 2" className="delivery-checkout-opportunity-mockup-image" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Labels at bottom of card */}
                <div className="delivery-checkout-opportunity-labels" data-node-id="2362:17145">
                  <ol className="delivery-checkout-opportunity-label-list" start="1" data-node-id="2362:17145">
                    <li>
                      <span>Discount highlight</span>
                      <br aria-hidden="true" />
                      <span>and product upsell</span>
                    </li>
                  </ol>
                  <ol className="delivery-checkout-opportunity-label-list" start="2" data-node-id="2362:17146">
                    <li><span>Progressive disclosure of payment details</span></li>
                  </ol>
                  <ol className="delivery-checkout-opportunity-label-list" start="3" data-node-id="2362:17147">
                    <li><span>Cognition at checkout decision making</span></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Things that have been working for us Section - node 2362:17175 */}
          <div id="things-working" className="delivery-checkout-things-working-section" data-node-id="2362:17175">
            <div className="delivery-checkout-things-working-content">
              <img src={imgThingsWorkingForUs} alt="Things that have been working for us" className="delivery-checkout-things-working-image" />
            </div>
          </div>

          {/* Competitor Analysis Section - node 2362:17205 */}
          <div id="competitor-analysis" className="delivery-checkout-competitor-section-wrapper" data-node-id="2362:17205">
            <div className="delivery-checkout-bg-rectangle-competitor" data-node-id="2362:17205-bg"></div>
            <div className="delivery-checkout-competitor-analysis-header" data-node-id="2362:17206">
              <p className="delivery-checkout-section-title delivery-checkout-section-title-white" data-node-id="2362:17207">Competitor analysis</p>
              <p className="delivery-checkout-section-text delivery-checkout-section-text-white" data-node-id="2362:17208">
                Analyzing what is, and why is it, working for our competitors.
              </p>
            </div>
            <div className="delivery-checkout-competitor-grid" data-node-id="2362:17209">
              <div className="delivery-checkout-competitor-phone-1" data-node-id="2362:17210">
                <img src={imgCompetitorPhone1} alt="Competitor Phone 1" className="delivery-checkout-competitor-image" />
              </div>
              <div className="delivery-checkout-competitor-phone-2" data-node-id="2362:17211">
                <img src={imgCompetitorPhone2} alt="Competitor Phone 2" className="delivery-checkout-competitor-image" />
              </div>
              <p className="delivery-checkout-annotation-label delivery-checkout-annotation-1" data-node-id="2362:17212">Delivering at address</p>
              <p className="delivery-checkout-annotation-label delivery-checkout-annotation-2" data-node-id="2362:17213">Total savings- priority</p>
              <div className="delivery-checkout-highlight-box delivery-checkout-highlight-1" data-node-id="2362:17214">
                <img src={imgHighlight1} alt="Highlight 1" className="delivery-checkout-highlight-image" />
              </div>
              <div className="delivery-checkout-line delivery-checkout-line-1" data-node-id="2362:17215">
                <img src={imgLine19} alt="Line 1" className="delivery-checkout-line-image" />
              </div>
              <div className="delivery-checkout-line delivery-checkout-line-2" data-node-id="2362:17216">
                <img src={imgLine19} alt="Line 2" className="delivery-checkout-line-image" />
              </div>
              <div className="delivery-checkout-line delivery-checkout-line-3" data-node-id="2362:17217">
                <img src={imgLine19} alt="Line 3" className="delivery-checkout-line-image" />
              </div>
              <p className="delivery-checkout-annotation-label delivery-checkout-annotation-3" data-node-id="2362:17218">Repetitive information</p>
              <div className="delivery-checkout-line delivery-checkout-line-4" data-node-id="2362:17219">
                <img src={imgLine17} alt="Line 4" className="delivery-checkout-line-image" />
              </div>
              <div className="delivery-checkout-line delivery-checkout-line-5" data-node-id="2362:17220">
                <img src={imgLine17} alt="Line 5" className="delivery-checkout-line-image" />
              </div>
              <div className="delivery-checkout-line delivery-checkout-line-6" data-node-id="2362:17221">
                <img src={imgLine17} alt="Line 6" className="delivery-checkout-line-image" />
              </div>
              <p className="delivery-checkout-annotation-label delivery-checkout-annotation-4" data-node-id="2362:17222">Coupon applied upfront.</p>
              <div className="delivery-checkout-line delivery-checkout-line-7" data-node-id="2362:17223">
                <img src={imgLine13} alt="Line 7" className="delivery-checkout-line-image" />
              </div>
              <div className="delivery-checkout-highlight-box delivery-checkout-highlight-2" data-node-id="2362:17224">
                <img src={imgHighlight2} alt="Highlight 2" className="delivery-checkout-highlight-image" />
              </div>
              <div className="delivery-checkout-line delivery-checkout-line-8" data-node-id="2362:17225">
                <img src={imgLine11} alt="Line 8" className="delivery-checkout-line-image" />
              </div>
              <p className="delivery-checkout-annotation-label delivery-checkout-annotation-5" data-node-id="2362:17226">Delivering at address editable</p>
              <p className="delivery-checkout-annotation-label delivery-checkout-annotation-6" data-node-id="2362:17227">Payment details</p>
              <p className="delivery-checkout-annotation-label delivery-checkout-annotation-7" data-node-id="2362:17228">Delivering at address/ not always editable if the address is pre selected</p>
              <div className="delivery-checkout-highlight-box delivery-checkout-highlight-3" data-node-id="2362:17229">
                <img src={imgCompetitorPhone3} alt="Highlight 3" className="delivery-checkout-highlight-image" />
              </div>
              <div className="delivery-checkout-highlight-box delivery-checkout-highlight-4" data-node-id="2362:17230">
                <img src={imgHighlight4} alt="Highlight 4" className="delivery-checkout-highlight-image" />
              </div>
              <div className="delivery-checkout-line delivery-checkout-line-9" data-node-id="2362:17231">
                <div className="delivery-checkout-line-rotate">
                  <img src={imgLine188} alt="Line 9" className="delivery-checkout-line-image" />
                </div>
              </div>
            </div>
            <div className="delivery-checkout-one-clicks-section" data-node-id="2362:17233">
              <div className="delivery-checkout-one-clicks-header" data-node-id="2362:17234">
                <p className="delivery-checkout-one-clicks-title" data-node-id="2362:17235">One clicks</p>
                <p className="delivery-checkout-one-clicks-description" data-node-id="2362:17236">
                  Same content with different positioning
                </p>
              </div>
              <div className="delivery-checkout-one-clicks-item" data-node-id="2362:17237">
                <p className="delivery-checkout-one-clicks-label" data-node-id="2362:17238">Zomato</p>
                <div className="delivery-checkout-one-clicks-image-wrapper" data-node-id="2362:17239">
                  <img src={imgOneClickZomato} alt="Zomato One Click" className="delivery-checkout-one-clicks-image" />
                </div>
              </div>
              <div className="delivery-checkout-one-clicks-item" data-node-id="2362:17240">
                <p className="delivery-checkout-one-clicks-label" data-node-id="2362:17241">Swiggy</p>
                <div className="delivery-checkout-one-clicks-image-wrapper" data-node-id="2362:17242">
                  <img src={imgOneClickSwiggy} alt="Swiggy One Click" className="delivery-checkout-one-clicks-image" />
                </div>
              </div>
            </div>
          </div>

          {/* Phases Section - node 2362:17243 */}
          <div id="design-solution" className="delivery-checkout-phases-section" data-node-id="2362:17243">
            <div className="delivery-checkout-phases-title" data-node-id="2362:17244">
              <div className="delivery-checkout-phases-title-text" data-node-id="2362:17245">
                <span>D</span><span>E</span><span>S</span><span>I</span><span>G</span><span>N</span>
              </div>
              <div className="delivery-checkout-phases-title-text" data-node-id="2362:17246">
                <span>S</span><span>O</span><span>L</span><span>U</span><span>T</span><span>I</span><span>O</span><span>N</span>
              </div>
            </div>
            <div className="delivery-checkout-phases-content" data-node-id="2362:17247">
              <div className="delivery-checkout-phase-item" data-node-id="2362:17248">
                <p className="delivery-checkout-phase-number" data-node-id="2362:17249">Phase: 01</p>
                <div className="delivery-checkout-phase-details" data-node-id="2362:17250">
                  <p className="delivery-checkout-phase-name" data-node-id="2362:17251">Payment Details</p>
                  <p className="delivery-checkout-phase-description" data-node-id="2362:17252">
                    This was <span className="delivery-checkout-phase-description-bold">prioritized</span> in order to incorporate it across all the verticals in the customer app.
                  </p>
                </div>
              </div>
              <div className="delivery-checkout-phase-item" data-node-id="2362:17251">
                <p className="delivery-checkout-phase-number" data-node-id="2362:17252">Phase: 02</p>
                <div className="delivery-checkout-phase-details" data-node-id="2362:17253">
                  <p className="delivery-checkout-phase-name" data-node-id="2362:17254">Checkout landing</p>
                  <p className="delivery-checkout-phase-description" data-node-id="2362:17255">
                    This included everything: Items cards, Address selection, Upselling different products, Cross sell widgets, Instructions, Offers and other policies.
                  </p>
                </div>
              </div>
              <div className="delivery-checkout-phase-item" data-node-id="2362:17254">
                <p className="delivery-checkout-phase-number" data-node-id="2362:17255">Phase: 03</p>
                <div className="delivery-checkout-phase-details" data-node-id="2362:17256">
                  <p className="delivery-checkout-phase-name" data-node-id="2362:17257">Highlighting Takeaway</p>
                  <p className="delivery-checkout-phase-description" data-node-id="2362:17258">
                    With changing business requirement, order takeaway was supposed to be given attention in order to tackle different delivery flaws and also to enhance business.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 01 Payment Details Section - node 2362:17258 */}
          <div id="phase-01" className="delivery-checkout-phase01-section" data-node-id="2362:17258">
            <p className="delivery-checkout-phase01-title" data-node-id="2362:17259">Phase : 01</p>
            <p className="delivery-checkout-phase01-subtitle" data-node-id="2362:17260">Payment details</p>
            
            {/* Comparison Image Frame - node 2362:17261 */}
            <div className="delivery-checkout-phase01-image-frame" data-node-id="2362:17261">
              <div className="delivery-checkout-phase01-images-container" data-node-id="2362:17265">
                <div className="delivery-checkout-phase01-image delivery-checkout-phase01-pro" data-node-id="2362:17266">
                  <img src={imgPro} alt="Pro" className="delivery-checkout-phase01-img" />
                </div>
                <div className="delivery-checkout-phase01-image delivery-checkout-phase01-non-pro" data-node-id="2362:17267">
                  <img src={imgNonPro1} alt="Non pro 1" className="delivery-checkout-phase01-img" />
                </div>
                <div className="delivery-checkout-phase01-image delivery-checkout-phase01-pro1" data-node-id="2362:17268">
                  <img src={imgPro1} alt="Pro 1" className="delivery-checkout-phase01-img" />
                </div>
                <div className="delivery-checkout-phase01-image delivery-checkout-phase01-pd1" data-node-id="2362:17269">
                  <img src={imgPd1} alt="PD 1" className="delivery-checkout-phase01-img" />
                </div>
                <div className="delivery-checkout-phase01-image delivery-checkout-phase01-tip-added2" data-node-id="2362:17270">
                  <img src={imgDeliveryTipAdded2} alt="Delivery tip added 2" className="delivery-checkout-phase01-img" />
                </div>
                <div className="delivery-checkout-phase01-image delivery-checkout-phase01-tip-added" data-node-id="2362:17271">
                  <img src={imgDeliveryTipAdded} alt="Delivery tip added" className="delivery-checkout-phase01-img" />
                </div>
              </div>
              <div className="delivery-checkout-phase01-arrow" data-node-id="2362:17272">
                <img src={imgPro1Pd1} alt="Arrow" className="delivery-checkout-phase01-arrow-img" />
              </div>
              <p className="delivery-checkout-phase01-label delivery-checkout-phase01-label-1" data-node-id="2362:17262">delivery tip added</p>
              <p className="delivery-checkout-phase01-label delivery-checkout-phase01-label-2" data-node-id="2362:17263">delivery tip not added</p>
              <p className="delivery-checkout-phase01-label delivery-checkout-phase01-label-3" data-node-id="2362:17264">delivery tip added from here</p>
            </div>
          </div>

          {/* Phase 02 Text Content - Above Phase 02 */}
          <div className="delivery-checkout-phase02-intro-text">
            <p className="delivery-checkout-phase02-intro-paragraph-1">
              • Inspired by competitor patterns, we highlighted discount coupons upfront to ensure quick visibility within users' limited attention span, aiming to increase delight.
            </p>
            <p className="delivery-checkout-phase02-intro-paragraph-2">
              • To reduce cognitive load from multiple calculations, payment details were moved to a bottom-sheet interaction, making the action more focused and intentional.
            </p>
          </div>

          {/* Phase 02 Checkout Landing Section - node 2362:17275 */}
          <div id="phase-02" className="delivery-checkout-phase02-section" data-node-id="2362:17275">
            <p className="delivery-checkout-phase02-title" data-node-id="2362:17276">Phase : 02</p>
            <p className="delivery-checkout-phase02-subtitle" data-node-id="2362:17277">Checkout landing</p>

            {/* Dark Green Background Frame - node 2362:17278 */}
            <div className="delivery-checkout-phase02-frame" data-node-id="2362:17278">
              <div className="delivery-checkout-phase02-frame-content" data-node-id="2362:17279">
                {/* Left Section */}
                <div className="delivery-checkout-phase02-left-section" data-node-id="2362:17280">
                  <div className="delivery-checkout-phase02-phone-1" data-node-id="2362:17281">
                    <img src={imgPhase02Phone1} alt="EatFit App" className="delivery-checkout-phase02-phone-img" />
                  </div>
                  <div className="delivery-checkout-phase02-left-text" data-node-id="2362:17282">
                    <div className="delivery-checkout-phase02-problem-text" data-node-id="2362:17283">
                      <p>This page needs no explanation on how cluttered it used to be.</p>
                      <p>It violated multiple laws of heuristics, starting from:</p>
                      <ol>
                        <li>Visibility</li>
                        <li>Consistency</li>
                        <li>Recognition over recall TO</li>
                        <li>Aesthetic and minimal design</li>
                      </ol>
                    </div>
                    <div className="delivery-checkout-phase02-questions" data-node-id="2362:17284">
                      <p>Q1) Why isn't the cooking instructions section with the item list?</p>
                      <p>Q2) Is magicPro cross sell more important than item upsell? What is driving more revenue?</p>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="delivery-checkout-phase02-right-section" data-node-id="2362:17285">
                  <div className="delivery-checkout-phase02-phone-2" data-node-id="2362:17286">
                    <img src={imgPhase02Phone2} alt="Pizza Hut App 1" className="delivery-checkout-phase02-phone-img" />
                  </div>
                  <div className="delivery-checkout-phase02-phone-3" data-node-id="2362:17287">
                    <img src={imgPhase02Phone3} alt="Pizza Hut App 2" className="delivery-checkout-phase02-phone-img" />
                  </div>
                  <div className="delivery-checkout-phase02-right-text" data-node-id="2362:17288">
                    <p className="delivery-checkout-phase02-solution-text" data-node-id="2362:17289">
                      Let's break it down how this solves the mentioned problems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prototype Link */}
            <p className="delivery-checkout-phase02-prototype-link">
              <a 
                href="https://www.figma.com/proto/BKrNUUj9m2FUqPwgbRvnXc/Mp?page-id=45%3A12882&node-id=685-30032&viewport=-2681%2C-4343%2C0.26&t=zdu9JnNudbZsqKtv-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=685%3A30032" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Prototype link: https://www.figma.com/proto/BKrNUUj9m2FUqPwgbRvnXc/Mp?page-id=45%3A12882&node-id=685-30032&viewport=-2681%2C-4343%2C0.26&t=zdu9JnNudbZsqKtv-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=685%3A30032
              </a>
            </p>
          </div>

          {/* Phase 02 Details Section - node 2362:17291 (single image from Figma to match selection exactly) */}
          <div className="delivery-checkout-phase02-details" data-node-id="2362:17291">
            <img
              src={`${process.env.PUBLIC_URL || ''}/images/delivery-checkout/phase02-details-selection.png`}
              alt="Phase 02 Checkout landing – micro animations, offers, toggle, adaptive filter, upsell shimmer"
              className="delivery-checkout-phase02-details-selection-img"
            />
          </div>

          {/* Product Benefits Section - node 2362:17300 (Figma export: flex column, align center, gap 24px, align-self stretch) */}
          <div className="delivery-checkout-product-benefits-section" data-node-id="2362:17300">
            <img
              src={`${process.env.PUBLIC_URL || ''}/images/delivery-checkout/product-benefits-selection.png`}
              alt="Product benefits – magic9 and magicNow"
              className="delivery-checkout-product-benefits-selection-img"
            />
          </div>

          {/* Phase 03 Highlighting Takeaway Section - node 2362:17325 (Figma export: flex, space-between, align center, align-self stretch) */}
          <div id="phase-03" className="delivery-checkout-phase03-section" data-node-id="2362:17325">
            <img
              src={`${process.env.PUBLIC_URL || ''}/images/delivery-checkout/phase03-selection.png`}
              alt="Phase 03 Highlighting takeaway – MX page, checkout, important points"
              className="delivery-checkout-phase03-selection-img"
            />
          </div>

          {/* Phase 03 Detail Section - node 2362:17339 (Figma export: flex, 1440×768, padding 63.617 126 64.423 126, center) */}
          <div className="delivery-checkout-phase03-detail-section" data-node-id="2362:17339">
            <img
              src={`${process.env.PUBLIC_URL || ''}/images/delivery-checkout/phase03-detail-selection.png`}
              alt="Phase 03 Detail – Delivery, Takeaway, From checkout to PG page"
              className="delivery-checkout-phase03-detail-selection-img"
            />
          </div>

          {/* Learning Section - node 2362:17369 (flex column, align flex-start, gap 24px, align-self stretch) */}
          <div id="learning" className="delivery-checkout-learning-section" data-node-id="2362:17369">
            <img
              src={`${process.env.PUBLIC_URL || ''}/images/delivery-checkout/learning-selection.png`}
              alt="Learning – Re-introducing pre-selected payments"
              className="delivery-checkout-learning-selection-img"
            />
          </div>

          {/* Payment Screens Section - node 2362:17374 (flex, align-items center, gap 56px; images from Figma) */}
          <div className="delivery-checkout-payment-screens-section" data-node-id="2362:17374">
            <img
              src={`${process.env.PUBLIC_URL || ''}/images/delivery-checkout/payment-screens-selection.png`}
              alt="Payment screens – Error prevention, Changed payment mode, Payment offers visible, Breakdown of offers"
              className="delivery-checkout-payment-screens-selection-img"
            />
          </div>

          {/* Impact Section - node 2362:18771 (flex, width 1200px, space-between, align center) */}
          <div id="impact" className="delivery-checkout-impact-section" data-node-id="2362:18771">
            <img
              src={`${process.env.PUBLIC_URL || ''}/images/delivery-checkout/impact-selection.png`}
              alt="Impact – Within less than 2 months: 30% reduction, higher conversion"
              className="delivery-checkout-impact-selection-img"
            />
          </div>

          {/* Final Comparison Section - Rectangle 16 background with node 2362:18788 */}
          <div id="final-comparison" className="delivery-checkout-final-comparison-wrapper">
            <div className="delivery-checkout-bg-rectangle-16"></div>
            <div className="delivery-checkout-final-comparison-content" data-node-id="2362:18788">
              <div className="delivery-checkout-final-comparison-text" data-node-id="2362:18789">
                <p className="delivery-checkout-final-comparison-title" data-node-id="2362:18790">Final Comparison</p>
                <p className="delivery-checkout-final-comparison-subtitle" data-node-id="2362:18791">Delivery checkout previously and now.</p>
              </div>
              <div className="delivery-checkout-final-comparison-phone-iphone" data-node-id="2362:18792">
                <div className="delivery-checkout-final-comparison-phone-frame-iphone">
                  <img src={imgIPhone15ProWhiteFinal} alt="iPhone 15 Pro White" className="delivery-checkout-final-comparison-phone-bg-iphone" />
                  <div className="delivery-checkout-final-comparison-screen-iphone" data-node-id="2362:18794">
                    <img src={imgScreenInsertDesignsHereIPhone} alt="Screen" className="delivery-checkout-final-comparison-screen-img-iphone" />
                  </div>
                  <div className="delivery-checkout-final-comparison-overlay-iphone" data-node-id="2362:18797">
                    <div className="delivery-checkout-final-comparison-overlay-content-iphone" data-node-id="2362:18798">
                      <img src={imgWhatsappImageFinal} alt="WhatsApp" className="delivery-checkout-final-comparison-overlay-img-iphone" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="delivery-checkout-final-comparison-phone-android" data-node-id="2362:18799">
                <div className="delivery-checkout-final-comparison-phone-frame-android" data-node-id="2362:18800">
                  <img src={imgAndroidSilverFinalBg} alt="Android Silver" className="delivery-checkout-final-comparison-phone-bg-android" />
                  <div className="delivery-checkout-final-comparison-screen-android" data-node-id="2362:18802">
                    <img src={imgScreenInsertDesignsHereAndroidUpdated} alt="Screen" className="delivery-checkout-final-comparison-screen-img-android" />
                  </div>
                </div>
              </div>
              <div className="delivery-checkout-final-comparison-final-image" data-node-id="2362:18804">
                <img src={imgFinalComparison} alt="Final" className="delivery-checkout-final-comparison-final-img" />
              </div>
            </div>
            <div className="delivery-checkout-connect-text">
              <p>Let's connect to discuss what can be done differently today!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCheckout;
