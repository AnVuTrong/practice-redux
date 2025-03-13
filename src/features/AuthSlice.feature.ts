import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from './UserSlice.feature';

// Define authentication state interface
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
  successMessage: null
};

// Mock API functions (replace with real API calls in production)
const mockSignIn = async (credentials: { email: string; password: string }) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock validation
  if (credentials.email === 'admin@promete.ai' && credentials.password === '111111') {
    return {
      user: {
        id: '1',
        name: 'Admin User',
        firstName: 'Admin',
        lastName: 'User',
        avatar: 'A',
        email: 'admin@promete.ai',
        role: 'admin' as const
      },
      token: 'mock-jwt-token'
    };
  }

  throw new Error('Invalid credentials');
};

const mockSignUp = async (userData: { name: string; email: string; password: string; firstName?: string; lastName?: string }) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock validation - in a real app, check if email already exists
  if (userData.email === 'admin@promete.ai') {
    throw new Error('Email already in use');
  }

  // Create a new user
  return {
    user: {
      id: Date.now().toString(),
      name: userData.name,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      avatar: userData.name.charAt(0).toUpperCase(),
      email: userData.email,
      role: 'user' as const
    },
    token: 'mock-jwt-token-new-user'
  };
};

// Async thunks
export const signIn = createAsyncThunk('auth/signIn', async (credentials: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await mockSignIn(credentials);
    // Store token in localStorage for persistence
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    return response;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to sign in');
  }
});

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (
    userData: {
      name: string;
      email: string;
      password: string;
      firstName?: string;
      lastName?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await mockSignUp(userData);
      // Store token in localStorage for persistence
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to sign up');
    }
  }
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  // Remove token and user from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return null;
});

// Create the auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    restoreAuthState: (state) => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        state.isAuthenticated = true;
        state.token = token;
        state.user = JSON.parse(userStr);
      }
    }
  },
  extraReducers: (builder) => {
    // Sign In
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Sign Up
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      state.successMessage = 'Account created successfully!';
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Sign Out
    builder.addCase(signOut.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    });
  }
});

export const { clearError, clearSuccessMessage } = authSlice.actions;
export default authSlice.reducer;
