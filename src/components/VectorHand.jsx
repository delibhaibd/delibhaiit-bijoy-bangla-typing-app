import React from 'react';

// Helper component for a Line Art Finger
const LineArtFinger = ({ name, x, width, topY, bottomY, isActive }) => {
    const radius = width / 2;
    // When active, the finger stretches up to hit the key
    const stretchAmount = isActive ? 45 : 0;
    const currentTop = topY - stretchAmount;

    const pathD = `M ${x},${bottomY} 
                   L ${x},${currentTop + radius} 
                   C ${x},${currentTop} ${x + width},${currentTop} ${x + width},${currentTop + radius} 
                   L ${x + width},${bottomY} Z`;

    const nailTop = currentTop + 3;
    const nailBottom = currentTop + 12;
    const nailD = `M ${x + 3},${nailBottom}
                   Q ${x + radius},${nailBottom + 3} ${x + width - 3},${nailBottom}
                   L ${x + width - 4},${nailTop + 4}
                   Q ${x + radius},${nailTop} ${x + 4},${nailTop + 4} Z`;

    const fillCol = isActive ? "#e2e8f0" : "#f8fafc";
    const strokeCol = isActive ? "#3b82f6" : "#64748b";
    const strokeW = isActive ? "2" : "1.5";

    return (
        <g>
            <path 
                d={pathD} 
                fill={fillCol} 
                stroke={strokeCol} 
                strokeWidth={strokeW}
                style={{ transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            />
            <path 
                d={nailD}
                fill="none"
                stroke={strokeCol}
                strokeWidth="1"
                opacity={isActive ? 1 : 0.6}
                style={{ transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            />
        </g>
    );
};

const VectorHand = ({ isLeft, activeFinger, expectedKey }) => {
    const thumbActive = activeFinger === 'thumb';
    const fillCol = "#f8fafc";
    const strokeCol = "#64748b";

    const thumbResting = "M 40,130 C 25,130 15,110 20,95 C 25,80 35,85 45,95 Z";
    const thumbPressed = "M 40,130 C 15,140 0,115 10,100 C 15,85 30,80 45,95 Z";
    const thumbColor = thumbActive ? "#e2e8f0" : fillCol;
    const thumbStroke = thumbActive ? "#3b82f6" : strokeCol;

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            transform: isLeft ? 'scaleX(-1)' : 'none',
            display: 'flex',
            justifyContent: 'center',
            filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.15))'
        }}>
            <svg 
                viewBox="0 0 160 200" 
                style={{ 
                    width: '100%', 
                    height: 'auto',
                    overflow: 'visible'
                }}
            >
                {/* THUMB (Rendered behind palm) */}
                <path 
                    d={thumbActive ? thumbPressed : thumbResting}
                    fill={thumbColor}
                    stroke={thumbStroke}
                    strokeWidth={thumbActive ? "2" : "1.5"}
                    style={{ transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                />
                {/* Thumb nail */}
                <path 
                    d="M 22,102 Q 27,98 32,100 L 30,108 Q 25,108 22,102 Z"
                    fill="none"
                    stroke={thumbStroke}
                    strokeWidth="1"
                    style={{ 
                        transition: 'transform 0.3s ease', 
                        transform: thumbActive ? 'translate(-8px, 4px) rotate(-10deg)' : 'none' 
                    }}
                />

                {/* FINGERS (Rendered behind palm, but since we want the knuckles line, we'll draw them before palm) */}
                <LineArtFinger name="index" x="40" width="18" topY="65" bottomY="90" isActive={activeFinger === 'index'} />
                <LineArtFinger name="middle" x="60" width="18" topY="55" bottomY="90" isActive={activeFinger === 'middle'} />
                <LineArtFinger name="ring" x="80" width="18" topY="60" bottomY="90" isActive={activeFinger === 'ring'} />
                <LineArtFinger name="pinky" x="100" width="16" topY="70" bottomY="90" isActive={activeFinger === 'pinky'} />

                {/* PALM (Rendered on top to create the knuckle line and cover the finger bases) */}
                <path 
                    d="M 40,90 
                       L 116,90 
                       C 135,100 140,160 120,200 
                       L 45,200 
                       C 25,160 25,110 40,90 Z" 
                    fill={fillCol} 
                    stroke={strokeCol} 
                    strokeWidth="1.5" 
                />

                {/* Hand detail creases (Softened) */}
                <path d="M 55,110 Q 60,140 55,160" fill="none" stroke={strokeCol} strokeWidth="1" opacity="0.3" />
                <path d="M 80,115 Q 80,140 75,165" fill="none" stroke={strokeCol} strokeWidth="1" opacity="0.3" />
                <path d="M 100,110 Q 97,130 93,150" fill="none" stroke={strokeCol} strokeWidth="1" opacity="0.3" />
            </svg>
        </div>
    );
};

export default VectorHand;
