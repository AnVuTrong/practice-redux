import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook';
import { addTodo, removeTodo, toggleTodo } from '../../features/todoSlice.feature';

export const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const todos = useAppSelector((state) => {
    console.log('🔍 Selector: Reading current todos:', state.todo.todos);
    return state.todo.todos;
  });
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      console.log('🎯 Component: Adding new todo:', newTodo);
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleToggle = (id: string) => {
    console.log('🎯 Component: Toggling todo with id:', id);
    dispatch(toggleTodo(id));
  };

  const handleRemove = (id: string) => {
    console.log('🎯 Component: Removing todo with id:', id);
    dispatch(removeTodo(id));
  };

  return (
    <div className='container mx-auto p-4 max-w-md'>
      <form onSubmit={handleSubmit} className='mb-4'>
        <div className='flex gap-2'>
          <input
            type='text'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className='flex-1 px-3 py-2 border rounded'
            placeholder='Add new todo...'
          />
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Add
          </button>
        </div>
      </form>

      <ul className='space-y-2'>
        {todos.map((todo) => (
          <li key={todo.id} className='flex items-center gap-2 p-2 border rounded'>
            <input type='checkbox' checked={todo.completed} onChange={() => handleToggle(todo.id)} className='h-5 w-5' />
            <span className={todo.completed ? 'line-through flex-1' : 'flex-1'}>{todo.text}</span>
            <button onClick={() => handleRemove(todo.id)} className='text-red-500 hover:text-red-700'>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
