import React from 'react';
import { TodoList } from '../components/todo.components/TodoList.component';

const TodoTest = () => {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-4xl font-bold mb-8'>Redux Todo Example</h1>
      <TodoList />
    </div>
  );
};

export default TodoTest;
