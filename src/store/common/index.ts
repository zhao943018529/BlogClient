import { combineReducers } from 'redux';

export const toggleActionType = 'TOGGLE_COLLAPSE';

export function getCollapse(state: IStoreState) {
  return state.common.collapse;
}

function collapseReducer(state: boolean = false, action: IAction) {
  switch (action.type) {
    case toggleActionType:
      return action.payload;
    default:
      return state;
  }
}

export const themeChangeActionType = 'THEME_CHANGE_ACTION';

export function getTheme(state: IStoreState) {
  return state.common.theme;
}

const themeDefault: IThemeProps = {
  primary: '#f44336',
  secondary: '#ff9100',
};

function themeReducer(state: IThemeProps = themeDefault, action: IAction) {
  switch (action.type) {
    case themeChangeActionType:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default combineReducers({
  collapse: collapseReducer,
  theme: themeReducer,
});
