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

interface IThemeProps {
  primary: string;
  secondary: string;
}

interface ICommonProps {
  collapse: boolean;
  theme: IThemeProps;
}

interface IStoreState {
  todo: ITodoAppProps;
  common: ICommonProps;
}
