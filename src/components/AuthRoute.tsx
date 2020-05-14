import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { getUser } from '@store/common/User';

export default function AuthRoute({ path, children }: RouteProps) {
  const user = useSelector(getUser, shallowEqual);

  return (
    <Route
      path={path}
      render={() => {
        if (user.userInfo != null) {
          return children;
        }

        return <Redirect to='/login' />;
      }}
    />
  );
}
