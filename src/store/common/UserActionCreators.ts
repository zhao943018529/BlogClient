import { Dispatch } from 'redux';
import { loginUserSuccess } from './User';

export default function getUser(username: string, password: string) {
  return (dispatch: Dispatch) => {
    new Promise(function (resolve) {
      setTimeout(
        () => resolve({ username, password, age: 11, nickname: 'pig' }),
        1000
      );
    }).then((user) => dispatch({ type: loginUserSuccess, payload: user }));
  };
}
