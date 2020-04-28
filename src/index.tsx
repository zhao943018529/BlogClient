import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

function App() {
  return <div>Hello,React!!!</div>;
}

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);
