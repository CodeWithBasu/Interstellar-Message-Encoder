import React, { useState } from 'react';

interface MorseOutputProps {
  data: string;
}

const MorseOutput: React.FC<MorseOutputProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
          <h3 className="text-secondary text-xs uppercase tracking-wider font-semibold">Morse Translation</h3>
          <button 
            onClick={handleCopy}
            className="text-xs text-secondary hover:text-primary transition-colors flex items-center gap-1.5 focus:outline-none bg-surface/50 px-2 py-1 rounded-md border border-white/5 hover:bg-surface hover:border-white/10"
            aria-label="Copy Morse Code"
          >
             {copied ? (
                 <>
                    <span className="text-emerald-500 font-medium">Copied</span>
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                 </>
             ) : (
                 <>
                    <span>Copy</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                 </>
             )}
          </button>
      </div>
      <div className="bg-surface border border-border rounded-xl p-5 font-mono text-lg tracking-widest text-primary wrap-break-word shadow-sm">
        {data}
      </div>
    </div>
  );
};

export default MorseOutput;
