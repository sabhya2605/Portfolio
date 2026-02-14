import React from 'react';
import './MenuV1.css';

const MenuV1 = ({ sections, onClose }) => {
  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    onClose();
  };

  return (
    <div className="dcv1-menu-overlay" onClick={onClose}>
      <div className="dcv1-menu-content" onClick={(e) => e.stopPropagation()}>
        <div className="dcv1-menu-header">
          <h2 className="dcv1-menu-title">Menu</h2>
          <button className="dcv1-menu-close-button" onClick={onClose}>×</button>
        </div>
        <nav className="dcv1-menu-nav">
          <ul className="dcv1-menu-list">
            {sections.map((section) => (
              <li key={section.id} className="dcv1-menu-item">
                <button className="dcv1-menu-link" onClick={() => handleSectionClick(section.id)}>
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MenuV1;
