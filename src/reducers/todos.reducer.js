// src/reducers/todos.reducer.js

// -------------------------------
// Initial state
// -------------------------------
const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
};

// -------------------------------
// Actions
// -------------------------------
const actions = {
  fetchTodos: 'fetchTodos', // start fetching todos
  loadTodos: 'loadTodos', // todos successfully loaded
  setLoadError: 'setLoadError', // error while fetching or adding todos
  startRequest: 'startRequest', // start saving a todo
  addTodo: 'addTodo', // todo successfully added
  endRequest: 'endRequest', // stop loading/saving
  updateTodo: 'updateTodo', // update a todo (optimistic)
  completeTodo: 'completeTodo', // mark todo completed (optimistic)
  revertTodo: 'revertTodo', // revert todo if update fails
  clearError: 'clearError', // dismiss error
};

// -------------------------------
// Reducer function
// -------------------------------
function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return { ...state, isLoading: true };

    case actions.loadTodos: {
      const mappedTodos = action.records.map((record) => {
        const todo = { id: record.id, ...record.fields };
        if (!todo.isCompleted) todo.isCompleted = false;
        return todo;
      });
      return {
        ...state,
        todoList: mappedTodos,
        isLoading: false,
        errorMessage: '',
      };
    }

    case actions.setLoadError:
      return { ...state, errorMessage: action.error.message, isLoading: false };

    case actions.startRequest:
      return { ...state, isSaving: true };

    case actions.addTodo: {
      const savedTodo = { ...action.todo };
      if (!savedTodo.isCompleted) savedTodo.isCompleted = false;
      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };
    }

    case actions.endRequest:
      return { ...state, isLoading: false, isSaving: false };

    case actions.revertTodo:
    case actions.updateTodo: {
      const updatedTodos = state.todoList.map((todo) =>
        todo.id === action.editedTodo.id ? { ...action.editedTodo } : todo
      );
      const updatedState = { ...state, todoList: updatedTodos };
      if (action.error) updatedState.errorMessage = action.error.message;
      return updatedState;
    }

    case actions.completeTodo: {
      const completedTodos = state.todoList.map((todo) =>
        todo.id === action.id ? { ...todo, isCompleted: true } : todo
      );
      return { ...state, todoList: completedTodos };
    }

    case actions.clearError:
      return { ...state, errorMessage: '' };

    default:
      return state;
  }
}

// -------------------------------
// Named exports
// -------------------------------
export { initialState };
export { actions };
export { reducer };
