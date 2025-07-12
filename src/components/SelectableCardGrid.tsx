import React, { forwardRef, useState } from 'react';
import SelectableCard from './SelectableCard';
import '../styles/SelectableCardGrid.css';

interface CardItem {
  id: string;
  label: string;
}

interface SelectableCardGridProps {
  items: CardItem[];
}

const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const SelectableCardGrid = forwardRef<HTMLDivElement, SelectableCardGridProps>(({ items }, ref) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const columns = chunkArray(items, 3);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return (
    <div className="scroll-container" ref={ref}>
      <div className="card-grid">
        {columns.map((column, colIndex) => (
          <div className="card-column" key={`col-${colIndex}`}>
            {column.map(item => (
              <SelectableCard
                key={item.id}
                selected={selectedIds.has(item.id)}
                onClick={() => toggleSelect(item.id)}
              >
                {item.label}
              </SelectableCard>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default SelectableCardGrid;
