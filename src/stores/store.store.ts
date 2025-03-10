import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice.feature';
import todoReducer from '../features/todoSlice.feature';
import chatReducer from '../features/chatSlice.feature';
import userReducer from '../features/userSlice.feature';
import authReducer from '../features/authSlice.feature';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
    chat: chatReducer,
    user: userReducer,
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
