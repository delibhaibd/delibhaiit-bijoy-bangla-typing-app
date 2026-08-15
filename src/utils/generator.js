/**
 * Shuffles an array randomly.
 */
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * Generates a typing sequence based on the user's requirements:
 * 20 straight repetitions, followed by 20 random repetitions.
 */
export function generateBlockSequence(chars, straightCount = 20, randomCount = 20, includeSpace = true) {
    const sequence = [];
    const space = { key: ' ', bn: ' ', char: ' ' };

    // 1. Straight Repetition
    for (let i = 0; i < straightCount; i++) {
        chars.forEach(char => sequence.push(char));
        // Add a space between chunks for readability if enabled
        if (includeSpace) {
            sequence.push(space);
        }
    }

    // 2. Random Repetition
    for (let i = 0; i < randomCount; i++) {
        const shuffled = shuffleArray(chars);
        shuffled.forEach(char => sequence.push({ ...char, isRandom: true }));
        if (includeSpace) {
            sequence.push({ ...space, isRandom: true });
        }
    }

    // Remove the very last space if present
    if (sequence.length > 0 && sequence[sequence.length - 1].key === ' ') {
        sequence.pop();
    }

    return sequence;
}

/// -------------------------------------------------------------
// Infinite Procedural Unique Background Pattern & Lighting Engine
// -------------------------------------------------------------

function createPRNG(seedStr) {
    let hash = 5381;
    for (let i = 0; i < seedStr.length; i++) {
        hash = ((hash << 5) + hash) + seedStr.charCodeAt(i);
        hash = hash & hash;
    }
    let s = Math.abs(hash) || 12345;
    return {
        next() {
            s = (s * 1664525 + 1013904223) % 4294967296;
            return s / 4294967296;
        },
        range(min, max) {
            return min + (this.next() * (max - min));
        },
        intRange(min, max) {
            return Math.floor(this.range(min, max + 1));
        },
        choice(arr) {
            return arr[Math.floor(this.next() * arr.length)];
        }
    };
}

// Procedural Islamic SVG Pattern Generator (for Arabic pages)
function generateProceduralIslamicSVG(rng, isDark) {
    const size = rng.intRange(34, 68);
    const s2 = size / 2;
    const strokeWidth = rng.range(0.85, 1.4).toFixed(1);

    // Islamic Color Harmonies
    const colorType = rng.choice(['gold', 'emerald', 'lapis', 'turquoise', 'ruby']);
    let strokeColor;
    if (colorType === 'gold') {
        const a = isDark ? rng.range(0.14, 0.19) : rng.range(0.13, 0.17);
        strokeColor = isDark ? `rgba(245, 158, 11, ${a.toFixed(2)})` : `rgba(180, 83, 9, ${a.toFixed(2)})`;
    } else if (colorType === 'emerald') {
        const a = isDark ? rng.range(0.13, 0.18) : rng.range(0.12, 0.16);
        strokeColor = isDark ? `rgba(16, 185, 129, ${a.toFixed(2)})` : `rgba(5, 150, 105, ${a.toFixed(2)})`;
    } else if (colorType === 'lapis') {
        const a = isDark ? rng.range(0.13, 0.18) : rng.range(0.12, 0.16);
        strokeColor = isDark ? `rgba(99, 102, 241, ${a.toFixed(2)})` : `rgba(67, 56, 202, ${a.toFixed(2)})`;
    } else if (colorType === 'turquoise') {
        const a = isDark ? rng.range(0.13, 0.18) : rng.range(0.12, 0.16);
        strokeColor = isDark ? `rgba(6, 182, 212, ${a.toFixed(2)})` : `rgba(14, 165, 233, ${a.toFixed(2)})`;
    } else {
        const a = isDark ? rng.range(0.13, 0.18) : rng.range(0.12, 0.16);
        strokeColor = isDark ? `rgba(244, 63, 94, ${a.toFixed(2)})` : `rgba(190, 18, 60, ${a.toFixed(2)})`;
    }

    const type = rng.intRange(0, 5);
    let svgBody = '';

    if (type === 0) {
        // N-Point Islamic Star Rosette (Rub el Hizb variation)
        const points = rng.choice([6, 8, 10, 12, 16]);
        const rOuter = size * rng.range(0.36, 0.46);
        const rInner = rOuter * rng.range(0.42, 0.65);
        let starPoints = [];
        for (let i = 0; i < points * 2; i++) {
            const angle = (i * Math.PI) / points - Math.PI / 2;
            const r = i % 2 === 0 ? rOuter : rInner;
            starPoints.push(`${(s2 + r * Math.cos(angle)).toFixed(1)},${(s2 + r * Math.sin(angle)).toFixed(1)}`);
        }
        svgBody += `<polygon points="${starPoints.join(' ')}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
        if (rng.next() > 0.4) {
            svgBody += `<circle cx="${s2}" cy="${s2}" r="${(rInner * 0.6).toFixed(1)}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
        }
        if (rng.next() > 0.5) {
            svgBody += `<circle cx="${s2}" cy="${s2}" r="2" fill="${strokeColor}"/>`;
        }
    } else if (type === 1) {
        // Mashrabiya Hexagonal Interlace
        const r = size * rng.range(0.38, 0.48);
        let hexPoints = [];
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3 - Math.PI / 6;
            hexPoints.push(`${(s2 + r * Math.cos(angle)).toFixed(1)},${(s2 + r * Math.sin(angle)).toFixed(1)}`);
        }
        svgBody += `<polygon points="${hexPoints.join(' ')}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
        svgBody += `<line x1="${s2}" y1="0" x2="${s2}" y2="${size}" stroke="${strokeColor}" stroke-width="${(strokeWidth*0.7).toFixed(1)}" stroke-dasharray="3 3"/>`;
        svgBody += `<circle cx="${s2}" cy="${s2}" r="${(r * 0.4).toFixed(1)}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
    } else if (type === 2) {
        // Moroccan Zellige Nested Star Polygons
        const r1 = size * rng.range(0.35, 0.45);
        const r2 = r1 * rng.range(0.6, 0.8);
        svgBody += `<rect x="${(s2 - r1).toFixed(1)}" y="${(s2 - r1).toFixed(1)}" width="${(r1 * 2).toFixed(1)}" height="${(r1 * 2).toFixed(1)}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
        svgBody += `<rect x="${(s2 - r1).toFixed(1)}" y="${(s2 - r1).toFixed(1)}" width="${(r1 * 2).toFixed(1)}" height="${(r1 * 2).toFixed(1)}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" transform="rotate(45 ${s2} ${s2})"/>`;
        if (rng.next() > 0.3) {
            svgBody += `<circle cx="${s2}" cy="${s2}" r="${(r2 * 0.5).toFixed(1)}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
        }
    } else if (type === 3) {
        // Islamic Mihrab Arch & Radiating Rays
        const w = size * rng.range(0.7, 0.9);
        const left = (size - w) / 2;
        const right = size - left;
        svgBody += `<path d="M${left.toFixed(1)} ${size} V${(size*0.45).toFixed(1)} Q ${(left+w*0.1).toFixed(1)} ${(size*0.08).toFixed(1)}, ${s2} 2 Q ${(right-w*0.1).toFixed(1)} ${(size*0.08).toFixed(1)}, ${right.toFixed(1)} ${(size*0.45).toFixed(1)} V${size}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
        svgBody += `<circle cx="${s2}" cy="${(size * 0.4).toFixed(1)}" r="2.5" fill="${strokeColor}"/>`;
    } else if (type === 4) {
        // Crescent & 8-Point Star Field (Al-Hilal)
        const moonR = size * rng.range(0.2, 0.28);
        svgBody += `<path d="M${(s2-moonR*0.5).toFixed(1)} ${(s2-moonR*0.5).toFixed(1)} a ${moonR} ${moonR} 0 1 0 ${(moonR*1.3).toFixed(1)} ${(moonR*1.3).toFixed(1)} a ${(moonR*0.8).toFixed(1)} ${(moonR*0.8).toFixed(1)} 0 1 1 -${(moonR*1.3).toFixed(1)} -${(moonR*1.3).toFixed(1)} Z" fill="${strokeColor}"/>`;
        const starX = size - (size * rng.range(0.18, 0.28));
        const starY = (size * rng.range(0.18, 0.28));
        svgBody += `<circle cx="${starX.toFixed(1)}" cy="${starY.toFixed(1)}" r="2" fill="${strokeColor}"/>`;
    } else {
        // Arabesque Flowing Knotwork
        const r = size * rng.range(0.35, 0.45);
        svgBody += `<path d="M${s2} 2 C${(size-2)} ${s2*0.5}, ${(size-2)} ${s2*1.5}, ${s2} ${(size-2)} C2 ${s2*1.5}, 2 ${s2*0.5}, ${s2} 2 Z" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
        svgBody += `<path d="M2 ${s2} C${s2*0.5} 2, ${s2*1.5} 2, ${(size-2)} ${s2} C${s2*1.5} ${(size-2)}, ${s2*0.5} ${(size-2)}, 2 ${s2} Z" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}"/>`;
    }

    const svg = encodeURIComponent(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${svgBody}</svg>`);
    return {
        image: `url("data:image/svg+xml,${svg}")`,
        size: `${size}px ${size}px`
    };
}

// Procedural Modern Tech / Geometric SVG Pattern Generator (for Bangla & English)
function generateProceduralTechSVG(rng, isDark) {
    const size = rng.intRange(24, 60);
    const s2 = size / 2;
    const strokeWidth = rng.range(0.8, 1.3).toFixed(1);

    const a = isDark ? rng.range(0.08, 0.16) : rng.range(0.07, 0.14);
    const color = isDark ? `rgba(255, 255, 255, ${a.toFixed(2)})` : `rgba(15, 23, 42, ${a.toFixed(2)})`;

    const type = rng.intRange(0, 5);
    let svgBody = '';

    if (type === 0) {
        // Tech Dot Matrix with Target Nodes
        const dotR = rng.range(1.0, 1.8).toFixed(1);
        svgBody += `<circle cx="${s2}" cy="${s2}" r="${dotR}" fill="${color}"/>`;
        if (rng.next() > 0.5) {
            svgBody += `<circle cx="${s2}" cy="${s2}" r="${(s2 * 0.6).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${(strokeWidth*0.7).toFixed(1)}" stroke-dasharray="2 3"/>`;
        }
    } else if (type === 1) {
        // Technical Blueprint Graph & Crosshairs
        svgBody += `<line x1="0" y1="0" x2="${size}" y2="0" stroke="${color}" stroke-width="${strokeWidth}"/>`;
        svgBody += `<line x1="0" y1="0" x2="0" y2="${size}" stroke="${color}" stroke-width="${strokeWidth}"/>`;
        const cross = rng.range(3, 6);
        svgBody += `<path d="M${s2-cross} ${s2}h${cross*2}M${s2} ${s2-cross}v${cross*2}" stroke="${color}" stroke-width="${strokeWidth}"/>`;
    } else if (type === 2) {
        // Isometric Diamond & Cube Lattice
        const r = size * rng.range(0.35, 0.48);
        svgBody += `<polygon points="${s2},${(s2-r).toFixed(1)} ${(s2+r).toFixed(1)},${s2} ${s2},${(s2+r).toFixed(1)} ${(s2-r).toFixed(1)},${s2}" fill="none" stroke="${color}" stroke-width="${strokeWidth}"/>`;
        if (rng.next() > 0.4) {
            svgBody += `<line x1="${s2}" y1="${(s2-r).toFixed(1)}" x2="${s2}" y2="${(s2+r).toFixed(1)}" stroke="${color}" stroke-width="${(strokeWidth*0.8).toFixed(1)}"/>`;
        }
    } else if (type === 3) {
        // Circuit Board Traces & Microchip Nodes
        svgBody += `<circle cx="4" cy="4" r="2" fill="${color}"/>`;
        svgBody += `<path d="M4 4 h${(size-8)} v${(size-8)}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-dasharray="3 3"/>`;
        if (rng.next() > 0.5) {
            svgBody += `<circle cx="${(size-4)}" cy="${(size-4)}" r="2" fill="${color}"/>`;
        }
    } else if (type === 4) {
        // Topographic Wave Elevation Contours
        const amp = size * rng.range(0.2, 0.4);
        svgBody += `<path d="M0 ${s2} Q ${(size*0.25).toFixed(1)} ${(s2-amp).toFixed(1)}, ${s2} ${s2} T ${size} ${s2}" fill="none" stroke="${color}" stroke-width="${strokeWidth}"/>`;
        if (rng.next() > 0.4) {
            svgBody += `<path d="M0 ${(s2+amp*0.5).toFixed(1)} Q ${(size*0.25).toFixed(1)} ${(s2-amp*0.5).toFixed(1)}, ${s2} ${(s2+amp*0.5).toFixed(1)} T ${size} ${(s2+amp*0.5).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${(strokeWidth*0.7).toFixed(1)}" stroke-dasharray="2 3"/>`;
        }
    } else {
        // Minimalist Diagonal Chevron Weave
        svgBody += `<line x1="0" y1="0" x2="${size}" y2="${size}" stroke="${color}" stroke-width="${strokeWidth}"/>`;
        svgBody += `<line x1="${size}" y1="0" x2="0" y2="${size}" stroke="${color}" stroke-width="${(strokeWidth*0.7).toFixed(1)}" stroke-dasharray="3 3"/>`;
    }

    const svg = encodeURIComponent(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${svgBody}</svg>`);
    return {
        image: `url("data:image/svg+xml,${svg}")`,
        size: `${size}px ${size}px`
    };
}

export function applyPageBackground(pageKey, isDarkMode = true) {
    if (typeof document === 'undefined') return;
    const rng = createPRNG(pageKey);

    const isArabicPage = pageKey.startsWith('ar_');

    // Generate bespoke procedural SVG pattern
    const pattern = isArabicPage 
        ? generateProceduralIslamicSVG(rng, isDarkMode)
        : generateProceduralTechSVG(rng, isDarkMode);

    // Keep clean Google AI Studio background (no glow blobs)
    document.body.style.backgroundImage = '';
    document.body.style.backgroundSize = '';
    document.body.style.backgroundAttachment = '';
}
