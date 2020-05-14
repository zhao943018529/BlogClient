import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import AuthRoute from '@components/AuthRoute';
import Loading from '../components/Loading';
import Layout from '../components/Layout';

const { Suspense } = React;

const Home = React.lazy(() => import('./Home/index'));
const Todo = React.lazy(() => import('./Todo/index'));
const Todo2 = React.lazy(() => import('./Todo2/index'));
const Login = React.lazy(() => import('./Login/index'));
const Editor = React.lazy(() => import('./Editor/index'));
const Blog = React.lazy(() => import('./Blog/index'));

export default function routes() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path='/blog'>
          <Blog />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <AuthRoute path='/'>
          <Layout>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/todo'>
                <Todo />
              </Route>
              <Route path={['/todo2/:filter', '/todo2']} component={Todo2}>
                <Todo2 />
              </Route>
              <Route path='/editor'>
                <Editor />
              </Route>
            </Switch>
          </Layout>
        </AuthRoute>
      </Switch>
    </Suspense>
  );
}
