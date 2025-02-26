import React from 'react';
import '../styles/Navigation.scss';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const menuGroups = {
    main: [
      { id: 1, text: 'Modelos', isActive: true },
      { id: 2, text: 'Servicios y Accesorios' },
      { id: 3, text: 'Financiación' },
      { id: 4, text: 'Reviews y Comunidad' }
    ],
    toyota: [
      { id: 5, text: 'Toyota Mobility Service' },
      { id: 6, text: 'Toyota Gazoo Racing' },
      { id: 7, text: 'Toyota Híbridos' }
    ],
    services: [
      { id: 8, text: 'Concesionarios' },
      { id: 9, text: 'Test Drive' },
      { id: 10, text: 'Contacto' }
    ],
    info: [
      { id: 11, text: 'Actividades' },
      { id: 12, text: 'Servicios al Cliente' },
      { id: 13, text: 'Ventas Especiales' },
      { id: 14, text: 'Innovación' },
      { id: 15, text: 'Prensa' },
      { id: 16, text: 'Acerca de...' }
    ]
  };

  return (
    <div className={`navigation-wrapper ${isOpen ? 'open' : ''}`}>
      <div className="navigation-overlay" onClick={onClose} />
      <nav className="navigation-menu">
        <div className="navigation-header">
          <button className="close-button" onClick={onClose}>
            <span>Cerrar</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <div className="navigation-items">
          <ul className="menu-group">
            {menuGroups.main.map((item) => (
              <li key={item.id} className={`menu-item ${item.isActive ? 'active' : ''}`}>
                {item.text}
              </li>
            ))}
          </ul>
          <div className="separator" />
          <ul className="menu-group">
            {menuGroups.toyota.map((item) => (
              <li key={item.id} className="menu-item">
                {item.text}
              </li>
            ))}
          </ul>
          <div className="separator" />
          <ul className="menu-group">
            {menuGroups.services.map((item) => (
              <li key={item.id} className="menu-item">
                {item.text}
              </li>
            ))}
          </ul>
          <ul className="menu-group secondary">
            {menuGroups.info.map((item) => (
              <li key={item.id} className="menu-item">
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation; 