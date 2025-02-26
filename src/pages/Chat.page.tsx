import React from 'react';
import { ChatSidebar } from '../components/chat-sidebar.components/ChatSidebar.component';
import { ChatContent } from '../components/chat-sidebar.components/ChatContent.component';
import { useMobileDetect } from '../hooks/useMobileDetect.hook';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { setActiveChatId, toggleSidebar, addNewChat, deleteChat } from '../features/chatSlice.feature';

const Chat = () => {
  const dispatch = useAppDispatch();
  const { chatHistory, activeChatId, isSidebarOpen } = useAppSelector(state => state.chat);
  const isMobile = useMobileDetect();

  const handleChatSelect = (id: string) => {
    dispatch(setActiveChatId(id));
    if (isMobile) {
      dispatch(toggleSidebar());
    }
  };

  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New Chat',
      preview: 'Start a new conversation...',
      timestamp: new Date()
    };
    dispatch(addNewChat(newChat));
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
    <div className="flex h-[calc(100vh-4rem)] relative">
      <ChatSidebar
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
        onChatDelete={handleDeleteChat}
        isOpen={isSidebarOpen}
        isMobile={isMobile}
      />
      
      <ChatContent
        activeChatId={activeChatId}
        onToggleSidebar={handleToggleSidebar}
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
      />
    </div>
  );
};

export default Chat; 