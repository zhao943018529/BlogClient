import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 2000,
  withCredentials: true,
});

function postWithUrl(url: string, params?: any) {
  return instance.post(url, params, {
    transformRequest: [
      function (data) {
        return Object.keys(data)
          .filter((key) => data[key] != null)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
          )
          .join('&');
      },
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

function postWithMulti(url: string, params?: Object) {
  return instance.post(url, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function postWithJSON(url: string, params?: Object) {
  return instance.post(url, params, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function fetch(url: string, params: Object) {
  return instance.get(url, {
    paramsSerializer(data) {
      return Object.keys(data)
        .filter((key) => data[key] != null)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join('&');
    },
    params,
  });
}

export { postWithUrl, postWithMulti, postWithJSON, fetch };
