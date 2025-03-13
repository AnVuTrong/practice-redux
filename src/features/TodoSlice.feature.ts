import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: []
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      console.log('🔵 Reducer: Adding new todo with text:', action.payload);
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload,
        completed: false
      };
      state.todos.push(newTodo);
      console.log('✅ Reducer: Updated todos list:', state.todos);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      console.log('🔵 Reducer: Removing todo with id:', action.payload);
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      console.log('✅ Reducer: Updated todos list:', state.todos);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      console.log('🔵 Reducer: Toggling todo with id:', action.payload);
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        console.log('✅ Reducer: Todo updated:', todo);
      }
    }
  }
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
