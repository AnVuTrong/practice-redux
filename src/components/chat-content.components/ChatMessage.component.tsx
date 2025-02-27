import React, { useState, useMemo } from 'react';
import { Message } from '../../types/chat.types';
import { MessageActions } from './MessageActions.component';
import { EditableMessage } from './EditableMessage.component';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { updateMessage } from '../../features/chatSlice.feature';
import { AI_AGENTS } from '../../constants/Agents.constant';

interface ChatMessageProps {
  message: Message;
  chatId: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, chatId }) => {
  const dispatch = useAppDispatch();
  const isBot = message.sender === 'bot';
  const [isEditing, setIsEditing] = useState(false);
  
  // Get the current user
  const { currentUser } = useAppSelector(state => state.user);
  
  // Get the agent information for the current chat
  const chatSession = useAppSelector(state => state.chat.chatSessions[chatId]);
  const agentId = chatSession?.agentId;

  // Find the agent details to display the correct avatar
  const agent = useMemo(() => {
    if (!agentId) return null;
    return AI_AGENTS.find(a => a.id === agentId) || null;
  }, [agentId]);

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
        ${isBot ? 'bg-secondary text-text-primary' : 'bg-emerald-100'}`}>
        {/* Agent name for bot messages */}
        {isBot && (
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-2">
              <span className="text-xs text-bold text-white">AI</span>
            </div>
            <div className="text-xs font-bold mb-1">
              {agent?.name || 'Assistant'}
            </div>
          </div>
        )}
        {/* User Avatar (shown only for user messages and inside the message box) */}
        {!isBot && (
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-2">
              <span className="text-xs text-bold text-white">{currentUser?.avatar || 'U'}</span>
            </div>
            <span className="text-sm font-bold">{currentUser?.name || 'You'}</span>
          </div>
        )}

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
            messageId={message.id}
          />
        )}
      </div>
    </div>
  );
}; 