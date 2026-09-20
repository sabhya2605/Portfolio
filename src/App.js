import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigationType,
} from 'react-router-dom';
import Search from './components/Search';
import Resume from './components/Resume';
import DeliveryCheckout from './components/DeliveryCheckout';
import DeliveryCheckoutV1 from './components/DeliveryCheckoutV1';
import SearchV1 from './components/SearchV1';
import AsporaPostOnboarding from './components/AsporaPostOnboarding';
import Landing from './components/Landing';
import AboutV2 from './components/AboutV2';
import AsporaGold from './components/AsporaGold';
import './App.css';

/*
 * The router leaves the window scrolled where it was, so following a link from
 * halfway down one page lands you halfway down the next. Reset it on forward
 * navigations only: POP is the back/forward button, where the browser's own
 * restoration is the behaviour people expect, and a hash belongs to the anchor.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // the browser restores POP itself, and that is what Back should do
    if (navigationType === 'POP') return undefined;

    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    /*
     * A hash that arrives with a route change has no anchor behaviour of its
     * own - the target mounts after the URL updates - so bring it into view
     * here, clearing whatever sticky header the page carries.
     */
    let raf = 0;
    const jump = () => {
      const target = document.getElementById(hash.slice(1));
      if (!target) {
        raf = requestAnimationFrame(jump);
        return;
      }
      const header = document.querySelector('header');
      const offset =
        header && getComputedStyle(header).position === 'sticky' ? header.offsetHeight : 0;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - offset });
    };
    raf = requestAnimationFrame(jump);
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, navigationType]);

  return null;
}

function App() {
  // For custom domain at root, basename should be empty
  // process.env.PUBLIC_URL will be empty for root domain
  const basename = process.env.PUBLIC_URL || '';

  return (
    <Router basename={basename}>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* The v2 pages are the site now, on plain paths. */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<AboutV2 />} />
          <Route path="/resume" element={<Resume />} />

          {/* Case studies */}
          <Route path="/aspora-gold" element={<AsporaGold />} />
          <Route path="/aspora-post-onboarding" element={<AsporaPostOnboarding />} />
          <Route path="/search-v1" element={<SearchV1 />} />
          <Route path="/delivery-checkout-v1" element={<DeliveryCheckoutV1 />} />
          <Route path="/search" element={<Search />} />
          <Route path="/delivery-checkout" element={<DeliveryCheckout />} />

          {/*
            Introduction.jsx (the previous landing) is still in the repo but no
            longer routed - it is superseded by Landing on "/". Re-add a route
            here to bring it back.
          */}

          {/* The pre-cutover paths, so anything already shared keeps working */}
          <Route path="/v2" element={<Navigate to="/" replace />} />
          <Route path="/about-v2" element={<Navigate to="/about" replace />} />

          {/* Anything else lands on the home page rather than a blank screen */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
