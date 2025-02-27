import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { ChatMessage } from '../chat-content.components/ChatMessage.component';
import { ChatInput } from '../chat-content.components/ChatInput.component';
import { addMessage } from '../../features/chatSlice.feature';
import { AI_AGENTS } from '../../constants/Agents.constant';
import { useChatContent } from '../../hooks/useChatContent.hook';
import { ChatHeader } from './ChatHeader.component';
import { ChatMessageList } from './ChatMessageList.component';
import { Message } from '../../types/chat.types';

interface ChatContentProps {
  activeChatId: string | null;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  isMobile: boolean;
}

export const ChatContent: React.FC<ChatContentProps> = ({
  activeChatId,
  onToggleSidebar,
  isSidebarOpen,
  isMobile
}) => {
  const { activeChat, agentName, handleSendMessage } = useChatContent(activeChatId);

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* <ChatHeader 
        agentName={agentName || null} 
        activeChatId={activeChatId}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={onToggleSidebar}
      /> */}

      <ChatMessageList 
        messages={activeChat?.messages || []} 
        chatId={activeChatId}
      />

      <div className="flex-none">
        <ChatInput 
          onSendMessage={handleSendMessage}
          disabled={!activeChatId}
        />
      </div>
    </div>
  );
}; 