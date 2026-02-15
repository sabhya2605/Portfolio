import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Introduction from './components/Introduction';
import Search from './components/Search';
import Resume from './components/Resume';
import DeliveryCheckout from './components/DeliveryCheckout';
import DeliveryCheckoutV1 from './components/DeliveryCheckoutV1';
import './App.css';

function App() {
  // For custom domain at root, basename should be empty
  // process.env.PUBLIC_URL will be empty for root domain
  const basename = process.env.PUBLIC_URL || '';
  
  return (
    <Router basename={basename}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/search" element={<Search />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/delivery-checkout" element={<DeliveryCheckout />} />
          <Route path="/delivery-checkout-v1" element={<DeliveryCheckoutV1 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
