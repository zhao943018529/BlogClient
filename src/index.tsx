import * as React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

const { useState } = React;

// import ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader';

function App() {
  const [value, setValue] = useState('Hello,React!!!!!');

  return <div onClick={() => setValue(Date.now().toString())}>{value}</div>;
}

const render = (Component: React.FunctionComponentFactory<any>) => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

export default render(hot(App));

// if ((module as any).hot) {
//   (module as any).hot.accept();
// }
