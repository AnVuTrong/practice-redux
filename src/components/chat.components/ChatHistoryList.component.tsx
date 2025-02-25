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
    <div className="overflow-y-auto h-[calc(100%-4rem)] p-2">
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