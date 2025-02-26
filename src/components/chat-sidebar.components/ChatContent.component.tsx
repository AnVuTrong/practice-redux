import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { ChatMessage } from '../chat-content.components/ChatMessage.component';
import { ChatInput } from '../chat-content.components/ChatInput.component';
import { addMessage } from '../../features/chatSlice.feature';

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
  const dispatch = useAppDispatch();
  const activeChat = useAppSelector(state => 
    activeChatId ? state.chat.chatSessions[activeChatId] : null
  );

  const handleSendMessage = (content: string) => {
    if (!activeChatId) return;

    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user' as const,
      timestamp: new Date()
    };

    dispatch(addMessage({ chatId: activeChatId, message: userMessage }));

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: 'This is a simulated bot response.',
        sender: 'bot' as const,
        timestamp: new Date()
      };
      dispatch(addMessage({ chatId: activeChatId, message: botMessage }));
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center p-4 border-b border-secondary">
        {isMobile && (
          <button
            onClick={onToggleSidebar}
            className="mr-4 p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={isSidebarOpen 
                  ? "M6 18L18 6M6 6l12 12"
                  : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                }
              />
            </svg>
          </button>
        )}
        <h1 className="text-xl font-bold text-primary">
          {activeChatId ? 'Chat Session' : 'Select or Start a New Chat'}
        </h1>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {activeChat?.messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={!activeChatId}
      />
    </div>
  );
}; 