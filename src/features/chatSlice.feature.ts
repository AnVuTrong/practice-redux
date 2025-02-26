import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatHistory, AIAgent } from '../types/chat.types';
import { MOCK_CHAT_HISTORY } from '../constants/Chat.constant';
import { AI_AGENTS } from '../constants/Agents.constant';

interface ChatState {
  chatHistory: ChatHistory[];
  activeChatId: string | null;
  isSidebarOpen: boolean;
  isAgentSelectorOpen: boolean;
  selectedAgent: AIAgent | null;
}

const initialState: ChatState = {
  chatHistory: MOCK_CHAT_HISTORY,
  activeChatId: null,
  isSidebarOpen: true,
  isAgentSelectorOpen: false,
  selectedAgent: null
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatHistory: (state, action: PayloadAction<ChatHistory[]>) => {
      state.chatHistory = action.payload;
    },
    setActiveChatId: (state, action: PayloadAction<string | null>) => {
      state.activeChatId = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleAgentSelector: (state) => {
      state.isAgentSelectorOpen = !state.isAgentSelectorOpen;
    },
    setSelectedAgent: (state, action: PayloadAction<AIAgent | null>) => {
      state.selectedAgent = action.payload;
    },
    addNewChat: (state, action: PayloadAction<ChatHistory>) => {
      state.chatHistory.unshift(action.payload);
      state.activeChatId = action.payload.id;
    },
    addNewChatWithAgent: (state, action: PayloadAction<{agent: AIAgent}>) => {
      const newChat: ChatHistory = {
        id: Date.now().toString(),
        title: `New Chat with ${action.payload.agent.name}`,
        preview: 'Start a new conversation...',
        timestamp: new Date(),
        agentId: action.payload.agent.id
      };
      state.chatHistory.unshift(newChat);
      state.activeChatId = newChat.id;
      state.isAgentSelectorOpen = false;
      state.selectedAgent = null;
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      state.chatHistory = state.chatHistory.filter(chat => chat.id !== action.payload);
      if (state.activeChatId === action.payload) {
        state.activeChatId = null;
      }
    }
  }
});

export const { 
  setChatHistory, 
  setActiveChatId, 
  toggleSidebar, 
  toggleAgentSelector, 
  setSelectedAgent, 
  addNewChat, 
  addNewChatWithAgent, 
  deleteChat 
} = chatSlice.actions;
export default chatSlice.reducer; 