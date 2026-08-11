import React from 'react';
import './Rain.css';

const Rain = () => {
    // Create an array for a gentle drizzle (about 80 drops)
    const drops = Array.from({ length: 80 });

    return (
        <div className="rain-container">
            {drops.map((_, i) => {
                // Randomize position, speed, and opacity to make it look like a natural drizzle
                const style = {
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${1.5 + Math.random() * 1.5}s`, // Gentle speed
                    animationDelay: `${Math.random() * 2}s`,
                    opacity: 0.15 + Math.random() * 0.3 // Soft opacity
                };
                return <div key={i} className="raindrop" style={style}></div>;
            })}
        </div>
    );
};

export default Rain;
