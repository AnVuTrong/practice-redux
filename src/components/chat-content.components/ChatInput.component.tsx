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
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={disabled ? 'Select a chat to start messaging...' : 'Type your message...'}
          disabled={disabled}
          className="flex-1 p-2 rounded-lg border border-secondary bg-background-primary
            focus:outline-none focus:border-primary disabled:bg-secondary/30"
        />
        <SendButton disabled={disabled || !message.trim()} />
      </div>
    </form>
  );
}; 