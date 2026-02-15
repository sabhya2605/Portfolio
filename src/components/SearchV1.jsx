import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchV1.css';
import Menu from './Menu';
import searchGif from '../video/search_gif.gif';

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
    { id: 'product-lifecycle', title: 'Product lifecycle' },
    { id: 'brainstorming', title: 'Brainstorming' },
    { id: 'design-principles', title: 'Design principles' },
    { id: 'fulfilling-requirements', title: 'Fulfilling all product requirements' },
    { id: 'how-to-tackle', title: 'How do we tackle this problem?' },
    { id: 'version-2', title: 'Version 2' },
    { id: 'key-design-decisions', title: 'Key Design Decisions' },
    { id: 'solution', title: 'Solution' },
    { id: 'intent-based-suggesters', title: 'Intent based suggesters' },
    { id: 'intent-clear-results', title: 'Keeping the intent clear and the results consistent' },
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

        {/* Section 2351:72 – flex column, gap 24px, align-items flex-start, align-self stretch */}
        <section id="product-lifecycle" className="sv1-section sv1-lifecycle" data-node-id="2351:72">
          <h2 className="sv1-section-heading" data-node-id="2351:73">Product lifecycle</h2>
          <p className="sv1-section-text" data-node-id="2351:74">
            Go through to this and get a summary of everything that happened during this product lifecycle.
          </p>
          <div className="sv1-lifecycle-image" data-node-id="2351:75">
            <img
              src={`${process.env.PUBLIC_URL || ''}/images/search-v1/product-lifecycle.png`}
              alt="Product lifecycle"
              className="sv1-lifecycle-img"
            />
          </div>
        </section>

        {/* Section 2351:77 – flex column, align-items center, gap 24px, align-self stretch */}
        <section id="brainstorming" className="sv1-section sv1-brainstorming" data-node-id="2351:77">
          <div className="sv1-brainstorming-content" data-node-id="2351:78">
            <h2 className="sv1-section-heading" data-node-id="2351:79">Brainstorming</h2>
            <div className="sv1-brainstorming-text" data-node-id="2351:80">
              <p>Purpose: Split services and categories</p>
              <p>Make this more visible and accessible to switch between them</p>
              <p>Highlight what is most important</p>
              <p>Understand similarity and differences between system and the real world</p>
            </div>
          </div>
          <div className="sv1-brainstorming-image-container" data-node-id="2351:81">
            <img
              src={`${process.env.PUBLIC_URL || ''}/images/search-v1/brainstorming.png`}
              alt="Brainstorming"
              className="sv1-brainstorming-img"
            />
          </div>
        </section>

        {/* Section 2351:82 – flex, width 1200px, padding-left 16px, flex-direction column, align-items flex-start, gap 24px */}
        <section id="design-principles" className="sv1-principles" data-node-id="2351:82">
          <h2 className="sv1-section-heading" data-node-id="2351:83">Design principles</h2>
          <div className="sv1-principles-list" data-node-id="2351:84">
            <div className="sv1-principles-row" data-node-id="2351:85">
              <ul className="sv1-principles-item" data-node-id="2351:86">
                <li>Intent before category: Understand why the user is searching before showing what</li>
              </ul>
              <ul className="sv1-principles-item" data-node-id="2351:87">
                <li>Reduce cognitive load: Fewer, clearer suggestions over exhaustive lists</li>
              </ul>
            </div>
            <div className="sv1-principles-row" data-node-id="2351:88">
              <ul className="sv1-principles-item" data-node-id="2351:89">
                <li>Context over global ranking: Suggestions should adapt to service, location, and behavior</li>
              </ul>
              <ul className="sv1-principles-item" data-node-id="2351:90">
                <li>Search as discovery: Enable exploration, not just retrieval</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2351:92 – heading + text in HTML; 2539:1574 – image only (no text in image) */}
        <section id="fulfilling-requirements" className="sv1-fulfilling">
          <div className="sv1-fulfilling-content" data-node-id="2351:92">
            <h2 className="sv1-section-heading" data-node-id="2351:93">Fulfilling all product requirements</h2>
            <p className="sv1-section-text" data-node-id="2351:94">
              This is how the V1 looked after fulfilling all kinds of product and business requirements.
            </p>
          </div>
          <div className="sv1-fulfilling-image-wrap" data-node-id="2539:1574">
            <div className="sv1-fulfilling-image">
              <img
                src={`${process.env.PUBLIC_URL || ''}/images/search-v1/fulfilling-requirements-version1.png`}
                alt="Version 1"
                className="sv1-fulfilling-img"
              />
            </div>
          </div>
        </section>

        {/* Section 2351:97 – display: flex; width: 1200px; padding: 0 16px; align-items: center; gap: 24px */}
        <section id="how-to-tackle" className="sv1-tackle" data-node-id="2351:97">
          <div className="sv1-tackle-left" data-node-id="2351:98">
            <div className="sv1-tackle-content" data-node-id="2351:99">
              <h2 className="sv1-section-heading" data-node-id="2351:100">How do we tackle this problem?</h2>
              <p className="sv1-section-text" data-node-id="2351:101">
                In a room full of people fighting for in-app real estate, it is important for a designer to listen, understand, align, and speak. This is what I did!
              </p>
            </div>
            <div className="sv1-tackle-steps" data-node-id="2351:102">
              <div className="sv1-tackle-step" data-node-id="2351:103">
                <p className="sv1-tackle-step-title" data-node-id="2351:104">Listen</p>
                <div className="sv1-tackle-step-content" data-node-id="2351:105">
                  <p>Opinion: User needs catered product specific.</p>
                  <p>Goal: Increase conversion</p>
                </div>
              </div>
              <div className="sv1-tackle-step" data-node-id="2351:108">
                <p className="sv1-tackle-step-title" data-node-id="2351:109">Understand</p>
                <div className="sv1-tackle-step-content" data-node-id="2351:110">
                  <p>Providing a certain product/feature more visibility might solve these problems (Hypothesis driven).</p>
                  <div className="sv1-tackle-motivation-speak-row">
                    <p className="sv1-tackle-body-text">Motivation</p>
                    <div className="sv1-tackle-step-speak-inline" data-node-id="2351:117">
                      <p className="sv1-tackle-step-title" data-node-id="2351:118">Speak</p>
                      <div className="sv1-tackle-arrow" data-node-id="2351:119" aria-hidden>
                        <svg width="112" height="24" viewBox="0 0 112 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2 12h108M108 12L98 6v12l10-6z" stroke="#094020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sv1-tackle-step" data-node-id="2351:114">
                <p className="sv1-tackle-step-title" data-node-id="2351:115">Align</p>
                <div className="sv1-tackle-step-content" data-node-id="2351:116">
                  <p>Business:</p>
                  <p>Everyone wants more business, but through different ways.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="sv1-tackle-right" data-node-id="2351:120">
            <div className="sv1-tackle-quote">
              <p className="sv1-tackle-quote-text" data-node-id="2351:121">Discovery can afford business bias; search cannot—users expect intent, not persuasion.</p>
              <p className="sv1-tackle-quote-subtext" data-node-id="2351:122">This is exactly what I spoke in the meeting in order to start driving the product from a user-first stand point.</p>
            </div>
          </div>
        </section>

        {/* Section 2351:123 – display: flex; width: 1200px; padding: 0 16px; flex-direction: column; align-items: flex-start; gap: 24px */}
        <section id="version-2" className="sv1-version2" data-node-id="2351:123">
          <h2 className="sv1-section-heading" data-node-id="2351:124">Version 2</h2>
          <div className="sv1-version2-text" data-node-id="2351:125">
            <p>Tackled the problem of:</p>
            <p>
              1) Flexibility- Users can now switch between services and categories to see the desired results.
              <br aria-hidden="true" />
              2) Visibility + Usability: Switching services ( going out/ home delivery/ online vouchers) is easier as they are more prominent & comes with a simpler interaction. Additionally, offers and other L2 filters are also easily paired with the services and categories.
            </p>
          </div>
          <div className="sv1-version2-image" data-node-id="2351:126">
            <img
              src={`${process.env.PUBLIC_URL || ''}/images/search-v1/version2.png`}
              alt="Version 2"
              className="sv1-version2-img"
            />
          </div>
          <p className="sv1-version2-note" data-node-id="2351:127">
            Yet, there still lies a problem of showing multiple categories suggestions given the user intent isn't clear.
          </p>
        </section>

        {/* Section 2351:129 – display: flex; width: 1200px; padding: 0 16px; flex-direction: column; align-items: flex-start; gap: 24px */}
        <section id="key-design-decisions" className="sv1-decisions" data-node-id="2351:129">
          <h2 className="sv1-section-heading" data-node-id="2351:130">Key Design Decisions</h2>
          <div className="sv1-decision-item" data-node-id="2351:131">
            <p className="sv1-decision-title" data-node-id="2351:132">Contextual suggesters</p>
            <ol className="sv1-decision-list" data-node-id="2351:133" start={1}>
              <li>Replaced global suggesters with service-aware suggestions tailored to food, local, or brand-based intent.</li>
            </ol>
          </div>
          <div className="sv1-decision-item" data-node-id="2351:134">
            <p className="sv1-decision-title" data-node-id="2351:135">Intent-Based Ranking</p>
            <ol className="sv1-decision-list" data-node-id="2351:136" start={2}>
              <li>Prioritized suggestions based on user behavior, recency, and locality instead of generic popularity.</li>
            </ol>
          </div>
          <div className="sv1-decision-item" data-node-id="2351:137">
            <p className="sv1-decision-title" data-node-id="2351:138">Progressive disclosure</p>
            <ol className="sv1-decision-list" data-node-id="2351:139" start={3}>
              <li>Limited initial suggestions to high-confidence options, allowing deeper exploration only when needed.</li>
            </ol>
          </div>
        </section>

        {/* Rectangle 15 – full-width #F3FAF3 (like rect14), min-height 567px. Inside: 2351:140 display flex; align-items center; gap 36px */}
        <div className="sv1-rect15" data-name="Rectangle 15">
          <div className="sv1-rect15-inner" data-node-id="2351:140">
            <div className="sv1-solution-left" data-node-id="2351:141">
              <h2 className="sv1-solution-title" data-node-id="2351:142">Solution</h2>
              <ol className="sv1-solution-list" data-node-id="2351:143" start={1}>
                <li>De-prioritizing global search from shop page</li>
              </ol>
              <div className="sv1-solution-text" data-node-id="2351:144">
                <p data-node-id="2351:145">Highlighting "food delivery" after removing the search bar from the shop page header. (Prioritizing the primary product)</p>
                <p data-node-id="2351:146">Now, the user will choose category first, providing us with clear user intent in order to generate better suggestions.</p>
              </div>
            </div>
            <div className="sv1-solution-right" data-node-id="2351:147">
              <div className="sv1-solution-phone">
                <img
                  src={searchGif}
                  alt="Solution screen"
                  className="sv1-solution-screen-img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2351:150 – display: flex; flex-direction: column; align-items: flex-start; gap: 24px; align-self: stretch */}
        <section id="intent-based-suggesters" className="sv1-intent" data-node-id="2351:150">
          <ol className="sv1-intent-list" data-node-id="2351:151" start={2}>
            <li>Intent based suggesters</li>
          </ol>
          <p className="sv1-section-text" data-node-id="2351:152">
            Users will now follow by selecting the service and category from the shop page, leading towards the discovery and further entering the search to experience specific suggestions and better results.
          </p>
          <div className="sv1-intent-image" data-node-id="2351:153">
            <img
              src={`${process.env.PUBLIC_URL || ''}/images/search-v1/intent-suggesters-search-final.png`}
              alt="Search final"
              className="sv1-intent-img"
            />
          </div>
        </section>

        {/* Section 2351:154 – Keeping the intent clear and the results consistent; below Intent based suggesters */}
        <section id="intent-clear-results" className="sv1-intent-clear" data-node-id="2351:154">
          <h2 className="sv1-section-heading" data-node-id="2351:155">3. Keeping the intent clear and the results consistent</h2>
          <p className="sv1-section-text" data-node-id="2351:156">
            User when enter through going out, fine dining, will see the final results in the same segment.
          </p>
          <div className="sv1-intent-clear-image" data-node-id="2351:157">
            <img
              src={`${process.env.PUBLIC_URL || ''}/images/search-v1/intent-clear-results-consistent.png`}
              alt="Keeping intent clear and results consistent - user flow"
              className="sv1-intent-clear-img"
            />
          </div>
        </section>

        {/* Rectangle 16 – full-width #F3FAF3 (like rect14/rect15), min-height 579px; inner: flex column, align-items flex-start, gap 24px – 2351:158 */}
        <div className="sv1-rect16" data-name="Rectangle 16" data-node-id="2351:158">
          <div className="sv1-rect16-inner">
            <p className="sv1-learning-label">My learning</p>
            <h2 className="sv1-learning-title">Balancing product and business needs</h2>
            <div className="sv1-learning-paras">
              <p className="sv1-learning-para">
                This project truly taught and tested my product thinking and when to prioritize users above business and vice versa.
              </p>
              <p className="sv1-learning-para">
                A key takeaway would be, coming out with multiple solutions in every product discussion to make sure that tech feasibility isn't a blocker.
              </p>
            </div>
            <div className="sv1-learning-line" aria-hidden />
            <p className="sv1-learning-cta">Let's connect to discuss what can be done differently today!</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchV1;
