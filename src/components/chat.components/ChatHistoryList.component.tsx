import React from 'react';
import { ChatHistory } from '../../types/chat.types';
import { ChatHistoryItem } from './ChatHistoryItem.component';

interface ChatHistoryListProps {
  chatHistory: ChatHistory[];
  activeChatId: string | null;
  onChatSelect: (id: string) => void;
}

export const ChatHistoryList: React.FC<ChatHistoryListProps> = ({
  chatHistory,
  activeChatId,
  onChatSelect
}) => {
  return (
    <div className="overflow-y-auto h-[calc(100%-4rem)]">
      {chatHistory.map((chat) => (
        <ChatHistoryItem
          key={chat.id}
          chat={chat}
          isActive={chat.id === activeChatId}
          onClick={onChatSelect}
        />
      ))}
    </div>
  );
}; 