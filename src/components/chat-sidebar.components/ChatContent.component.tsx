import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/Redux.hook';
import { ChatMessage } from '../chat-content.components/ChatMessage.component';
import { ChatInput } from '../chat-content.components/ChatInput.component';
import { addMessage } from '../../features/ChatSlice.feature';
import { AI_AGENTS } from '../../constants/Agents.constant';
import { useChatContent } from '../../hooks/UseChatContent.hook';
import { ChatHeader } from './ChatHeader.component';
import { ChatMessageList } from './ChatMessageList.component';
import { Message } from '../../types/Chat.types';

interface ChatContentProps {
  activeChatId: string | null;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  isMobile: boolean;
}

export const ChatContent: React.FC<ChatContentProps> = ({ activeChatId, onToggleSidebar, isSidebarOpen, isMobile }) => {
  const { activeChat, agentName, handleSendMessage } = useChatContent(activeChatId);

  return (
    <div className='flex-1 flex flex-col h-full'>
      {/* <ChatHeader 
        agentName={agentName || null} 
        activeChatId={activeChatId}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={onToggleSidebar}
      /> */}

      <div className='flex-1 overflow-y-auto'>
        <ChatMessageList messages={activeChat?.messages || []} chatId={activeChatId} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={!activeChatId} />
    </div>
  );
};
