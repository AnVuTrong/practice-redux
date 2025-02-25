import React, { useState } from 'react';
import { ChatSidebar } from '../components/chat.components/ChatSidebar.component';
import { ChatHistory } from '../types/chat.types';
import { MOCK_CHAT_HISTORY } from '../constants/Chat.constant';
import { ChatContent } from '../components/chat.components/ChatContent.component';
import { useMobileDetect } from '../hooks/useMobileDetect.hook';

const Chat = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>(MOCK_CHAT_HISTORY);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useMobileDetect();

  const handleChatSelect = (id: string) => {
    setActiveChatId(id);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleNewChat = () => {
    const newChat: ChatHistory = {
      id: Date.now().toString(),
      title: 'New Chat',
      preview: 'Start a new conversation...',
      timestamp: new Date()
    };
    setChatHistory([newChat, ...chatHistory]);
    setActiveChatId(newChat.id);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteChat = (id: string) => {
    setChatHistory(chatHistory.filter(chat => chat.id !== id));
    if (activeChatId === id) {
      setActiveChatId(null);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
      />
    </div>
  );
};

export default Chat; 