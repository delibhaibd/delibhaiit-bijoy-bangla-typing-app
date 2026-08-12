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
export function generateBlockSequence(chars, straightCount = 20, randomCount = 20) {
    const sequence = [];
    const space = { key: ' ', bn: ' ', char: ' ' };

    // 1. Straight Repetition
    for (let i = 0; i < straightCount; i++) {
        chars.forEach(char => sequence.push(char));
        // Add a space between chunks for readability
        sequence.push(space);
    }

    // 2. Random Repetition
    for (let i = 0; i < randomCount; i++) {
        const shuffled = shuffleArray(chars);
        shuffled.forEach(char => sequence.push({ ...char, isRandom: true }));
        sequence.push({ ...space, isRandom: true });
    }

    // Remove the very last space if present
    if (sequence.length > 0 && sequence[sequence.length - 1].key === ' ') {
        sequence.pop();
    }

    return sequence;
}
