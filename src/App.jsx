// src/App.jsx
import './App.css';
import { useReducer, useEffect, useCallback, useState } from 'react';
import TodoList from './features/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';
import TodoViewForm from './features/TodoViewForm.jsx';

import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer.js';

function App() {
  // -------------------------------
  // useReducer for todo state
  // -------------------------------
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const { todoList, isLoading, isSaving, errorMessage } = todoState;

  // -------------------------------
  // Local state for sorting/search
  // -------------------------------
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

  // -------------------------------
  // URL builder
  // -------------------------------
  const encodeUrl = useCallback(() => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    let sortQuery = `?sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';

    if (queryString) {
      searchQuery = `&filterByFormula=${encodeURIComponent(
        `SEARCH("${queryString}", {title})`
      )}`;
    }

    return encodeURI(`${url}${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  // -------------------------------
  // Fetch Todos (Pessimistic UI)
  // -------------------------------
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });

      try {
        const resp = await fetch(encodeUrl(), {
          method: 'GET',
          headers: { Authorization: `Bearer ${import.meta.env.VITE_PAT}` },
        });

        const data = await resp.json();
        if (!resp.ok)
          throw new Error(data.error?.message || 'Failed to fetch todos');

        dispatch({ type: todoActions.loadTodos, records: data.records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error });
      }
    };

    fetchTodos();
  }, [encodeUrl]);

  // -------------------------------
  // Add Todo (Pessimistic UI)
  // -------------------------------
  const addTodo = async (newTodo) => {
    dispatch({ type: todoActions.startRequest });

    const payload = {
      records: [{ fields: { title: newTodo, isCompleted: false } }],
    };

    try {
      const resp = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PAT}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Failed to add todo: ${resp.status} - ${errText}`);
      }

      const { records } = await resp.json();
      const savedTodo = { id: records[0].id, ...records[0].fields };
      if (!savedTodo.isCompleted) savedTodo.isCompleted = false;

      dispatch({ type: todoActions.addTodo, todo: savedTodo });
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  // -------------------------------
  // Update Todo (Optimistic UI)
  // -------------------------------
  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    // Optimistic UI update
    dispatch({ type: todoActions.updateTodo, editedTodo });

    try {
      const resp = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PAT}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Failed to update todo: ${resp.status} - ${errText}`);
      }
    } catch (error) {
      dispatch({
        type: todoActions.revertTodo,
        editedTodo: originalTodo,
        error,
      });
    }
  };

  // -------------------------------
  // Complete Todo (Optimistic UI)
  // -------------------------------
  const completeTodo = (todo) => {
    const updatedTodo = { ...todo, isCompleted: true };
    updateTodo(updatedTodo);
  };

  // -------------------------------
  // Render
  // -------------------------------
  return (
    <div>
      {isLoading && <p>Todo list loading...</p>}

      {errorMessage && (
        <div className="error-block">
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => dispatch({ type: todoActions.clearError })}>
            Dismiss
          </button>
        </div>
      )}

      <h1>Todo List</h1>

      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />

      <TodoList
        todos={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
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
