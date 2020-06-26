import * as React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const Home = React.lazy(() => import('./Home/index'));
const Post = React.lazy(() => import('./Post/index'));

export default function Routes() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.url}`} exact>
        <Home />
      </Route>
      <Route path={`${match.url}/:id`}>
        <Post />
      </Route>
    </Switch>
  );
}
