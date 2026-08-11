class SoundManager {
    constructor() {
        this.audioCtx = null;
        this.masterGain = null;
        this.isPlaying = false;
        this.volume = 0.5;
        this.nodes = [];
    }

    init() {
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioContext();
            this.masterGain = this.audioCtx.createGain();
            this.masterGain.connect(this.audioCtx.destination);
            this.masterGain.gain.value = this.volume;
        }
    }

    start() {
        if (this.isPlaying) return;
        this.init();
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        
        this.masterGain.gain.setTargetAtTime(this.volume, this.audioCtx.currentTime, 0.1);
        this.isPlaying = true;

        // Frequencies for a soothing C Major 9 chord (C3, E3, G3, B3, D4)
        const frequencies = [130.81, 164.81, 196.00, 246.94, 293.66];
        this.nodes = [];

        frequencies.forEach((freq, index) => {
            // Create two oscillators per note for a thick "pad" sound
            for (let i = 0; i < 2; i++) {
                const osc = this.audioCtx.createOscillator();
                osc.type = i === 0 ? 'sine' : 'triangle';
                
                // Slight detune for a rich, wide chorus effect
                const detune = (Math.random() - 0.5) * 4; 
                osc.frequency.value = freq + detune;

                // Lowpass filter to make it soft and muffled (meditation style)
                const filter = this.audioCtx.createBiquadFilter();
                filter.type = 'lowpass';
                filter.frequency.value = 300 + Math.random() * 200;

                // Random stereo panning
                const panner = this.audioCtx.createStereoPanner();
                panner.pan.value = (Math.random() - 0.5) * 0.8;

                const gain = this.audioCtx.createGain();
                
                // Extremely slow LFO for gentle volume modulation (breathing effect)
                const lfo = this.audioCtx.createOscillator();
                lfo.type = 'sine';
                lfo.frequency.value = 0.03 + Math.random() * 0.05; // 0.03Hz - 0.08Hz
                
                const lfoGain = this.audioCtx.createGain();
                lfoGain.gain.value = 0.02; // Depth of the breathing pulse
                
                // Base volume for this oscillator
                gain.gain.value = 0.025; 

                lfo.connect(lfoGain);
                lfoGain.connect(gain.gain);
                
                osc.connect(filter);
                filter.connect(panner);
                panner.connect(gain);
                gain.connect(this.masterGain);

                osc.start();
                lfo.start();

                this.nodes.push({ osc, filter, panner, gain, lfo, lfoGain });
            }
        });
    }

    stop() {
        if (!this.isPlaying) return;
        this.isPlaying = false;
        
        if (this.masterGain) {
            // Fade out smoothly
            this.masterGain.gain.setTargetAtTime(0, this.audioCtx.currentTime, 0.3);
        }
        
        setTimeout(() => {
            if (this.audioCtx && this.audioCtx.state === 'running') {
                this.audioCtx.suspend().catch(()=>{});
            }
            this.nodes.forEach(n => {
                try { n.osc.stop(); n.osc.disconnect(); } catch(e){}
                try { n.lfo.stop(); n.lfo.disconnect(); } catch(e){}
                try { n.filter.disconnect(); } catch(e){}
                try { n.panner.disconnect(); } catch(e){}
                try { n.gain.disconnect(); } catch(e){}
                try { n.lfoGain.disconnect(); } catch(e){}
            });
            this.nodes = [];
        }, 500);
    }

    setVolume(value) {
        this.volume = value;
        if (this.masterGain) {
            this.masterGain.gain.setTargetAtTime(value, this.audioCtx.currentTime, 0.1);
        }
    }
}

// Singleton instance
const soundManager = new SoundManager();
export default soundManager;
