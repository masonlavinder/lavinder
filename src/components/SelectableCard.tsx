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
  className,
}) => {
    console.log('SelectableCard rendered', { selected, className });
  return (
    <div
      onClick={onClick}
      className={className}
    >
      {children}
    </div>
  );
};

export default SelectableCard;
