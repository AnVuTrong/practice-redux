import React, { useState } from 'react';
import { Message } from '../../types/chat.types';
import { MessageActions } from './MessageActions.component';
import { EditableMessage } from './EditableMessage.component';
import { useAppDispatch } from '../../hooks/redux.hook';
import { updateMessage } from '../../features/chatSlice.feature';

interface ChatMessageProps {
  message: Message;
  chatId: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, chatId }) => {
  const dispatch = useAppDispatch();
  const isBot = message.sender === 'bot';
  const [isEditing, setIsEditing] = useState(false);
  
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
  
  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const handleSaveEdit = (newContent: string) => {
    dispatch(updateMessage({
      chatId,
      messageId: message.id,
      content: newContent
    }));
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-4 relative
        ${isBot ? 'bg-secondary text-text-primary' : 'bg-primary text-white'}`}>
        
        <EditableMessage 
          content={message.content}
          isEditing={isEditing && isBot}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
        
        {!isEditing && (
          <span className="text-xs opacity-70 mt-1 block">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        )}
        
        {isBot && !isEditing && (
          <MessageActions 
            onCopy={handleCopyContent} 
            onEdit={handleEditClick} 
          />
        )}
      </div>
    </div>
  );
}; 