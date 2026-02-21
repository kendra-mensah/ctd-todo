import { useState, useEffect } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx';
import styles from '/src/TodoListItem.module.css';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  // Reset workingTitle when todo prop changes (handles stale input)
  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <li className={styles.mylist}>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId={`todo-${todo.id}`}
              labelText="Todo"
              value={workingTitle}
              onChange={(e) => setWorkingTitle(e.target.value)}
            />

            <button type="button" onClick={handleCancel}>
              Cancel
            </button>

            <button type="submit">Update</button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
