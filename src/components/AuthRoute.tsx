import * as React from 'react';
import styled from 'styled-components';
import { Backdrop, CircularProgress, Theme } from '@material-ui/core';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { useApolloClient, useLazyQuery, useQuery } from '@apollo/react-hooks';
import { getUser } from '@store/common/User';
import gql from 'graphql-tag';

const GetUserInfo = gql`
  query GetUserInfo {
    userInfo @client {
      username
    }
  }
`;

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

export default function AuthRoute(props: RouteProps) {
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
  const children = props.children;
  delete props.children;

  return (
    <Route
      {...props}
      render={() => {
        const {
          data: { userInfo },
        } = useQuery<{ userInfo: any }>(GetUserInfo);
        if (userInfo != null) {
          return children;
        } else {
          return <Redirect to='/login' />;
        }
      }}
    />
  );
}
