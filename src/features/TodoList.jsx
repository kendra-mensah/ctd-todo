import TodoListItem from './TodoListItem.jsx';
import styles from '/src/TodoList.module.css';

function TodoList({ todos, onCompleteTodo, onUpdateTodo }) {
  return (
    <>
      {todos.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
