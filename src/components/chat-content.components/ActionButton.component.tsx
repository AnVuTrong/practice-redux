import React from 'react';

interface ActionButtonProps {
  icon: string;
  tooltip: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  showTooltip: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  tooltip,
  onClick,
  onMouseEnter,
  onMouseLeave,
  showTooltip
}) => {
  return (
    <div className="relative">
      <button 
        className="p-1.5 rounded-md bg-secondary hover:bg-secondary-dark hover:text-primary transition-colors"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
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
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs bg-text-primary text-white rounded shadow-lg whitespace-nowrap">
            {tooltip}
          </div>
        )}
      </button>
    </div>
  );
}; 