import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [workingTodo, setWorkingTodo] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodo);
    setWorkingTodo('');
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input
        name="title"
        value={workingTodo}
        onChange={(e) => setWorkingTodo(e.target.value)}
      />

      <button disabled={workingTodo === ''}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
