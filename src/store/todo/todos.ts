import * as _ from 'lodash';
import { addTodo, removeTodo, updateTodo } from './actionTypes';

// export interface ITodo {
//   id: number;
//   name: string;
//   completed: boolean;
//   createTime: number;
// }

const initialState: ITodo[] = [];

export default function todos(state: ITodo[] = initialState, action: IAction) {
  switch (action.type) {
    case addTodo:
      return [
        ...state,
        {
          id: state.length,
          name: action.payload.name,
          completed: false,
          createTime: Date.now(),
        },
      ];

    case removeTodo:
      return state.filter((todo) => todo.id !== action.payload.id);
    case updateTodo: {
      const newTodos = state.slice(0);
      const index = _.findIndex(
        newTodos,
        (todo) => todo.id === action.payload.id
      );

      newTodos[index] = { ...newTodos[index], ...action.payload };

      return newTodos;
    }
    default:
      return state;
  }
}
