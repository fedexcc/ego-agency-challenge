import React, { useState } from 'react';
import '../styles/TopBar.scss';
import Logo from '../assets/images/Logo.svg';
import MenuIcon from '../assets/menu/icon/Gray.svg';
import Navigation from './Navigation';

interface TopBarProps {
  children?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="topbar">
        <div className="topbar-content">
          {children || (
            <>
              <div className="logo-container">
                <img src={Logo} alt="EGO Logo" className="logo-image" />
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