import './App.css';
import styles from './App.module.css';
import { useState, useEffect, useCallback } from 'react';

// importing useState to control component memory i.e, const [ something, setSomething]

import TodoList from './features/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';
import TodoViewForm from './features/TodoViewForm.jsx';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');
  const [error, setError] = useState(null);

  const encodeUrl = useCallback(() => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';

    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  useEffect(() => {
    const fetchTodos = async () => {
      const api_key = import.meta.env.VITE_PAT;
      console.log(import.meta.env);
      try {
        const response = await fetch(encodeUrl(), {
          headers: {
            Authorization: `Bearer ${api_key}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to load todos');
        }

        const data = await response.json();
        setTodoList(data.records || []);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setError('Could not load todos! Please try again.');
      }
    };

    fetchTodos();
  }, [encodeUrl]);

  const addTodo = (title) => {
    const newTodo = {
      title,
      id: Date.now(),
      isCompleted: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
  };

  const completeTodo = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  };

  const updateTodo = (editedTodo) => {
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === editedTodo.id ? { ...editedTodo } : todo))
    );
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <h1>Todo List</h1>

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todos={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />

      <hr />

      <TodoViewForm
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        queryString={queryString}
        setQueryString={setQueryString}
      />
    </div>
  );
}

export default App;
