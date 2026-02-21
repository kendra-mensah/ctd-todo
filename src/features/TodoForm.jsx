import { useState, useEffect } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';
import styled from 'styled-components';

const Form = styled.form`
  padding: 0.5rem;
`;

const Button = styled.button`
  &:disabled {
    font-style: italic;
  }
`;

function TodoForm({ onAddTodo, disabled, isSaving, todo }) {
  const [workingTitle, setWorkingTitle] = useState(todo ? todo.title : '');

  // Sync workingTitle with todo prop whenever it changes
  useEffect(() => {
    if (todo) {
      setWorkingTitle(todo.title);
    }
  }, [todo]);

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo(workingTitle); // call addTodo from App.jsx
    setWorkingTitle(''); // clear input after adding
  };

  return (
    <Form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        labelText="Todo"
        elementId="title"
        ref={null} // no ref needed
        value={workingTitle}
        onChange={(e) => setWorkingTitle(e.target.value)}
      />

      <Button type="submit" disabled={disabled || workingTitle.trim() === ''}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </Button>
    </Form>
  );
}

export default TodoForm;
