import { useState, useEffect } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import styled from 'styled-components';

const Form = styled.form`
  padding: 0.5rem;
`;

const Button = styled.button`
  &:disabled {
    font-style: italic;
  }
`;

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
    onAddTodo(workingTitle); // pass updated title if editing
    setWorkingTitle(''); // clear input after adding
  }

  return (
    <Form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        labelText="Todo"
        elementId="title"
        ref={null} // just pass ref as instructed
        value={workingTitle}
        onChange={(e) => setWorkingTitle(e.target.value)}
      />
      <Button disabled={workingTitle.trim() === ''}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </Button>
    </Form>
  );
}

export default TodoForm;
