import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from './redux.hook';
import { addMessage } from '../features/chatSlice.feature';
import { AI_AGENTS } from '../constants/Agents.constant';
import { Message } from '../types/chat.types';

export const useChatContent = (activeChatId: string | null) => {
  const dispatch = useAppDispatch();
  const activeChat = useAppSelector((state) => (activeChatId ? state.chat.chatSessions[activeChatId] : null));

  // Get the agent name for the active chat
  const agentName = useMemo(() => {
    if (!activeChat?.agentId) return null;
    const agent = AI_AGENTS.find((agent) => agent.id === activeChat.agentId);
    return agent?.name || null;
  }, [activeChat?.agentId]);

  const handleSendMessage = (content: string) => {
    if (!activeChatId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    dispatch(addMessage({ chatId: activeChatId, message: userMessage }));

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'This is a simulated bot response.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      dispatch(addMessage({ chatId: activeChatId, message: botMessage }));
    }, 1000);
  };

  return {
    activeChat,
    agentName,
    handleSendMessage
  };
};
