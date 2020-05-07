import * as React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';
import {
  createMuiTheme,
  ThemeProvider,
  StylesProvider,
} from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import Layout from './components/Layout';
import reducers from './store';

import Routes from './routes';

const store = createStore(reducers);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#292961',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});
// console.log(theme);
// const { useState } = React;

// import ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader';

// const RootContainer = styled.div`
//   width: 800px;
//   margin: 0 auto;
// `;
/* <RootContainer>
  <Paper elevation={0}>
    <List>
      <ListItemLink to='/' icon={<Inbox />} primary='home' />
      <ListItemLink
        to='/todo'
        icon={<Schedule />}
        primary='TodoApp'
      />
    </List>
  </Paper>
  <Routes />
</RootContainer> */

function App() {
  return (
    <StylesProvider injectFirst>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <StyledThemeProvider theme={theme}>
            <Router>
              <Layout>
                <Routes />
              </Layout>
            </Router>
          </StyledThemeProvider>
        </ThemeProvider>
      </Provider>
    </StylesProvider>
  );
}

const render = (Component: React.FunctionComponentFactory<any>) => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

// process.env.NODE_ENV === 'development' ? hot(App) : App
export default render(App);

// if ((module as any).hot) {
//   (module as any).hot.accept();
// }
