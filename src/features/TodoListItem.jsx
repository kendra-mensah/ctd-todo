import { useState } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel.jsx'; // fixed
import styles from '/src/TodoListItem.module.css';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdateTodo({ ...todo, workingTitle });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  };

  const handleEdit = (event) => {
    setWorkingTitle(event.target.value);
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
              onChange={handleEdit}
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
                id={`checkbox-${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
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
