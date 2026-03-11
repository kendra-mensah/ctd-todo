import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import TodoForm from '../features/TodoForm.jsx';
import TodoList from '../features/TodoList.jsx';
import TodoViewForm from '../features/TodoViewForm.jsx';

function TodosPage({
  todoList,
  isLoading,
  isSaving,
  errorMessage,
  addTodo,
  updateTodo,
  completeTodo,
  clearError,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const filteredTodoList = todoList; // replace with filtered list if needed
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTodoList.length / itemsPerPage)
  );

  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const indexOfLastTodo = indexOfFirstTodo + itemsPerPage;

  const currentTodos = filteredTodoList.slice(
    indexOfFirstTodo,
    indexOfLastTodo
  );

  // -------------------------------
  // Pagination handlers
  // -------------------------------
  function handlePreviousPage() {
    const newPage = Math.max(currentPage - 1, 1);
    setSearchParams({ page: newPage });
  }

  function handleNextPage() {
    const newPage = Math.min(currentPage + 1, totalPages);
    setSearchParams({ page: newPage });
  }

  // -------------------------------
  // Page validation
  // -------------------------------
  useEffect(() => {
    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate('/');
      }
    }
  }, [currentPage, totalPages, navigate]);

  // -------------------------------
  // Reset page to 1 when adding a new todo
  // -------------------------------
  function handleAddTodo(todo) {
    addTodo(todo);
    setSearchParams({ page: 1 });
  }

  return (
    <div>
      {isLoading && <p>Todo list loading...</p>}

      {errorMessage && (
        <div className="error-block">
          <hr />
          <p>{errorMessage}</p>
          <button onClick={clearError}>Dismiss</button>
        </div>
      )}

      <TodoForm onAddTodo={handleAddTodo} isSaving={isSaving} />

      <TodoList
        todos={currentTodos}
        onUpdateTodo={updateTodo}
        onCompleteTodo={completeTodo}
        isLoading={isLoading}
      />

      <div className="paginationControls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>

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

export default TodosPage;
