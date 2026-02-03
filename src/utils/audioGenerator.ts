// Web Audio API context
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioCtx;
};

// Configuration for Morse Code timing (in seconds)
const UNIT_TIME = 0.08; // Duration of one unit (dot)
const FREQUENCY = 600;  // Pitch in Hz

export const playTone = (duration: number, startTime: number, interference: boolean = false) => {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = interference ? 'sawtooth' : 'sine'; // Harsh sound for interference
    
    // Slight detuning for interference
    const freq = interference ? FREQUENCY + (Math.random() * 100 - 50) : FREQUENCY;
    osc.frequency.value = freq;
    
    // Envelope
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(interference ? 0.3 : 0.5, startTime + 0.01);
    gain.gain.setValueAtTime(interference ? 0.3 : 0.5, startTime + duration - 0.01);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);
    
    // Add distortion node if interference (optional, but keep simple for now with sawtooth)

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
};

export const playMorseAudio = (morse: string, onEnded?: () => void, interference: boolean = false) => {
    const ctx = getAudioContext();
    // Resume context if suspended (browser policy)
    if (ctx.state === 'suspended') {
        ctx.resume();
    }

    const now = ctx.currentTime;
    let timing = now + 0.1; // Start slighty in future

    const chars = morse.split('');
    
    chars.forEach((char) => {
        if (char === '.') {
            playTone(UNIT_TIME, timing, interference);
            timing += UNIT_TIME; // Tone duration
        } else if (char === '-') {
            playTone(UNIT_TIME * 3, timing, interference);
            timing += UNIT_TIME * 3; // Tone duration
        } else if (char === ' ') {
            // Space between letters (3 units)
            // But we also add 1 unit gap after every tone automatically? 
            // In standard morse:
            // dot: 1 unit on, 1 unit off
            // dash: 3 units on, 1 unit off
            // space between parts is 1 unit off (handled by the loop addition below usually? No, we need explicit gaps)
            
            // Wait, my loop iterates characters, including the implicit gaps?
            // Let's stick to the visual morse string which usually has spaces for letter gaps.
            // If char is space, it's a word gap (7 units).
            // But my morse encoder puts spaces between letters.
            
            // Re-evaluating based on my encoder:
            // "A B" -> ".- -..." (space is letter gap)
            // Word gap? My encoder currently just joins letters with space.
            // Let's check morseEncoder.ts...
            // It joins by ' '.
            // It uses '/' for spaces in original text?
            // "HELLO WORLD" -> ".... . .-.. .-.. --- / .-- --- .-. .-.. -.."
            
             // Space in string = Inter-letter gap (3 units)
             // Slash in string = Inter-word gap (7 units)
             
             // BUT, we need to account for the silence *after* a tone too?
             // Usually: Tone -> Gap.
             // Here I'll just add the silence duration.
             timing += UNIT_TIME * 3; // 3 units silence
             return; // Skip the "default gap" at end of loop if we treat this as a pure silence block
        } else if (char === '/') {
            timing += UNIT_TIME * 7;
            return;
        }
        
        // Gap after every tone (intra-character gap) is 1 unit
        timing += UNIT_TIME; 
    });

    // Callback when finished
    const totalDuration = (timing - now) * 1000;
    setTimeout(() => {
        if (onEnded) onEnded();
    }, totalDuration);
};
