import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css';
import Menu from './Menu';
import searchGif from '../video/search_gif.gif';
import imgIPhone15ProWhiteFinal from '../images/delivery-checkout/iphone-15-pro-white-final.png';

import imgExpandArrow from '../images/search/expand-arrow.png';
import imgMenu from '../images/search/menu.png';
import imgRectangle11 from '../images/search/rectangle11.png';
import imgRectangle12 from '../images/search/rectangle12.png';
import imgRectangle13 from '../images/search/rectangle13.png';
import imgVersion1 from '../images/search/version1.png';
import imgVersion21 from '../images/search/version21.png';
import imgSearchFinal1 from '../images/search/search-final1.png';
import imgFineDine from '../images/search/fine-dine.png';
import imgLine33 from '../images/search/line33.png';
import imgLine34 from '../images/search/line34.png';
import imgArrow1 from '../images/search/arrow1.png';
import imgLine36 from '../images/search/line36.png';

const Search = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const searchSections = [
    { id: 'search-title', title: 'Magicpin\'s search' },
    { id: 'previous-search', title: 'Previous search experience' },
    { id: 'problem', title: 'Problem' },
    { id: 'problem-identification', title: 'Problem identification' },
    { id: 'touchpoints', title: 'Touchpoints' },
    { id: 'product-lifecycle', title: 'Product lifecycle' },
    { id: 'brainstorming', title: 'Brainstorming' },
    { id: 'design-principles', title: 'Design principles' },
    { id: 'fulfilling-requirements', title: 'Fulfilling all product requirements' },
    { id: 'how-to-tackle', title: 'How do we tackle this problem?' },
    { id: 'version-2', title: 'Version 2' },
    { id: 'key-design-decisions', title: 'Key Design Decisions' },
    { id: 'solution', title: 'Solution' },
    { id: 'intent-based-suggesters', title: 'Intent based suggesters' },
    { id: 'keeping-intent-clear', title: 'Keeping the intent clear' },
    { id: 'my-learning', title: 'My learning' },
  ];

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="search-container" data-node-id="2351:19">
      {isMenuOpen && <Menu sections={searchSections} onClose={() => setIsMenuOpen(false)} />}
      <div className="search-background" data-node-id="2351:20"></div>
      <div className="search-content-wrapper" data-node-id="2351:21">
        <div className="search-content" data-node-id="2351:22">
          <div className="search-inner-content" data-node-id="2351:23">
            {/* Header Section */}
            <div className="search-header" data-node-id="2351:24">
              <div className="search-header-left" data-node-id="2351:25">
                <div className="search-back-button" data-node-id="2351:26" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
                  <div className="search-back-icon-wrapper">
                    <div className="search-back-icon-rotate">
                      <div className="search-back-icon" data-name="Expand Arrow" data-node-id="2351:27">
                        <img alt="" src={imgExpandArrow} />
                      </div>
                    </div>
                  </div>
                </div>
                <p className="search-name" data-node-id="2351:28">Sabhya Singhal</p>
              </div>
              <div className="search-menu-button" data-node-id="2351:29" onClick={() => setIsMenuOpen(true)} style={{ cursor: 'pointer' }}>
                <div className="search-menu-icon" data-name="Menu" data-node-id="2351:30">
                  <img alt="" src={imgMenu} />
                </div>
                <p className="search-menu-text" data-node-id="2351:31">Menu</p>
              </div>
            </div>

            {/* Title Section */}
            <div id="search-title" className="search-title-section" data-node-id="2351:32">
              <p className="search-main-title" data-node-id="2351:33">Magicpin's search</p>
              <div className="search-description-wrapper" data-node-id="2351:34">
                <p className="search-description" data-node-id="2351:35">
                  This project focused on rethinking how search experience should work across a multi-service ecosystem, balancing relevance, intent, and clarity- to improve both user experience and business outcomes.
                </p>
              </div>
            </div>

            {/* Previous Search Experience Section */}
            <div id="previous-search" className="search-previous-section" data-node-id="2351:36">
              <div className="search-previous-title-wrapper" data-node-id="2351:37">
                <div className="search-previous-title" data-node-id="2351:38">
                  <p>Previous search experience</p>
                </div>
              </div>
              <div className="search-previous-image-container" data-node-id="2351:39">
                <div className="search-previous-image-wrapper">
                  <img alt="" src={imgRectangle11} />
                </div>
              </div>
              <div className="search-previous-captions" data-node-id="2351:40">
                <p className="search-caption" data-node-id="2351:41">Global search</p>
                <p className="search-caption" data-node-id="2351:42">Recent searches has all services and categories combined with no flexibility to segregate.</p>
                <p className="search-caption" data-node-id="2351:43">No clear distinction between going out and delivery merchants.</p>
                <p className="search-caption" data-node-id="2351:44">Only services and offers segregation. Fine dine/ budget dine visibility missing.</p>
              </div>
            </div>

            {/* Background sections */}
            <div className="search-bg-section-2" data-node-id="2351:46"></div>
            <div className="search-bg-section-3" data-node-id="2351:47"></div>

            {/* Problem Sections Wrapper */}
            <div className="search-problem-wrapper">
              {/* Problem Section */}
              <div id="problem" className="search-problem-section" data-node-id="2351:48">
                <p className="search-section-title" data-node-id="2351:49">Problem</p>
                <p className="search-section-text" data-node-id="2351:50">
                  Magicpin's global search suggesters struggled to scale across multiple categories and three services, resulting in cluttered and poorly contextualized suggestions. Users found it overwhelming to identify relevant options, leading to friction and reduced search effectiveness. Data showed a clear drop in search engagement and conversions, creating an urgent need to redesign the suggesters.
                </p>
              </div>

              {/* Problem Identification Section */}
              <div id="problem-identification" className="search-problem-identification-section" data-node-id="2351:51">
                <p className="search-section-title" data-node-id="2351:52">Problem identification</p>
                <p className="search-section-text" data-node-id="2351:53">
                  During in-office observation, I noticed users opened Magicpin only after deciding what to order or buy on other apps. They spent minimal time exploring or discovering and directly searched for a known merchant or brand. This highlighted a weak search and discovery experience, which was later discussed with product stakeholders and validated through data.
                </p>
              </div>
            </div>

            {/* Touchpoints Section */}
            <div id="touchpoints" className="search-touchpoints-section" data-node-id="2351:54">
              <p className="search-touchpoints-title" data-node-id="2351:55">How do we understand pains of the stakeholders involved?</p>
              <div className="search-touchpoints-content" data-node-id="2351:56">
                <div className="search-touchpoints-header" data-node-id="2351:57">
                  <p className="search-touchpoints-header-text" data-node-id="2351:58">Touchpoints!</p>
                </div>
                <div className="search-touchpoints-line" data-node-id="2351:59">
                  <img alt="" src={imgLine33} />
                </div>
                <div className="search-touchpoints-body" data-node-id="2351:60">
                  <div className="search-touchpoints-question" data-node-id="2351:61">
                    <div className="search-touchpoints-question-text" data-node-id="2351:62">
                      <p>How are they</p>
                      <p>being affected?</p>
                    </div>
                  </div>
                  <div className="search-touchpoints-lists" data-node-id="2351:63">
                    <div className="search-touchpoints-list-item" data-node-id="2351:64">
                      <div className="search-touchpoints-badge" data-node-id="2351:65">
                        <p className="search-touchpoints-badge-text" data-node-id="2351:66">Users</p>
                      </div>
                      <ul className="search-touchpoints-list" data-node-id="2351:67">
                        <li><span>Overwhelming and cluttered search suggestions increased cognitive load</span></li>
                        <li><span>Irrelevant results made it harder for users to identify the right intent</span></li>
                        <li><span>Higher chances of misclicks and search abandonment</span></li>
                        <li><span>Reduced trust in search, leading to lower engagement.</span></li>
                      </ul>
                    </div>
                    <div className="search-touchpoints-list-item" data-node-id="2351:68">
                      <div className="search-touchpoints-badge" data-node-id="2351:69">
                        <p className="search-touchpoints-badge-text" data-node-id="2351:70">Business</p>
                      </div>
                      <ul className="search-touchpoints-list" data-node-id="2351:71">
                        <li><span>Lower search engagement and drop-offs due to poor suggester relevance</span></li>
                        <li><span>Missed conversion opportunities as users struggled to discover the right merchants or offers</span></li>
                        <li><span>Users relied on competitor apps to decide what to eat, then returned to Magicpin only to place the order (observed during dogfooding usability testing)</span></li>
                        <li><span>Search failing as a discovery and decision-making surface, weakening Magicpin's competitive edge</span></li>
                        <li><span>Users dropping from magicpin app might not come again to explore offers and order form us.</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="search-divider">
              <img alt="" src={imgLine34} />
            </div>

            {/* Product Lifecycle Section */}
            <div id="product-lifecycle" className="search-lifecycle-section" data-node-id="2351:72">
              <p className="search-section-title" data-node-id="2351:73">Product lifecycle</p>
              <p className="search-section-text" data-node-id="2351:74">
                Go through to this and get a summary of everything that happened during this product lifecycle.
              </p>
              <div className="search-lifecycle-image" data-node-id="2351:75">
                <img alt="" src={imgRectangle12} />
              </div>
            </div>

            {/* Divider */}
            <div className="search-divider" data-node-id="2351:76">
              <img alt="" src={imgLine34} />
            </div>

            {/* Brainstorming Section */}
            <div id="brainstorming" className="search-brainstorming-section" data-node-id="2351:77">
              <div className="search-brainstorming-content" data-node-id="2351:78">
                <p className="search-section-title" data-node-id="2351:79">Brainstorming</p>
                <div className="search-brainstorming-text" data-node-id="2351:80">
                  <p>Purpose: Split services and categories</p>
                  <p>Make this more visible and accessible to switch between them</p>
                  <p>Highlight what is most important</p>
                  <p>Understand similarity and differences between system and the real world</p>
                </div>
              </div>
              <div className="search-brainstorming-image-container" data-node-id="2351:81">
                <div className="search-brainstorming-image-wrapper">
                  <img alt="" src={imgRectangle13} />
                </div>
              </div>
            </div>

            {/* Design Principles Section */}
            <div id="design-principles" className="search-principles-section" data-node-id="2351:82">
              <p className="search-section-title" data-node-id="2351:83">Design principles</p>
              <div className="search-principles-list" data-node-id="2351:84">
                <div className="search-principles-row" data-node-id="2351:85">
                  <ul className="search-principles-item" data-node-id="2351:86">
                    <li><span>Intent before category: Understand why the user is searching before showing what</span></li>
                  </ul>
                  <ul className="search-principles-item" data-node-id="2351:87">
                    <li><span>Reduce cognitive load: Fewer, clearer suggestions over exhaustive lists</span></li>
                  </ul>
                </div>
                <div className="search-principles-row" data-node-id="2351:88">
                  <ul className="search-principles-item" data-node-id="2351:89">
                    <li><span>Context over global ranking: Suggestions should adapt to service, location, and behavior</span></li>
                  </ul>
                  <ul className="search-principles-item" data-node-id="2351:90">
                    <li><span>Search as discovery: Enable exploration, not just retrieval</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Fulfilling Requirements Section */}
            <div id="fulfilling-requirements" className="search-requirements-section" data-node-id="2351:91">
              <div className="search-requirements-content" data-node-id="2351:92">
                <p className="search-section-title" data-node-id="2351:93">Fulfilling all product requirements</p>
                <p className="search-section-text" data-node-id="2351:94">This is how the V1 looked after fulfilling all kinds of product and business requirements. </p>
              </div>
              <div className="search-requirements-image-section" data-node-id="2351:95">
                <div className="search-requirements-image" data-name="Version 1" data-node-id="2351:96">
                  <img alt="" src={imgVersion1} />
                </div>
              </div>
            </div>

            {/* How to Tackle Section */}
            <div id="how-to-tackle" className="search-tackle-section" data-node-id="2351:97">
              <div className="search-tackle-left" data-node-id="2351:98">
                <div className="search-tackle-content" data-node-id="2351:99">
                  <p className="search-section-title" data-node-id="2351:100">How do we tackle this problem?</p>
                  <p className="search-section-text" data-node-id="2351:101">In a room full of people fighting for in-app real estate, it is important for a designer to listen, understand, align, and speak. This is what I did! </p>
                </div>
                <div className="search-tackle-steps" data-node-id="2351:102">
                  <div className="search-tackle-step" data-node-id="2351:103">
                    <p className="search-tackle-step-title" data-node-id="2351:104">Listen</p>
                    <div className="search-tackle-step-content" data-node-id="2351:105">
                      <p>Opinion: User needs catered product specific.</p>
                      <p>Goal: Increase conversion</p>
                    </div>
                  </div>
                  <div className="search-tackle-step" data-node-id="2351:108">
                    <p className="search-tackle-step-title" data-node-id="2351:109">Understand</p>
                    <div className="search-tackle-step-content" data-node-id="2351:110">
                      <p>Providing a certain product/feature more visibility might solve these problems (Hypothesis driven).</p>
                      <p>Motivation</p>
                    </div>
                  </div>
                  <div className="search-tackle-step" data-node-id="2351:113">
                    <div className="search-tackle-step-align" data-node-id="2351:114">
                      <p className="search-tackle-step-title" data-node-id="2351:115">Align</p>
                      <div className="search-tackle-step-content" data-node-id="2351:116">
                        <p>Business:</p>
                        <p>Everyone wants more business, but through different ways. </p>
                      </div>
                    </div>
                    <div className="search-tackle-step-speak" data-node-id="2351:117">
                      <p className="search-tackle-step-title" data-node-id="2351:118">Speak</p>
                      <div className="search-tackle-arrow" data-node-id="2351:119">
                        <div>
                          <img alt="" src={imgArrow1} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="search-tackle-right" data-node-id="2351:120">
                <div className="search-tackle-quote" data-name="Text block" data-node-id="2351:120">
                  <p className="search-tackle-quote-text" data-node-id="2351:121">Discovery can afford business bias; search cannot—users expect intent, not persuasion.</p>
                  <p className="search-tackle-quote-subtext" data-node-id="2351:122">This is exactly what I spoke in the meeting in order to start driving the product from a user-first stand point.</p>
                </div>
              </div>
            </div>

            {/* Version 2 Section */}
            <div id="version-2" className="search-version2-section" data-node-id="2351:123">
              <p className="search-section-title" data-node-id="2351:124">Version 2</p>
              <div className="search-version2-text" data-node-id="2351:125">
                <p>Tackled the problem of:</p>
                <p>
                  1) Flexibility- Users can now switch between services and categories to see the desired results.
                  <br aria-hidden="true" />
                  2) Visibility + Usability: Switching services ( going out/ home delivery/ online vouchers) is easier as they are more prominent & comes with a simpler interaction. Additionally, offers and other L2 filters are also easily paired with the services and categories.
                </p>
              </div>
              <div className="search-version2-image" data-name="Version 2 1" data-node-id="2351:126">
                <div className="search-version2-image-wrapper">
                  <img alt="" src={imgVersion21} />
                </div>
              </div>
              <p className="search-version2-note" data-node-id="2351:127">
                Yet, there still lies a problem of showing multiple categories suggestions given the user intent isn't clear.
              </p>
            </div>

            {/* Divider */}
            <div className="search-divider" data-node-id="2351:128">
              <img alt="" src={imgLine34} />
            </div>

            {/* Key Design Decisions Section */}
            <div id="key-design-decisions" className="search-decisions-section" data-node-id="2351:129">
              <p className="search-section-title" data-node-id="2351:130">Key Design Decisions</p>
              <div className="search-decision-item" data-node-id="2351:131">
                <p className="search-decision-title" data-node-id="2351:132">Contextual suggesters</p>
                <ol className="search-decision-list" data-node-id="2351:133" start="1">
                  <li>Replaced global suggesters with service-aware suggestions tailored to food, local, or brand-based intent.</li>
                </ol>
              </div>
              <div className="search-decision-item" data-node-id="2351:134">
                <p className="search-decision-title" data-node-id="2351:135">Intent-Based Ranking</p>
                <ol className="search-decision-list" data-node-id="2351:136" start="2">
                  <li>Prioritized suggestions based on user behavior, recency, and locality instead of generic popularity.</li>
                </ol>
              </div>
              <div className="search-decision-item" data-node-id="2351:137">
                <p className="search-decision-title" data-node-id="2351:138">Progressive disclosure</p>
                <ol className="search-decision-list" data-node-id="2351:139" start="3">
                  <li>Limited initial suggestions to high-confidence options, allowing deeper exploration only when needed.</li>
                </ol>
              </div>
            </div>

            {/* Solution Section */}
            <div id="solution" className="search-solution-wrapper">
              <div className="search-solution-bg"></div>
              <div className="search-solution-section" data-node-id="2351:140">
                <div className="search-solution-left" data-node-id="2351:141">
                  <p className="search-solution-title" data-node-id="2351:142">Solution</p>
                  <ol className="search-solution-list" data-node-id="2351:143" start="1">
                    <li><span>De-prioritizing global search from shop page</span></li>
                  </ol>
                  <div className="search-solution-text" data-node-id="2351:144">
                    <p data-node-id="2351:145">Highlighting "food delivery" after removing the search bar from the shop page header. (Prioritizing the primary product)</p>
                    <p data-node-id="2351:146">Now, the user will choose category first, providing us with clear user intent in order to generate better suggestions.</p>
                  </div>
                </div>
                <div className="search-solution-right" data-name="iPhone 15 Pro - White" data-node-id="2351:147">
                  <div className="search-solution-phone-frame">
                    <img src={imgIPhone15ProWhiteFinal} alt="iPhone 15 Pro White" className="search-solution-phone-bg" />
                  </div>
                  <div className="search-solution-phone" data-name="Screen **Insert Designs here**" data-node-id="2351:148">
                    <img alt="" src={searchGif} />
                  </div>
                </div>
              </div>
            </div>

            {/* Intent Based Suggesters Section */}
            <div id="intent-based-suggesters" className="search-intent-section" data-node-id="2351:150">
              <ol className="search-intent-list" data-node-id="2351:151" start="2">
                <li><span>Intent based suggesters</span></li>
              </ol>
              <p className="search-section-text" data-node-id="2351:152">
                Users will now follow by selecting the service and category from the shop page, leading towards the discovery and further entering the search to experience specific suggestions and better results.
              </p>
              <div className="search-intent-image" data-name="Search final 1" data-node-id="2351:153">
                <div className="search-intent-image-wrapper">
                  <img alt="" src={imgSearchFinal1} />
                </div>
              </div>
            </div>

            {/* Keeping Intent Clear Section */}
            <div id="keeping-intent-clear" className="search-intent-clear-section" data-node-id="2351:154">
              <ol className="search-intent-list" data-node-id="2351:155" start="3">
                <li><span>Keeping the intent clear and the results consistent</span></li>
              </ol>
              <p className="search-section-text" data-node-id="2351:156">Example: User when enter through going out, fine dining, will see the final results in the same segment. </p>
              <div className="search-intent-clear-image" data-name="Fine dine" data-node-id="2351:157">
                <div className="search-intent-clear-image-wrapper">
                  <img alt="" src={imgFineDine} />
                </div>
              </div>
            </div>

            {/* My Learning Section */}
            <div id="my-learning" className="search-learning-wrapper">
              <div className="search-learning-bg"></div>
              <div className="search-learning-section" data-node-id="2351:158">
                <p className="search-learning-title" data-node-id="2351:159">My learning</p>
                <p className="search-learning-subtitle" data-node-id="2351:160">Balancing product and business needs</p>
                <div className="search-learning-text" data-node-id="2351:161">
                  <p className="search-learning-text-item" data-node-id="2351:162">
                    This project truly taught and tested my product thinking and when to prioritize users above business and vice versa.
                  </p>
                  <p className="search-learning-text-item" data-node-id="2351:163">
                    A key takeaway would be, coming out with multiple solutions in every product discussion to make sure that tech feasibility isn't a blocker.
                  </p>
                </div>
              </div>
              
              {/* Final Divider */}
              <div className="search-divider search-learning-divider" data-node-id="2351:164">
                <img alt="" src={imgLine36} />
              </div>

              {/* Final CTA */}
              <p className="search-final-cta" data-node-id="2351:165">
                Let's connect to discuss what can be done differently today!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
