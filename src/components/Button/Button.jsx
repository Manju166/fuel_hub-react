// Button.js
import React from 'react';
import './style.css'
const Button = ({ label, onClick, type = 'button', disabled = false, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`custom-button ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
