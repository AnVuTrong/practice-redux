import React from 'react';

interface ChatContentProps {
  activeChatId: string | null;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  isMobile: boolean;
}

export const ChatContent: React.FC<ChatContentProps> = ({
  activeChatId,
  onToggleSidebar,
  isSidebarOpen,
  isMobile
}) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center p-4 border-b border-secondary">
        {isMobile && (
          <button
            onClick={onToggleSidebar}
            className="mr-4 p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isSidebarOpen 
                  ? "M6 18L18 6M6 6l12 12"
                  : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                }
              />
            </svg>
          </button>
        )}
        <h1 className="text-xl font-bold text-primary">
          {activeChatId ? 'Chat Session' : 'Select or Start a New Chat'}
        </h1>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Chat messages will go here */}
        <p className="text-text-secondary">
          {activeChatId 
            ? 'Chat content will appear here...' 
            : 'Select a chat from the sidebar or start a new one to begin'}
        </p>
      </div>
    </div>
  );
}; 