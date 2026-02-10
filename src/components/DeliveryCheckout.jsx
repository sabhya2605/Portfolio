import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryCheckout.css';
import imgExpandArrow from '../images/delivery-checkout/expand-arrow.png';
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

const DeliveryCheckout = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="delivery-checkout-container" data-node-id="2362:17114">
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
          <div className="delivery-checkout-menu-button" data-node-id="2362:17123">
            <div className="delivery-checkout-menu-icon" data-name="Menu" data-node-id="2362:17124">
              <img alt="" src={imgMenu} />
            </div>
            <p className="delivery-checkout-menu-text" data-node-id="2362:17125">Menu</p>
          </div>
        </div>

        <div className="delivery-checkout-content" data-node-id="2362:17116">
          {/* Title Section */}
          <div className="delivery-checkout-title-section" data-node-id="2362:17126">
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
          <div className="delivery-checkout-problem-section" data-node-id="2362:17133">
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
            <div className="delivery-checkout-why-problem-section">
              <p className="delivery-checkout-section-title" data-node-id="2362:17137">Why is it a problem?</p>
              <p className="delivery-checkout-section-text" data-node-id="2362:17138">
                This confusion and lack of information hierarchy lead to user frustration and abandonment of carts, resulting in lost sales opportunities and decreased overall conversion rates. Users struggle to understand their payment details and available promotions, which further hinders their shopping experience.
              </p>
            </div>

            {/* Breaking down the need to solve this Section - node 2362:17139 */}
            <div className="delivery-checkout-breaking-down-section" data-node-id="2362:17139">
              <p className="delivery-checkout-section-title" data-node-id="2362:17140">Breaking down the need to solve this</p>
              <p className="delivery-checkout-section-text" data-node-id="2362:17141">
                Improving the checkout experience is crucial for providing better experience to users in order to retain customers. By addressing issues, we can enhance user satisfaction, maximize revenue through effective upselling, and streamline the checkout process, ultimately fostering long-term customer loyalty and business growth.
              </p>
            </div>
          </div>

          {/* Opportunity Section - node 2362:17142 */}
          <div className="delivery-checkout-opportunity-section" data-node-id="2362:17142">
            <div className="delivery-checkout-opportunity-content" data-node-id="2362:17143">
              <div className="delivery-checkout-opportunity-card" data-node-id="2362:17144">
                <div className="delivery-checkout-opportunity-header" data-node-id="2362:17148">
                  <p className="delivery-checkout-section-title delivery-checkout-opportunity-title" data-node-id="2362:17149">Opportunity</p>
                  <div className="delivery-checkout-opportunity-mockups" data-node-id="2362:17150">
                    <div className="delivery-checkout-opportunity-mockups-wrapper" data-node-id="2362:17151">
                      {/* First Mockup - node 2362:17154 */}
                      <div className="delivery-checkout-opportunity-mockup-container delivery-checkout-opportunity-mockup-1" data-node-id="2362:17154">
                        <img src={imgOpportunityMockup1} alt="Opportunity Mockup 1" className="delivery-checkout-opportunity-mockup-image" />
                      </div>
                      {/* Second Mockup - node 2362:17162 */}
                      <div className="delivery-checkout-opportunity-mockup-container delivery-checkout-opportunity-mockup-2" data-node-id="2362:17162">
                        <img src={imgOpportunityMockup2} alt="Opportunity Mockup 2" className="delivery-checkout-opportunity-mockup-image" />
                      </div>
                      {/* Third Mockup - node 2362:17170 */}
                      <div className="delivery-checkout-opportunity-mockup-container delivery-checkout-opportunity-mockup-3" data-node-id="2362:17170">
                        <img src={imgOpportunityMockup3} alt="Opportunity Mockup 3" className="delivery-checkout-opportunity-mockup-image" />
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

          {/* Competitor Analysis Section - node 2362:17205 */}
          <div className="delivery-checkout-competitor-section-wrapper" data-node-id="2362:17205">
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
          <div className="delivery-checkout-phases-section" data-node-id="2362:17243">
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
          <div className="delivery-checkout-phase01-section" data-node-id="2362:17258">
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
        </div>
      </div>
    </div>
  );
};

export default DeliveryCheckout;
