import TodoListItem from './TodoListItem.jsx';
import styles from '../TodoList.module.css';

function TodoList({ todos = [], onCompleteTodo, onUpdateTodo, isLoading }) {
  if (isLoading) return <p>Todo list loading...</p>;
  if (todos.length === 0) return <p>Add todo above to get started</p>;

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
