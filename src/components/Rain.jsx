import React from 'react';
import './Rain.css';

const Rain = () => {
    // 100 crisp, visible raindrops
    const drops = Array.from({ length: 100 });

    return (
        <div className="rain-container">
            {drops.map((_, i) => {
                const style = {
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${1.2 + Math.random() * 1.2}s`,
                    animationDelay: `${Math.random() * 2.5}s`,
                    opacity: 0.6 + Math.random() * 0.4
                };
                return <div key={i} className="raindrop" style={style}></div>;
            })}
        </div>
    );
};

export default Rain;
