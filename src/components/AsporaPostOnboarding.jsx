import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AsporaPostOnboarding.css';
import Menu from './Menu';

/**
 * Aspora – Post-onboarding experience. Figma frame 161:2 (file "yaprr").
 * Source: https://www.figma.com/design/859OcVrbW6egRcOKPU1TTp/yaprr?node-id=161-2
 * Section order follows the Figma canvas top-to-bottom (numbered 01–05 in the design).
 * Nodes touched by the 161:2 revision carry 161:xxx ids; everything untouched still
 * references the earlier 128:xxx frame, which is structurally identical.
 */

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const expandArrowSvg = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const imgBase = `${process.env.PUBLIC_URL || ''}/images/aspora-post-onboarding`;

/* Figma builds this heading as "Component 1" (161:323 / 1775:3273) — ~32 variants swapped on a
   delay. Timings and geometry below were measured off the Bento prototype (1648:1559).
   It types once and rests; it does not loop, and the caret does not blink. */
const COMPARISON_HEADING = 'A quick comparison of before and after';

/* The prototype steps at ~600ms, which totals ~23s — far too slow to sit through on the page,
   so this is deliberately faster. Everything else (alignment, slide, caret) matches it. */
const TYPE_STEP_MS = 55;

/* Each variant is a fixed-width frame centred in the 1600-wide canvas, and the text is pinned to
   that frame's left edge — so as the frame grows 500→1300 the line slides left, landing flush
   with the 1301-wide content column. Indent from the column's left edge is therefore
   (1300 - frameWidth) / 2, reaching 0 once the frame stops growing (~17 steps in). */
const CANVAS_COLUMN = 1301;
const comparisonIndentPct = (typedLength) =>
  (Math.max(0, 400 - 25 * typedLength) / CANVAS_COLUMN) * 100;

/* Two before/after pairs. Copy transcribed from the design's comparison artwork (161:96). */
const COMPARISON_PAIRS = [
  {
    id: 'activation',
    shots: [
      {
        src: 'compare-before-1',
        w: 707,
        label: 'Before',
        alt: 'Account home before: a locked three-step activation checklist',
        numbered: true,
        notes: [
          'Confusing locked stepper',
          'Misleading about the interdependence of each step',
        ],
      },
      {
        src: 'compare-after-1',
        w: 745,
        label: 'After',
        alt: 'Account home after: a four-step progress bar with documents in review',
        numbered: false,
        notes: ['Confirm receipt and tell users when no action is needed.'],
      },
    ],
  },
  {
    id: 'deposit',
    shots: [
      {
        src: 'compare-before-2',
        w: 707,
        label: 'Before',
        alt: 'Account home before: verification steps listed without a clear action',
        numbered: true,
        notes: ['Communication is clear, yet leaves room for uncertainty'],
      },
      {
        src: 'compare-after-2',
        w: 754,
        label: 'After',
        alt: 'Account home after: first deposit step with a direct Add money button',
        numbered: true,
        notes: [
          'More certain communication',
          'Clear CTAs following guidance and direction',
        ],
      },
    ],
  },
];

/* Keystrokes are synthesised rather than loaded from a file: no asset to ship, and the small
   random variation per strike keeps it from sounding like one sample on a loop.

   Browsers refuse to start an AudioContext until the visitor has interacted with the document,
   and that permission resets on every reload. Two things open it, and both are needed: an
   immediate attempt at mount (which succeeds when the visitor arrived by clicking a link, since
   that click already activated the document) and these listeners (which catch the first gesture
   on a cold reload). Relying on the listeners alone silently misses the click that navigated
   here, because it lands before this component exists. */
const UNLOCK_EVENTS = ['pointerdown', 'mousedown', 'touchstart', 'touchend', 'keydown'];

/* How long the caret idles waiting for a gesture to unlock audio before typing anyway.
   Kept close to the typing duration so the wait never overshadows the animation itself. */
const AUDIO_UNLOCK_GRACE = 1000;

/* Peak levels, measured at the destination. KEY_LEVEL 0.095 lands around -25 dBFS —
   present on laptop speakers without carrying across a room. Raise or lower here. */
const KEY_LEVEL = 0.095;
const SPACE_LEVEL = 0.06;
const BELL_LEVEL = 0.034;

const createKeyboardAudio = () => {
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;

  let ctx = null;
  let noise = null;
  let listening = false;

  const unlock = () => {
    if (!ctx) {
      try {
        ctx = new AudioCtor();
      } catch (e) {
        return;
      }
      const length = Math.floor(ctx.sampleRate * 0.09);
      noise = ctx.createBuffer(1, length, ctx.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  };

  const ready = () => (ctx && ctx.state === 'running' ? ctx : null);

  return {
    /* Two ways in, because either alone leaves a gap.
       Calling unlock() outright covers the common arrival: the click on the case-study card
       happens before this component mounts, so no listener here would ever see it — but that
       click leaves the document activated, so resuming right now simply works.
       The listeners then cover a cold reload, where nothing has been clicked yet and the
       gesture is still to come. */
    arm() {
      unlock();
      if (listening) return;
      listening = true;
      UNLOCK_EVENTS.forEach((type) =>
        document.addEventListener(type, unlock, { capture: true, passive: true })
      );
    },

    isReady: () => Boolean(ready()),

    /* Give a late gesture a moment to land before giving up and typing in silence. */
    waitUntilReady(maxWait, done) {
      if (ready()) {
        done();
        return () => {};
      }
      const startedAt = Date.now();
      const poll = window.setInterval(() => {
        if (ready() || Date.now() - startedAt >= maxWait) {
          window.clearInterval(poll);
          done();
        }
      }, 80);
      return () => window.clearInterval(poll);
    },

    /* One key strike: a filtered noise burst for the clack, over a short low thump for weight. */
    strike(char) {
      const audio = ready();
      if (!audio) return;
      const t = audio.currentTime;
      const isSpace = char === ' ';

      const out = audio.createGain();
      out.gain.value = isSpace ? SPACE_LEVEL : KEY_LEVEL;
      out.connect(audio.destination);

      const burst = audio.createBufferSource();
      burst.buffer = noise;
      burst.playbackRate.value = 0.85 + Math.random() * 0.3;

      /* Centred where hearing is most sensitive, so the click still reads at a low level
         instead of needing raw volume to cut through. */
      const band = audio.createBiquadFilter();
      band.type = 'bandpass';
      band.frequency.value = isSpace ? 1200 : 2500 + Math.random() * 900;
      band.Q.value = 1.3;

      const clack = audio.createGain();
      clack.gain.setValueAtTime(0, t);
      clack.gain.linearRampToValueAtTime(0.8 + Math.random() * 0.4, t + 0.002);
      clack.gain.exponentialRampToValueAtTime(0.0001, t + (isSpace ? 0.06 : 0.042));

      burst.connect(band);
      band.connect(clack);
      clack.connect(out);
      burst.start(t);
      burst.stop(t + 0.1);

      /* Kept above ~90Hz: a laptop speaker cannot reproduce the sub-bass this originally
         swept into, so that weight was being spent on nothing. */
      const thump = audio.createOscillator();
      thump.type = 'triangle';
      thump.frequency.setValueAtTime(isSpace ? 150 : 210, t);
      thump.frequency.exponentialRampToValueAtTime(95, t + 0.05);

      const body = audio.createGain();
      body.gain.setValueAtTime(0, t);
      body.gain.linearRampToValueAtTime(0.35, t + 0.003);
      body.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);

      thump.connect(body);
      body.connect(out);
      thump.start(t);
      thump.stop(t + 0.08);
    },

    /* The end-of-line bell, kept well under the keys so it reads as a flourish. */
    bell() {
      const audio = ready();
      if (!audio) return;
      const t = audio.currentTime + 0.04;

      const out = audio.createGain();
      out.gain.value = BELL_LEVEL;
      out.connect(audio.destination);

      [2489, 3733].forEach((freq, i) => {
        const osc = audio.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const env = audio.createGain();
        env.gain.setValueAtTime(0, t);
        env.gain.linearRampToValueAtTime(i === 0 ? 1 : 0.4, t + 0.004);
        env.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
        osc.connect(env);
        env.connect(out);
        osc.start(t);
        osc.stop(t + 0.95);
      });
    },

    dispose() {
      if (listening) {
        listening = false;
        UNLOCK_EVENTS.forEach((type) =>
          document.removeEventListener(type, unlock, { capture: true })
        );
      }
      if (ctx) ctx.close().catch(() => {});
      ctx = null;
      noise = null;
    },
  };
};

const useTypewriter = (text, { speed = 55, sound = false } = {}) => {
  const ref = useRef(null);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    const node = ref.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!node || reduceMotion || typeof IntersectionObserver === 'undefined') {
      setTyped(text);
      return undefined;
    }

    let timer;
    let cancelWait = null;
    const audio = sound ? createKeyboardAudio() : null;
    if (audio) audio.arm();

    const type = () => {
      let i = 0;
      timer = window.setInterval(() => {
        if (audio) audio.strike(text[i]);
        i += 1;
        setTyped(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(timer);
          if (audio) audio.bell();
        }
      }, speed);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        /* One more attempt now: by this point the visitor has almost certainly clicked
           something, even if they had not when the page mounted. */
        if (audio) audio.arm();
        /* If audio still is not open, idle on the blinking caret for a beat — it reads as a
           typewriter waiting to start — rather than typing the line silently. */
        if (audio && !audio.isReady()) {
          cancelWait = audio.waitUntilReady(AUDIO_UNLOCK_GRACE, type);
        } else {
          type();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
      if (cancelWait) cancelWait();
      if (audio) audio.dispose();
    };
  }, [text, speed, sound]);

  return [ref, typed];
};

const AsporaPostOnboarding = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [comparisonRef, comparisonTyped] = useTypewriter(COMPARISON_HEADING, {
    sound: true,
    speed: TYPE_STEP_MS,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'overview', title: 'Aspora post onboarding experience' },
    { id: 'comparison', title: 'A quick comparison of before and after' },
    { id: 'existing-flow', title: '01 · The previous user flow' },
    { id: 'architecture', title: '02 · Explored a possible architecture' },
    { id: 'rethinking', title: '03 · Experience re-thinking' },
    { id: 'structure', title: '04 · Giving it more structure' },
    { id: 'final-direction', title: '05 · Final direction' },
    { id: 'impact', title: 'Qualitative impact & learnings' },
  ];

  return (
    <div className="apo-page" data-node-id="128:3">
      {isMenuOpen && <Menu sections={sections} onClose={() => setIsMenuOpen(false)} />}

      <header className="apo-header" data-node-id="128:5">
        <div className="apo-header-inner">
          <div className="apo-header-left">
            <button type="button" className="apo-back" onClick={() => navigate(-1)} aria-label="Back">
              <span className="apo-back-icon">{expandArrowSvg}</span>
            </button>
            <p className="apo-name">Sabhya Singhal</p>
          </div>
          <button type="button" className="apo-menu-btn" onClick={() => setIsMenuOpen(true)}>
            <span className="apo-menu-icon"><MenuIcon /></span>
            <span className="apo-menu-text">Menu</span>
          </button>
        </div>
      </header>

      <main className="apo-main">
        {/* Overview – title, context, problem, meta bar */}
        <section id="overview" className="apo-section apo-overview" data-node-id="128:19">
          <div className="apo-overview-title">
            <p className="apo-overview-title-line1" data-node-id="128:22">Aspora post onboarding experience</p>
            <p className="apo-overview-title-line2" data-node-id="128:23">Make users stay in present</p>
          </div>
          <div className="apo-overview-copy" data-node-id="128:24">
            <p className="apo-overview-context" data-node-id="128:25">
              <strong>Context :</strong> Our users are people who moved from their home countries to different parts of the world in search of better opportunities. For them, understanding finances of a new country may feel overwhelming at times. With other responsibilities, specially for the ones shifting with families, it is difficult to keep a track of everything with their new local bank. That's where Aspora helps to make their lives easier.
            </p>
            <p className="apo-overview-problem" data-node-id="128:26">
              <strong>Problem :</strong> User when lands on the app they go through an onboarding journey. Once that is done, they still cannot access the add money/send money features. For them to be able to do that, they have to undergo a couple of more steps of verification. This right now seems too much at once and users tend to drop-off from the app and don't initiate fund addition/transfers.
            </p>
          </div>
        </section>

        {/* The comparison band and the meta bar butt straight up against each other in the design,
            reading as one continuous block of colour — so they share a wrapper and the page's
            120px section gap applies around the pair rather than between them. */}
        <div className="apo-comparison-block">
        <section id="comparison" className="apo-comparison" data-node-id="161:91">
          <h2 className="apo-comparison-heading" data-node-id="1775:3273">
            {/* Visible copy is typed in; the full string stays in the DOM for assistive tech and crawlers. */}
            <span
              className="apo-comparison-line"
              aria-hidden="true"
              ref={comparisonRef}
              style={{
                paddingLeft: `${comparisonIndentPct(comparisonTyped.length)}%`,
                '--apo-type-step': `${TYPE_STEP_MS}ms`,
              }}
            >
              <span className="apo-comparison-typed">{comparisonTyped}</span>
              <span className="apo-comparison-caret">|</span>
            </span>
            <span className="apo-visually-hidden">{COMPARISON_HEADING}</span>
          </h2>
          {/* The design bakes this whole band into one flat PNG (161:96), which is why it read as
              blurry. Rebuilt here as live markup — mint ground, labels and captions are text, so
              only the four screenshots are raster. */}
          <div className="apo-comparison-figure" data-node-id="161:94">
            <div className="apo-comparison-inner">
              {COMPARISON_PAIRS.map((pair) => (
                <div
                  className="apo-comparison-pair"
                  key={pair.id}
                  /* Every screenshot shares a 1532px height, so growing each column in
                     proportion to its source width renders all four at the same height —
                     the "After" screens are genuinely ~6% wider than the "Before" ones. */
                  style={{ flexGrow: pair.shots.reduce((sum, s) => sum + s.w, 0) }}
                >
                  {pair.shots.map((shot) => (
                    <figure
                      className="apo-comparison-item"
                      key={shot.src}
                      style={{ flexGrow: shot.w }}
                    >
                      <figcaption className="apo-comparison-label">{shot.label}</figcaption>
                      <img
                        src={`${imgBase}/${shot.src}.png`}
                        alt={shot.alt}
                        className="apo-comparison-shot"
                        width={shot.w}
                        height={1532}
                      />
                      {shot.numbered ? (
                        <ol className="apo-comparison-notes">
                          {shot.notes.map((note) => (
                            <li key={note}>{note}</li>
                          ))}
                        </ol>
                      ) : (
                        <p className="apo-comparison-notes apo-comparison-notes-plain">
                          {shot.notes[0]}
                        </p>
                      )}
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sits flush under the comparison band (Figma 167:285) */}
        <div className="apo-meta-bar" data-node-id="161:97">
          <div className="apo-meta-inner">
            <div className="apo-meta-item apo-meta-item-fixed" data-node-id="128:28">
              <p className="apo-meta-label">TIMELINE</p>
              <p className="apo-meta-value">1 week</p>
            </div>
            <div className="apo-meta-item apo-meta-item-flex" data-node-id="128:31">
              <p className="apo-meta-label">TEAM SETTING</p>
              <p className="apo-meta-value">1 PM, 1 Design lead, Me: IC</p>
            </div>
            <div className="apo-meta-item apo-meta-item-flex" data-node-id="128:34">
              <p className="apo-meta-label">MY ROLE</p>
              <p className="apo-meta-value">End-to-end design</p>
            </div>
          </div>
        </div>
        </div>

        {/* 01 – The existing flow */}
        <section id="existing-flow" className="apo-section apo-numbered" data-node-id="128:37">
          <span className="apo-step-number">01</span>
          <div className="apo-numbered-body">
            <div className="apo-block-heading">
              <p className="apo-eyebrow" data-node-id="161:113">The previous user flow</p>
              <h2 className="apo-headline" data-node-id="128:44">Everything ahead, all at once.</h2>
              <p className="apo-subtext" data-node-id="128:45">Every step was laid out together, making the experience feel overwhelming.</p>
            </div>
            <div className="apo-block-heading">
              <p className="apo-subheading" data-node-id="128:47">What we learned from the problems faced by users</p>
              <ul className="apo-bullets" data-node-id="128:49">
                <li>Users could see the whole process, but lacked the context to understand what mattered now and what they should do next.</li>
                <li>In case of an error when user had to take some action for resolution, it left users extremely confused.</li>
              </ul>
            </div>
            <div className="apo-image-frame apo-image-frame-wide" data-node-id="128:51">
              <img src={`${imgBase}/existing-flow.png`} alt="Existing post-onboarding flow, all steps shown at once" className="apo-image" />
              {/* Live annotation layer over the flow image — Figma 161:123, at 48% across / 62% down */}
              <p className="apo-image-annotation" data-node-id="161:123">
                These lock icons with steps were very misleading to the users. It is not necessary that these
                would unlock in the same order as they are placed as of now.
              </p>
            </div>
          </div>
        </section>

        {/* 02 – Explored a possible architecture */}
        <section id="architecture" className="apo-section apo-numbered" data-node-id="128:52">
          <span className="apo-step-number">02</span>
          <div className="apo-numbered-body">
            <div className="apo-block-heading">
              <p className="apo-eyebrow" data-node-id="128:59">Explored a possible Architecture</p>
              <h2 className="apo-headline" data-node-id="128:61">Solving from purely a UI lens</h2>
              <p className="apo-subtext" data-node-id="128:63">
                With sudden requirements raised from product, I kept the design close to the activated account home and reorganized the information inside that familiar structure.
              </p>
            </div>
            <div className="apo-block-heading">
              <p className="apo-subheading" data-node-id="128:65">Breaking down user pain points and looking at edge cases</p>
              <ol className="apo-numbered-list" data-node-id="128:66">
                <li>What if my payment gets deducted and it doesn't reflect?</li>
                <li>I don't understand what I need to do now</li>
                <li>Why does this particular step looks locked? Is it related to some other thing?</li>
                <li>For how long will the verification take place?</li>
                <li>How will arrival of welcome letter make an impact in the process? Is it going to be a hard copy?</li>
                <li>What all details do I need to update?</li>
              </ol>
            </div>
            <div className="apo-image-frame" data-node-id="128:74">
              <img src={`${imgBase}/architecture-v1.png`} alt="V1 architecture reorganizing the account home" className="apo-image" />
            </div>
            <p className="apo-learned" data-node-id="128:79">
              <span className="apo-learned-headline"><strong>Learned : </strong>Band-aid solution doesn't always work</span>
              <span className="apo-learned-sub">Visual familiarity helped, but users were still being asked to process too many future steps.</span>
              <span className="apo-learned-sub">Better hierarchy did not remove the overload.</span>
            </p>
          </div>
        </section>

        {/* 03 – Experience re-thinking */}
        <div className="apo-tinted-band" data-node-id="128:83">
          <div className="apo-tinted-note" data-node-id="128:84">
            <div className="apo-tinted-note-inner">
              <p>
                NOTE: We made IA using Claude prototyping. This was done to make collaboration with product easier.
              </p>
              <ol>
                <li>Created a prototype to discuss IA</li>
                <li>Changed the IA and reflected that over the prototype to discuss</li>
                <li>Finalize the IA in the prototype itself before starting the designing</li>
              </ol>
            </div>
          </div>
          <div className="apo-tinted-green" data-node-id="128:86">
            <div className="apo-tinted-inner">
            <section id="rethinking" className="apo-section apo-numbered apo-numbered-nogap" data-node-id="128:91">
              <span className="apo-step-number">03</span>
              <div className="apo-numbered-body">
                {/* Text column runs full width; the screens + learnings sit in their own row below (Figma 161:160) */}
                <div className="apo-rethink-text">
                  <div className="apo-block-heading">
                    <p className="apo-eyebrow" data-node-id="128:97">Experience re-thinking</p>
                    <h2 className="apo-headline" data-node-id="128:99">We were only able to close 2 questions from simple UI change approach.</h2>
                    {/* Only the two questions the UI pass closed, keeping their original numbers (Figma 161:169) */}
                    <ol className="apo-numbered-list" data-node-id="161:169">
                      <li value="3">Why does this particular step looks locked? <s>Is it related to some other thing?</s></li>
                      <li value="5">How will arrival of welcome letter make an impact in the process? <s>Is it going to be a hard copy?</s></li>
                    </ol>
                  </div>
                  <div className="apo-block-heading">
                    <p className="apo-subheading" data-node-id="128:108">Hypothesis</p>
                    <ul className="apo-bullets" data-node-id="128:110">
                      <li>What if, we change the approach of how we indicate 3 steps?</li>
                      <li>What if, we make users interact with pre-answered questions to reduce the delay in process caused by confusion or curiosity?</li>
                      <li>What if, not users want to know the &ldquo;why&rdquo; behind every action?</li>
                    </ul>
                  </div>
                </div>
                {/* Learnings is bottom-aligned with the screens in the design (both end at y≈904) */}
                <div className="apo-rethink-bottom">
                  <div className="apo-rethink-images" data-node-id="161:179">
                    <div className="apo-phone-frame" data-node-id="161:180">
                      <img src={`${imgBase}/account-home-1.png`} alt="Reorganized account home, variant 1" className="apo-image" />
                    </div>
                    <div className="apo-phone-frame" data-node-id="161:181">
                      <img src={`${imgBase}/account-home-2.png`} alt="Reorganized account home, variant 2" className="apo-image" />
                    </div>
                  </div>
                  <p className="apo-learnings-callout" data-node-id="161:182">
                    <strong>Learnings</strong>
                    <span>This approach works, but with <strong>a little more context.</strong></span>
                    <span>No need to stick with the &ldquo;unactive&rdquo; send and add money CTA</span>
                    <span><strong>Introduce</strong> something <strong>new</strong>, if needed, just <strong>make it simple</strong>.</span>
                  </p>
                </div>
              </div>
            </section>
            </div>
          </div>
        </div>

        {/* 04 – Giving it more structure */}
        <section id="structure" className="apo-section apo-numbered" data-node-id="128:117">
          <span className="apo-step-number">04</span>
          <div className="apo-numbered-body">
            <div className="apo-block-heading">
              <p className="apo-eyebrow" data-node-id="128:125">Giving it more structure</p>
              <h2 className="apo-headline" data-node-id="128:127">The simplifying question</h2>
              <ul className="apo-bullets" data-node-id="128:129">
                <li>Why tell users everything that is coming at once?</li>
                <li>A sequential approach clarified the current state and next action, while still preparing users for everything ahead.</li>
                <li>Show four steps, the current position, its status and the next action, nothing more unless user explicitly wants to see what's ahead.</li>
              </ul>
            </div>
            {/* Sits below the heading, left-aligned and full width — same treatment as the 02 "Learned" block (Figma 161:202) */}
            <div className="apo-solution-block" data-node-id="161:204">
              <p className="apo-solution-title">Solution?</p>
              <ul className="apo-bullets">
                <li>Better communication!</li>
                <li>Explain more</li>
              </ul>
            </div>
            <div className="apo-image-frame" data-node-id="128:142">
              <img src={`${imgBase}/new-iteration.png`} alt="New iteration with sequential four-step structure" className="apo-image" />
            </div>
            <div className="apo-followup" data-node-id="128:143">
              <p className="apo-followup-title">Something still makes it feel overwhelming. But what?</p>
              <ul className="apo-bullets">
                <li>What if, users don't need to know what's ahead?</li>
                <li>What if, we make the users stick to what's at hand?</li>
              </ul>
            </div>
            <div className="apo-section-divider" data-node-id="128:148" aria-hidden="true"></div>
          </div>
        </section>

        {/* 05 – Final direction */}
        <section id="final-direction" className="apo-section apo-numbered" data-node-id="128:149">
          <span className="apo-step-number">05</span>
          <div className="apo-numbered-body">
            <div className="apo-block-heading">
              <p className="apo-eyebrow" data-node-id="128:154">ASPORA · FINAL DIRECTION : We only removed things, didn't add anything new.</p>
              <h2 className="apo-final-title">
                <span className="apo-final-title-line1" data-node-id="128:156">Context for now,</span>
                <span className="apo-final-title-line2" data-node-id="128:157">Visibility of what's next</span>
              </h2>
              <p className="apo-subtext apo-subtext-wide" data-node-id="128:159">
                Seven states, one continuous system. Each screen communicates the current step, its status and the next action; without previewing unnecessary work ahead.
              </p>
            </div>
          </div>

          {/* Grid is a sibling of .apo-numbered-body (not nested in it): Figma 153:24 is wider
              than the text column above it and bleeds past the "05" indent. Its width:100%
              plus #final-direction's flex-wrap forces it onto its own full-width row instead
              of sitting in the 05/heading flex row. */}
          <div className="apo-screens-grid">
            <div className="apo-screens-row">
              <article className="apo-screen-card apo-screen-card-grey" data-node-id="128:164">
                <span className="apo-screen-number">01</span>
                <div className="apo-screen-image"><img src={`${imgBase}/screen-01.png`} alt="Documents in review" /></div>
                <div className="apo-screen-copy">
                  <p className="apo-screen-status">Documents in review</p>
                  <p className="apo-screen-title">Make waiting legible.</p>
                  <p className="apo-screen-desc">Confirm receipt and tell users when no action is needed.</p>
                </div>
              </article>
              <article className="apo-screen-card apo-screen-card-grey" data-node-id="128:174">
                <span className="apo-screen-number">02</span>
                <div className="apo-screen-image"><img src={`${imgBase}/screen-02.png`} alt="Attention required" /></div>
                <div className="apo-screen-copy">
                  <p className="apo-screen-status">Attention required</p>
                  <p className="apo-screen-title">Resolve the interruption.</p>
                  <p className="apo-screen-desc">Keep the problem and corrective action in one place.</p>
                </div>
              </article>
              <article className="apo-screen-card apo-screen-card-grey" data-node-id="128:186">
                <span className="apo-screen-number">03</span>
                <div className="apo-screen-image"><img src={`${imgBase}/screen-03.png`} alt="First deposit" /></div>
                <div className="apo-screen-copy">
                  <p className="apo-screen-status">First deposit</p>
                  <p className="apo-screen-title">Make the requirement concrete.</p>
                  <p className="apo-screen-desc">Present the next unlock with a direct Add money action.</p>
                </div>
              </article>
              <article className="apo-screen-card apo-screen-card-grey" data-node-id="128:198">
                <span className="apo-screen-number">04</span>
                <div className="apo-screen-image"><img src={`${imgBase}/screen-04.png`} alt="Welcome letter" /></div>
                <div className="apo-screen-copy">
                  <p className="apo-screen-status">Welcome letter</p>
                  <p className="apo-screen-title">Show what the bank is doing.</p>
                  <p className="apo-screen-desc">Name final checks and provide something tangible to track.</p>
                </div>
              </article>
            </div>
            <div className="apo-screens-row apo-screens-row-narrow">
              <article className="apo-screen-card apo-screen-card-green" data-node-id="128:211">
                <span className="apo-screen-number">05</span>
                <div className="apo-screen-image"><img src={`${imgBase}/screen-05.png`} alt="Ready to transact" /></div>
                <div className="apo-screen-copy">
                  <p className="apo-screen-status">Ready to transact</p>
                  <p className="apo-screen-title">Enable value early.</p>
                  <p className="apo-screen-desc">Separate what is pending from what is already possible.</p>
                </div>
              </article>
              <article className="apo-screen-card apo-screen-card-green" data-node-id="128:221">
                <span className="apo-screen-number">06</span>
                <div className="apo-screen-image"><img src={`${imgBase}/screen-06.png`} alt="Account ready" /></div>
                <div className="apo-screen-copy">
                  <p className="apo-screen-status">Account ready</p>
                  <p className="apo-screen-title">Complete the arc.</p>
                  <p className="apo-screen-desc">Celebrate full access and return home to its long-term purpose.</p>
                </div>
              </article>
              <article className="apo-screen-card apo-screen-card-green" data-node-id="128:230">
                <span className="apo-screen-number">07</span>
                <div className="apo-screen-image"><img src={`${imgBase}/screen-07.png`} alt="Contextual FAQ" /></div>
                <div className="apo-screen-copy">
                  <p className="apo-screen-status">Contextual FAQ</p>
                  <p className="apo-screen-title">Help at the point of doubt.</p>
                  <p className="apo-screen-desc">Answer timing, safety, access and documents in context.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Qualitative impact + learnings */}
        <section id="impact" className="apo-section apo-impact" data-node-id="128:242">
          <div className="apo-impact-block" data-node-id="128:243">
            <p className="apo-label-caps">QUALITATIVE IMPACT</p>
            <ol className="apo-numbered-list">
              <li>In moderated calls, screen-sharing the flow and gathering live feedback, users appreciated this version more because of its clearer structure and less information to deal with at once.</li>
              <li>Users highlighted that they liked how we have a list of questions pre-answered for each step. They added, &ldquo;it saves a lot of time.&rdquo;</li>
            </ol>
          </div>
          <div className="apo-impact-block" data-node-id="128:246">
            <p className="apo-label-caps">LEARNINGS</p>
            <ol className="apo-numbered-list">
              <li>Iterate fast, update faster.</li>
              <li>Stand for the right initiative : re-thinking the IA instead of patching the UI, even though the UI fix was faster to ship.</li>
              <li>Sometimes less is more, even with communication : showing users everything ahead felt transparent but actually increased anxiety.</li>
            </ol>
          </div>
        </section>

        <footer className="apo-footer" data-node-id="128:13">
          <a
            href="https://www.figma.com/design/O52s0gyUGghNaD7uUjhOhG/Aspora-works-by-me?node-id=0-1&t=2Ft2s2iwsRYm67Ff-1"
            target="_blank"
            rel="noopener noreferrer"
            className="apo-footer-link"
            data-node-id="128:15"
          >
            Checkout the Figma link for more works by me at Aspora
          </a>
          <p className="apo-footer-name" data-node-id="128:16">Aspora post-onboarding</p>
        </footer>
      </main>
    </div>
  );
};

export default AsporaPostOnboarding;
