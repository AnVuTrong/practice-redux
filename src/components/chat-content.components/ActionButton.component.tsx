import React, { useState } from 'react';

interface ActionButtonProps {
  icon: string;
  tooltip: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  showTooltip: boolean;
  actionType?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  tooltip,
  onClick,
  onMouseEnter,
  onMouseLeave,
  showTooltip,
  actionType
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = () => {
    onClick();
    
    // Only show success animation for copy action
    if (actionType === 'copy') {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 1500); // Reset after 1.5 seconds
    }
  };

  return (
    <div className="relative">
      <button 
        className="p-1.5 rounded-md bg-secondary hover:bg-secondary-dark hover:text-primary transition-colors"
        onClick={handleClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {showSuccess && actionType === 'copy' ? (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="w-4 h-4 text-green-500 animate-fadeIn"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
          </svg>
        )}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs bg-text-primary text-white rounded shadow-lg whitespace-nowrap">
            {tooltip}
          </div>
        )}
      </button>
    </div>
  );
}; 