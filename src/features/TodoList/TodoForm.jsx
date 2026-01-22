import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { useRef } from 'react';

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
        ref={useRef}
        value={workingTodo}
        onChange={(e) => setWorkingTodo(e.target.value)}
      />
      {/* <label htmlFor="title">New Todo</label> */}
      {/* <input
        id="title"
        name="title"
        type="text"
      /> */}

      <button disabled={workingTodo === ''}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
