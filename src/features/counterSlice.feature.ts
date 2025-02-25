import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sleep } from '../utils/sleep.util';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      console.log('🔵 Reducer: Processing increment action');
      state.value += 1;
      console.log('✅ Reducer: New state value:', state.value);
    },
    decrement: (state) => {
      console.log('🔵 Reducer: Processing decrement action');
      state.value -= 1;
      console.log('✅ Reducer: New state value:', state.value);
    },
    setAmount: (state, action: PayloadAction<number>) => {
      console.log('🔵 Reducer: Processing setAmount action with payload:', action.payload);
      state.value = action.payload;
      console.log('✅ Reducer: New state value:', state.value);
    }
  }
});

export const { increment, decrement, setAmount } = counterSlice.actions;
export default counterSlice.reducer; 