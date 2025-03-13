import React from 'react';
import { ChatHistory } from '../../types/Chat.types';
import { ChatHistoryItem } from './ChatHistoryItem.component';

interface ChatHistoryListProps {
  chatHistory: ChatHistory[];
  activeChatId: string | null;
  onChatSelect: (id: string) => void;
  onChatDelete: (id: string) => void;
}

export const ChatHistoryList: React.FC<ChatHistoryListProps> = ({ chatHistory, activeChatId, onChatSelect, onChatDelete }) => {
  return (
    <div className='p-5 space-y-4'>
      {chatHistory.length > 0 ? (
        chatHistory.map((chat) => (
          <ChatHistoryItem key={chat.id} chat={chat} isActive={chat.id === activeChatId} onClick={onChatSelect} onDelete={onChatDelete} />
        ))
      ) : (
        <div className='text-center py-8 text-text-secondary'>
          <div className='flex justify-center items-center mb-2'>
            <span className='text-primary text-lg'>↗️</span>
          </div>
          <p>Chưa có cuộc trò chuyện nào.</p>
          <p className='mt-2 text-sm'>Nhấp vào nút + ở trên để chọn một nhân vật và bắt đầu trò chuyện!</p>
        </div>
      )}
    </div>
  );
};
