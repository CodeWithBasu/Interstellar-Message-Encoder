/**
 * Converts text into 8-bit binary string.
 */
export const textToBinary = (text: string): string => {
  return text
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
};

/**
 * Adds start and end markers (framing) to binary data.
 * Start: 11111111
 * End: 00000000
 */
export const frameBinaryMessage = (binary: string): string => {
    return '11111111 ' + binary + ' 00000000';
};
