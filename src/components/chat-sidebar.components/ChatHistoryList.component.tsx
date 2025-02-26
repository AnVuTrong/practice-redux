import React from 'react';
import { ChatHistory } from '../../types/chat.types';
import { ChatHistoryItem } from './ChatHistoryItem.component';

interface ChatHistoryListProps {
  chatHistory: ChatHistory[];
  activeChatId: string | null;
  onChatSelect: (id: string) => void;
  onChatDelete: (id: string) => void;
}

export const ChatHistoryList: React.FC<ChatHistoryListProps> = ({
  chatHistory,
  activeChatId,
  onChatSelect,
  onChatDelete
}) => {
  return (
    <div className="h-[calc(100vh-10rem)] p-5 flex-1 space-y-4 overflow-y-auto
      scrollbar-thin scrollbar-thumb-secondary-dark scrollbar-track-secondary/30
      hover:scrollbar-thumb-primary/50 transition-colors">
      {chatHistory.map((chat) => (
        <ChatHistoryItem
          key={chat.id}
          chat={chat}
          isActive={chat.id === activeChatId}
          onClick={onChatSelect}
          onDelete={onChatDelete}
        />
      ))}
    </div>
  );
}; 