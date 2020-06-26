import * as React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Progress from '@components/Progress';
// import Management from './Management/index';

const Management = React.lazy(() => import('./Management/index'));
const Article = React.lazy(() => import('./Article/index'));
const Editor = React.lazy(() => import('./Editor/index'));

export default function Routes() {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${url}`} exact>
        <Management />
      </Route>
      <Route path={`${url}/editor/:id`}>
        <Editor />
      </Route>
      <Route path={`${url}/article`}>
        <Article />
      </Route>
      <Route path={`${url}/editor`}>
        <Editor />
      </Route>
    </Switch>
  );
}
