export const loginUserSuccess = 'Login_User';

export function getUser(state: IStoreState) {
  return state.common.user;
}

const initializeUser = {
  userInfo: null,
};

export default function userReducer(state = initializeUser, action: IAction) {
  switch (action.type) {
    case loginUserSuccess:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
}
