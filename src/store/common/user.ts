const loginUserSuccess = 'Login_User';

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
