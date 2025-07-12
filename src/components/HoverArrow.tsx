import React, { useState } from 'react';
import '../styles/Home.css';
import arrowRight from '../assets/arrow-right.svg';
import arrowRightHover from '../assets/arrow-right-hover.svg';
import arrowLeft from '../assets/arrow-left.svg';
import arrowLeftHover from '../assets/arrow-left-hover.svg';

interface HoverArrowProps {
  onClick: () => void;
  side?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

const HoverArrow: React.FC<HoverArrowProps> = ({ 
  onClick, 
  side = 'right',
  className = '',
  disabled = false,
  ariaLabel
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const arrows = {
    left: { default: arrowLeft, hover: arrowLeftHover },
    right: { default: arrowRight, hover: arrowRightHover }
  };
  
  const currentArrow = arrows[side];
  const buttonClass = `floating-${side}-arrow ${className}`.trim();
  const defaultAriaLabel = `Scroll ${side}`;
  
  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || defaultAriaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={isHovered ? currentArrow.hover : currentArrow.default}
        alt={`Arrow ${side}`}
        draggable={false}
      />
    </button>
  );
};

export default HoverArrow;