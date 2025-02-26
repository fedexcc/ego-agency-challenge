import React, { useState, useEffect } from 'react';
import '../styles/FilterSection.scss';

const FilterSection: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('De menor a mayor precio');
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const orderOptions = [
    'Nada',
    'De menor a mayor precio',
    'De mayor a menor precio',
    'Más nuevos primero',
    'Más viejos primero'
  ];

  const filterOptions = [
    'Todos',
    'Autos',
    'Pickups y Comerciales',
    'SUVs y Crossovers'
  ];

  return (
    <div className="filter-section">
      <div className="filter-container">
        <span className="filter-label">Filtrar por</span>
        {isMobile ? (
          <div className="custom-dropdown">
            <button 
              className="dropdown-toggle"
              onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
            >
              Filtrar por
              <span className={`arrow ${isFilterDropdownOpen ? 'up' : 'down'}`}>▼</span>
            </button>
            {isFilterDropdownOpen && (
              <div className="dropdown-menu">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    className={`dropdown-item ${option === 'Todos' ? 'active' : ''}`}
                    onClick={() => {
                      setIsFilterDropdownOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="filter-options">
            <button className="filter-option active">Todos</button>
            <button className="filter-option">Autos</button>
            <button className="filter-option">Pickups y Comerciales</button>
            <button className="filter-option">SUVs y Crossovers</button>
          </div>
        )}
      </div>
      <div className="order-container">
        <div className="custom-dropdown">
          <button 
            className="dropdown-toggle"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Ordenar por
            <span className={`arrow ${isDropdownOpen ? 'up' : 'down'}`}>▼</span>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {orderOptions.map((option) => (
                <button
                  key={option}
                  className={`dropdown-item ${selectedOrder === option ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedOrder(option);
                    setIsDropdownOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSection; 