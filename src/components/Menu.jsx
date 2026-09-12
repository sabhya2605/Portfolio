import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 100; // Offset for header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const Menu = ({ sections, onClose }) => {
  const handleSectionClick = (sectionId) => {
    scrollToSection(sectionId);
    onClose();
  };

  return (
    <div className="menu-overlay" onClick={onClose}>
      <div className="menu-content" onClick={(e) => e.stopPropagation()}>
        <div className="menu-header">
          <h2 className="menu-title">Menu</h2>
          <button className="menu-close-button" onClick={onClose}>×</button>
        </div>
        <nav className="menu-nav">
          <ul className="menu-list">
            {sections.map((section) => (
              <li key={section.to || section.id} className="menu-item">
                {section.to ? (
                  <Link className="menu-link" to={section.to} onClick={onClose}>
                    {section.title}
                  </Link>
                ) : (
                  <button
                    className="menu-link"
                    onClick={() => handleSectionClick(section.id)}
                  >
                    {section.title}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
