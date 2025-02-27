import React from 'react';
import { ChatHistory } from '../../types/chat.types';
import { ChatSidebarHeader } from './ChatSidebarHeader.component';
import { ChatHistoryList } from './ChatHistoryList.component';

interface ChatSidebarProps {
  chatHistory: ChatHistory[];
  activeChatId: string | null;
  onChatSelect: (id: string) => void;
  onChatDelete: (id: string) => void;
  isOpen: boolean;
  isMobile: boolean;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ chatHistory, activeChatId, onChatSelect, onChatDelete, isOpen, isMobile }) => {
  const sidebarClasses = `
    ${isMobile ? 'fixed inset-y-0 left-0 w-full md:w-80 top-16' : 'relative w-80'} 
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    transition-transform duration-300 ease-in-out
    bg-background-secondary border-r border-secondary
    shadow-lg z-40 flex flex-col h-full
  `;

  return (
    <div className={sidebarClasses}>
      <div className='flex-none'>
        <ChatSidebarHeader chatCount={chatHistory.length} />
      </div>
      <div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary-dark scrollbar-track-transparent hover:scrollbar-thumb-primary/50 transition-colors'>
        <ChatHistoryList chatHistory={chatHistory} activeChatId={activeChatId} onChatSelect={onChatSelect} onChatDelete={onChatDelete} />
      </div>
    </div>
  );
};
