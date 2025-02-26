import React from 'react';

interface SendButtonProps {
  disabled: boolean;
  onClick?: () => void;
}

export const SendButton: React.FC<SendButtonProps> = ({ disabled, onClick }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={`
        rounded-full p-2.5
        transform transition-all duration-200
        ${disabled 
          ? 'bg-secondary text-text-secondary cursor-not-allowed opacity-50'
          : 'bg-background-secondary text-primary hover:bg-primary hover:text-white hover:scale-110'
        }
      `}
      title={disabled ? "Type a message first" : "Send message"}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        className="w-5 h-5"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" 
        />
      </svg>
    </button>
  );
}; 