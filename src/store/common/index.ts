import { combineReducers } from 'redux';

export const toggleActionType = 'TOGGLE_COLLAPSE';

export function getCollapse(state: IStoreState) {
  return state.common.collapse;
}

function commonReducer(state: boolean = false, action: IAction) {
  switch (action.type) {
    case toggleActionType:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  collapse: commonReducer,
});
