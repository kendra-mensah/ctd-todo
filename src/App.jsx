import './App.css';
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';
import { useState } from 'react';

function App() {
  const todos = [
    { id: 1, title: 'review notes' },
    { id: 2, title: 'take notes' },
    { id: 3, title: 'code out app' },
  ];

  const [newTodo, setNewTodo] = useState('My first todo');

  return (
    <>
      <div>
        <h1>Todo List</h1>
        <TodoForm />
        <p>{newTodo}</p>
        <TodoList todos={todos} />
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </div>
    </>
  );
}

export default App;
