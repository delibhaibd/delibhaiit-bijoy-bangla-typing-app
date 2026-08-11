import React from 'react';
import './Clouds.css';

const CloudIcon = () => (
  <svg viewBox="0 0 100 50" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M 85 25 
         C 85 15, 75 10, 65 15 
         C 60 0, 40 0, 35 15 
         C 25 10, 15 15, 15 25 
         C 5 25, 5 40, 15 40 
         L 85 40 
         C 95 40, 95 25, 85 25 Z" 
      fill="currentColor"
    />
  </svg>
);

const Clouds = () => {
    return (
        <div className="clouds-container">
            <div className="cloud-wrapper cloud-1"><CloudIcon /></div>
            <div className="cloud-wrapper cloud-2"><CloudIcon /></div>
            <div className="cloud-wrapper cloud-3"><CloudIcon /></div>
            <div className="cloud-wrapper cloud-4"><CloudIcon /></div>
            <div className="cloud-wrapper cloud-5"><CloudIcon /></div>
        </div>
    );
};

export default Clouds;
