import TodoListItem from './TodoListItem.jsx';

function TodoList({ todos, onCompleteTodo, onUpdateTodo, isLoading }) {
  if (isLoading) {
    return <p>Todo list loading...</p>;
  }
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
