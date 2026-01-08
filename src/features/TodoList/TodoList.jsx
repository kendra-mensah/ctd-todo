import TodoListItem from './TodoListItem.jsx';

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

// function TodoList({ todos }) {
//   return (
//     <ul>
//       {todos.map((todo) => (
//         <TodoListItem key={todo.id} todo={todo} />
//       ))}
//     </ul>
//   );
// }
// export default TodoList;
