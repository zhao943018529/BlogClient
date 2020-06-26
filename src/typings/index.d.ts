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

interface IUserInfo {
  user: IUser;
}

interface ICommonProps {
  collapse: boolean;
  theme: IThemeProps;
  user: IUserInfo;
}

interface IStoreState {
  todo: ITodoAppProps;
  common: ICommonProps;
}

interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  phone: string;
  createTime?: Date;
  updateTime?: Date;
}

/** GraphQL types */
interface IBaseResponse<T> {
  code: string;
  success: boolean;
  message?: string;
  data: T;
}

interface Tag {
  id: string;
  title: string;
  description: string;
}

interface Article {
  id: string;
  title: string;
  content: string | null;
  tags: string[] | Tag[];
  author: IUser;
  createTime: number;
  updateTime: number;
}

interface Pagination {
  page: number;
  pageSize: number;
  order: string;
  orderBy: string;
}

interface Role {
  id: string;
  title: string;
  description: string;
  createTime: string;
}
