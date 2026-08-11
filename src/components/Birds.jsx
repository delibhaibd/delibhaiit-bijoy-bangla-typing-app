import React from 'react';
import './Birds.css';

const BirdSVG = () => (
  <svg viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet" className="bird-svg">
    <path 
      d="M10,30 Q30,10 50,25 Q70,10 90,30 Q70,25 50,35 Q30,25 10,30 Z" 
      fill="currentColor"
    />
  </svg>
);

const Birds = () => {
    return (
        <div className="birds-container">
            <div className="flock flock-1">
                <div className="bird bird-1"><BirdSVG /></div>
                <div className="bird bird-2"><BirdSVG /></div>
                <div className="bird bird-3"><BirdSVG /></div>
                <div className="bird bird-8"><BirdSVG /></div>
            </div>
            
            <div className="flock flock-2">
                <div className="bird bird-4"><BirdSVG /></div>
                <div className="bird bird-5"><BirdSVG /></div>
                <div className="bird bird-6"><BirdSVG /></div>
                <div className="bird bird-7"><BirdSVG /></div>
            </div>
        </div>
    );
};

export default Birds;
