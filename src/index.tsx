import * as React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/core';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  useQuery,
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  Observable,
  Operation,
} from '@apollo/client';
import { onError } from '@apollo/link-error';
// 导入样式
import { GET_LOCAL_USERINFO, USER_LOGIN } from '@graphql/user';
import App from './app';
import reducers from './store';
import { createUploadLink } from 'apollo-upload-client';
import { useHistory } from 'react-router-dom';
import { getToken, removeToken } from '@utils/token';
import 'typeface-roboto';
import './styles/index.scss';

const store = createStore(
  reducers,
  undefined,
  applyMiddleware(thunkMiddleware)
);

const cache = new InMemoryCache();

const request = async (operation: Operation) => {
  const token = getToken();
  operation.setContext({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: any;
      // operation.setContext({
      //   headers: {
      //     ...forward.headers,
      //     authorization: `Bearer ${}`,
      //   },
      // });
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  // uri: 'http://10.11.1.145:13892/graphql',
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) {
        if (networkError.statusCode === 401) {
          removeToken();
          cache.writeQuery({ query: USER_LOGIN, data: { isLoggedIn: false } });
          if (!/^\/login/.test(window.location.pathname)) {
            window.location.href = '/login';
          }
        }
      }
    }),
    requestLink,
    createUploadLink({ uri: 'http://10.11.1.145:13892/graphql' }),
  ]),
  // headers: {
  //   Authorization: `Bearer ${getToken()}`,
  // },
  cache,
  // uri: 'http://10.11.1.140:13892/graphql',
  // cache: new InMemoryCache(),
});

const defaultData = {
  userInfo: null,
};

cache.writeQuery({
  query: GET_LOCAL_USERINFO,
  data: defaultData,
});

cache.writeQuery({
  query: USER_LOGIN,
  data: {
    isLoggedIn: !!getToken(),
  },
});

const render = () => {
  const app = (
    <ApolloProvider client={client}>
      <StylesProvider injectFirst>
        <Provider store={store}>
          <App />
        </Provider>
      </StylesProvider>
    </ApolloProvider>
  );

  ReactDOM.render(
    process.env.NODE_ENV === 'development' ? (
      <AppContainer>{app}</AppContainer>
    ) : (
      app
    ),
    document.getElementById('root')
  );
};

// process.env.NODE_ENV === 'development' ? hot(App) : App
export default render();

// if ((module as any).hot) {
//   (module as any).hot.accept();
// }
