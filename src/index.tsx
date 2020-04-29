import * as React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

// import ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader';

function App() {
  return <div>Hello,React!!!!!</div>;
}

const render = (Component: React.ReactElement<any>) => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

export default render(hot(App));

// if ((module as any).hot) {
//   (module as any).hot.accept();
// }
