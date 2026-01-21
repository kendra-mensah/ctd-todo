import './App.css';
import { useState, useEffect } from 'react';

import TodoList from './features/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';
import TodoViewForm from './features/TodoViewForm.jsx';

const encodeUrl = ({ sortField, sortDirection, queryString }) => {
  const url = 'https://api.airtable.com/v0/appa4EmUyKCfmX6wm/Todos';

  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  let searchQuery = '';

  if (queryString) {
    searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
  }

  return encodeURI(`${url}?${sortQuery}${searchQuery}`);
};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          encodeUrl({ sortField, sortDirection, queryString }),
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            },
          }
        );
        const data = await response.json();
        setTodoList(data.records || []);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [sortField, sortDirection, queryString]);

  const addTodo = (title) => {
    const newTodo = {
      title: title,
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
