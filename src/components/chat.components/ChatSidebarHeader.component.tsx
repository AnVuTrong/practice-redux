import React from 'react';

interface ChatSidebarHeaderProps {
  chatCount: number;
  onNewChat: () => void;
}

export const ChatSidebarHeader: React.FC<ChatSidebarHeaderProps> = ({ 
  chatCount, 
  onNewChat 
}) => {
  return (
    <div className="p-4 border-b border-secondary flex justify-between items-center">
      <span className="text-text-primary font-bold text-sm flex items-center">
        Lịch sử chat 
        <h2 className="ml-1.5 bg-secondary-dark text-text-secondary rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {chatCount}
        </h2>
      </span>
      <button 
        onClick={onNewChat}
        className="w-4 h-4 bg-primary text-white rounded-full hover:bg-primary-light transition-colors flex items-center justify-center"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 16 16" 
          fill="currentColor" 
          className="w-3 h-3"
        >
          <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
        </svg>
      </button>
    </div>
  );
}; 