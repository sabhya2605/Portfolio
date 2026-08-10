import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AsporaPostOnboarding.css';
import Menu from './Menu';

/**
 * Aspora – Post-onboarding experience. Figma frame 145:2 (file "yaprr").
 * Source: https://www.figma.com/design/859OcVrbW6egRcOKPU1TTp/yaprr?node-id=145-2
 * Section order follows the Figma canvas top-to-bottom (numbered 01–05 in the design).
 * Images sourced from this frame (136:xxx); layout/copy node-ids elsewhere in this file
 * still reference the earlier 128:xxx frame, which is structurally identical.
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

const AsporaPostOnboarding = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'overview', title: 'Aspora post onboarding experience' },
    { id: 'existing-flow', title: '01 · The existing flow' },
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

        {/* Meta bar is its own top-level widget in the design (120px gap above/below), not nested under overview */}
        <div className="apo-meta-bar" data-node-id="128:27">
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

        {/* 01 – The existing flow */}
        <section id="existing-flow" className="apo-section apo-numbered" data-node-id="128:37">
          <span className="apo-step-number">01</span>
          <div className="apo-numbered-body">
            <div className="apo-block-heading">
              <p className="apo-eyebrow" data-node-id="128:42">The existing flow</p>
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
                <div className="apo-rethink-row">
                  <div className="apo-rethink-text">
                    <div className="apo-block-heading">
                      <p className="apo-eyebrow" data-node-id="128:97">Experience re-thinking</p>
                      <h2 className="apo-headline" data-node-id="128:99">We were only able to close 2 questions from simple UI change approach.</h2>
                      <ol className="apo-numbered-list" data-node-id="128:100">
                        <li>What if my payment gets deducted and it doesn't reflect?</li>
                        <li>I don't understand what I need to do now</li>
                        <li>Why does this particular step looks locked? <s>Is it related to some other thing?</s></li>
                        <li>For how long will the verification take place?</li>
                        <li>How will arrival of welcome letter make an impact in the process? <s>Is it going to be a hard copy?</s></li>
                        <li>What all details do I need to update?</li>
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
                  <div className="apo-rethink-images" data-node-id="128:114">
                    <div className="apo-phone-frame" data-node-id="128:115">
                      <img src={`${imgBase}/account-home-1.png`} alt="Reorganized account home, variant 1" className="apo-image" />
                    </div>
                    <div className="apo-phone-frame" data-node-id="128:116">
                      <img src={`${imgBase}/account-home-2.png`} alt="Reorganized account home, variant 2" className="apo-image" />
                    </div>
                  </div>
                </div>
                <p className="apo-learnings-callout" data-node-id="128:87">
                  <strong>Learnings</strong>
                  <span>This approach works, but with <strong>a little more context.</strong></span>
                  <span className="apo-learnings-nowrap">No need to stick with the &ldquo;unactive&rdquo; send and add money CTA</span>
                  <span><strong>Introduce</strong> something <strong>new</strong>, if needed, just <strong>make it simple</strong>.</span>
                </p>
              </div>
            </section>
            </div>
          </div>
        </div>

        {/* 04 – Giving it more structure */}
        <section id="structure" className="apo-section apo-numbered" data-node-id="128:117">
          <span className="apo-step-number">04</span>
          <div className="apo-numbered-body">
            <div className="apo-structure-row">
              <div className="apo-block-heading">
                <p className="apo-eyebrow" data-node-id="128:125">Giving it more structure</p>
                <h2 className="apo-headline" data-node-id="128:127">The simplifying question</h2>
                <ul className="apo-bullets" data-node-id="128:129">
                  <li>Why tell users everything that is coming at once?</li>
                  <li>A sequential approach clarified the current state and next action, while still preparing users for everything ahead.</li>
                  <li>Show four steps, the current position, its status and the next action, nothing more unless user explicitly wants to see what's ahead.</li>
                </ul>
              </div>
              <div className="apo-callout-box" data-node-id="128:133">
                <p className="apo-eyebrow">Solution?</p>
                <ul className="apo-bullets">
                  <li>Better communication!</li>
                  <li>Explain more</li>
                </ul>
              </div>
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
