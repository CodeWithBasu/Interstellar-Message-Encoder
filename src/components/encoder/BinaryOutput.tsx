import React from 'react';

interface BinaryOutputProps {
  data: string;
}

const BinaryOutput: React.FC<BinaryOutputProps> = ({ data }) => {
  if (!data) return null;

  const bytes = data.split(' ');

  return (
    <div className="w-full">
      <h3 className="text-secondary text-xs uppercase tracking-wider font-semibold mb-3">Binary Encoder</h3>
      <div className="bg-surface border border-border rounded-xl p-5 font-mono text-xs leading-relaxed text-secondary hover:text-primary transition-colors">
        {bytes.map((byte, i) => (
          <span key={i} className={`inline-block mr-2 mb-1 ${i === 0 || i === bytes.length - 1 ? 'text-accent font-bold' : ''}`}>
            {byte}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BinaryOutput;
