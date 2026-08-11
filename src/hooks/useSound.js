import { useCallback, useRef, useEffect } from 'react';

export function useSound() {
    const audioCtxRef = useRef(null);

    useEffect(() => {
        const initAudio = () => {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtxRef.current.state === 'suspended') {
                audioCtxRef.current.resume();
            }
        };

        window.addEventListener('keydown', initAudio, { once: true });
        window.addEventListener('click', initAudio, { once: true });
        
        return () => {
            window.removeEventListener('keydown', initAudio);
            window.removeEventListener('click', initAudio);
        };
    }, []);

    const playCorrectSound = useCallback(() => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        const now = ctx.currentTime;
        
        // --- 1. The "Snap" (High frequency transient for the plastic switch click) ---
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = 'sine';
        // Very fast pitch drop creates a percussive "click"
        clickOsc.frequency.setValueAtTime(1500, now);
        clickOsc.frequency.exponentialRampToValueAtTime(100, now + 0.02);
        
        clickGain.gain.setValueAtTime(0, now);
        clickGain.gain.linearRampToValueAtTime(0.2, now + 0.005);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);
        clickOsc.start(now);
        clickOsc.stop(now + 0.04);
        
        // --- 2. The "Thud" (Low frequency bottom-out for mechanical weight) ---
        const thudOsc = ctx.createOscillator();
        const thudGain = ctx.createGain();
        thudOsc.type = 'triangle';
        thudOsc.frequency.setValueAtTime(180, now);
        thudOsc.frequency.exponentialRampToValueAtTime(60, now + 0.04);
        
        thudGain.gain.setValueAtTime(0, now);
        thudGain.gain.linearRampToValueAtTime(0.3, now + 0.01);
        thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        
        thudOsc.connect(thudGain);
        thudGain.connect(ctx.destination);
        thudOsc.start(now);
        thudOsc.stop(now + 0.07);
    }, []);

    const playErrorSound = useCallback(() => {
        if (!audioCtxRef.current) return;
        const ctx = audioCtxRef.current;
        
        // A premium, soft descending double-tap (like a modern UI boop)
        const playTone = (freq, startTime, type = 'sine') => {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            osc.type = type;
            osc.frequency.setValueAtTime(freq, startTime);
            
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
            
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            osc.start(startTime);
            osc.stop(startTime + 0.2);
        };
        
        // Play two soft notes, slightly dissonant to indicate error softly
        playTone(350, ctx.currentTime);
        playTone(250, ctx.currentTime + 0.1);
    }, []);

    return { playCorrectSound, playErrorSound };
}
