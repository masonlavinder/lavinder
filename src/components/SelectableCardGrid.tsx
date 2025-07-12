import { forwardRef, useState } from 'react';
import SelectableCard from './SelectableCard';
import '../styles/SelectableCardGrid.css';
import {PostData} from '../utils/postGrabber'; 
import { useNavigate } from 'react-router-dom';

interface SelectableCardGridProps {
  items: PostData[];
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
    const navigate = useNavigate();

    const handleCardClick = (post: PostData) => {
        if (post.type === 'page') {
          // Navigate to specific pages
          navigate(`/${post.slug}`);
        } else {
          // Navigate to blog posts
          console.log('Navigating to post:', post);
          navigate(`/post/${post.slug}`, {state:post});
        }
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
                onClick={()=>handleCardClick(item)}
              >
                {item.title}
              </SelectableCard>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default SelectableCardGrid;
