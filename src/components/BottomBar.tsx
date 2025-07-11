import React from 'react';
import '../styles/BottomBar.css'; // Use BottomBar-specific styles if preferred

interface BottomBarProps {
  onClick: () => void;
  time?: string;
}

const BottomBar: React.FC<BottomBarProps> = ({ onClick, time = '12:45 PM' }) => {
  return (
    <div className="bottom-bar-wrapper">
      <div className="bottom-bar">
        <button className="circle-button" onClick={() => console.log('Left clicked')} />
        <span className="time-text">{time}</span>
        <button className="circle-button" onClick={() => console.log('Right clicked')} />
      </div>
    </div>
  );
};

export default BottomBar;
