import * as React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import 'typeface-roboto';
import { StylesProvider } from '@material-ui/core';
import App from './app';
import reducers from './store';

const store = createStore(reducers);

const render = () => {
  const app = (
    <StylesProvider injectFirst>
      <Provider store={store}>
        <App />
      </Provider>
    </StylesProvider>
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
