/**
 * Generates a Fibonacci sequence of n integers.
 * Used as a prefix to signal intelligence.
 */
export const getFibonacciSequence = (length: number): number[] => {
    if (length <= 0) return [];
    if (length === 1) return [1];
    const seq = [1, 1];
    while (seq.length < length) {
        seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
    }
    return seq;
};

/**
 * Decomposes a number into its prime factors.
 * Can be used to encode ASCII values.
 */
export const getPrimeFactors = (num: number): number[] => {
    const factors = [];
    let d = 2;
    let temp = num;
    while (d * d <= temp) {
        while (temp % d === 0) {
            factors.push(d);
            temp = Math.floor(temp / d);
        }
        d++;
    }
    if (temp > 1) factors.push(temp);
    return factors;
};

/**
 * Converts text into an array of prime factor arrays for each character.
 */
export const textToPrimeFactors = (text: string): number[][] => {
    return text.split('').map(char => getPrimeFactors(char.charCodeAt(0)));
};
