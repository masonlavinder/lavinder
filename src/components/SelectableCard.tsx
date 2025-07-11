import React from 'react';
import '../styles/SelectableCard.css';

interface SelectableCardProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const SelectableCard: React.FC<SelectableCardProps> = ({
  selected,
  onClick,
  children,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`selectable-card ${selected ? 'selected' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default SelectableCard;
