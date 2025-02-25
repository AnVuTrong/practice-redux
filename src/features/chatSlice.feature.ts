import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatHistory } from '../types/chat.types';
import { MOCK_CHAT_HISTORY } from '../constants/Chat.constant';

interface ChatState {
  chatHistory: ChatHistory[];
  activeChatId: string | null;
  isSidebarOpen: boolean;
}

const initialState: ChatState = {
  chatHistory: MOCK_CHAT_HISTORY,
  activeChatId: null,
  isSidebarOpen: true
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
    addNewChat: (state, action: PayloadAction<ChatHistory>) => {
      state.chatHistory.unshift(action.payload);
      state.activeChatId = action.payload.id;
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
  addNewChat, 
  deleteChat 
} = chatSlice.actions;
export default chatSlice.reducer; 