export function getTodos(state: IStoreState) {
  return state.todo.todos;
}

export function getVisibilityFilter(state: IStoreState) {
  return state.todo.visibilityFilter;
}

export function getTodosVisibilityFilter(state: IStoreState): ITodo[] {
  const todos = getTodos(state);
  const filter = getVisibilityFilter(state);
  switch (filter) {
    case 'All':
      return todos;
    case 'Completed':
      return todos.filter((todo) => todo.completed);
    case 'Uncompleted':
      return todos.filter((todo) => !todo.completed);
    default:
      return todos;
  }
}
