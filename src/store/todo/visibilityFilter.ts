import { updateFilter } from './actionTypes';

interface IAction {
  type: string;
  payload: FilterType;
}

export default function Filter(state: FilterType = 'All', action: IAction) {
  switch (action.type) {
    case updateFilter:
      return action.payload;
    default:
      return state;
  }
}
