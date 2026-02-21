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

  useEffect(() => {
    if (todo) setWorkingTitle(todo.title);
  }, [todo]);

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (!workingTitle.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      title: workingTitle,
      isCompleted: false,
    };

    onAddTodo?.(newTodo); // safe call
    setWorkingTitle('');
  };

  return (
    <Form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        labelText="Todo"
        elementId="title"
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
