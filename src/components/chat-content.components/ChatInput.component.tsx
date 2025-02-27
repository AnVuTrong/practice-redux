import React, { useState } from 'react';
import { SendButton } from './SendButton.component';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-secondary p-4">
      <div className="relative flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={disabled ? 'Chọn một cuộc trò chuyện để bắt đầu...' : 'Nhập tin nhắn của bạn...'}
          disabled={disabled}
          className="w-full p-3 pr-16 rounded-lg border border-secondary bg-background-primary
            focus:outline-none focus:border-primary disabled:bg-secondary/30"
        />
        <div className="absolute right-3">
          <SendButton disabled={disabled || !message.trim()} />
        </div>
      </div>
    </form>
  );
}; 