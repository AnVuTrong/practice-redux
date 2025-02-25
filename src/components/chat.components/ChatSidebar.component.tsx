import React from 'react';
import { ChatHistory } from '../../types/chat.types';
import { ChatSidebarHeader } from './ChatSidebarHeader.component';
import { ChatHistoryList } from './ChatHistoryList.component';

interface ChatSidebarProps {
  chatHistory: ChatHistory[];
  activeChatId: string | null;
  onChatSelect: (id: string) => void;
  onNewChat: () => void;
  onChatDelete: (id: string) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  chatHistory, 
  activeChatId, 
  onChatSelect,
  onNewChat,
  onChatDelete
}) => {
  return (
    <div className="w-60 h-[calc(100vh-8rem)] bg-background-secondary border-r border-secondary">
      <ChatSidebarHeader 
        chatCount={chatHistory.length} 
        onNewChat={onNewChat} 
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