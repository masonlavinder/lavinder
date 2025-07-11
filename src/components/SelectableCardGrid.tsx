import React, { useState } from 'react';
import SelectableCard from './SelectableCard';
import '../styles/SelectableCardGrid.css';

interface CardItem {
  id: string;
  label: string;
}

interface SelectableCardGridProps {
  items: CardItem[];
}

const SelectableCardGrid: React.FC<SelectableCardGridProps> = ({ items }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelectedIds(newSet);
  };

  return (
    <div className="scroll-container">
      <div className="card-grid">
        {items.map((item) => (
          <SelectableCard
            key={item.id}
            selected={selectedIds.has(item.id)}
            onClick={() => toggleSelect(item.id)}
          >
            {item.label}
          </SelectableCard>
        ))}
      </div>
    </div>
  );
};

export default SelectableCardGrid;
