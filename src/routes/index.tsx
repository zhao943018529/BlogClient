import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loading from '../components/Loading';

const { Suspense } = React;

const Home = React.lazy(() => import('./Home/index'));
const Todo = React.lazy(() => import('./Todo/index'));

export default function routes() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/todo'>
          <Todo />
        </Route>
      </Switch>
    </Suspense>
  );
}
