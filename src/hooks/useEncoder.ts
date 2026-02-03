import { useState, useMemo } from 'react';
import { textToMorse, morseToPulse } from '../utils/morseEncoder';
import { textToBinary, frameBinaryMessage } from '../utils/binaryEncoder';

export function useEncoder() {
  const [message, setMessage] = useState('');

  const morse = useMemo(() => textToMorse(message), [message]);
  const pulse = useMemo(() => morseToPulse(morse), [morse]);
  const binaryRaw = useMemo(() => textToBinary(message), [message]);
  const binaryFramed = useMemo(() => frameBinaryMessage(binaryRaw), [binaryRaw]);

  return {
    message,
    setMessage,
    morse,
    pulse,
    binaryRaw,
    binaryFramed
  };
}
