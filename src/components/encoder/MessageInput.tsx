import React, { useState, useRef } from 'react';

interface MessageInputProps {
  onMessageChange: (message: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onMessageChange }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value.toUpperCase();
    setInput(newVal);
    onMessageChange(newVal);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        className={`
          relative w-full transition-all duration-300 rounded-xl overflow-hidden
          bg-surface border
          ${isFocused ? 'border-accent shadow-[0_0_0_2px_rgba(59,130,246,0.2)]' : 'border-border'}
        `}
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent border-none outline-none text-primary resize-none h-32 p-6 text-lg font-medium placeholder-secondary/50"
          placeholder="Type your message here..."
          spellCheck="false"
        />
        <div className="absolute bottom-4 right-4 text-xs font-medium text-secondary">
          {input.length} chars
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
