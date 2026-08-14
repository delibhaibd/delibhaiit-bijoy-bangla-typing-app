import React from 'react';
import { getFingerForKey } from '../utils/fingerMapping';
import VectorHand from './VectorHand';

export default function HandsOverlay({ expectedKey, isNumpadMode }) {
    if (isNumpadMode) return null; // Hide in numpad mode

    const targetFinger = getFingerForKey(expectedKey); // e.g., 'l-index', 'r-pinky'
    
    let leftActive = null;
    let rightActive = null;

    if (targetFinger) {
        if (targetFinger.startsWith('l-')) {
            leftActive = targetFinger.split('-')[1];
        } else if (targetFinger.startsWith('r-')) {
            rightActive = targetFinger.split('-')[1];
        } else if (targetFinger === 'thumb') {
            rightActive = 'thumb';
        }
    }

    return (
        <div className="hands-overlay-container" style={{
            position: 'absolute',
            top: '25%', // Adjust for new VectorHand layout
            left: '0',
            width: '100%',
            height: '0', 
            pointerEvents: 'none',
            zIndex: 10
        }}>
            <div className="left-hand" style={{
                position: 'absolute',
                left: '2%',
                width: '42%',
                transition: 'all 0.3s ease',
            }}>
                <VectorHand isLeft={true} activeFinger={leftActive} expectedKey={expectedKey} />
            </div>
            
            <div className="right-hand" style={{
                position: 'absolute',
                left: '48%',
                width: '42%',
                transition: 'all 0.3s ease',
            }}>
                <VectorHand isLeft={false} activeFinger={rightActive} expectedKey={expectedKey} />
            </div>
        </div>
    );
}
