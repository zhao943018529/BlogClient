import * as React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import 'typeface-roboto';
import { List, Paper } from '@material-ui/core';
import { Inbox, Schedule } from '@material-ui/icons';
import styled from 'styled-components';
import ListItemLink from './components/ListItemLink';
import reducers from './store';

import Routes from './routes';

const store = createStore(reducers);

// const { useState } = React;

// import ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader';

const RootContainer = styled.div`
  width: 800px;
  margin: 0 auto;
`;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <RootContainer>
          <Paper elevation={0}>
            <List>
              <ListItemLink to='/' icon={<Inbox />} primary='home' />
              <ListItemLink to='/todo' icon={<Schedule />} primary='TodoApp' />
            </List>
          </Paper>
          <Routes />
        </RootContainer>
      </Router>
    </Provider>
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
