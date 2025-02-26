import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/TopBar.scss';
import Logo from '../assets/images/Logo.svg';
import MenuIcon from '../assets/menu/icon/Gray.svg';
import Navigation from './Navigation';

interface TopBarProps {
  children?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isModelDetail = location.pathname.startsWith('/modelos/');
  const isModelsActive = location.pathname === '/modelos' || location.pathname === '/';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="topbar">
        <div className="topbar-content">
          {children || (
            <>
              <div className="left-section" style={{ display: 'flex', alignItems: 'center' }}>
                <Link to="/" className="logo-container">
                  <img src={Logo} alt="EGO Logo" className="logo-image" />
                </Link>
                <nav className="navigation-breadcrumb">
                  <div className={`nav-item ${isModelsActive ? 'active' : ''}`}>
                    <Link 
                      to="/modelos" 
                      className={`nav-link ${isModelsActive ? 'active' : ''}`}
                    >
                      Modelos
                    </Link>
                  </div>
                  {isModelDetail && (
                    <div className="nav-item active">
                      <Link 
                        to={location.pathname} 
                        className="nav-link active"
                      >
                        Ficha de modelo
                      </Link>
                    </div>
                  )}
                </nav>
              </div>
              <div className="menu-container" onClick={toggleMenu}>
                <span className="menu-text">Menú</span>
                <img src={MenuIcon} alt="Menu" className="menu-icon" />
              </div>
            </>
          )}
        </div>
      </header>
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default TopBar; 