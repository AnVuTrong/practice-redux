import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  avatar: string;
  email?: string;
  role: 'admin' | 'user' | 'guest';
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: UserState = {
  currentUser: {
    id: '1',
    name: 'Admin',
    firstName: 'Admin',
    lastName: '',
    avatar: 'A',
    email: 'admin@example.com',
    role: 'admin'
  },
  isAuthenticated: true, // For demo purposes, set to true
  loading: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
        
        // Save to localStorage for persistence
        localStorage.setItem('user', JSON.stringify(state.currentUser));
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { setUser, clearUser, updateUserProfile, setLoading } = userSlice.actions;
export default userSlice.reducer; 