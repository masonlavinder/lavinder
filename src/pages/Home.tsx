import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectableCardGrid from '../components/SelectableCardGrid';
import BottomBar from '../components/BottomBar';
import HoverArrow from '../components/HoverArrow';
import {useJsonGrabber} from '../utils/postGrabber';
import '../styles/Home.css';

const postPath = `${import.meta.env.BASE_URL || '/'}posts`.replace('//', '/');

const Home: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollClicks, setScrollClicks] = React.useState(0);
  const { data: jsonData, loading, error } = useJsonGrabber(postPath);
    console.log('jsonData', jsonData);

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
          items={jsonData || []}
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
