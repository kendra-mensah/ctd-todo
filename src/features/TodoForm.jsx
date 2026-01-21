import { useState } from 'react';
import TextInputWithLabel from './TextInputWithLabel';

function TodoForm({ onAddTodo }) {
  const [workingTodo, setWorkingTodo] = useState('');

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodo);
    setWorkingTodo('');
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        labelText="Todo"
        elementId="title"
        value={workingTodo}
        onChange={(e) => setWorkingTodo(e.target.value)}
      />

      <button disabled={workingTodo === ''}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
