import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { scrollToSection } from './Menu';
import Reveal from './Reveal';
import './AsporaGold.css';

/**
 * Aspora Gold — UAE experience. Figma frame 2110:2074 (file "Bento").
 * https://www.figma.com/design/N73elc9CS8iWr5S4VXLEcx/Bento?node-id=2110-2074
 *
 * Canvas is 1440 wide with a 150px gutter, so the content column is 1140px —
 * the same grid as Landing (/) and AboutV2 (/about).
 *
 * The frame pairs Arial with Georgia Italic: the first line of a heading sets
 * in Arial, the second in Georgia Italic. Type, colour and geometry below come
 * from the frame's own nodes.
 *
 * Not yet built (component instances, tracked separately):
 *   2253:67209  Information Architecture, with the Buy/Sell toggle
 *   2164:31630  Buy Flow — "Final design"
 *   2179:66823  Sell Flow — "Final design"
 */

const R = (props) => <Reveal prefix="agld" {...props} />;

/* the same back control the other case studies carry (apo-back / sv1-back) */
const BackArrow = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M9 18l6-6-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* the pill nav is in-page, not site-wide (2158:28230) */
const NAV = [
  { id: 'about', label: 'About' },
  { id: 'buy-flow', label: 'Buy flow' },
  { id: 'sell-flow', label: 'Sell flow' },
  { id: 'learnings', label: 'Learnings' },
];

/* 2115:2372 — the frame left "Product Designer IC" in all four slots; these
   are the real values */
const META = [
  { label: 'My role', value: 'Product Designer IC' },
  { label: 'The team', value: '1 PM, 1 senior designer, me' },
  { label: 'Timeline', value: '2 Weeks' },
  { label: 'The scope', value: 'Gold localization' },
];

/* 2110:2341 — each step has a leading rule and a dot */
const DISCOVERY_STEPS = [
  'You now will explore multiple platforms to invest in Gold',
  'Compare live rates',
  'Select the platform with best rates and get onboarded',
];

/* 2136:2523 */
const SHIFT = {
  from: {
    label: 'Starting point',
    place: 'United Kingdom',
    points: ['Existing gold experience', 'Established product structure', 'Old visual language'],
  },
  bridge: 'Rethinking the information',
  to: {
    label: 'Finished product',
    place: 'United Aram Emirates',
    points: [
      'Local pricing and taxation requirements',
      'Establish product structure',
      'Fresh visual language',
    ],
  },
};

/* 2136:2535 — titles break across two lines in the frame */
const PRINCIPLES = [
  {
    kicker: '01/ PRODUCT LOGIC',
    title: ['Make the product and', 'pricing understandable'],
    body: "Translate the market's requirements into the information customers need before committing.",
  },
  {
    kicker: '02/ CUSTOMER CHOICE',
    title: ['Buy from weight or', 'set a price limit to purchase'],
    body: 'Let customers start with a spending amount or a gold weight, and see the equivalent. Support 2 way thinking.',
  },
  {
    kicker: '03/ BRAND LANGUAGE',
    title: ['Clean, consistent, modern,', 'and globally relevant'],
    body: 'Apply the new brand across the journey while working on the patterns that support it. Evolve the DS as and when needed.',
  },
];

/* 2136:2560 */
const FLOW = [
  { index: '01', title: 'Discover', body: 'Understand the product' },
  { index: '02', title: 'Choose', body: 'Amount or weight' },
  { index: '03', title: 'Review', body: 'Quote, fees & total' },
  { index: '04', title: 'Pay', body: 'Select a payment method' },
  { index: '05', title: 'Track', body: 'Understand the outcome' },
];

/* 2136:2606 — the chips sit under steps 02 / 03 / 04 */
const CONSTRAINTS = [
  'Purchase outside limits',
  'Live pricing; Locked price expires every few minutes',
  'Payments need attention.',
];

const imgBase = `${process.env.PUBLIC_URL || ''}/images/aspora-gold`;

/* 2290:70461 "Key edge cases / Thought through" */
const KEY_EDGE = [
  {
    index: '01',
    title: 'Before purchase/sell',
    points: ['When the price changes', 'Price not updated'],
  },
  {
    index: '02',
    title: 'During the process',
    points: ['Payment fails', 'Taking longer to process'],
  },
  {
    index: '03',
    title: 'Post transaction',
    points: ['Payment debited, Gold not credited', 'Gold credited, not reflecting'],
  },
];

/* 2290:74177 - the outcomes pair that closes the study */
const OUTCOMES = [
  {
    title: 'Performance',
    sub: 'Adoption',
    points: [
      '1st investment happened within 3 days of making it live.',
      'We reached more than 1000AED within a span of a week.',
    ],
  },
  {
    title: 'Learning',
    sub: 'Adaptive',
    points: [
      'Handling the first deadline when you change your industry while making a company switch. Having product context is extremely important for starting fast.',
      'Initiating conversations when you have to get things done; no need to wait for the KT, grab it.',
      'User empathy journey never ends.',
    ],
  },
];

/* 2164:31613 "Component 8" — two variants, one per flow, each swapping the
   diagram beneath the toggle (2248:67199 / 2248:67205). */
const IA_TABS = [
  { id: 'buy', label: 'Buy flow', img: 'ia-buy', alt: 'Information architecture for the gold buy flow' },
  { id: 'sell', label: 'Sell flow', img: 'ia-sell', alt: 'Information architecture for the gold sell flow' },
];

/* 2160:31319 "Buy Flow" — four variants, each swapping the notes and the
   screen beside them. The screens the frame animates are carried as GIFs
   (pulled from the file's image fills, which serve the original upload -
   /v1/images only ever renders a still). Variants 02-04 repeat the limit-order copy in the frame;
   reproduced as drawn. */
const BUY_TABS = [
  {
    id: 'happy',
    index: '01',
    label: 'Happy path',
    title: 'Happy path',
    sub: 'For a new user',
    offset: 129,
    lead: 'The user has to go through a quick and simple journey',
    note: '(trust me it\u2019s designed to be no brainer)',
    points: [
      'Lands on the gold page and sees a BOLD, clear CTA that says \u201cBuy Gold\u201d.',
      'Enter the amount/weight (To reduce the funnel time, user also has the option to select from the weight/amount options)',
      'The timer holds a muted place to save the user from any possible anxiety.',
      'Another action, \u201cproceed to buy\u201d',
      'Review amount +Add payment method',
      'Enter details and there you have it. You made your first gold purchase!!',
    ],
    shots: ['buy-01-happy.gif'],
  },
  {
    id: 'limit',
    index: '02',
    label: 'Limit order flow',
    title: 'You can only buy a certain',
    sub: 'Amount of gold',
    offset: 238,
    lead: 'There 2 types of limit order',
    ordered: true,
    points: [
      <>
        Having a minimum buy amount : It&rsquo;s not on weight, but a very minimal amount that you{' '}
        <strong>
          <em>have to</em>
        </strong>{' '}
        spend to make an purchase happen.
      </>,
      'On buying a total amount in lifetime : User can buy partial amount, given you asked for an amount beyond the limit. That is called cumulative limit.',
    ],
    shots: ['buy-02-limit.gif'],
  },
  {
    id: 'timer',
    index: '03',
    label: 'Timer update',
    title: 'Why make the user work?',
    sub: 'Auto update timer',
    offset: 238,
    blocks: [
      { strong: true, text: 'We rejected the initial idea of making our user update the timer through a refresh button.' },
      { strong: true, text: 'IT DIDN\u2019T MAKE SENSE TO ME.' },
      { text: 'We hit a snag, ask user to refresh it because the timer ended. It should be our job to do it for the user and inform them that we did.' },
      { italic: true, text: 'Checked tech feasibility, built it!' },
    ],
    shots: ['buy-03-timer.png'],
  },
  {
    /* 2290:73532 "Edge cases buy flow" - five variants that share this column
       and step the screen beside it */
    id: 'edge',
    index: '04',
    label: 'Edge cases',
    accent: true,
    offset: 0,
    title: 'Payment didn\u2019t go through',
    sub: 'Gold purchase failed',
    carousel: ['edge-01.png', 'edge-02.png', 'edge-03.png', 'edge-04.png', 'edge-05.png'],
  },
];

/* 2177:63240 "Sell Flow" — same four-variant shape as Buy. The frame leaves
   the Buy copy in place on 01, 03 and 04; reproduced as drawn. */
const SELL_TABS = [
  {
    id: 'happy',
    index: '01',
    label: 'Happy path',
    title: 'Happy path',
    sub: 'For a regular seller',
    offset: 129,
    lead: 'The user has to go through a quick and simple journey',
    note: 'Select amount, sell, amount gets credited.',
    points: [
      'It is largely same as buy flow',
      'Key difference is : You have to add the IBAN number to receive the amount.',
      'Key limitation : The account cannot be a business acoount.',
    ],
    shots: ['sell-01-happy.gif'],
  },
  {
    id: 'limit',
    index: '02',
    label: 'Limit sell flow',
    title: 'There\u2019s a minimum sell amount,',
    sub: 'But no cap',
    offset: 268,
    lead: 'Conditions to sell :',
    plain: true,
    points: [
      'User has to sell a minimum of 5 AED worth of Gold.',
      'However, there\u2019s no limit to the amount of Gold they want to sell from their own reserve.',
    ],
    shots: ['sell-02-limit.gif'],
  },
  {
    id: 'account',
    index: '03',
    label: 'Add account',
    title: 'You need to add an account',
    sub: 'To credit the amount you earn',
    offset: 238,
    lead: 'Go through a simple IBAN journey, and it\u2019s done!',
    points: [],
    shots: ['sell-03-account.gif'],
  },
  {
    id: 'edge',
    index: '04',
    label: 'Edge cases',
    accent: true,
    title: 'There aren\u2019t really any!',
    sub: 'You always sell the Gold',
    offset: 238,
    lead: 'Since you are not necessarily selling the gold to another user, but can sell it to Aspora as well so the chance of it not going through is negligible.',
    points: [],
    shots: ['sell-04-edge.gif'],
  },
];

const TabArrow = () => (
  <svg className="agld-fd-arrow" viewBox="0 0 24 12" width="24" height="12" fill="none" aria-hidden="true">
    <path d="M0 6h21m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

/* the notes column: lead, optional aside, then points as bullets, a numbered
   list, or plain lines - the frame uses all three across the tabs */
const FlowNotes = ({ tab }) => {
  const List = tab.ordered ? 'ol' : 'ul';
  return (
    <>
      {tab.title && (
        <h3 className="agld-fd-title">
          {tab.title}
          <br />
          <em>{tab.sub}</em>
        </h3>
      )}
      {tab.blocks
        ? tab.blocks.map((b) => (
            <p
              className={`agld-fd-block${b.strong ? ' is-strong' : ''}${b.italic ? ' is-italic' : ''}`}
              key={b.text}
            >
              {b.text}
            </p>
          ))
        : null}
      {tab.lead && <p className="agld-fd-lead">{tab.lead}</p>}
      {tab.note && <p className="agld-fd-note">{tab.note}</p>}
      {tab.points && tab.points.length > 0 && (
        <List className={`agld-fd-points${tab.plain ? ' is-plain' : ''}`}>
          {tab.points.map((pt, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={i}>{pt}</li>
          ))}
        </List>
      )}
    </>
  );
};

/* 2290:73532 - the colour key the edge-case column opens with */
const EDGE_LEGEND = [
  {
    color: '#E5372A',
    text: 'Failed (In case of any action or communication, red is not used as not everything is as alarming as we make. But a payment failure is.)',
  },
  { color: '#111111', text: 'Action needed (This is consistent across the app)' },
  { color: '#0A8A4A', text: 'Success' },
];

const EdgeNotes = ({ tab, step, onNext }) => (
  <>
    <h3 className="agld-fd-title">
      {tab.title}
      <br />
      <em>{tab.sub}</em>
    </h3>
    <p className="agld-edge-label">Color coded</p>
    <ul className="agld-edge-legend">
      {EDGE_LEGEND.map((item) => (
        <li key={item.color}>
          <span className="agld-edge-dot" style={{ background: item.color }} aria-hidden="true" />
          <span className="agld-edge-rule" aria-hidden="true" />
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
    <p className="agld-edge-label">Clear and fast communication</p>
    <p className="agld-edge-caps">Empathise with the end user</p>
    <p className="agld-edge-copy">
      How would you react if you react if you tried an &ldquo;investment platform&rdquo; for the
      &ldquo;first time&rdquo; and due to any reason your payment fails? Anxious. Full of questions.
      Where did my money go?. What&rsquo;s the status?
    </p>
    <p className="agld-edge-copy">
      Theses cases are designed keeping that particular feeling in mind.
    </p>
    <button type="button" className="agld-edge-pager" onClick={onNext}>
      <span className="agld-edge-count">
        {String(step + 1).padStart(2, '0')} /{String(tab.carousel.length).padStart(2, '0')}
      </span>
      <span className="agld-edge-next">Next</span>
      <span className="agld-edge-arrow" aria-hidden="true">
        <svg viewBox="0 0 22 22" width="22" height="22" fill="none">
          <circle cx="11" cy="11" r="11" fill="#1C1C1C" />
          <path d="M7 11h8m0 0-3-3m3 3-3 3" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </span>
    </button>
  </>
);

const FinalDesign = ({ id, kicker, tabs, active, onSelect }) => {
  const tab = tabs.find((t) => t.id === active) || tabs[0];
  const [step, setStep] = useState(0);
  // restart the edge-case walk whenever the tab changes
  useEffect(() => setStep(0), [active]);

  /* Tabs are manual: the screens are animations that need time to play, so
     nothing advances them on its own. */

  return (
    <section className="agld-fd" id={id}>
      <div className="agld-fd-inner">
        <Reveal prefix="agld" as="p" className="agld-fd-kicker">
          Final design
        </Reveal>
        <Reveal prefix="agld" as="h2" className="agld-fd-heading" delay={60}>
          {kicker}
        </Reveal>
        <div className="agld-fd-tabs" role="tablist" aria-label={kicker}>
          {tabs.map((t) => (
            <button
              type="button"
              role="tab"
              key={t.id}
              id={`${id}-tab-${t.id}`}
              aria-selected={t.id === active}
              aria-controls={`${id}-panel-${t.id}`}
              className={`agld-fd-tab ${t.id === active ? 'is-active' : ''} ${
                t.accent ? 'is-accent' : ''
              }`.trim()}
              onClick={() => onSelect(t.id)}
            >
              <span className="agld-fd-tab-index">{t.index}</span>
              <span className="agld-fd-tab-label">{t.label}</span>
              <TabArrow />
            </button>
          ))}
        </div>
        <div
          key={tab.id}
          role="tabpanel"
          id={`${id}-panel-${tab.id}`}
          aria-labelledby={`${id}-tab-${tab.id}`}
          className="agld-fd-panel"
        >
          <div
            className="agld-fd-notes"
            style={tab.offset !== undefined ? { paddingTop: `${tab.offset}px` } : undefined}
          >
            {tab.carousel ? (
              <EdgeNotes
                tab={tab}
                step={step}
                onNext={() => setStep((n) => (n + 1) % tab.carousel.length)}
              />
            ) : (
              <FlowNotes tab={tab} />
            )}
          </div>
          <img
            className="agld-fd-shot"
            src={`${imgBase}/${tab.carousel ? tab.carousel[step] : tab.shots[0]}`}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

const IaRadio = ({ checked }) =>
  checked ? (
    <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill="none" stroke="#4E68F4" strokeWidth="2" />
      <circle cx="20" cy="20" r="9" fill="#4E68F4" />
    </svg>
  ) : (
    <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill="none" stroke="#000" strokeWidth="2" />
    </svg>
  );

/* Arial first line, Georgia Italic second (2136:2504, 2136:2544, 2179:66925) */
const StackedHeading = ({ top, bottom, className = '' }) => (
  <h2 className={`agld-h2 ${className}`.trim()}>
    {top}
    <br />
    <em>{bottom}</em>
  </h2>
);

/* The frame shows one pill item filled, so the nav tracks the section in view
   rather than hard-coding a selection. */
const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      // the sticky bar is 146 tall, so a section counts as current once its
      // top clears it
      let current = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) current = id;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);
  return active;
};

const NAV_IDS = NAV.map((n) => n.id);

const AsporaGold = () => {
  const navigate = useNavigate();
  const active = useActiveSection(NAV_IDS);
  const [iaTab, setIaTab] = useState(IA_TABS[0].id);
  const [buyTab, setBuyTab] = useState(BUY_TABS[0].id);
  const [sellTab, setSellTab] = useState(SELL_TABS[0].id);

  return (
  <div className="agld">
    {/* Header — 2158:28228 */}
    <header className="agld-nav">
      <div className="agld-nav-inner">
        <button
          type="button"
          className="agld-back"
          /* always home, not history.back() - the page is shared directly and
             a popped entry may not exist */
          onClick={() => navigate('/')}
          aria-label="Back to home"
        >
          <span className="agld-back-icon">
            <BackArrow />
          </span>
        </button>
        <nav className="agld-nav-pill">
          {NAV.map((item) => (
            <button
              type="button"
              className={`agld-nav-link ${active === item.id ? 'is-active' : ''}`.trim()}
              key={item.id}
              aria-current={active === item.id ? 'true' : undefined}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>

    {/* Hero — 2110:2088 */}
    <section className="agld-hero" id="about">
      <div className="agld-hero-inner">
        <R as="p" className="agld-eyebrow">
          <span className="agld-eyebrow-brand">Aspora GOLD</span>
          <span className="agld-eyebrow-rule" aria-hidden="true" />
          <span className="agld-eyebrow-sub">UAE Experience</span>
        </R>
        <R as="h1" className="agld-hero-title" delay={60}>
          A familiar investment
          <br />
          <em>With a new beginning</em>
        </R>
        <R as="p" className="agld-hero-sub" delay={120}>
          Bringing Aspora Gold to the UAE. A new market, a new brand language, and a first purchase
          that needed to feel clear.
        </R>
        <img
          className="agld-hero-art"
          src={`${imgBase}/gold-sculpture.png`}
          alt=""
          aria-hidden="true"
        />
      </div>
    </section>

    {/* Project meta — 2115:2372 */}
    <section className="agld-meta">
      <div className="agld-meta-inner">
        {META.map((item, i) => (
          <R className="agld-meta-item" key={item.label} delay={i * 60}>
            <p className="agld-meta-label">{item.label}</p>
            <p className="agld-meta-value">{item.value}</p>
          </R>
        ))}
        {/* 2115:2374 — the designer's cursor parked on her own credit */}
        <span className="agld-cursor" aria-hidden="true">
          <svg viewBox="0 0 16 15" width="16" height="15" fill="none">
            <path d="M0 0l16 6.5-6.8 1.8L5.6 15 0 0z" fill="#4E68F4" />
          </svg>
          <span className="agld-cursor-chip">Me</span>
        </span>
      </div>
    </section>

    {/* The situation — 2136:2487 */}
    <section className="agld-story">
      <div className="agld-story-media">
        <img src={`${imgBase}/dubai-skyline.png`} alt="" aria-hidden="true" />
      </div>
      <div className="agld-story-body">
        <R as="h2" className="agld-story-head">
          Your first salary abroad,
          <br />
          And your <em>investment decision</em> come together
        </R>
        <R as="p" className="agld-story-copy" delay={60}>
          Imagine you&rsquo;ve just moved to Dubai for work. Your first salary arrives. Alongside
          rent, everyday expenses, and money for home, you want to put something toward your future.
        </R>
        <R as="p" className="agld-story-copy" delay={80}>
          Learning about stocks in a new place can take sometime, but investing in metals is always
          considered safe. Gold feels familiar. Understanding where to buy it from brings a
          different set of questions.
        </R>
        <ol className="agld-steps">
          {DISCOVERY_STEPS.map((step, i) => (
            <R as="li" className="agld-step" key={step} delay={i * 80}>
              <span className="agld-step-rule" aria-hidden="true" />
              <span className="agld-step-text">{step}</span>
            </R>
          ))}
        </ol>
        <R as="p" className="agld-pullquote" delay={80}>
          &ldquo;How much will my money buy? What will I actually pay? And how will I know the
          purchase worked?&rdquo;
        </R>
      </div>
    </section>

    {/* Starting from the UK — 2136:2486 */}
    <section className="agld-section agld-split agld-s-origin">
      <R>
        <StackedHeading top="Started from the UK IA," bottom="And moved my way up" />
      </R>
      <R className="agld-split-copy" delay={60}>
        <p>
          I began with Aspora&rsquo;s UK gold experience. My responsibility was to design the UAE
          version, accounting for differences in pricing and taxation while bringing the entire
          journey into the new brand language.
        </p>
        <p>
          I was also working on the design system alongside these screens. The product and its
          visual foundations were taking shape together.
        </p>
        <p>
          In the UK, you pay taxes while purchasing the gold. In UAE, there&rsquo;s no tax but the
          price of Gold per gram changes as soon as you hit a certain weight or amount.
        </p>
      </R>
    </section>

    {/* UK -> UAE — 2136:2523 */}
    <section className="agld-section agld-s-shift">
      <R className="agld-shift">
        <div className="agld-shift-col">
          <p className="agld-kicker">{SHIFT.from.label}</p>
          <p className="agld-shift-place">{SHIFT.from.place}</p>
          <ul className="agld-shift-list">
            {SHIFT.from.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <div className="agld-shift-bridge">
          <p className="agld-shift-bridge-label">{SHIFT.bridge}</p>
          <span className="agld-shift-arrow" aria-hidden="true" />
        </div>
        <div className="agld-shift-col">
          <p className="agld-kicker">{SHIFT.to.label}</p>
          <p className="agld-shift-place">{SHIFT.to.place}</p>
          <ul className="agld-shift-list">
            {SHIFT.to.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </R>
    </section>

    {/* Principles — 2136:2535 */}
    <section className="agld-section agld-principles">
      {PRINCIPLES.map((item, i) => (
        <R className="agld-principle" key={item.kicker} delay={i * 80}>
          <p className="agld-principle-kicker">{item.kicker}</p>
          <h3 className="agld-principle-title">
            {item.title[0]}
            <br />
            {item.title[1]}
          </h3>
          <p className="agld-principle-copy">{item.body}</p>
        </R>
      ))}
    </section>

    {/* Organising the flow — 2136:2544 */}
    <section className="agld-section agld-split agld-s-organise">
      <R>
        <StackedHeading top="Started from the UK IA," bottom="And moved my way up" />
      </R>
      <R className="agld-split-copy" delay={60}>
        <p>
          I organised the experience around what a customer needed to understand at each
          step&mdash;from discovering the product to checking the transaction.
        </p>
        <p>
          The flow also needed to account for an expired quote, a purchase limit, or a delayed
          payment. These moments determine whether someone knows how to continue.
        </p>
      </R>
    </section>

    {/* Quick user flow — 2115:2382 */}
    <section className="agld-flowband">
      <div className="agld-flowband-inner">
        <R as="h2" className="agld-h2-serif">
          Quick user flow
        </R>
        <div className="agld-flow">
          {FLOW.map((step, i) => (
            <R className="agld-flow-step" key={step.index} delay={i * 60}>
              <p className="agld-flow-index">{step.index}</p>
              <p className="agld-flow-title">{step.title}</p>
              <p className="agld-flow-body">{step.body}</p>
            </R>
          ))}
        </div>
        <R className="agld-constraints" delay={80}>
          <p className="agld-constraints-label">Contriants</p>
          <ul className="agld-constraint-list">
            {CONSTRAINTS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </R>
      </div>
    </section>

    {/* Key edge cases — 2290:70461 */}
    <section className="agld-section agld-keyedge">
      <R>
        <StackedHeading top="Key edge cases" bottom="Thought through" />
      </R>
      <div className="agld-keyedge-grid">
        {KEY_EDGE.map((card, i) => (
          <R className="agld-keyedge-card" key={card.index} delay={i * 80}>
            <p className="agld-keyedge-index">{card.index}</p>
            <h3 className="agld-keyedge-title">{card.title}</h3>
            <ol className="agld-keyedge-list">
              {card.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ol>
          </R>
        ))}
      </div>
    </section>

    {/* Information Architecture — 2253:67209 */}
    <section className="agld-section agld-ia" id="ia">
      <R as="h2" className="agld-h2-serif">
        Information Architecture
      </R>
      <R className="agld-ia-tabs" role="tablist" aria-label="Information architecture" delay={60}>
        {IA_TABS.map((tab) => (
          <button
            type="button"
            role="tab"
            key={tab.id}
            id={`ia-tab-${tab.id}`}
            aria-selected={iaTab === tab.id}
            aria-controls={`ia-panel-${tab.id}`}
            className={`agld-ia-tab ${iaTab === tab.id ? 'is-active' : ''}`.trim()}
            onClick={() => setIaTab(tab.id)}
          >
            <span>{tab.label}</span>
            <IaRadio checked={iaTab === tab.id} />
          </button>
        ))}
      </R>
      {IA_TABS.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`ia-panel-${tab.id}`}
          aria-labelledby={`ia-tab-${tab.id}`}
          hidden={iaTab !== tab.id}
        >
          <R className="agld-ia-figure">
            <img src={`${imgBase}/${tab.img}.png`} alt={tab.alt} />
          </R>
        </div>
      ))}
    </section>

    {/* New brand language — 2139:2622 */}
    <section className="agld-section agld-s-brand">
      <R>
        <StackedHeading top="A new brand language" bottom="Built in context" />
      </R>
      <R className="agld-brand-strip" delay={60}>
        <img src={`${imgBase}/brand-language.png`} alt="The Aspora Gold brand language applied" />
      </R>
    </section>

    {/* Buy Flow — 2164:31629 / component set 2160:31319 */}
    <FinalDesign
      id="buy-flow"
      kicker="The experience we delivered to buy Gold"
      tabs={BUY_TABS}
      active={buyTab}
      onSelect={setBuyTab}
    />

    {/* Sell Flow — 2177:63194 / component set 2177:63240 */}
    <FinalDesign
      id="sell-flow"
      kicker="The experience we delivered to sell Gold"
      tabs={SELL_TABS}
      active={sellTab}
      onSelect={setSellTab}
    />

    {/* Edge cases — 2179:66988 */}
    <section className="agld-section agld-split" id="learnings">
      <R>
        <StackedHeading top="When the flow messes up," bottom="Keep the communication clear" />
      </R>
      <R className="agld-split-copy agld-split-copy-lg" delay={60}>
        <p>
          I wanted to make sure that I cover each and every case, especially when things go wrong.
        </p>
        <p>
          All the edge cases have been covered in depth, each and every hiccup in the journey has
          been clearly communicated using clear visual language which doesn&rsquo;t come across as
          overwhelming.
        </p>
        <p className="agld-principles-lead">3 key principles that I followed:</p>
        <ul className="agld-principle-list">
          <li>Error-prevention,</li>
          <li>Recognition rather than recall,</li>
          <li>Match between system and real world</li>
        </ul>
      </R>
    </section>

    {/* Outcomes — 2290:74177 */}
    <section className="agld-section agld-outcomes">
      <span className="agld-outcomes-rule" aria-hidden="true" />
      {OUTCOMES.map((item, i) => (
        <R className="agld-outcome" key={item.title} delay={i * 80}>
          <StackedHeading top={item.title} bottom={item.sub} />
          <ol className="agld-outcome-list">
            {item.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ol>
        </R>
      ))}
    </section>

    {/* Page footer — 2290:74211 */}
    <footer className="agld-foot">
      <span className="agld-foot-rule" aria-hidden="true" />
      <div className="agld-foot-inner">
        <a
          className="agld-foot-link"
          href="https://www.figma.com/design/O52s0gyUGghNaD7uUjhOhG/Aspora-works-by-me?node-id=41-1597"
          target="_blank"
          rel="noopener noreferrer"
        >
          Checkout the Figma link for more works by me at Aspora
        </a>
        <span className="agld-foot-name">Aspora UAE Gold Investment</span>
      </div>
    </footer>
  </div>
  );
};

export default AsporaGold;
