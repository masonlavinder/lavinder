import React from 'react';
import '../styles/BottomBar.css'; // Use BottomBar-specific styles if preferred
import { useEffect, useState } from 'react';

interface BottomBarProps {
  onClick: () => void;
}

// get current time in HH:MM AM/PM format
const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return date.toLocaleTimeString([], options);
};

const BottomBar: React.FC<BottomBarProps> = ({ onClick }) => {
    const [currentTime, setCurrentTime] = useState(formatTime(new Date()));

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentTime(formatTime(new Date()));
        }, 30000); // Update every 30 seconds
        return () => clearInterval(timer); // Cleanup on unmount
    }, []);
  
    return (
    <div className="bottom-bar-wrapper">
      <div className="bottom-bar">
        <button 
            className="circle-button" 
            onClick={() => console.log('Left clicked')} >
                Wii
        </button>
        <span className="time-text">{currentTime}</span>
        <button 
            className="circle-button" 
            onClick={() => console.log('Right clicked')} />
      </div>
    </div>
  );
};

export default BottomBar;
