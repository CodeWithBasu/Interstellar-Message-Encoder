const MORSE_CODE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
  ' ': '/', '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--',
};

/**
 * Converts text to Morse Code.
 * Letters are separated by spaces.
 * Mapped characters are converted, unknown characters are ignored.
 */
export const textToMorse = (text: string): string => {
  return text
    .toUpperCase()
    .split('')
    .map(char => MORSE_CODE_MAP[char] || '')
    .filter(char => char !== '')
    .join(' ');
};

/**
 * Converts Morse Code string back to binary representation for pulses
 * . = 1
 * - = 111
 * space between parts = 0
 * space between letters = 000
 * space between words = 0000000
 */
export const morseToPulse = (morse: string): string => {
    // This is a simplified pulse generator logic for visualization/audio
    // It returns a string of 1s and 0s representing time units
    let pulse = "";
    const chars = morse.split(' ');
    
    chars.forEach((char, index) => {
        if (char === '/') {
            pulse += "0000000"; // 7 units gap for word space (represented by /)
        } else {
             const parts = char.split('');
             parts.forEach((part, pIndex) => {
                 if (part === '.') pulse += "1";
                 else if (part === '-') pulse += "111";
                 
                 if (pIndex < parts.length - 1) pulse += "0"; // 1 unit gap between parts
             });
        }
        
        if (index < chars.length - 1) {
             pulse += "000"; // 3 units gap between letters
        }
    });
    
    return pulse;
}
