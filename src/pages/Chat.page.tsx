import React, { useState } from 'react';
import { ChatSidebar } from '../components/chat.components/ChatSidebar.component';
import { ChatHistory } from '../types/chat.types';
import { MOCK_CHAT_HISTORY } from '../constants/Chat.constant';

const Chat = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>(MOCK_CHAT_HISTORY);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const handleChatSelect = (id: string) => {
    setActiveChatId(id);
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
  };

  const handleDeleteChat = (id: string) => {
    setChatHistory(chatHistory.filter(chat => chat.id !== id));
    if (activeChatId === id) {
      setActiveChatId(null);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <ChatSidebar
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
        onChatDelete={handleDeleteChat}
      />
      <div className="flex-1 p-4">
        <h1>Chat contexts</h1>
        {/* Chat content will go here */}
      </div>
    </div>
  );
};

export default Chat; 