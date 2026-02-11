import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Introduction from './components/Introduction';
import Search from './components/Search';
import Resume from './components/Resume';
import DeliveryCheckout from './components/DeliveryCheckout';
import './App.css';

function App() {
  // Get basename from PUBLIC_URL (set by react-scripts based on homepage in package.json)
  // For GitHub Pages: /Portfolio
  // process.env.PUBLIC_URL is replaced at build time by react-scripts
  const basename = process.env.PUBLIC_URL || '/Portfolio';
  
  return (
    <Router basename={basename}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/search" element={<Search />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/delivery-checkout" element={<DeliveryCheckout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
