import React from 'react';
import { ChatMessage } from '../chat-content.components/ChatMessage.component';
import { Message } from '../../types/Chat.types';

interface ChatMessageListProps {
  messages: Message[];
  chatId: string | null;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages, chatId }) => {
  if (!chatId) return null;

  return (
    <div className='flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary-dark scrollbar-track-transparent hover:scrollbar-thumb-primary/50 transition-colors'>
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} chatId={chatId} />
      ))}
    </div>
  );
};
