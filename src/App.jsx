import { useReducer, useEffect, useCallback, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TodosPage from './pages/TodosPage.jsx';
import Header from './shared/Header.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer.js';

function App() {
  const location = useLocation();

  // -------------------------------
  // Page title based on route
  // -------------------------------
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (location.pathname === '/') setTitle('Todo List');
    else if (location.pathname === '/about') setTitle('About');
    else setTitle('Not Found');
  }, [location]);

  // -------------------------------
  // Todo state
  // -------------------------------
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);

  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

  // -------------------------------
  // Encode URL (for search & sort)
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
  // Fetch todos from Airtable
  // -------------------------------
  useEffect(() => {
    async function fetchTodos() {
      dispatch({ type: todoActions.loadingStart }); // existing constant

      try {
        const url = encodeUrl();
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PAT}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Map Airtable records to your todo objects
        const todos = data.records.map((rec) => ({
          id: rec.id,
          title: rec.fields.title,
          isCompleted: rec.fields.isCompleted || false,
        }));

        dispatch({ type: todoActions.set, payload: todos });
      } catch (err) {
        dispatch({ type: todoActions.error, payload: err.message });
      }
    }

    fetchTodos();
  }, [encodeUrl]);

  // -------------------------------
  // Handlers for TodosPage
  // -------------------------------
  const addTodo = async (newTodo) => {
    dispatch({ type: todoActions.loadingStart });

    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PAT}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: {
              title: newTodo.title,
              isCompleted: false,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const savedTodo = {
        id: data.id,
        title: data.fields.title,
        isCompleted: data.fields.isCompleted || false,
      };

      dispatch({ type: todoActions.addTodo, todo: savedTodo });
    } catch (err) {
      dispatch({ type: todoActions.error, payload: err.message });
    }
  };

  const updateTodo = (updatedTodo) => {
    dispatch({ type: todoActions.update, payload: updatedTodo });
  };

  const completeTodo = (todo) => {
    dispatch({ type: todoActions.complete, payload: todo });
  };

  const clearError = () => {
    dispatch({ type: todoActions.clearError });
  };

  return (
    <>
      <Header title={title} />

      <Routes>
        <Route
          path="/"
          element={
            <TodosPage
              todoList={todoState.todoList}
              isLoading={todoState.isLoading}
              isSaving={todoState.isSaving}
              errorMessage={todoState.errorMessage}
              addTodo={addTodo}
              updateTodo={updateTodo}
              completeTodo={completeTodo}
              clearError={clearError}
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              queryString={queryString}
              setQueryString={setQueryString}
            />
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
