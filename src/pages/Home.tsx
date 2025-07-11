// src/pages/Home.tsx
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectableCardGrid from '../components/SelectableCardGrid';
import BottomBar from '../components/BottomBar';


const Home: React.FC = () => {
    const navigate = useNavigate();

    // const handleNavigation = () => {
    //     navigate('/about');
    // };
    const goToAbout = () => {
        navigate('/about');
    }

  return (
    <div>
        <div>
            <SelectableCardGrid
                items={[
                    { id: '1', label: 'Card 1' },
                    { id: '2', label: 'Card 2' },
                    { id: '3', label: 'Card 3' },
                    { id: '4', label: 'Card 4' },
                    { id: '5', label: 'Card 5' },
                ]}
            />
        </div>
        <div>
            <BottomBar onClick={goToAbout} />
        </div>
    </div>
  );
};

export default Home;
