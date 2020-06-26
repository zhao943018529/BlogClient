import * as React from 'react';
import styled from 'styled-components';
import { Backdrop, CircularProgress, Theme } from '@material-ui/core';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { USER_LOGIN } from '@graphql/user';

// const GetRemoteUserInfo = gql`
//   query GetUserInfo {
//     getUserInfo {
//       username
//       fullname
//       firstName
//       lastName
//       phone
//     }
//   }
// `;

const ThemeBackdrop = styled(Backdrop)`
  ${({ theme }: { theme: Theme }) => `
      z-index:${theme.zIndex.drawer + 1};
      color:${theme.palette.primary.light};
  `}
`;

export default function AuthRoute({ children, ...rest }: RouteProps) {
  const { data } = useQuery<{ isLoggedIn: boolean }>(USER_LOGIN);
  // const user = useSelector(getUser, shallowEqual);
  // const [getUserInfo, { loading, data, client }] = useLazyQuery<{
  //   getUserInfo: any;
  // }>(GetRemoteUserInfo);

  // const client = useApolloClient();
  // debugger;
  // const fragment = gql`
  // fragment loginUser on User {
  //     username
  //   }
  // `;
  // const myUser = client.cache.readFragment({
  //   query,
  // });

  // if (loading) {
  //   return (
  //     <ThemeBackdrop>
  //       <CircularProgress color='inherit' />
  //     </ThemeBackdrop>
  //   );
  // }

  return (
    <Route
      {...rest}
      render={() => {
        if (data && data.isLoggedIn) {
          return children;
        } else {
          return <Redirect to='/login' />;
        }
      }}
    />
  );
}
