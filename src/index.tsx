import * as React from 'react';
import ReactDOM from 'react-dom';
// import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { ApolloProvider } from '@apollo/client';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable } from 'apollo-link';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { createUploadLink } from 'apollo-upload-client';
import 'typeface-roboto';
import { StylesProvider } from '@material-ui/core';
import App from './app';
import reducers from './store';

const store = createStore(
  reducers,
  undefined,
  applyMiddleware(thunkMiddleware)
);

const cache = new InMemoryCache();

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle;
      Promise.resolve(operation)
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
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    requestLink,
    createUploadLink({ uri: 'http://10.11.1.140:13892/graphql' }),
  ]),
  // link: createUploadLink({ uri: 'http://10.11.1.140:13892/graphql' }),
  cache,
  // uri: 'http://10.11.1.140:13892/graphql',
  // cache: new InMemoryCache(),
  // link: createUploadLink({ uri: 'http://10.11.1.140:13892/graphql' }),
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
