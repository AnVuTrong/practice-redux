import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/CounterSlice.feature';
import todoReducer from '../features/TodoSlice.feature';
import chatReducer from '../features/ChatSlice.feature';
import userReducer from '../features/UserSlice.feature';
import authReducer from '../features/AuthSlice.feature';

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
