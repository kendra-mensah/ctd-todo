import TodoListItem from './TodoListItem.jsx';
import styles from '/src/TodoList.module.css';

function TodoList({ todos, onCompleteTodo, onUpdateTodo, isLoading }) {
  return (
    <>
      {isLoading ? (
        <p>Todo list loading...</p> // <-- loading message
      ) : todos.length === 0 ? (
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
