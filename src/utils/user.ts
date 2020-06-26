import * as React from 'react';
import { useLazyQuery, useQuery, useApolloClient } from '@apollo/client';
import { removeToken } from '@utils/token';
import { useHistory } from 'react-router-dom';
import { GET_USERINFO, GET_LOCAL_USERINFO } from '@graphql/user';

export function useUserState<T>(completed?: (data: T) => void) {
  const [getUserInfo, { data, loading, client }] = useLazyQuery<{
    getUserInfo: any;
  }>(GET_USERINFO, {
    fetchPolicy: 'network-only',
    onCompleted: completed,
  });

  React.useEffect(() => {
    if (data && data.getUserInfo !== null) {
      client?.writeQuery({
        query: GET_LOCAL_USERINFO,
        data: { userInfo: data.getUserInfo },
      });
    }
  }, [data]);

  return { getUserInfo, data, loading, client };
}

export function useLogout() {
  const client = useApolloClient();
  const history = useHistory();

  return () => {
    client.resetStore();
    removeToken();
    history.push('/login');
  };
}
