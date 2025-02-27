import React from 'react';

interface ChatHeaderProps {
  agentName: string | null;
  activeChatId: string | null;
  isMobile: boolean;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ agentName, activeChatId, isMobile, isSidebarOpen, onToggleSidebar }) => {
  return (
    <div className='flex-none p-4 border-b border-secondary'>
      {isMobile && (
        <button
          onClick={onToggleSidebar}
          className='mr-4 p-2 hover:bg-secondary rounded-lg transition-colors'
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d={isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5'}
            />
          </svg>
        </button>
      )}
      <h1 className='text-xl font-bold text-primary'>{activeChatId ? agentName || 'Unknown Agent' : 'Chọn hoặc bắt đầu một cuộc trò chuyện mới'}</h1>
    </div>
  );
};
