import React from 'react';
import { ChatSidebar } from '../components/chat-sidebar.components/ChatSidebar.component';
import { ChatContent } from '../components/chat-sidebar.components/ChatContent.component';
import { useMobileDetect } from '../hooks/UseMobileDetect.hook';
import { useAppDispatch, useAppSelector } from '../hooks/Redux.hook';
import { setActiveChatId, toggleSidebar, deleteChat } from '../features/ChatSlice.feature';

const Chat = () => {
  const dispatch = useAppDispatch();
  const { chatHistory, activeChatId, isSidebarOpen } = useAppSelector((state) => state.chat);
  const isMobile = useMobileDetect();

  const handleChatSelect = (id: string) => {
    dispatch(setActiveChatId(id));
    if (isMobile) {
      dispatch(toggleSidebar());
    }
  };

  const handleDeleteChat = (id: string) => {
    dispatch(deleteChat(id));
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className='flex flex-1 w-full'>
      <ChatSidebar
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onChatSelect={handleChatSelect}
        onChatDelete={handleDeleteChat}
        isOpen={isSidebarOpen}
        isMobile={isMobile}
      />

      <ChatContent activeChatId={activeChatId} onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} isMobile={isMobile} />
    </div>
  );
};

export default Chat;
