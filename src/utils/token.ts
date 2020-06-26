const USER_TOKEN = 'user_token';

export const saveToken = (token: string) => {
  localStorage.setItem(USER_TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(USER_TOKEN);
};

export const removeToken = () => {
  return localStorage.removeItem(USER_TOKEN);
};
