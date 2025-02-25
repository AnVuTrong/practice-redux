import React, { useState } from 'react';
import { ChatSidebar } from '../components/chat.components/ChatSidebar.component';
import { ChatHistory } from '../types/chat.types';

const MOCK_CHAT_HISTORY: ChatHistory[] = [
  {
    id: '1',
    title: 'Course Registration Help',
    preview: 'How do I register for next semester?',
    timestamp: new Date('2024-03-15')
  },
  {
    id: '2',
    title: 'Campus Facilities',
    preview: 'Where is the main library located?',
    timestamp: new Date('2024-03-14')
  },
  // Add more mock data as needed
];

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

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <ChatSidebar
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
      />
      <div className="flex-1 p-4">
        <h1>Chat contexts</h1>
        {/* Chat content will go here */}
      </div>
    </div>
  );
};

export default Chat; 