import React, { useState, useEffect } from 'react';
import '../styles/FilterSection.scss';

interface FilterSectionProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  filterOptions: string[];
  selectedOrder: string;
  onOrderChange: (order: string) => void;
}

const orderOptions = [
  { id: 'none', label: 'Nada', value: 'Nada' },
  { 
    id: 'price-asc', 
    label: <>De <strong>menor</strong> a <strong>mayor</strong> precio</>, 
    value: 'De menor a mayor precio'
  },
  { 
    id: 'price-desc', 
    label: <>De <strong>mayor</strong> a <strong>menor</strong> precio</>, 
    value: 'De mayor a menor precio'
  },
  { 
    id: 'year-desc', 
    label: <>Más <strong>nuevos</strong> primero</>, 
    value: 'Más nuevos primero'
  },
  { 
    id: 'year-asc', 
    label: <>Más <strong>viejos</strong> primero</>, 
    value: 'Más viejos primero'
  }
];

const FilterSection: React.FC<FilterSectionProps> = ({ 
  selectedFilter, 
  onFilterChange,
  filterOptions,
  selectedOrder,
  onOrderChange
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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
                    className={`dropdown-item ${selectedFilter === option ? 'active' : ''}`}
                    onClick={() => {
                      onFilterChange(option);
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
            {filterOptions.map((option) => (
              <button
                key={option}
                className={`filter-option ${selectedFilter === option ? 'active' : ''}`}
                onClick={() => onFilterChange(option)}
              >
                {option}
              </button>
            ))}
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
                  key={option.id}
                  className={`dropdown-item ${selectedOrder === option.value ? 'active' : ''}`}
                  onClick={() => {
                    onOrderChange(option.value);
                    setIsDropdownOpen(false);
                  }}
                >
                  {option.label}
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