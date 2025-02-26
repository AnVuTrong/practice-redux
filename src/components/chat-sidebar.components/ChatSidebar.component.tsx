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

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chatHistory,
  activeChatId,
  onChatSelect,
  onChatDelete,
  isOpen,
  isMobile
}) => {
  const sidebarClasses = `
    ${isMobile ? 'absolute' : 'relative'} 
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    transition-transform duration-300 ease-in-out
    w-80 h-full bg-background-secondary border-r border-secondary
    shadow-lg
  `;

  return (
    <div className={sidebarClasses}>
      <ChatSidebarHeader 
        chatCount={chatHistory.length} 
      />
      <ChatHistoryList 
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onChatSelect={onChatSelect}
        onChatDelete={onChatDelete}
      />
    </div>
  );
}; 