import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Introduction from './components/Introduction';
import Search from './components/Search';
import Resume from './components/Resume';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/search" element={<Search />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
