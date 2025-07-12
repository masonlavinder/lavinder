import { forwardRef, useState } from 'react';
import SelectableCard from './SelectableCard';
import '../styles/SelectableCardGrid.css';
import {PostData} from '../utils/postGrabber';
import { useNavigate } from 'react-router-dom';
import Post from '../pages/Post';

interface SelectableCardGridProps {
  items: PostData[];
}

const genericPost: PostData = {
  id: 'generic',
  title: 'Generic Post',
  slug: 'generic-post',
  type: 'post'
};

const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const SelectableCardGrid = forwardRef<HTMLDivElement, SelectableCardGridProps>(({ items }, ref) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  const aboutPage = {
    id: 'about',
    title: 'About',
    slug: 'about',
    type: 'page'
  } as PostData;

  // Add the about page in the first position
  const itemsWithAbout = [
    aboutPage,
    ...items
  ];

  // Fill with generic posts if there are less than 16 items total
  const targetItemCount = 15;
  const actualItemCount = itemsWithAbout.length;
  
  let finalItems = [...itemsWithAbout];
  
  if (actualItemCount < targetItemCount) {
    console.log(`Less than ${targetItemCount} items, adding ${targetItemCount - actualItemCount} generic posts`);
    const fillCount = targetItemCount - actualItemCount;
    
    for (let i = 0; i < fillCount; i++) {
      const updatedPost = {
        ...genericPost, 
        id: `generic-${i}`,
        title: `Wii`
      };
      finalItems.push(updatedPost);
    }
  }

  const columns = chunkArray(finalItems, 3);
  const navigate = useNavigate();

  const handleCardClick = (post: PostData) => {
    if (post.type === 'page') {
      // Navigate to specific pages
      navigate(`/${post.slug}`);
    } 
    else if (post.title =='Wii') {
      // Handle generic posts - you can customize this behavior
      console.log('Generic post clicked:', post);
      // Maybe show a placeholder or do nothing
    } 
    else {
      // Navigate to blog posts
      console.log('Navigating to post:', post);
      navigate(`/post/${post.slug}`, {state: post});
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
                onClick={() => handleCardClick(item)}
                className={item.title === 'Wii' ? 'selectable-card-grey' : 'selectable-card'}
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