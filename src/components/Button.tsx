import React from 'react';
import '../styles/Button.scss';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      className={`custom-button ${variant}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button; 