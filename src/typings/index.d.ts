type FilterType = 'All' | 'Completed' | 'Uncompleted';

interface IAction {
  type: string;
  payload: any;
}

interface ITodo {
  id: number;
  name: string;
  completed: boolean;
  createTime: number;
}

interface ITodoAppProps {
  todos: ITodo[];
  visibilityFilter: FilterType;
}

interface IStoreState {
  todo: ITodoAppProps;
}
