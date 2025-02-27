import React from 'react';
import { Message } from '../../types/chat.types';
import { MessageActions } from './MessageActions.component';
import { EditableMessage } from './EditableMessage.component';
import { useAppSelector } from '../../hooks/redux.hook';
import { AI_AGENTS } from '../../constants/Agents.constant';
import { MessageContainer } from './MessageContainer.component';
import { MessageAvatar } from './MessageAvatar.component';
import { MessageTimestamp } from './MessageTimestamp.component';
import { useMessageActions } from '../../hooks/useMessageActions.hook';

interface ChatMessageProps {
  message: Message;
  chatId: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, chatId }) => {
  const isBot = message.sender === 'bot';
  const { currentUser } = useAppSelector((state) => state.user);
  const { isEditing, handleCopyContent, handleEditClick, handleSaveEdit, handleCancelEdit } = useMessageActions(chatId, message.id);

  // Get the agent information for the current chat
  const chatSession = useAppSelector((state) => state.chat.chatSessions[chatId]);
  const agentId = chatSession?.agentId;
  const agent = AI_AGENTS.find((a) => a.id === agentId) || null;

  return (
    <MessageContainer isBot={isBot}>
      {/* Avatar and name section */}
      {isBot ? (
        <MessageAvatar initial='AI' name={agent?.name || 'Assistant'} isBot={true} />
      ) : (
        <MessageAvatar initial={currentUser?.avatar || 'U'} name={currentUser?.name || 'You'} linkToSettings={true} />
      )}

      {/* Message content */}
      <EditableMessage content={message.content} isEditing={isEditing && isBot} onSave={handleSaveEdit} onCancel={handleCancelEdit} />

      {/* Timestamp */}
      {!isEditing && <MessageTimestamp timestamp={message.timestamp} />}

      {/* Message actions (only for bot messages) */}
      {isBot && !isEditing && <MessageActions onCopy={() => handleCopyContent(message.content)} onEdit={handleEditClick} messageId={message.id} />}
    </MessageContainer>
  );
};
