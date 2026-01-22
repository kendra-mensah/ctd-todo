import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { useRef } from 'react';
import { useEffect } from 'react';

function TodoForm({ onAddTodo, isSaving, todo }) {
  const [workingTitle, setWorkingTitle] = useState(todo ? todo.title : '');

  // Sync workingTitle with todo prop whenever it changes
  useEffect(() => {
    if (todo) {
      setWorkingTitle(todo.title);
    }
  }, [todo]);

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo({ ...todo, title: workingTitle }); // pass updated title if editing
    setWorkingTitle(''); // clear input after adding
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        labelText="Todo"
        elementId="title"
        ref={useRef}
        value={workingTitle}
        onChange={(e) => setWorkingTitle(e.target.value)}
      />
      <button disabled={workingTitle.trim() === ''}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </button>
    </form>
  );
}

export default TodoForm;
