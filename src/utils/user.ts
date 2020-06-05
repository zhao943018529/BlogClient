import * as React from 'react';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import { useLocation } from 'react-router-dom';
import gql from 'graphql-tag';

const GetUserInfo = gql`
  query GetUserInfo {
    userInfo @client {
      username
    }
  }
`;

const GetRemoteUserInfo = gql`
  query GetUserInfo {
    getUserInfo {
      username
      fullName
      firstName
      lastName
      phone
    }
  }
`;

export function useUserState() {
  const location = useLocation();
  const [getUserInfo, { data, loading, client }] = useLazyQuery<{
    getUserInfo: any;
  }>(GetRemoteUserInfo);

  React.useEffect(() => {
    if (data && data.getUserInfo !== null) {
      client.writeQuery({ query: GetUserInfo, data: data.getUserInfo });
    }
  }, [data]);

  const getUserInfoWrapper = React.useCallback(() => {
    if (!/^\/login/.test(location.pathname)) {
      getUserInfo();
    }
  }, [location]);

  return { getUserInfo: getUserInfoWrapper, data, loading, client };
}
