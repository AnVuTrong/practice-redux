import React, { useState } from 'react';
import { Message } from '../../types/chat.types';
import { ActionButton } from './ActionButton.component';
import { MessageActions } from './MessageActions.component';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  const handleCopyContent = () => {
    navigator.clipboard.writeText(message.content)
      .then(() => {
        // Could add a toast notification here
        console.log('Content copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-4 relative
        ${isBot ? 'bg-secondary text-text-primary' : 'bg-primary text-white'}`}>
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
        
        {isBot && <MessageActions onCopy={handleCopyContent} />}
      </div>
    </div>
  );
}; 