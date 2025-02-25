import React from 'react';
import { ChatHistory } from '../../types/chat.types';

interface ChatHistoryItemProps {
  chat: ChatHistory;
  isActive: boolean;
  onClick: (id: string) => void;
}

export const ChatHistoryItem: React.FC<ChatHistoryItemProps> = ({ chat, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(chat.id)}
      className={`w-full text-left p-4 hover:bg-secondary/50 transition-colors duration-200
        ${isActive ? 'bg-secondary' : ''}`}
    >
      <h3 className="font-medium text-primary truncate">{chat.title}</h3>
      <p className="text-sm text-text-secondary truncate mt-1">{chat.preview}</p>
      <span className="text-xs text-text-light mt-2 block">
        {new Date(chat.timestamp).toLocaleDateString()}
      </span>
    </button>
  );
}; 