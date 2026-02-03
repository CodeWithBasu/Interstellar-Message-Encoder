import React, { useState } from 'react';
import { playMorseAudio } from '../../utils/audioGenerator';
import { ShimmerButton } from '../ui/shimmer-button';

interface PlayMorseProps {
  morseData: string;
}

const PlayMorse: React.FC<PlayMorseProps> = ({ morseData }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (!morseData || isPlaying) return;

    setIsPlaying(true);
    playMorseAudio(morseData, () => {
      setIsPlaying(false);
    });
  };

  const isDisabled = !morseData || isPlaying;

  return (
    <div className="w-full relative z-10">
      <ShimmerButton
        onClick={handlePlay}
        disabled={isDisabled}
        className={`w-full py-3 h-12 shadow-2xl ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        background={isDisabled ? '#27272a' : '#18181b'}
        shimmerColor="#3b82f6"
        borderRadius="12px"
      >
        <span className="text-center text-sm leading-none font-medium tracking-tight whitespace-pre-wrap flex items-center gap-2">
            {isPlaying ? (
                <>
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Transmitting...
                </>
            ) : (
                <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Play Signal
                </>
            )}
        </span>
      </ShimmerButton>
    </div>
  );
};

export default PlayMorse;
