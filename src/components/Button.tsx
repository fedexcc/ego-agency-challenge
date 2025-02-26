import React from 'react';
import '../styles/Button.scss';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'inverted' | 'large';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'default',
  onClick,
  className = ''
}) => {
  const buttonClasses = `btn ${variant} ${className}`.trim();

  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button; 