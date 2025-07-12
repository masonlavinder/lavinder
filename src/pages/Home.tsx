import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectableCardGrid from '../components/SelectableCardGrid';
import BottomBar from '../components/BottomBar';
import HoverArrow from '../components/HoverArrow';
import '../styles/Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollClicks, setScrollClicks] = React.useState(0);

  const goToAbout = () => {
    navigate('/about');
  };

  const scrollRight = () => {
        if (scrollRef.current) {
        scrollRef.current.scrollLeft += 500;
            setScrollClicks(scrollClicks + 1);
        }
  };

  const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 500;
            setScrollClicks(scrollClicks - 1);
        }
    };

  return (
    <div className="home-wrapper">
      <div >
        <SelectableCardGrid
          ref={scrollRef}
          items={[
            { id: '1', label: 'Card 1' },
            { id: '2', label: 'Card 2' },
            { id: '3', label: 'Card 3' },
            { id: '4', label: 'Card 4' },
            { id: '5', label: 'Card 5' },
            { id: '6', label: 'Card 6' },
            { id: '7', label: 'Card 7' },
            { id: '8', label: 'Card 8' },
            { id: '9', label: 'Card 9' },
            { id: '10', label: 'Card 10' },
            { id: '11', label: 'Card 11' },
            { id: '12', label: 'Card 12' },
            { id: '13', label: 'Card 13' },
            { id: '14', label: 'Card 14' },
            { id: '15', label: 'Card 15' },
            { id: '16', label: 'Card 16' },
            { id: '17', label: 'Card 17' },
            { id: '18', label: 'Card 18' },
            { id: '19', label: 'Card 19' },
            { id: '20', label: 'Card 20' },
            { id: '21', label: 'Card 21' },
            { id: '22', label: 'Card 22' },
            { id: '23', label: 'Card 23' },
            { id: '24', label: 'Card 24' },
            { id: '25', label: 'Card 25' },
            { id: '26', label: 'Card 26' },
            { id: '27', label: 'Card 27' },
            { id: '28', label: 'Card 28' },
          ]}
        />
      </div>
      <div className="bottom-bar-container">
        <BottomBar onClick={goToAbout} />
      </div>
      <div>
        <HoverArrow onClick={scrollRight} side="right" />
      </div>
    {scrollClicks > 0 && (
      <div>
        <HoverArrow onClick={scrollLeft} side="left" />
      </div>
    )}
    </div>
  );
};

export default Home;
